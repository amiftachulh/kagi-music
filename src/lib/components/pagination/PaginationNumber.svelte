<script lang="ts">
  export let number: number;
  export let href: string;
  export let isActive: boolean;
</script>

<a {href} class="pagination-number" class:active={isActive}>
  {number}
</a>

<style>
  .pagination-number {
    display: grid;
    place-items: center;
    width: 2.5rem;
    height: 2.5rem;
    background-color: var(--light-1);
    color: var(--dark-2);
    border-radius: 8px;
    box-shadow: var(--box-shadow);
  }

  .pagination-number.active {
    background-color: var(--dark-2);
    color: var(--light-2);
  }
</style>
