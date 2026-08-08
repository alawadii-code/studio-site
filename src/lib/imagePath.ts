/**
 * Normalizes image paths for Next.js `<Image />`.
 *
 * Files live on disk under `public/`, but paths in content.ts must be
 * web paths starting with `/` — e.g. `/images/team/photo.jpg`, not
 * `public/images/team/photo.jpg` or `images/team/photo.jpg`.
 */
export function publicImagePath(path: string): string {
  if (!path || path.startsWith("http://") || path.startsWith("https://")) {
    return path;
  }

  const withoutPublicPrefix = path.replace(/^public[/\\]/, "");
  return withoutPublicPrefix.startsWith("/")
    ? withoutPublicPrefix
    : `/${withoutPublicPrefix}`;
}
