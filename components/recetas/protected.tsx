import { useSheetData } from "@/hooks/useSheetData";
import NewIndex from "./newIndex";

export default function Index({
  lang,
  userData,
}: {
  lang: string;
  userData: any;
}) {
  const { data } = useSheetData();
  return (
    <div>
      <NewIndex lang={lang} data={data} />
    </div>
  );
}
