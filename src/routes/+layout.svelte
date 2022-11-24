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
    
    footer p {
        color: #5b5b5b;
        font-family: Helvetica, sans-serif;
        font-size: 14px;
        font-weight: 300;
    }
</style>
