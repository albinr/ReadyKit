<script lang="ts">
  import { calculateKitProgress } from "$lib/domain/progress";
  import { daysUntil } from "$lib/utils/date";
  import type { PageData } from "./$types";

  let { data }: { data: PageData } = $props();

  const progress = $derived(calculateKitProgress(data.kit));
  const remainingDays = $derived(daysUntil(data.kit.targetDate));
</script>

<section class="space-y-6">
  <div class="card grid gap-6 p-6 lg:grid-cols-[1fr_auto]">
    <div>
      <p class="eyebrow">{data.kit.status}</p>
      <h1 class="text-3xl font-semibold">{data.kit.title}</h1>
      <p class="mt-2 max-w-2xl text-[var(--muted)]">{data.kit.description}</p>
    </div>

    <div class="grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
      <div class="rounded-2xl bg-[var(--surface-strong)] p-4">
        <p class="eyebrow mb-1">Overall Progress</p>
        <p class="text-3xl font-semibold">{progress.completionPercentage}%</p>
      </div>
      <div class="rounded-2xl bg-[var(--surface-strong)] p-4">
        <p class="eyebrow mb-1">Days Until Target</p>
        <p class="text-3xl font-semibold">{remainingDays ?? "Unknown"}</p>
      </div>
    </div>
  </div>

  <div class="grid gap-4 md:grid-cols-4">
    <div class="card p-4">
      <p class="eyebrow mb-1">Required Done</p>
      <p class="text-2xl font-semibold">{progress.completedRequiredItems}/{progress.requiredItems}</p>
    </div>
    <div class="card p-4">
      <p class="eyebrow mb-1">Optional Done</p>
      <p class="text-2xl font-semibold">{progress.completedOptionalItems}/{progress.optionalItems}</p>
    </div>
    <div class="card p-4">
      <p class="eyebrow mb-1">Overdue</p>
      <p class="text-2xl font-semibold">{progress.overdueItems}</p>
    </div>
    <div class="card p-4">
      <p class="eyebrow mb-1">High Priority Remaining</p>
      <p class="text-2xl font-semibold">{progress.highPriorityRemaining}</p>
    </div>
  </div>

  <div class="grid gap-4 lg:grid-cols-2">
    {#each data.kit.sections as section}
      <section class="card p-5">
        <div class="mb-4 flex items-center justify-between">
          <h2 class="text-xl font-semibold">{section.title}</h2>
          <span class="text-sm text-[var(--muted)]">{section.items.length} items</span>
        </div>

        <ul class="space-y-3">
          {#each section.items as item}
            <li class="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-3">
              <div class="flex items-start justify-between gap-4">
                <div>
                  <p class:item-complete={item.completed} class="font-medium">{item.title}</p>
                  <p class="mt-1 text-sm text-[var(--muted)]">
                    {item.required ? "Required" : "Optional"} • {item.priority}
                    {#if item.dueDate}
                      • due {item.dueDate}
                    {/if}
                  </p>
                </div>
                <span
                  class:status-done={item.completed}
                  class="rounded-full border border-[var(--border)] px-3 py-1 text-sm"
                >
                  {item.completed ? "Done" : "Open"}
                </span>
              </div>
            </li>
          {/each}
        </ul>
      </section>
    {/each}
  </div>
</section>

<style>
  .item-complete {
    text-decoration: line-through;
    opacity: 0.7;
  }

  .status-done {
    background: rgba(13, 122, 105, 0.1);
  }
</style>

