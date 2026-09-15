/**
 * The one canonical origin for the site. bakamousa.com is being discontinued,
 * so every absolute URL (canonical, Open Graph, JSON-LD, sitemap, robots)
 * points here regardless of which hostname served the request.
 *
 * Deliberately not read from the Host header: doing so let duplicate hosts
 * advertise their own URLs and forced every route to render dynamically.
 */
export const SITE_URL = "https://www.bakamosocial.com";

export async function getSiteUrl(): Promise<string> {
  return SITE_URL;
}

export function getSiteUrlSync(): string {
  return SITE_URL;
}
