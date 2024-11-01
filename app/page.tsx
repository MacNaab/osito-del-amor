"use client";
import { useSheetData } from "@/hooks/useSheetData";
import NewIndex from "@/components/recetas/newIndex";
import LoadingSpinner from "@/components/loading";

export default function Page() {
  const { data } = useSheetData();
  return (
    <div>
      {data.length > 0 ? (
        <NewIndex lang="en" data={data} />
      ) : (
        <LoadingSpinner lang="en" />
      )}
    </div>
  );
}
