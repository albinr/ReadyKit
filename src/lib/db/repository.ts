import { db } from "$lib/db/client";
import type { HydratedKit, Kit } from "$lib/types/domain";

export async function listKits(): Promise<Kit[]> {
  return db.kits.orderBy("updatedAt").reverse().toArray();
}

export async function getHydratedKit(kitId: string): Promise<HydratedKit | null> {
  const kit = await db.kits.get(kitId);
  if (!kit) {
    return null;
  }

  const sections = await db.sections.where("kitId").equals(kitId).sortBy("sortOrder");
  const hydratedSections = await Promise.all(
    sections.map(async (section) => ({
      ...section,
      items: await db.items.where("sectionId").equals(section.id).sortBy("sortOrder")
    }))
  );

  return {
    ...kit,
    sections: hydratedSections
  };
}

