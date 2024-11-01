import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import localisation from "@/localisation/login.json";

export default function ResetPasswordForm({
  setMessage,
  lang = "en",
}: {
  setMessage: (message: string) => void;
  lang?: string;
}) {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const language = localisation[lang as keyof typeof localisation];

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("");

    if (password.length < 6) {
      setMessage(language.passwordMin);
      return;
    }

    if (password !== confirmPassword) {
      setMessage("Les mots de passe ne sont pas identiques");
      return;
    }

    setIsLoading(true);

    try {
      const { error } = await supabase.auth.updateUser({ password: password });

      if (error) throw error;

      setMessage(language.resetPasswordSuccess);
      setTimeout(() => router.push("/login"), 3000); // Rediriger vers la page de connexion après 3 secondes
    } catch (error: any) {
      setMessage(
        `Erreur lors de la réinitialisation du mot de passe : ${error.message}`
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleResetPassword} className="space-y-4">
      <Input
        type="password"
        placeholder="Nouveau mot de passe"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <Input
        type="password"
        placeholder="Confirmer le nouveau mot de passe"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        required
      />
      <Button type="submit" disabled={isLoading}>
        {isLoading ? "Chargement..." : "Réinitialiser le mot de passe"}
      </Button>
    </form>
  );
}
