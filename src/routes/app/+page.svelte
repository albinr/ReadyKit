<script lang="ts">
  import KitCard from "$lib/components/KitCard.svelte";
  import { calculateKitProgress } from "$lib/domain/progress";
  import type { PageData } from "./$types";

  let { data }: { data: PageData } = $props();
</script>

<section class="space-y-6">
  <div class="flex items-center justify-between">
    <div>
      <p class="eyebrow">Kits</p>
      <h1 class="text-3xl font-semibold">Starter dashboard</h1>
    </div>
    <a class="btn btn-primary" href="/app/templates">Create From Template</a>
  </div>

  <div class="grid gap-4">
    {#each data.kits as kit}
      <a href={`/app/kits/${kit.id}`}>
        <KitCard kit={kit} progress={calculateKitProgress(kit)} />
      </a>
    {/each}
  </div>
</section>

