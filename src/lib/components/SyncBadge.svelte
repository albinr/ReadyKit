<script lang="ts">
  import type { SyncStatus } from "$lib/types/domain";

  type Props = {
    status: SyncStatus;
    pendingCount?: number;
  };

  let { status, pendingCount = 0 }: Props = $props();

  const label = $derived.by(() => {
    switch (status) {
      case "offline":
        return "Offline";
      case "pending":
        return `${pendingCount} changes waiting to sync`;
      case "error":
        return "Sync failed";
      case "conflict":
        return "Conflict detected";
      default:
        return "All changes synced";
    }
  });
</script>

<span class="inline-flex rounded-full border border-[var(--border)] bg-[var(--surface)] px-3 py-1 text-sm text-[var(--muted)]">
  {label}
</span>

