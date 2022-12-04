<script>
    import { navigating } from '$app/stores';
    import { auth } from "$lib/firebaseClient";
    import { onMount } from 'svelte';
    
    onMount(() => {
        console.log("Layout onMount user: ", auth.currentUser);
    })
</script>

{#if $navigating}
	<loading></loading>
{:else}
    <main>
        <slot></slot>
    </main>
{/if}

<style>
    main {
        height: 100%;
    }
</style>
