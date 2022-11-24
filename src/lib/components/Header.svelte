<script>
    import SecretSantaHeaderImage from '$lib/assets/images/SecretSantaHeaderImage.svg';
    export let title = 'Secret Santa';
    // export let subtitle = '2022';
    export let subtitle = null;
</script>
    
<header class="Header">
	<div class="HeaderInner">
        <div class="HeaderText">
            <h1 class="HeaderTitle">{title}</h1>
            {#if subtitle}
                <p class="HeaderSubtitle">{subtitle}</p>
            {/if}
        </div>
        <img class="HeaderImage" src={SecretSantaHeaderImage} alt="Secret Santa" />
	</div>
</header>