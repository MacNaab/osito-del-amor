import { Loader2 } from "lucide-react";

// Composant de chargement
export default function LoadingSpinner({ lang }: { lang: string }) {
  const textByLang = () => {
    if (lang == "es") return "Cargando...";
    if (lang == "fr") return "Chargement...";
    return "Loading...";
  };
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      <Loader2 className="w-12 h-12 animate-spin text-blue-500" />
      <p className="mt-4 text-lg text-gray-600">{textByLang()}</p>
    </div>
  );
}
