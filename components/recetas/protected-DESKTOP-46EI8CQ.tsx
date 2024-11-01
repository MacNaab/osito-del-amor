import data from "@/data/data.json";
import NewIndex from "./newIndex";

export default function Index({
  lang,
  userData,
}: {
  lang: string;
  userData: any;
}) {
  const localData = userData.fav.map((v: any) => ({
    id: v,
    ...data[v]
  }));
  return (
    <div>
      <NewIndex lang={lang} data={localData} />
    </div>
  );
}
