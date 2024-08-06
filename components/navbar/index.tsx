"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { nanoid } from "nanoid";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import Mx from "../icons/mx";
import Fr from "../icons/fr";
import GB from "../icons/gb";

import localisation from "@/localisation/login.json";

const languages = {
  en: {
    name: "English",
    icon: GB,
  },
  es: {
    name: "Español",
    icon: Mx,
  },
  fr: {
    name: "Français",
    icon: Fr,
  },
};

export default function Navbar() {
  const [user, setUser] = useState<any>(null);
  const paths = usePathname();
  const pathNames = paths.split("/").filter((path) => path);
  const lang =
    (pathNames.length > 0 && pathNames[0] == "es") ||
    pathNames[0] == "fr" ||
    pathNames[0] == "en"
      ? pathNames[0]
      : "en";
  const router = useRouter();

  useEffect(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setUser(session?.user ?? null);
      }
    );

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.push(`/${lang}`);
  };

  const DropdownMenuIcon = languages[lang as keyof typeof languages].icon;

  return (
    <nav className="bg-gray-800 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="space-x-4 flex items-center">
          <Link href={`/${lang}`} className="text-xl font-bold underline">
            Osito del Amor
          </Link>
          {user && (
            <div className="text-sm italic">
              {localisation[lang as keyof typeof localisation].welcome}{" "}
              {user.user_metadata.name}
            </div>
          )}
        </div>
        <div className="space-x-4">
          <Link href={`/${lang}/`} className="hover:text-gray-300">
            {localisation[lang as keyof typeof localisation].recipes}
          </Link>
          {user ? (
            <>
              <Link href={`/${lang}/profile`} className="hover:text-gray-300">
                {localisation[lang as keyof typeof localisation].profile}
              </Link>
              <Button onClick={handleSignOut} variant="ghost">
                {localisation[lang as keyof typeof localisation].signout}
              </Button>
            </>
          ) : (
            <Link href={`/${lang}/login`} className="hover:text-gray-300">
              {localisation[lang as keyof typeof localisation].signin}
            </Link>
          )}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="text-black">
                <div className="inline-flex items-center">
                  <DropdownMenuIcon className="h-3.5 w-3.5 rounded-full me-2" />
                  {languages[lang as keyof typeof languages].name}
                </div>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              {Object.entries(languages).map(([code, name]) => (
                <DropdownMenuItem key={nanoid()} className="cursor-pointer">
                  <Link
                    href={
                      pathNames.length > 0
                        ? `/${pathNames
                            .map(
                              (path, index) => `${index == 0 ? code : path}/`
                            )
                            .join("")}`
                        : `/${code}`
                    }
                  >
                    <div className="inline-flex items-center">
                      <name.icon className="h-3.5 w-3.5 rounded-full me-2" />
                      {name.name}
                    </div>
                  </Link>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </nav>
  );
}
