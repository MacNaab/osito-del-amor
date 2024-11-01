import React, { useState } from "react";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { isEmail } from "@/utils/AppConfig";

import localisation from "@/localisation/login.json";

export default function SignIn({
  setMessage,
  lang = "en",
}: {
  setMessage: (message: string) => void;
  lang?: string;
}) {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const language = localisation[lang as keyof typeof localisation];

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("");

    if (!isEmail(email)) {
      setMessage(language.emailInvalid);
      return;
    }

    setIsLoading(true);

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (error) throw error;
      setMessage(language.coSuccess);
      router.push(`/${lang}/profile`);
    } catch (error: any) {
      setMessage(`${language.coFail} : ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  const handleMagicLink = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("");

    if (!email) {
      setMessage(language.enterMail);
      return;
    }

    setIsLoading(true);

    try {
      const { data, error } = await supabase.auth.signInWithOtp({ email });
      if (error) throw error;
      setMessage(language.mlSucces);
    } catch (error: any) {
      setMessage(`${language.mlFail} : ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  const handleOTP = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("");

    if (!email) {
      setMessage(language.enterMail);
      return;
    }

    setIsLoading(true);

    try {
      const { data, error } = await supabase.auth.signInWithOtp({
        email,
        options: {
          shouldCreateUser: false,
        },
      });
      if (error) throw error;
      setMessage(language.otpSucces);
    } catch (error: any) {
      setMessage(`${language.otpFail} : ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("");

    if (!email) {
      setMessage(language.fillAll);
      return;
    }

    if (!isEmail(email)) {
      setMessage(language.emailInvalid);
      return;
    }

    setIsLoading(true);
    try {
      const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset`
      });
      if (error) throw error;
      setMessage(language.forgotPasswordSuccess);
    } catch (error: any) {
      setMessage(`${language.otpFail} : ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <form onSubmit={handleSignIn} className="space-y-4">
        <Input
          type="email"
          placeholder={language.email}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <Input
          type="password"
          placeholder={language.password}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <Button type="submit" disabled={isLoading} className="w-full">
          {isLoading ? language.loading : language.signin}
        </Button>
      </form>
      <Button
        onClick={handleResetPassword}
        disabled={isLoading}
        className="w-full bg-gray-500 hover:bg-gray-600"
      >
        {isLoading ? language.loading : language.forgotPassword}
      </Button>
      <div className="text-center">{language.or}</div>
      <Button onClick={handleMagicLink} disabled={isLoading} className="w-full">
        {isLoading ? language.loading : language.magicLink}
      </Button>
      <Button onClick={handleOTP} disabled={isLoading} className="w-full">
        {isLoading ? language.loading : language.otp}
      </Button>
    </>
  );
}
