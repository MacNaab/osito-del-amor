"use client";
import data from "@/data/data.json";
import NewIndex from "@/components/recetas/newIndex";

const localData = data.map((value, number: number) => ({
  id: number,
  ...value
}));

export default function Page({ params: { lang } }: any) {
  // Utilisez 'lang' pour localiser le contenu de votre page
  return <NewIndex lang={lang} data={localData} />;
}