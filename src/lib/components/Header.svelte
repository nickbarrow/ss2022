<script>
    import SecretSantaHeaderImage from '$lib/assets/images/SecretSantaHeaderImage.svg';
    export let title = 'Secret Santa';
    // export let subtitle = '2022';
    export let subtitle = null;

    export let backLink = null;
    export let backText = null;
</script>
    
<header class="Header">
	<div class="HeaderInner">
        <div class="HeaderText">
            <h1 class="HeaderTitle">{title}</h1>
            {#if backLink}
                <a class="HeaderSubtitleLink" href="{backLink}">{backText || backLink}</a>
            {:else}
                <p class="HeaderSubtitle">{subtitle}</p>
            {/if}
        </div>
        <img class="HeaderImage" src={SecretSantaHeaderImage} alt="Secret Santa" />
	</div>
</header>

<style>
    .Header {
        /* background-color: #FFFFFF;
        border-bottom: 1px solid var(--BorderColor);
        color: #000000; */
        color: #FFFFFF;
        display: flex;
        filter: drop-shadow(0 0 5px rgba(0, 0, 0, 0.75));
        flex-direction: row;
        align-items: center;
        justify-content: flex-start;
        min-height: var(--HeaderHeight);
    }
    
    .HeaderInner {
        display: flex;
        flex-direction: row;
        align-items: center;
        max-width: var(--MaxWidth);
        margin: 0 auto;
        padding: 0 12px;
        width: 100%;
    }
    
    .HeaderText {
        margin-right: 20px;
        width: 80%;
    }
    
    .HeaderTitle {
        font-family: var(--PrimaryFont);
        font-size: 60px;
        line-height: 1;
        font-weight: 700;
        margin-bottom: 8px;
    }
    
    .HeaderSubtitle {
        color: rgba(238, 238, 238, 0.7);
        font-family: var(--SecondaryFont);
        font-size: 18px;
        line-height: 1;
        font-weight: 400;
    }
    
    .HeaderImage {
        width: min(20%, 150px);
    }

    .HeaderSubtitleLink {
        border-bottom: 1px solid transparent;
        color: rgba(255, 255, 255, 0.5);
        display: block;
        font-family: var(--SecondaryFont);
        margin-top: 12px;
        text-decoration: none;
        transition: .25s;
        width: fit-content;
    }
    .HeaderSubtitleLink:hover {
        color: #FFFFFF;
        border-color: var(--PrimaryGreen);
    }

</style>