<svelte:head>
  <title>ReadyKit</title>
  <meta
    name="description"
    content="Offline-first preparation kits for life events with templates, progress tracking, and sync."
  />
</svelte:head>

<section class="shell py-10 sm:py-16">
  <div class="grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
    <div class="space-y-6">
      <p class="eyebrow">Offline-First Preparation Planner</p>
      <h1 class="max-w-3xl text-5xl font-semibold tracking-tight sm:text-6xl">
        Build structured readiness for one important date at a time.
      </h1>
      <p class="max-w-2xl text-lg text-[var(--muted)]">
        ReadyKit is designed for moves, trips, internships, university starts, and any event where
        missing one detail creates avoidable stress.
      </p>
      <div class="flex flex-wrap gap-3">
        <a class="btn btn-primary" href="/app">Open MVP Shell</a>
        <a class="btn btn-secondary" href="/app/templates">Browse Templates</a>
      </div>
    </div>

    <div class="card space-y-6 p-6">
      <div>
        <p class="eyebrow">Why This Base Exists</p>
        <h2 class="mt-2 text-2xl font-semibold">The repo starts with an executable architecture.</h2>
      </div>
      <ul class="space-y-3 text-[var(--muted)]">
        <li>Typed domain model based on the README spec</li>
        <li>Dexie local database and sync queue primitives</li>
        <li>Starter templates and progress calculations</li>
        <li>SvelteKit routes for app, templates, and import/export</li>
      </ul>
    </div>
  </div>
</section>

