<script lang="ts">
  import '@fontsource/roboto';
  import './style.css';
  import { page } from '$app/stores';
  import { enhance } from '$app/forms';
  import type { LayoutData } from './$types';

  export let data: LayoutData;

  let showSettings = false;
  const year = new Date().getFullYear();

  function toggleSettings() {
    showSettings = !showSettings;
  }
</script>

<nav>
  <ul>
    <li><a href="/">Home</a></li>
    <li><a href="/faq">FAQ</a></li>
    <li>
      <a
        href="https://www.youtube.com/@kagi2845"
        target="_blank"
        rel="noopener noreferrer"
      >
        YouTube
      </a>
    </li>
    <li>
      <button class="settings-btn" on:click={toggleSettings}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          ><path
            fill="currentColor"
            d="M2.132 13.63a9.942 9.942 0 0 1 .001-3.26c1.101.026 2.092-.502 2.477-1.431c.385-.93.058-2.003-.74-2.763a9.942 9.942 0 0 1 2.306-2.307c.76.798 1.834 1.125 2.763.74c.93-.385 1.458-1.376 1.431-2.477a9.942 9.942 0 0 1 3.261 0c-.027 1.102.502 2.092 1.431 2.477c.93.385 2.003.058 2.763-.74a9.939 9.939 0 0 1 2.307 2.306c-.798.76-1.125 1.834-.74 2.764c.385.93 1.375 1.458 2.477 1.43a9.945 9.945 0 0 1 0 3.262c-1.102-.027-2.092.501-2.477 1.43c-.385.93-.058 2.004.74 2.764a9.939 9.939 0 0 1-2.306 2.306c-.76-.798-1.834-1.125-2.764-.74c-.93.385-1.458 1.376-1.43 2.478a9.94 9.94 0 0 1-3.262-.001c.027-1.101-.502-2.092-1.43-2.477c-.93-.385-2.004-.058-2.764.74a9.943 9.943 0 0 1-2.306-2.306c.798-.76 1.125-1.834.74-2.763c-.385-.93-1.376-1.458-2.478-1.431ZM12.001 15a3 3 0 1 0 0-6a3 3 0 0 0 0 6Z"
          /></svg
        >
      </button>
      {#if showSettings}
        <ul class="settings-menu">
          Show song in Japanese
          <form
            action="/?/changeLang&redirectTo={$page.url.pathname +
              $page.url.search}"
            method="post"
            use:enhance
          >
            <button class="lang-toggle-btn">
              {data.lang === 'jp' ? 'ON' : 'OFF'}
            </button>
          </form>
        </ul>
      {/if}
    </li>
  </ul>
</nav>
<div class="container">
  <slot />
</div>
<footer>
  <section class="info">
    <div>
      The image assets that displayed on this platform are the property of their
      respective owners.
    </div>
    <div>I do not own any of it.</div>
  </section>
  <br />
  <section class="copyright">
    Copyright &#169; {year} KAGI 鍵. Built with SvelteKit.
  </section>
</footer>

<style>
  nav {
    background-color: var(--dark-2);
    color: var(--light-2);
    padding: 1rem;
  }

  nav ul {
    display: flex;
    list-style: none;
    justify-content: start;
    align-items: center;
    gap: 2rem;
    font-weight: bold;
    text-transform: uppercase;
  }

  @media (hover: hover) {
    nav ul li:first-child:hover a {
      color: #7851be;
    }

    nav ul li:nth-child(2):hover a {
      color: #44f044;
    }

    nav ul li:nth-child(3):hover a {
      color: #ff0404;
    }
  }

  nav ul li:last-child {
    margin-left: auto;
  }

  nav ul a {
    color: var(--light-2);
  }

  .settings-btn {
    all: unset;
    cursor: pointer;
  }

  .settings-menu {
    position: absolute;
    top: 3.75rem;
    right: 0;
    background-color: var(--dark-3);
    font-size: 14px;
    text-transform: none;
    padding: 1rem;
    z-index: 1;
  }

  .lang-toggle-btn {
    padding: 0 0.5rem;
    cursor: pointer;
  }

  .container {
    display: grid;
    place-items: center;
  }

  footer {
    background-color: var(--dark-2);
    color: var(--light-2);
    padding: 1rem;
    font-size: 0.875rem;
    text-align: center;
    border-top: 1px solid var(--border-clr);
  }
</style>
