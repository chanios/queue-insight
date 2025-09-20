<script lang="ts">
	import '../app.css';
	import favicon from '$lib/assets/favicon.svg';
    import Navbar from '$lib/self/Navbar.svelte';

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<Navbar></Navbar>
<div class="container m-auto">
    {@render children?.()}
</div>
