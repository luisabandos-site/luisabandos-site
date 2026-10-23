import { category } from "./category";
import { aboutPage, home, projectsPage, settings } from "./pages";
import { photo } from "./photo";
import { link, picture } from "./shared";
import { project } from "./project";

export const schemaTypes = [category, project, photo, home, projectsPage, aboutPage, settings, link, picture];

/** Documentos únicos: existem uma vez só e não podem ser criados nem apagados. */
export const singletons = new Set(["home", "projectsPage", "aboutPage", "settings"]);
