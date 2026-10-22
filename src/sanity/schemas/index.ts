import { category } from "./category";
import { aboutPage, home, projectsPage, settings } from "./pages";
import { photo } from "./photo";
import { link, picture } from "./shared";

export const schemaTypes = [category, photo, home, projectsPage, aboutPage, settings, link, picture];

/** Documentos únicos: existem uma vez só e não podem ser criados nem apagados. */
export const singletons = new Set(["home", "projectsPage", "aboutPage", "settings"]);
