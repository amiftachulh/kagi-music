<script lang="ts">
  import type { PageData } from './$types';

  export let data: PageData;
</script>

<svelte:head>
  <meta name="description" content="Guitar tab for {data.title} by {data.artist}.">
  <title>{data.title} | {data.artist}</title>
</svelte:head>

<main>
  <div class="song-detail">
    <h2>{data.title}</h2>
    <img src={data.jacket} alt={data.title} />
    <div class="artist">{data.artist}</div>
    <div class="songwriter">
      {#if data.lang !== 'jp'}
        <div class="lyricist">Lyricist: {data.lyricist}</div>
        <div class="composer">Composer: {data.composer}</div>
        <div class="arranger">Arranger: {data.arranger}</div>
      {:else}
        <div class="lyricist">作詞: {data.lyricist}</div>
        <div class="composer">作曲: {data.composer}</div>
        <div class="arranger">編曲: {data.arranger}</div>
      {/if}
    </div>
    <a href={data.download_url} target="_blank" rel="noopener noreferrer">
      Download
    </a>
  </div>
</main>

<style>
  .song-detail {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    align-items: center;
  }

  img {
    width: 200px;
  }

  .artist {
    font-weight: bold;
  }

  .songwriter {
    text-align: center;
  }

  h2,
  .songwriter > div {
    line-height: 1.25rem;
  }

  a {
    background-color: #5b4beb;
    color: var(--light-2);
    padding: .75rem 2rem;
    border-radius: 3rem;
  }

  a:hover {
    background-color: #6e60e7;
  }
</style>
