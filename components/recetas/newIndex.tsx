// You now have access to the current locale
"use client";
import { useEffect, useState } from "react";
import { nanoid } from "nanoid";
import Pagination from "./Pagination";
import Card from "./Card";
import Checkbox from "./Checkbox";

import myClass from "@/data/class.json";
import localisation from "@/localisation/recetas.json";

// e.g. /en-US/products -> `lang` is "en-US"
const base = Object.fromEntries(myClass.map((key) => [key, false]));

export default function Index({ lang, data }: { lang: string, data: any }) {
  // dtb des recettes !
  const [checked, setChecked]: any = useState(base);
  const [search, setSearch]: any = useState("");
  const [filteredData, setFilteredData] = useState<any>([]);
  const [currentPage, setCurrentPage] = useState(1);

  const language = localisation[lang as keyof typeof localisation];

  function Filtered() {
    return filteredData
      .slice((currentPage - 1) * 9, currentPage * 9)
      .map((item: any, n: number) => (
        <Card
          key={nanoid()}
          data={item}
          native={lang == "fr"}
          href={`/${lang}/recipe/${item.id}`}
        />
      ));
  }

  useEffect(() => {
    // Effectuer des actions chaque fois que myValue change
    let filteredDatabase = data;

    if (search) {
      const resultat = filteredDatabase.filter((e: any) =>
        e.Nom.toLowerCase().includes(search.toLowerCase())
      );
      filteredDatabase = resultat;
    }

    let checkedValues: any = [];
    Object.keys(checked).forEach((key: any) => {
      if (checked[key]) {
        checkedValues.push(key);
      }
    });
    if (checkedValues.length > 0) {
      const resultat = filteredDatabase.filter((item: any) =>
        // item.Type.every((name: any) => checked.includes(name)),
        checkedValues.every((val: any) => item.Type.includes(val))
      );
      filteredDatabase = resultat;
    }
    setFilteredData(filteredDatabase);
    setCurrentPage(1);
  }, [checked, data, search]);
  return (
    <div>
      <div className="mt-4 text-sm text-center">{`Total: ${filteredData.length} ${language.recipe}${filteredData.length > 1 ? "s" : ""}`}</div>
      <div className="my-6">
        <input
          className="mx-auto block w-1/3 appearance-none rounded border border-gray-200 bg-gray-200 px-4 py-3 leading-tight text-gray-700 focus:border-gray-500 focus:bg-white focus:outline-none"
          type="text"
          placeholder={language.search}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="my-2">
        <Checkbox setChecked={setChecked} checked={checked} />
      </div>

      <section>
        <Pagination
          setCurrentPage={setCurrentPage}
          currentPage={currentPage}
          totalPages={Math.ceil(filteredData.length / 9)}
          language={language}
        />
        <div className="relative mx-auto max-w-7xl">
          <div className="mx-auto mt-6 grid max-w-lg gap-3 lg:max-w-none lg:grid-cols-3">
            <Filtered />
          </div>
        </div>
        <Pagination
          setCurrentPage={setCurrentPage}
          currentPage={currentPage}
          totalPages={Math.ceil(filteredData.length / 9)}
          language={language}
        />
      </section>
    </div>
  );
}
