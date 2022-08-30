export function matchSlug(
  param: string,
  slug: string,
  options: { hide: boolean }
): boolean {
  // Don't match route when hide flag is set to true.
  if (options.hide) return false;

  return param === slug;
}
