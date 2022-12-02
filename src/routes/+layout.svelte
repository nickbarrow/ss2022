<script>
    import { navigating } from '$app/stores';
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
