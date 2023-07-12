import songs from '$lib/data/songs';
import songsJp from '$lib/data/songs-jp';
import type { PageServerLoad } from './$types';

export const load = (({ params, cookies }) => {
  const lang = cookies.get('lang');
  return (lang === 'jp') ?
    songsJp.filter(song => song.id === params.id)[0] :
    songs.filter(song => song.id === params.id)[0];
}) satisfies PageServerLoad;
