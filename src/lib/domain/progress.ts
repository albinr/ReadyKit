import type { HydratedKit, Item, KitProgress } from "$lib/types/domain";
import { isOverdue } from "$lib/utils/date";

export function calculateKitProgress(kit: Pick<HydratedKit, "sections">, now = new Date()): KitProgress {
  const items = kit.sections.flatMap((section) => section.items);
  return calculateProgressFromItems(items, now);
}

export function calculateProgressFromItems(items: Item[], now = new Date()): KitProgress {
  const totalItems = items.length;
  const completedItems = items.filter((item) => item.completed).length;
  const requiredItems = items.filter((item) => item.required).length;
  const completedRequiredItems = items.filter((item) => item.required && item.completed).length;
  const optionalItems = totalItems - requiredItems;
  const completedOptionalItems = completedItems - completedRequiredItems;
  const overdueItems = items.filter((item) => !item.completed && isOverdue(item.dueDate, now)).length;
  const highPriorityRemaining = items.filter(
    (item) => !item.completed && item.priority === "high"
  ).length;

  return {
    totalItems,
    completedItems,
    requiredItems,
    completedRequiredItems,
    optionalItems,
    completedOptionalItems,
    overdueItems,
    highPriorityRemaining,
    completionPercentage: totalItems === 0 ? 0 : Math.round((completedItems / totalItems) * 100),
    requiredCompletionPercentage:
      requiredItems === 0 ? 0 : Math.round((completedRequiredItems / requiredItems) * 100)
  };
}

