import slugify from '@sindresorhus/slugify';

export default function createSlug(text: string) {
  return slugify(text, {
    customReplacements: [
      ['@', 'at'],
      ['#', 'hash'],
      ['’', ''],
    ],
    decamelize: false,
  });
}
