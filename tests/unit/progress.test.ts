import { describe, expect, it } from "vitest";
import { calculateProgressFromItems } from "../../src/lib/domain/progress";
import type { Item } from "../../src/lib/types/domain";

const baseItem = {
  sectionId: "section_1",
  description: "",
  quantity: 1,
  sortOrder: 0,
  createdAt: "2026-06-12T10:00:00.000Z",
  updatedAt: "2026-06-12T10:00:00.000Z",
  syncVersion: 1
} satisfies Partial<Item>;

describe("calculateProgressFromItems", () => {
  it("returns zero progress when there are no items", () => {
    expect(calculateProgressFromItems([]).completionPercentage).toBe(0);
  });

  it("calculates completion and required completion independently", () => {
    const items: Item[] = [
      {
        ...baseItem,
        id: "1",
        title: "Passport",
        completed: true,
        required: true,
        priority: "high"
      } as Item,
      {
        ...baseItem,
        id: "2",
        title: "Chargers",
        completed: false,
        required: true,
        priority: "medium"
      } as Item,
      {
        ...baseItem,
        id: "3",
        title: "Snacks",
        completed: true,
        required: false,
        priority: "low"
      } as Item
    ];

    const progress = calculateProgressFromItems(items);

    expect(progress.completionPercentage).toBe(67);
    expect(progress.requiredCompletionPercentage).toBe(50);
    expect(progress.completedOptionalItems).toBe(1);
  });

  it("tracks overdue and high-priority remaining items", () => {
    const items: Item[] = [
      {
        ...baseItem,
        id: "1",
        title: "Review contract",
        completed: false,
        required: true,
        priority: "high",
        dueDate: "2026-06-10"
      } as Item,
      {
        ...baseItem,
        id: "2",
        title: "Pack clothes",
        completed: false,
        required: false,
        priority: "low",
        dueDate: "2026-06-20"
      } as Item
    ];

    const progress = calculateProgressFromItems(items, new Date("2026-06-12T10:00:00.000Z"));

    expect(progress.overdueItems).toBe(1);
    expect(progress.highPriorityRemaining).toBe(1);
  });
});

