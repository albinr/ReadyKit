<script lang="ts">
  import type { PageData } from "./$types";

  let { data }: { data: PageData } = $props();
</script>

<section class="space-y-6">
  <div>
    <p class="eyebrow">Templates</p>
    <h1 class="text-3xl font-semibold">Seed templates for MVP development</h1>
  </div>

  <div class="grid gap-4 lg:grid-cols-2">
    {#each data.templates as template}
      <article class="card p-5">
        <div class="mb-4">
          <h2 class="text-2xl font-semibold">{template.title}</h2>
          <p class="mt-2 text-[var(--muted)]">{template.description}</p>
        </div>

        <div class="space-y-3">
          {#if template.sections.length === 0}
            <p class="text-sm text-[var(--muted)]">Empty starter kit.</p>
          {:else}
            {#each template.sections as section}
              <div class="rounded-2xl bg-[var(--surface)] p-4">
                <h3 class="font-medium">{section.title}</h3>
                <p class="mt-2 text-sm text-[var(--muted)]">{section.items.length} starter items</p>
              </div>
            {/each}
          {/if}
        </div>
      </article>
    {/each}
  </div>
</section>

