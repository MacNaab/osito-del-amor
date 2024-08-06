import React, { useState } from "react";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import localisation from "@/localisation/login.json";
import { isEmail } from "@/utils/AppConfig";

export default function SignUp({
  setMessage,
  lang = "en",
}: {
  setMessage: (message: string) => void;
  lang?: string;
}) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [name, setName] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const language = localisation[lang as keyof typeof localisation];

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("");

    if (!email || !password || !name) {
      setMessage(language.fillAll);
      return;
    }

    if (!isEmail(email)) {
      setMessage(language.emailInvalid);
      return;
    }

    if (password.length < 6) {
      setMessage(language.passwordMin);
      return;
    }

    if (password !== confirmPassword) {
      setMessage(language.passwordNotMatch);
      return;
    }

    setIsLoading(true);

    try {
      // 1. Créer l'utilisateur dans Supabase Auth
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: email,
        password: password,
        options: {
          data: {
            name: name,
            fav: [],
          },
        },
      });

      if (authError) throw authError;

      if (authData.user) {
        setMessage(language.signupSuccess);
      }
    } catch (error: any) {
      setMessage(`${language.signupFail} : ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSignUp} className="space-y-4">
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
      <Input
        type="password"
        placeholder={language.password}
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        required
      />
      <Input
        type="text"
        placeholder={language.username}
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <Button type="submit" disabled={isLoading} className="w-full">
        {isLoading ? language.loading : language.register}
      </Button>
    </form>
  );
}
