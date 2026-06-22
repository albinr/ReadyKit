export type KitStatus = "planning" | "active" | "completed" | "archived";
export type ItemPriority = "low" | "medium" | "high";
export type SyncStatus = "idle" | "offline" | "pending" | "error" | "conflict";

export type User = {
  id: string;
  email: string;
  passwordHash: string;
  createdAt: string;
  updatedAt: string;
};

export type Kit = {
  id: string;
  userId: string;
  title: string;
  description?: string;
  targetDate?: string;
  status: KitStatus;
  createdAt: string;
  updatedAt: string;
  deletedAt?: string;
  syncVersion: number;
};

export type Section = {
  id: string;
  kitId: string;
  title: string;
  sortOrder: number;
  createdAt: string;
  updatedAt: string;
  deletedAt?: string;
  syncVersion: number;
};

export type Item = {
  id: string;
  sectionId: string;
  title: string;
  description?: string;
  completed: boolean;
  required: boolean;
  priority: ItemPriority;
  dueDate?: string;
  quantity?: number;
  sortOrder: number;
  createdAt: string;
  updatedAt: string;
  deletedAt?: string;
  syncVersion: number;
};

export type Template = {
  id: string;
  title: string;
  description?: string;
  sections: TemplateSection[];
};

export type TemplateSection = {
  id: string;
  title: string;
  sortOrder: number;
  items: TemplateItem[];
};

export type TemplateItem = {
  id: string;
  title: string;
  description?: string;
  required: boolean;
  priority: ItemPriority;
  quantity?: number;
  sortOrder: number;
};

export type SyncQueueItem = {
  id: string;
  entityType: "kit" | "section" | "item";
  entityId: string;
  operation: "create" | "update" | "delete";
  payload: unknown;
  createdAt: string;
  retryCount: number;
  lastError?: string;
};

export type KitProgress = {
  totalItems: number;
  completedItems: number;
  requiredItems: number;
  completedRequiredItems: number;
  optionalItems: number;
  completedOptionalItems: number;
  overdueItems: number;
  highPriorityRemaining: number;
  completionPercentage: number;
  requiredCompletionPercentage: number;
};

export type HydratedSection = Section & {
  items: Item[];
};

export type HydratedKit = Kit & {
  sections: HydratedSection[];
};

