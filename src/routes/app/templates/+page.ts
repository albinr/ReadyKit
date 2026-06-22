import type { PageLoad } from "./$types";
import { starterTemplates } from "$lib/templates/templates";

export const load: PageLoad = async () => {
  return {
    templates: starterTemplates
  };
};

