import songs from '$lib/data/songs';
import songsJp from '$lib/data/songs-jp';
import { type Actions, redirect, error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load = (({ url, cookies }) => {
  const lang = cookies.get('lang');
  const query = url.searchParams.get('search');
  let currentPage = parseInt(url.searchParams.get('page')!);

  if (isNaN(currentPage)) {
    currentPage = 1;
  }

  if (currentPage === 0) {
    throw error(404, { message: 'Page not found' });
  }

  const startIndex = (currentPage - 1) * 10;
  const endIndex = startIndex + 10;

  if (query) {
    const filteredSongs = (lang === 'jp') ?
      songsJp.filter(song => song.title.toLowerCase().startsWith(query)) :
      songs.filter(song => song.title.toLowerCase().startsWith(query));

    return {
      songs: filteredSongs.slice(startIndex, endIndex),
      previousPage: currentPage - 1,
      nextPage: currentPage + 1,
      totalPage: Math.ceil(filteredSongs.length / 10)
    };
  }

  return {
    songs: (lang === 'jp') ?
      songsJp.slice(startIndex, endIndex) :
      songs.slice(startIndex, endIndex),
    previousPage: currentPage - 1,
    nextPage: currentPage + 1,
    totalPage: Math.ceil(songs.length / 10)
  };
}) satisfies PageServerLoad;

export const actions: Actions = {
  changeLang: async ({ cookies, url }) => {
    let lang = cookies.get('lang');
    const redirectTo = url.searchParams.get('redirectTo') || '';

    const regex = /^\/.*/;

    if (!regex.test(redirectTo)) {
      throw redirect(303, '/');
    }

    if (!lang) {
      lang = 'jp';
      cookies.set('lang', lang, { path: '/' });
    } else {
      cookies.delete('lang');
    }

    throw redirect(303, redirectTo ?? '/');
  },
  search: async ({ request }) => {
    const formData = await request.formData();
    const query = String(formData.get('search'));
    if (query === '') {
      throw redirect(303, '/');
    }
    throw redirect(303, `/?search=${query}`);
  }
};
