"use client";
import React, { useState, useEffect } from "react";
import { useToast } from "@/components/ui/use-toast"
import { supabase } from "@/lib/supabase";
import Carousel from "@/components/recetas/idPage";
import data from "@/data/data.json";
import localisation from "@/localisation/recetas.json";

export default function Page({ params: { lang, id } }: any) {
  // Utilisez 'lang' pour localiser le contenu de votre page
  const { toast } = useToast()
  const [user, setUser] = useState<any>(null);
  const [userData, setUserData] = useState<any>({});
  const [loaded, setLoaded] = useState(false);

  const langage = localisation[lang as keyof typeof localisation];

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
      }

      setLoaded(true);
    }

    getProfile();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const updateFav = async (bool: boolean) => {
    if (!user) {
      return;
    }

    try {
      const newFavoriteStatus = bool ? [...userData.fav, Number(id)] : userData.fav.filter((i: number) => i !== Number(id));
      const { error } = await supabase
        .from('profiles')
        .update({ fav: newFavoriteStatus })
        .eq('id', user.id);

        if (error) throw error;
      
      toast({
        variant: "default",
        description: `${data[id].Nom} ${bool ? langage.addFav : langage.delFav}`,
      });
      console.log(newFavoriteStatus);

    } catch (error: any) {
      // setMessage(`Erreur lors de la mise à jour : ${error.message}`);
      toast({
        variant: "destructive",
        title: langage.error,
        description: `${langage.errorMessage} : ${error.message}`,
      });
    }
  };
  return (
    <div>
      {user ? (
        loaded && (
          <Carousel
            data={data[id]}
            fr={lang == "fr"}
            langage={langage}
            isUser={true}
            initLiked={userData.fav.includes(Number(id))}
            updateFav={updateFav}
          />
        )
      ) : (
        <Carousel data={data[id]} fr={lang == "fr"} langage={langage} />
      )}
    </div>
  );
}
