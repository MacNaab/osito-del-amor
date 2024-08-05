import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import InstagramEmbedWrapper from "@/components/recetas/InstagramEmbedWrapper";
import type { JsonData } from "@/utils/AppConfig";

export default function RecipePage({
  data,
  langage,
  fr,
  isUser = false,
  initLiked = false,
  updateFav
}: {
  data: JsonData;
  langage: any;
  fr: boolean;
  isUser?: boolean;
  initLiked?: boolean;
  updateFav?: (bool: boolean) => void;
}) {
  const [liked, setLiked] = useState(initLiked);

  const handleLikeClick = () => {
    if(isUser && updateFav) {
      updateFav(!liked);
    }
    setLiked(!liked);
  };

  return (
    <div className="mx-auto p-4 flex flex-col gap-5">
      <h1 className="text-3xl font-bold mb-6 text-center">{data.Nom}</h1>

      <div className="mx-auto flex w-full max-w-3xl flex-col text-left">
        <div className="flex justify-center">
          <InstagramEmbedWrapper url={data.Lien} />
        </div>
        <div className="flex items-center justify-center space-x-1 pt-6 text-xl text-gray-500"></div>
        <div className="mx-auto my-5">
          <a
            href={data.Lien}
            target="_blank"
            className="rounded border border-blue-700 bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
          >
            {langage.link}
          </a>
        </div>
        {isUser && (
          <div className="flex items-center justify-center space-x-1 py-4 text-xl text-gray-500">
            <button
              type="button"
              onClick={handleLikeClick}
            >
              {liked ? <span>❤️</span> : <span>🤍</span>}
            </button>
          </div>
        )}
        <div className="mx-auto w-full">
          <h1 className="text-center text-2xl font-semibold uppercase leading-none tracking-tighter text-neutral-600">
            {data.Nom}
          </h1>
          <div className="text-justify">
            {fr ? data.Description : data.Descripcion}
          </div>
        </div>
      </div>
      <div className=" mx-auto flex max-w-6xl flex-col items-center sm:px-6 lg:px-8">
        <Tabs defaultValue="ingredients">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="ingredients">{langage.ingredients}</TabsTrigger>
            <TabsTrigger value="recipe">{langage.recipe}</TabsTrigger>
          </TabsList>

          <TabsContent value="ingredients" className="bg-gray-50 p-4">
            <div className="whitespace-pre-line text-justify">
              {fr ? data.Ingredients : data.Ingredientes}
            </div>
          </TabsContent>

          <TabsContent value="recipe" className="bg-gray-50 p-4">
            <div className="whitespace-pre-line text-justify">
              {fr ? data.Recette : data.Receta}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
