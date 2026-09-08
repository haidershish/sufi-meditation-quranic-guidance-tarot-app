export function appPath(
  path: string,
  _platform: string,
  _base = "/sufi-contemplative-tarot-app",
): string {
  return path.startsWith("/") ? path : `/${path}`;
}
