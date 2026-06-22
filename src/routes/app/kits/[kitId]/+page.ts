import { error } from "@sveltejs/kit";
import { starterTemplates } from "$lib/templates/templates";
import type { PageLoad } from "./$types";

export const load: PageLoad = async ({ params }) => {
  if (params.kitId !== "kit_demo_move") {
    throw error(404, "Kit not found");
  }

  const template = starterTemplates[0];

  return {
    kit: {
      id: "kit_demo_move",
      userId: "user_demo",
      title: "Moving to Gothenburg",
      description: "Starter dataset for dashboard development.",
      targetDate: "2026-08-10",
      status: "active",
      createdAt: "2026-06-12T10:00:00.000Z",
      updatedAt: "2026-06-12T10:00:00.000Z",
      syncVersion: 1,
      sections: template.sections.map((section) => ({
        id: section.id,
        kitId: "kit_demo_move",
        title: section.title,
        sortOrder: section.sortOrder,
        createdAt: "2026-06-12T10:00:00.000Z",
        updatedAt: "2026-06-12T10:00:00.000Z",
        syncVersion: 1,
        items: section.items.map((item) => ({
          id: item.id,
          sectionId: section.id,
          title: item.title,
          description: item.description,
          completed: item.sortOrder === 0,
          required: item.required,
          priority: item.priority,
          quantity: item.quantity,
          dueDate: item.sortOrder === 1 ? "2026-06-20" : undefined,
          sortOrder: item.sortOrder,
          createdAt: "2026-06-12T10:00:00.000Z",
          updatedAt: "2026-06-12T10:00:00.000Z",
          syncVersion: 1
        }))
      }))
    }
  };
};

