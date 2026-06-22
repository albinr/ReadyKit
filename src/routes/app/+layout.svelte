<script lang="ts">
  import SyncBadge from "$lib/components/SyncBadge.svelte";
</script>

<div class="shell py-6">
  <header class="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
    <div>
      <a class="text-2xl font-semibold" href="/app">ReadyKit</a>
      <p class="text-sm text-[var(--muted)]">Foundation shell for the MVP described in the README.</p>
    </div>

    <div class="flex flex-wrap items-center gap-3">
      <nav class="flex flex-wrap gap-2 text-sm">
        <a class="btn btn-secondary" href="/app">Kits</a>
        <a class="btn btn-secondary" href="/app/templates">Templates</a>
        <a class="btn btn-secondary" href="/app/import-export">Import / Export</a>
        <a class="btn btn-secondary" href="/app/settings">Settings</a>
      </nav>
      <SyncBadge status="idle" />
    </div>
  </header>

  <slot />
</div>
