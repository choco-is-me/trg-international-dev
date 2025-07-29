import { defineConfig } from "@faustwp/core";

export default defineConfig({
	wpUrl: "http://chocoisme.local",
	apiClientSecret: process.env.FAUST_SECRET_KEY,
});
