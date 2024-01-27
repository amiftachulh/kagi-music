<script lang="ts">
  import { page } from '$app/stores';
</script>

<main>
  <h1>{$page.status}: {$page.error?.message}</h1>
</main>

<style>
  main {
    min-height: calc(100dvh - 10rem);
  }
</style>
