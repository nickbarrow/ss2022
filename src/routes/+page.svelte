<script>
</script>

<svelte:head>
    <title>
        SS 2022
    </title>
</svelte:head>

<div class="PageContainer">
    <div class="Page">
        <div class="PageContent Hero">
            <div class="HeroContent">
                <h1 class="HeroTitle">Secret Santa 2022🎅🏼</h1>
                <p class="HeroSubtitle">What's the best gift you can give for $20?</p>
                <div class="HeroButtons">
                    <a class="Button ButtonLarge" href="/login">Log In</a>
                </div>
            </div>
            <img class="HeroImage" src="secret-santa.svg" alt="Secret Santa" />
        </div>
    </div>
</div>

<style>
    :root {
        --HeroFlexGap: 20px;
        --HeroContentWidth: calc(60% - calc(var(--HeroFlexGap)/2));
        --HeroImageWidth: calc(40% - calc(var(--HeroFlexGap)/2));
    }

    .PageContainer {
        padding-top: 20px;
    }
    
    .Page {
        border-radius: 25px;
        height: auto;
    }
    
    .Hero {
        display: flex;
        flex-direction: row;
        align-items: center;
        gap: var(--HeroFlexGap);
        max-width: unset;
        margin: 0 auto;
        text-align: left;
        width: 100%;
        padding: 50px;
    }

    .HeroContent {
        width: 60%;
    }

    .HeroTitle {
        color: rgb(0, 0, 0);
        font-family: var(--PrimaryFont);
        font-size: 70px;
        font-weight: 900;
        margin-bottom: 5px;
    }

    .HeroSubtitle {
        color: rgba(0, 0, 0, 0.9);
        font-family: var(--SecondaryFont);
        font-size: 20px;
        font-weight: 400;
        margin-bottom: 20px;
    }

    .HeroButtons {
        display: flex;
        flex-direction: row;
        gap: 10px;
    }

    .HeroImage {
        width: 35%;
    }

    @media (max-width: 768px) {
        .Hero {
            flex-direction: column-reverse;
            padding: 24px;
        }

        .HeroContent {
            width: 100%;
        }

        .HeroTitle {
            font-size: 42px;
        }

        .HeroSubtitle {
            font-size: 14px;
        }

        .HeroImage {
            width: 100%;
        }
    }
</style>