import Dexie, { type Table } from "dexie";
import type { Item, Kit, Section, SyncQueueItem } from "$lib/types/domain";

export class ReadyKitDatabase extends Dexie {
  kits!: Table<Kit, string>;
  sections!: Table<Section, string>;
  items!: Table<Item, string>;
  syncQueue!: Table<SyncQueueItem, string>;

  constructor() {
    super("readykit");

    this.version(1).stores({
      kits: "id, userId, status, updatedAt",
      sections: "id, kitId, sortOrder, updatedAt",
      items: "id, sectionId, completed, priority, dueDate, sortOrder, updatedAt",
      syncQueue: "id, entityType, entityId, createdAt"
    });
  }
}

export const db = new ReadyKitDatabase();

