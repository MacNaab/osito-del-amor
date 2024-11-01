import { useMemo } from "react";
import { useRouter } from 'next/navigation'

import type { JsonData as TableData } from "@/utils/AppConfig";

import InstagramEmbedWrapper from "./InstagramEmbedWrapper";
import { nanoid } from "nanoid";

export default function Card({
  data,
  native,
  href = "/"
}: {
  data: TableData;
  native: boolean;
  href?: string;
}) {
  const router = useRouter();

  const MyImage = useMemo(() => {
    return <InstagramEmbedWrapper url={data.Lien} />;
  }, [data.Lien]);

  return (
    <div className="flex cursor-pointer flex-col overflow-hidden">
      <div onClick={() => router.push(href)} className="flex flex-1 flex-col justify-between">
        <div className="flex-1">
          <div className="flex max-h-96 max-w-sm justify-center">{MyImage}</div>
          <div className="flex items-center justify-center space-x-1 pt-6 text-sm text-gray-500">
            {data.Type.map((item) => (
              <span
                key={nanoid()}
                className="inline-flex items-center rounded-md bg-gray-200 px-2 py-1 text-xs font-medium text-gray-600 ring-1 ring-inset ring-gray-500/10"
              >
                {item}
              </span>
            ))}
          </div>
          <div className="flex items-center justify-center space-x-1 pt-6 text-sm text-gray-500">
            <span aria-hidden="true"> · </span>
            <span>
              {Array.from(Array(data.Difficile).keys()).map(() => (
                <span key={nanoid()}>😤</span>
              ))}
            </span>
          </div>
          <a className="mt-2 block space-y-6">
            <h3 className="text-center text-2xl font-semibold uppercase leading-none tracking-tighter text-neutral-600">
              {data.Nom}
            </h3>
            <p className="text-justify text-lg font-normal text-gray-500">
              {native ? data.Description : data.Descripcion}
            </p>
          </a>
        </div>
      </div>
      <hr className="my-2 h-1 rounded border-0 bg-gray-200 dark:bg-gray-700" />
    </div>
  );
}
