/**
 * Converts a WordPress URL to a Next.js path
 */
export function convertWordPressUrlToNextPath(wpUrl: string): string {
	const wordPressDomain =
		process.env.NEXT_PUBLIC_WORDPRESS_URL || "http://chocoisme.local";

	try {
		const url = new URL(wpUrl);
		if (url.origin !== wordPressDomain) {
			return wpUrl;
		}

		let path = url.pathname;
		if (path.endsWith("/") && path !== "/") {
			path = path.slice(0, -1);
		}

		return path;
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
	} catch (e) {
		return wpUrl;
	}
}
