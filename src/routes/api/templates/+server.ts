import { json } from "@sveltejs/kit";
import { starterTemplates } from "$lib/templates/templates";

export function GET() {
  return json({
    templates: starterTemplates
  });
}

