<script lang="ts">
  import type { Kit, KitProgress } from "$lib/types/domain";
  import { daysUntil } from "$lib/utils/date";

  type Props = {
    kit: Kit;
    progress?: KitProgress;
  };

  let { kit, progress }: Props = $props();

  const daysRemaining = $derived(daysUntil(kit.targetDate));
</script>

<article class="card p-5">
  <div class="mb-4 flex items-start justify-between gap-4">
    <div>
      <p class="eyebrow">{kit.status}</p>
      <h3 class="text-xl font-semibold">{kit.title}</h3>
      {#if kit.description}
        <p class="mt-1 text-sm text-[var(--muted)]">{kit.description}</p>
      {/if}
    </div>
    <div class="rounded-full bg-[var(--surface-strong)] px-3 py-1 text-sm font-semibold">
      {progress?.completionPercentage ?? 0}%
    </div>
  </div>

  <div class="grid gap-3 text-sm text-[var(--muted)] sm:grid-cols-3">
    <div>
      <p class="eyebrow mb-1">Target</p>
      <p>{kit.targetDate ?? "Not set"}</p>
    </div>
    <div>
      <p class="eyebrow mb-1">Days Left</p>
      <p>{daysRemaining ?? "Unknown"}</p>
    </div>
    <div>
      <p class="eyebrow mb-1">Required Done</p>
      <p>{progress?.completedRequiredItems ?? 0}/{progress?.requiredItems ?? 0}</p>
    </div>
  </div>
</article>

