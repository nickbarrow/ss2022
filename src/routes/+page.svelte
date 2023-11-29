<script>
</script>

<svelte:head>
    <title>
        SS 2022
    </title>
</svelte:head>

<div class="PageContainer PageContentCentered">

    <div class="Page Hero">
        <div class="HeroContent">
            <img src="VintageSanta.jpg" alt="Vintage Santa Claus" class="HeroImage" />
            
            <h1 class="HeroTitle">Secret Santa 2023</h1>
            
            <div class="HeroButtons">
                <a class="Button ButtonLarge IconButton" href="/login">
                    <span>Log In</span>
                    <svg class="ButtonIcon HeroButtonIcon" version="1.1" viewBox="0 0 1200 1200" xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="m1171.7 529.2-395.04-395.04c-17.961-18.898-42.789-29.746-68.859-30.082-26.066-0.33594-51.168 9.8633-69.609 28.289-18.445 18.43-28.668 43.52-28.352 69.59 0.3125 26.066 11.137 50.906 30.02 68.883l233.52 233.16h-776.64c-34.555 0-66.484 18.434-83.762 48.359-17.277 29.926-17.277 66.797 0 96.719 17.277 29.926 49.207 48.363 83.762 48.363h774.48l-231.36 231.72c-23.41 24.629-32.176 59.738-23.094 92.48 9.082 32.742 34.68 58.32 67.434 67.375 32.75 9.0508 67.852 0.25391 92.461-23.176l395.04-395.04c18.207-18.098 28.406-42.73 28.32-68.402 0.0625-0.79688 0.0625-1.6016 0-2.3984 0.058594-0.80078 0.058594-1.6016 0-2.3984-0.007812-25.652-10.195-50.254-28.32-68.402z" />
                    </svg>
                </a>
            </div>
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
        display: flex;
        flex-direction: column;
        align-items: center;
        height: 100%;
        max-width: 700px;
        margin: 0 auto;
        padding-top: 24px;
    }
    
    .Page {
        border-radius: 25px;
        height: auto;
    }
    
    .Hero {
        align-items: flex-start;
        background: none;
        display: flex;
        flex-direction: column;
        flex-shrink: 0;
        gap: var(--HeroFlexGap);
        margin: 0 auto;
        max-width: unset;
        overflow: auto;
        padding: 24px 48px;
        width: 100%;
    }

    .HeroImage {
        border-radius: 50%;
        display: block;
        margin: 0 auto 24px;
        max-width: 400px;
        width: 100%;
    }

    .HeroContent {
        width: 100%;
    }

    .HeroTitle {
        color: white;
        font-family: var(--PrimaryFont);
        font-size: 46px;
        font-weight: 900;
        margin-bottom: 24px;
        text-align: center;
    }

    .HeroButtons {
        display: flex;
        flex-direction: row;
        justify-content: center;
        width: 100%;
    }

    .HeroButtonIcon {
        margin-left: 15px;
        opacity: 0.8;
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

        .HeroImage {
            width: 100%;
        }

    }

    @media (max-width: 640px) {

        .HeroTitle {
            font-size: 34px;
        }

    }
</style>