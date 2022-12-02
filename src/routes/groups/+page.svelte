<script>
    import { enhance } from "$app/forms";
    import Header from "$lib/components/Header.svelte"
    import PageFooter from "$lib/components/PageFooter.svelte";
    
    const searchHandler = async () => {
        return async ({ result }) => {
            if (result.data.groups) {
                searchResults = true;
                groups = result.data.groups;
            }
        }
    }

    export let data;
    export let { groups, user } = data;
    export let yourGroups = data.groups.filter(group => group.Members.find(member => member.uid == user.uid));
    export let searchResults = false;
</script>

<svelte:head>
	<title>🎅🏼 SS22 - Groups</title>
</svelte:head>

<Header title={"Groups"} subtitle={"Join or create a group!"} />

<div class="Page PageWithHeader">
    {#if groups.length}
        <!-- Search -->
        <form class="PageSection GroupSearchForm" action="?/Search" use:enhance={searchHandler}>
            <div class="FormField">
                <input class="GroupSearchInput" name="GroupName" type="text" placeholder="Search for groups..." />
                <svg class="FormFieldIcon" version="1.1" viewBox="0 0 1200 1200" xmlns="http://www.w3.org/2000/svg">
                    <path d="m546 240c-64.613 0.03125-127.56 20.512-179.82 58.508-52.258 38-91.148 91.562-111.1 153.02-19.945 61.457-19.93 127.65 0.050781 189.1s58.898 114.99 111.18 152.96c52.277 37.969 115.23 58.418 179.85 58.414 64.613-0.003906 127.57-20.461 179.84-58.441l152.4 152.4v0.003907c12.133 12.133 29.816 16.871 46.391 12.43 16.574-4.4414 29.52-17.387 33.961-33.961 4.4414-16.574-0.29688-34.258-12.43-46.391l-152.4-152.4c44.508-61.18 64.754-136.69 56.824-211.93-7.9297-75.242-43.477-144.87-99.766-195.43-56.289-50.555-129.32-78.449-204.98-78.281zm0 516c-55.695 0-109.11-22.125-148.49-61.508-39.383-39.383-61.508-92.797-61.508-148.49s22.125-109.11 61.508-148.49c39.383-39.383 92.797-61.508 148.49-61.508s109.11 22.125 148.49 61.508c39.383 39.383 61.508 92.797 61.508 148.49-0.0625 55.676-22.207 109.05-61.578 148.42-39.367 39.371-92.746 61.516-148.42 61.578z"/>
                </svg>
            </div>
        </form>

        <!-- Search Results/All Groups -->
        <div class="PageSection SearchResults">
            <div class="PageSectionInner">
                <h3 class="PageSectionTitle">{searchResults ? 'Search Results:' : 'All Groups:'}</h3>
                <ul class="GroupList">
                    {#each groups as Group}
                        <a href="/groups/{Group.id}" class="GroupListItem">
                            <div class="GroupListItemLeft">
                                <h3 class="GroupListItemTitle">{Group.Name}</h3>
                                <div class="GroupListItemRow">
                                    {#if Group.MatchesGenerated}
                                        <span class="GroupStatus Private">Closed</span>
                                    {:else}
                                        <span class="GroupStatus {Group.SecretCode == "" ? 'Open' : 'Private'}">
                                            {Group.SecretCode == "" ? 'Open' : 'Private'}
                                        </span>
                                    {/if}
                                    <div class="GroupMemberIconContainer">
                                        {#each Group.Members as Member}
                                            <img class="GroupListItemMemberImage" src="{Member.photoURL}" alt="" referrerpolicy="no-referrer" />
                                        {/each}
                                    </div>
                                </div>
                            </div>
                            <div class="GroupListItemRight">
                                <svg class="GroupListItemArrow" version="1.1" viewBox="0 0 1200 1200" xmlns="http://www.w3.org/2000/svg">
                                    <path d="m734.88 600-370.91-369.01c-18.621-18.527-18.621-48.566 0.003906-67.094 18.621-18.527 48.816-18.527 67.438 0l404.63 402.56c18.621 18.527 18.621 48.566 0 67.094l-404.63 402.56c-18.621 18.527-48.816 18.527-67.438 0-18.625-18.527-18.625-48.566-0.003906-67.094z"/>
                                </svg>                                       
                            </div>
                        </a>
                    {/each}
                </ul>
            </div>
        </div>

        <!-- Your Groups -->
        {#if yourGroups.length}
            <div class="PageSection YourGroups">
                <div class="PageSectionInner">
                    <h4 class="SmallTitle">Your Groups:</h4>
                    <ul class="GroupList">
                        {#each yourGroups as Group}
                            <a href="/groups/{Group.id}" class="GroupListItem">
                                <div class="GroupListItemLeft">
                                    <h3 class="GroupListItemTitle">{Group.Name}</h3>
                                    <div class="GroupListItemRow">
                                        <span class="GroupStatus {Group.SecretCode == "" ? 'Open' : 'Private'}">{Group.SecretCode == "" ? 'Open' : 'Private'}</span>
                                        <div class="GroupMemberIconContainer">
                                            {#each Group.Members as Member}
                                                <img class="GroupListItemMemberImage" src="{Member.photoURL}" alt="" referrerpolicy="no-referrer" />
                                            {/each}
                                        </div>
                                    </div>
                                </div>
                                <div class="GroupListItemRight">
                                    <svg class="GroupListItemArrow" version="1.1" viewBox="0 0 1200 1200" xmlns="http://www.w3.org/2000/svg">
                                        <path d="m734.88 600-370.91-369.01c-18.621-18.527-18.621-48.566 0.003906-67.094 18.621-18.527 48.816-18.527 67.438 0l404.63 402.56c18.621 18.527 18.621 48.566 0 67.094l-404.63 402.56c-18.621 18.527-48.816 18.527-67.438 0-18.625-18.527-18.625-48.566-0.003906-67.094z"/>
                                    </svg>                                       
                                </div>
                            </a>
                        {/each}
                    </ul>
                </div>
            </div>
        {/if}
    {/if}

    <!-- End-of-list Menu -->
    <div class="PageSection">
        <div class="PageSectionInner">
            <h3 class="PageSectionTitle">Create a new Group:</h3>
            <a href="/groups/create" class="Button ButtonFullWidth IconButton CreateGroupButton">
                <svg class="ButtonIcon" version="1.1" viewBox="0 0 1200 1200" xmlns="http://www.w3.org/2000/svg">
                    <g>
                        <path d="m797.4 553.56h-150.96v-150.96c0-25.68-20.762-46.441-46.441-46.441s-46.441 20.762-46.441 46.441v150.96l-150.96-0.003906c-25.68 0-46.441 20.762-46.441 46.441s20.762 46.441 46.441 46.441h150.96v150.96c0 25.68 20.762 46.441 46.441 46.441 25.68 0 46.441-20.762 46.441-46.441l-0.003906-150.96h150.96c25.68 0 46.441-20.762 46.441-46.441-0.003906-25.68-20.883-46.441-46.445-46.441z"/>
                        <path d="m600 120c-264.72 0-480 215.28-480 480s215.28 480 480 480 480-215.28 480-480-215.28-480-480-480zm0 867.24c-213.48 0-387.24-173.64-387.24-387.24 0-213.48 173.64-387.24 387.24-387.24 213.6 0 387.24 173.76 387.24 387.24s-173.76 387.24-387.24 387.24z"/>
                    </g>
                </svg>                          
                <span>Create Group</span>
            </a>

            <a href="/logout" class="Button ButtonSecondary ButtonFullWidth IconButton">
                <svg class="ButtonIcon" width="1200pt" height="1200pt" version="1.1" viewBox="0 0 1200 1200" xmlns="http://www.w3.org/2000/svg">
                    <g>
                        <path d="m264.96 1002h309.6-0.003906c31.828 0 62.352-12.645 84.855-35.148 22.504-22.504 35.145-53.027 35.145-84.852v-108c0-17.148-9.1484-32.996-24-41.57-14.852-8.5742-33.148-8.5742-48 0-14.852 8.5742-24 24.422-24 41.57v108c0 6.3633-2.5273 12.469-7.0273 16.969-4.5 4.5039-10.605 7.0312-16.973 7.0312h-309.6c-6.3672 0-12.469-2.5273-16.973-7.0312-4.5-4.5-7.0273-10.605-7.0273-16.969v-564c0-6.3633 2.5273-12.469 7.0273-16.969 4.5039-4.5039 10.605-7.0312 16.973-7.0312h309.6-0.003906c6.3672 0 12.473 2.5273 16.973 7.0312 4.5 4.5 7.0273 10.605 7.0273 16.969v120c0 17.148 9.1484 32.996 24 41.57 14.852 8.5742 33.148 8.5742 48 0 14.852-8.5742 24-24.422 24-41.57v-120c0-31.824-12.641-62.348-35.145-84.852-22.504-22.504-53.027-35.148-84.855-35.148h-309.6c-31.828 0-62.348 12.645-84.855 35.148-22.504 22.504-35.145 53.027-35.145 84.852v564c0 31.824 12.641 62.348 35.145 84.852 22.508 22.504 53.027 35.148 84.855 35.148z" />
                        <path d="m844.68 378.6c-12.219-12.047-29.934-16.66-46.477-12.105-16.543 4.5586-29.398 17.598-33.723 34.203-4.3242 16.602 0.54297 34.254 12.758 46.301l112.56 111h-465.12c-17.148 0-32.996 9.1484-41.57 24s-8.5742 33.148 0 48 24.422 24 41.57 24h465.24l-112.56 111h-0.003906c-9.0703 8.9414-14.215 21.125-14.305 33.859-0.089844 12.738 4.8828 24.988 13.824 34.062 8.9453 9.0703 21.125 14.215 33.863 14.305 12.734 0.089844 24.988-4.8828 34.059-13.828l195.96-193.2c9.1602-9.0195 14.316-21.34 14.316-34.199s-5.1562-25.18-14.316-34.199z" />
                    </g>
                </svg>
                <span>Log Out</span>
            </a>
        </div>
    </div>

    <PageFooter />
</div>

<style>
    .GroupSearchForm {
        border-bottom: 1px solid #EAEDF1;
        padding-bottom: 12px;
    }

    .GroupSearchInput {
        border: none;
        border-top-left-radius: 10px;
        border-top-right-radius: 10px;
        color: rgba(74, 85, 104, 0.8);
        font-family: var(--SecondaryFont);
        font-size: 18px;
        font-weight: 300;
        height: 40px;
        padding: 8px 12px 8px 48px;
        width: 100%;
        transition: .25s;
    }
    .GroupSearchInput::placeholder {
        color: rgb(127, 140, 159);
    }

    .GroupSearchInput:focus {
        color: rgb(74, 85, 104);
        outline: none;
    }

    .FormFieldIcon path {
        fill: rgb(127, 140, 159);
        transition: .25s;
    }

    .GroupSearchInput:focus~.FormFieldIcon path {
        fill: rgb(74, 85, 104);
    }


    .GroupTitle {
        color: rgb(100, 116, 139);
        font-family: var(--SecondaryFont);
        font-size: 12px;
        font-weight: 600;
        margin-bottom: 8px;
    }

    .GroupList {
        border: 1px solid var(--BorderColorDarker);
        border-radius: 10px;
        padding: 0;
        margin: 0;
        list-style: none;
    }

    .GroupListItem {
        border-bottom: 1px solid var(--BorderColor);
        border-radius: 0;
        cursor: pointer;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
        padding: 12px;
    }
    .GroupListItem:first-child {
        border-top-left-radius: 10px;
        border-top-right-radius: 10px;
    }
    .GroupListItem:last-child {
        border: none;
        border-bottom-left-radius: 10px;
        border-bottom-right-radius: 10px;
    }
    .GroupListItem:hover {
        background-color: rgba(100, 116, 139, 0.1);
        color: #FFFFFF;
    }

    .GroupListItem:hover .GroupListItemIcon path {
        fill: #FFFFFF;
    }

    .GroupListItemTitle {
        display: block;
        color: rgb(51, 65, 85);
        font-family: var(--SecondaryFont);
        font-size: 20px;
        font-weight: 500;
        margin-bottom: 5px;
        text-transform: capitalize;
    }

    .GroupListItemRow {
        display: flex;
        flex-direction: row;
        align-items: center;
    }

    .GroupStatus {
        border-radius: 50px;
        color: #FFFFFF;
        display: inline-block;
        font-size: 10px;
        margin-right: 10px;
        padding: 4px 6px;
        text-transform: uppercase;
        letter-spacing: 0.5px;
    }
    .GroupStatus.Private {
        background-color: var(--PrimaryRed);
    }
    .GroupStatus.Open {
        background-color: rgb(77, 202, 77);
    }

    .GroupMemberIconContainer {
        border-left: 2px solid #EEE;
        display: inline-flex;
        flex-direction: row;
        padding-left: 10px;
    }
    
    .GroupListItemMemberImage {
        border: 3px solid #FFFFFF;
        border-radius: 50px;
        width: 25px;
        height: 25px;
        margin-left: -12px;
    }
    .GroupListItemMemberImage:first-child {
        margin-left: 0;
    }

    .GroupListItemRight {}

    .GroupListItemArrow {
        width: 25px;
        height: 25px;
    }
    .GroupListItemArrow path {
        fill: rgb(100, 116, 139);
    }

    .CreateGroupButton {
        margin-bottom: 12px;
    }
</style>