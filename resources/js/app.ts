import "../css/app.css";
import { createInertiaApp, http, page } from "@inertiajs/svelte";
import Layout from "./layouts/Layout.svelte";

createInertiaApp({
	layout: () => Layout,
}).catch(console.error);

// Auto-append workspace_id query parameter to every Inertia request.
http.onRequest((config) => {
	const url = new URL(config.url, window.location.origin);

	if (!url.searchParams.has("workspace_id") && page.props.workspaceId) {
		url.searchParams.set("workspace_id", page.props.workspaceId);
		config.url = url.pathname + url.search;
	}

	return config;
});
