"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import Index from "@/components/recetas/protected";

const localisation = {
  fr: {
    hello: "Bonjour",
    end: ", voici la liste de vos favoris:"
  },
  en: {
    hello: "Hello",
    end: ", here are your favorites:"
  },
  es: {
    hello: "Hola",
    end: ", aqui tienes tus favoritos:"
  }
};

export default function Page({ params: { lang } }: any) {
  // Utilisez 'lang' pour localiser le contenu de votre page
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState<any>({});
  const router = useRouter();

  const language = localisation[lang as keyof typeof localisation];

  useEffect(() => {
    async function getProfile() {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (user) {
        setUser(user);
        const { data, error } = await supabase
          .from("profiles")
          .select()
          .eq("id", user.id)
          .single();

        if (data) {
          setUserData(data);
        }
      } else {
        router.push(`/${lang}/login`);
      }
      setLoading(false);
    }

    getProfile();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div>
      {!loading && (
        <div>
          <div className="text-right text-sm m-6">
            <span>{language.hello}</span>
            <span className="italic underline mx-1">{userData.name}</span>
            <span>{language.end}</span>
          </div>
          <Index lang={lang} userData={userData} />
        </div>
      )}
    </div>
  );
}
