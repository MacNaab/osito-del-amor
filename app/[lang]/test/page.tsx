"use client";
import React, { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";

export default function ToggleFavorite() {
  const [user, setUser] = useState<any>(null);
  const [isFavorite, setIsFavorite] = useState<any>(false);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    // Récupérer l'utilisateur actuel et son statut "favorite"
    const fetchUserAndFavorite = async () => {
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

        console.log(data);

        if (error) {
          console.error(
            "Erreur lors de la récupération du statut favori:",
            error
          );
        } else if (data) {
          setIsFavorite(data);
        }
      }
    };

    fetchUserAndFavorite();
  }, []);

  const toggleFavorite = async () => {
    if (!user) {
      setMessage("Utilisateur non connecté");
      return;
    }

    setIsLoading(true);
    setMessage("");

    try {
      const newFavoriteStatus = !isFavorite;
      const { error } = await supabase
        .from("profiles")
        .update({ favorite: newFavoriteStatus })
        .eq("id", user.id);

      if (error) throw error;

      setIsFavorite(newFavoriteStatus);
      setMessage(
        `Statut favori mis à jour : ${
          newFavoriteStatus ? "Favori" : "Non favori"
        }`
      );
    } catch (error: any) {
      setMessage(`Erreur lors de la mise à jour : ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  if (!user) {
    return (
      <Alert>
        <AlertDescription>
          Veuillez vous connecter pour utiliser cette fonctionnalité.
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <div className="space-y-4">
      <div>{isFavorite?.name} </div>
      <div>{user && JSON.stringify(user.user_metadata)} </div>
      <div>{user && JSON.stringify(isFavorite)} </div>
      <Button onClick={toggleFavorite} disabled={isLoading}>
        {isLoading
          ? "Chargement..."
          : isFavorite
          ? "Retirer des favoris"
          : "Ajouter aux favoris"}
      </Button>
      {message && (
        <Alert>
          <AlertDescription>{message}</AlertDescription>
        </Alert>
      )}
    </div>
  );
}
