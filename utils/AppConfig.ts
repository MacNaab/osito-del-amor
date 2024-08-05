// FIXME: Update this configuration file based on your project information

export const AppConfig = {
  site_name: 'Recetas',
  title: 'Recetas de pareja',
  description: 'Liste des recettes sauvegardées dans "Recettes 😋✨"​​',
  locale: 'fr',
};

export interface JsonData {
  Nom: string;
  Lien: string;
  Type: Array<string>;
  Description: string;
  Ingredients: string;
  Recette: string;
  Difficile: number;
  Descripcion: string;
  Ingredientes: string;
  Receta: string;
}

export function isEmail(email: string): boolean {
  const emailRegex = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
  return emailRegex.test(email);
}