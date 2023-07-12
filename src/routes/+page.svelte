<script lang="ts">
  import type { PageData } from './$types';
  import { enhance } from '$app/forms';
  import { page } from '$app/stores';
  import { goto } from '$app/navigation';

  export let data: PageData;
  $: currentPage = Number($page.url.searchParams.get('page')) || 1;
</script>

<svelte:head>
  <meta name="description" content="KAGI 鍵 is a platform dedicated to sharing guitar tabs for my favorite songs, with a particular focus on music from the BanG Dream. While BanG Dream songs make up a significant portion of the content, I also upload tabs for other songs that I personally enjoy.">
  <title>Homepage | KAGI 鍵</title>
</svelte:head>

<main>
  <h2>Songs List</h2>
  <form class="search-container" method="post" action="?/search" autocomplete="off" use:enhance>
    <input type="text" placeholder="Search..." class="search-input" name="search" />
    <button class="search-btn">
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="m19.6 21l-6.3-6.3q-.75.6-1.725.95T9.5 16q-2.725 0-4.612-1.888T3 9.5q0-2.725 1.888-4.612T9.5 3q2.725 0 4.612 1.888T16 9.5q0 1.1-.35 2.075T14.7 13.3l6.3 6.3l-1.4 1.4ZM9.5 14q1.875 0 3.188-1.313T14 9.5q0-1.875-1.313-3.188T9.5 5Q7.625 5 6.312 6.313T5 9.5q0 1.875 1.313 3.188T9.5 14Z"/></svg>
    </button>
  </form>
  {#if data.songs.length > 0}
    <div class="card-container">
      {#each data.songs as song (song.id)}
        <a href="/songs/{song.id}" class="card">
          <img src={song.jacket} alt={song.title} />
          <div class="title" title={song.title}>{song.title}</div>
          <div class="view {song.artist_id}">View</div>
        </a>
      {/each}
    </div>
  {:else}
    <div class="not-found">
      <p>Song not found</p>
    </div>
  {/if}
  {#if data.totalPage > 1}
    <div class="pagination">
      <button
        class={currentPage === 1 ? 'hidden' : 'prev-btn'}
        disabled={currentPage === 1}
        on:click={() => goto(`/?page=${currentPage - 1}`)}
      >
        ⇐ Previous Page
      </button>
      <button
        class={currentPage === data.totalPage ? 'hidden' : 'next-btn'}
        disabled={currentPage === data.totalPage}
        on:click={() => goto(`/?page=${currentPage + 1}`)}
      >
        Next Page ⇒
      </button>
    </div>
  {/if}
</main>

<style>
  h2 {
    margin-bottom: 1rem;
    text-align: center;
  }

  .search-container {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 1rem;
  }

  .search-input {
    width: 100%;
    font-size: 1rem;
    height: 2.5rem;
    padding-inline: .5rem;
  }

  .search-btn {
    position: absolute;
    background: none;
    right: .5rem;
    border: none;
  }

  @media (width > 425px) {
    .search-input {
      width: 20rem;
    }

    .search-btn {
      right: auto;
      transform: translateX(8.75rem);
    }
  }

  img {
    width: 150px;
    aspect-ratio: 1 / 1;
    margin: auto;
  }

  .card-container {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
    gap: 1rem;
  }

  .card {
    overflow: hidden;
    position: relative;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    padding: 1rem;
    background-color: var(--light-1);
    border: 1px solid #ddd;
    box-shadow: var(--box-shadow);
  }

  .card:hover .view {
    opacity: 1;
  }

  .title {
    line-height: 1rem;
  }

  .view {
    display: grid;
    place-items: center;
    color: var(--light-3);
    font-weight: bold;
    text-transform: uppercase;
    position: absolute;
    inset: 0;
    opacity: 0;
    transition: opacity 0.3s ease;
    pointer-events: none;
  }

  .view.poppin-party {
    background-color: rgb(var(--poppin-party), var(--view-opacity));
  }

  .view.roselia {
    background-color: rgb(var(--roselia), var(--view-opacity));
  }

  .view.morfonica {
    background-color: rgb(var(--morfonica), var(--view-opacity));
  }

  .view.guilty-kiss {
    background-color: rgb(var(--guilty-kiss), var(--view-opacity));
  }

  .view.azuna {
    background-color: rgb(var(--azuna), var(--view-opacity));
  }

  .title {
    font-size: 0.875rem;
    font-weight: bold;
    color: var(--dark-3);
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    text-align: center;
  }

  .pagination {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-top: 1rem;
  }

  .pagination button {
    cursor: pointer;
    background-color: transparent;
    color: var(--link-color);
    font-size: 0.875rem;
    border: none;
  }

  .pagination button:disabled {
    color: grey;
  }

  .pagination button:not(:disabled):hover {
    text-decoration: underline;
  }

  .hidden {
    opacity: 0;
    cursor: default !important;
  }

  .not-found {
    text-align: center;
  }
</style>
