import type { LayoutServerLoad } from './$types';

export const load = (({ cookies }) => {
  const langCookies = cookies.get('lang');

  if (langCookies === 'jp') {
    return {
      lang: langCookies,
    };
  }
}) satisfies LayoutServerLoad;
