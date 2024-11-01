"use client";
import NewIndex from "@/components/recetas/newIndex";
import { useSheetData } from "@/hooks/useSheetData";
import LoadingSpinner from "@/components/loading";

export default function Page({ params: { lang } }: any) {
  const { data } = useSheetData();
  // Utilisez 'lang' pour localiser le contenu de votre page
  return (
    <div>
      {data.length > 0 ? (
        <NewIndex lang={lang} data={data} />
      ) : (
        <LoadingSpinner lang={lang} />
      )}
    </div>
  );
}
