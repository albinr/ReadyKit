import { db } from "$lib/db/client";
import type { SyncQueueItem } from "$lib/types/domain";
import { createId } from "$lib/utils/id";

type QueueMutationInput = Omit<SyncQueueItem, "id" | "createdAt" | "retryCount">;

export async function enqueueMutation(input: QueueMutationInput): Promise<SyncQueueItem> {
  const queueItem: SyncQueueItem = {
    ...input,
    id: createId("queue"),
    createdAt: new Date().toISOString(),
    retryCount: 0
  };

  await db.syncQueue.put(queueItem);
  return queueItem;
}

export async function listPendingMutations(): Promise<SyncQueueItem[]> {
  return db.syncQueue.orderBy("createdAt").toArray();
}

export async function markMutationFailed(id: string, lastError: string): Promise<void> {
  const item = await db.syncQueue.get(id);
  if (!item) {
    return;
  }

  await db.syncQueue.put({
    ...item,
    retryCount: item.retryCount + 1,
    lastError
  });
}

export async function removeMutation(id: string): Promise<void> {
  await db.syncQueue.delete(id);
}

