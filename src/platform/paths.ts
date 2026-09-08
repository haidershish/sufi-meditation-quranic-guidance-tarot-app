export function appPath(
  path: string,
  _platform: string,
  _base = "/sufi-meditation-quranic-guidance-tarot-app",
): string {
  return path.startsWith("/") ? path : `/${path}`;
}
