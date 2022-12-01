<script>
    import { enhance } from "$app/forms";
    import Header from "$lib/components/Header.svelte"
    import PageFooter from "$lib/components/PageFooter.svelte";

    export let data;
    export let { groups, user } = data;
    export let form;
    export let hideGroups = false;
    export let hideCreateForm = true;
    export let yourGroups = data.groups.filter(group => group.Members.find(member => member.uid == user.uid));
    export let searchResults = false;
    
    const groupSearchHandler = async () => {
        return async ({ result }) => {
            if (result.data.groups) {
                searchResults = true;
                groups = result.data.groups;
            }
        }
    }

    const createGroup = () => {
        hideGroups = true;
        hideCreateForm = false;
    }
</script>

<svelte:head>
	<title>🎅🏼 SS22</title>
</svelte:head>

<Header title={"Dashboard"} subtitle={"Join or create a group!"} />

<div class="Page PageWithHeader">
    <!-- <div class="Card AllGroups {hideGroups ? 'Hidden' : ''}">
        <div class="CardSection">
            <div class="CardSectionInner">
                <h4 class="SmallTitle">All Groups:</h4>
                <ul class="GroupList">
                    {#each data.groups as Group}
                        <a href="/groups/{Group.id}" class="GroupListItem">
                            <svg class="GroupListItemIcon" version="1.1" viewBox="0 0 1200 1200" xmlns="http://www.w3.org/2000/svg">
                                <path d="m1171.7 529.2-395.04-395.04c-17.961-18.898-42.789-29.746-68.859-30.082-26.066-0.33594-51.168 9.8633-69.609 28.289-18.445 18.43-28.668 43.52-28.352 69.59 0.3125 26.066 11.137 50.906 30.02 68.883l233.52 233.16h-776.64c-34.555 0-66.484 18.434-83.762 48.359-17.277 29.926-17.277 66.797 0 96.719 17.277 29.926 49.207 48.363 83.762 48.363h774.48l-231.36 231.72c-23.41 24.629-32.176 59.738-23.094 92.48 9.082 32.742 34.68 58.32 67.434 67.375 32.75 9.0508 67.852 0.25391 92.461-23.176l395.04-395.04c18.207-18.098 28.406-42.73 28.32-68.402 0.0625-0.79688 0.0625-1.6016 0-2.3984 0.058594-0.80078 0.058594-1.6016 0-2.3984-0.007812-25.652-10.195-50.254-28.32-68.402z"/>
                            </svg>                               
                            <span class="GroupListItemText">{Group.Name}</span>
                        </a>
                    {/each}
                </ul>
            </div>
        </div>
    </div> -->
    
    <div class="Groups {hideGroups ? 'Hidden' : ''}">
        {#if groups.length}
            <!-- Search -->
            <form class="CardSection GroupSearchForm" action="?/groupSearch" use:enhance={groupSearchHandler}>
                <div class="FormField">
                    <input class="GroupSearchInput" name="GroupName" type="text" placeholder="Search for groups..." />
                    <svg class="FormFieldIcon" version="1.1" viewBox="0 0 1200 1200" xmlns="http://www.w3.org/2000/svg">
                        <path d="m546 240c-64.613 0.03125-127.56 20.512-179.82 58.508-52.258 38-91.148 91.562-111.1 153.02-19.945 61.457-19.93 127.65 0.050781 189.1s58.898 114.99 111.18 152.96c52.277 37.969 115.23 58.418 179.85 58.414 64.613-0.003906 127.57-20.461 179.84-58.441l152.4 152.4v0.003907c12.133 12.133 29.816 16.871 46.391 12.43 16.574-4.4414 29.52-17.387 33.961-33.961 4.4414-16.574-0.29688-34.258-12.43-46.391l-152.4-152.4c44.508-61.18 64.754-136.69 56.824-211.93-7.9297-75.242-43.477-144.87-99.766-195.43-56.289-50.555-129.32-78.449-204.98-78.281zm0 516c-55.695 0-109.11-22.125-148.49-61.508-39.383-39.383-61.508-92.797-61.508-148.49s22.125-109.11 61.508-148.49c39.383-39.383 92.797-61.508 148.49-61.508s109.11 22.125 148.49 61.508c39.383 39.383 61.508 92.797 61.508 148.49-0.0625 55.676-22.207 109.05-61.578 148.42-39.367 39.371-92.746 61.516-148.42 61.578z"/>
                    </svg>
                </div>
            </form>

            <!-- Search Results/All Groups -->
            <div class="CardSection SearchResults">
                <div class="CardSectionInner">
                    <h4 class="CardSectionTitle">{searchResults ? 'Search Results:' : 'All Groups:'}</h4>
                    <ul class="GroupList">
                        {#each groups as Group}
                            <a href="/groups/{Group.id}" class="GroupListItem">
                                <!-- <svg class="GroupListItemIcon" version="1.1" viewBox="0 0 1200 1200" xmlns="http://www.w3.org/2000/svg">
                                    <path d="m1171.7 529.2-395.04-395.04c-17.961-18.898-42.789-29.746-68.859-30.082-26.066-0.33594-51.168 9.8633-69.609 28.289-18.445 18.43-28.668 43.52-28.352 69.59 0.3125 26.066 11.137 50.906 30.02 68.883l233.52 233.16h-776.64c-34.555 0-66.484 18.434-83.762 48.359-17.277 29.926-17.277 66.797 0 96.719 17.277 29.926 49.207 48.363 83.762 48.363h774.48l-231.36 231.72c-23.41 24.629-32.176 59.738-23.094 92.48 9.082 32.742 34.68 58.32 67.434 67.375 32.75 9.0508 67.852 0.25391 92.461-23.176l395.04-395.04c18.207-18.098 28.406-42.73 28.32-68.402 0.0625-0.79688 0.0625-1.6016 0-2.3984 0.058594-0.80078 0.058594-1.6016 0-2.3984-0.007812-25.652-10.195-50.254-28.32-68.402z"/>
                                </svg>                                -->
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

            <!-- Your Groups -->
            {#if yourGroups.length}
                <div class="CardSection YourGroups">
                    <div class="CardSectionInner">
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

        <div class="CardSection">
            <div class="CardSectionInner">
                <h4 class="CardSectionTitle">Create a new Group:</h4>
                <button class="Button CreateGroupButton" on:click={createGroup}>
                    <svg version="1.1" viewBox="0 0 1200 1200" xmlns="http://www.w3.org/2000/svg">
                        <g>
                            <path d="m797.4 553.56h-150.96v-150.96c0-25.68-20.762-46.441-46.441-46.441s-46.441 20.762-46.441 46.441v150.96l-150.96-0.003906c-25.68 0-46.441 20.762-46.441 46.441s20.762 46.441 46.441 46.441h150.96v150.96c0 25.68 20.762 46.441 46.441 46.441 25.68 0 46.441-20.762 46.441-46.441l-0.003906-150.96h150.96c25.68 0 46.441-20.762 46.441-46.441-0.003906-25.68-20.883-46.441-46.445-46.441z"/>
                            <path d="m600 120c-264.72 0-480 215.28-480 480s215.28 480 480 480 480-215.28 480-480-215.28-480-480-480zm0 867.24c-213.48 0-387.24-173.64-387.24-387.24 0-213.48 173.64-387.24 387.24-387.24 213.6 0 387.24 173.76 387.24 387.24s-173.76 387.24-387.24 387.24z"/>
                        </g>
                    </svg>                          
                    <span>Create Group</span>
                </button>

                <a href="/logout" class="Button ButtonSecondary ButtonFullWidth">Log Out</a>
            </div>
        </div>
    </div>

    <div class="Card {hideCreateForm ? 'StartHidden' : ''}">
        <h3 class="CardTitle">Create a Group:</h3>
        <form id="CreateGroupForm" class="CardSection CreateGroupForm" method="post" action="?/createGroup" use:enhance autocomplete="off">
			<div class="FormRow">
				<div class="FormField">
					<label for="GroupNameInput" class="FormLabel">Group Name:</label>
					<input id="GroupNameInput" name="GroupName" type="text" label="GroupName" class="FormFieldInput" />
                    {#if form?.GroupName?.empty}<p class="ErrorMessage">Please enter a Group Name.</p>{/if}
                    {#if form?.GroupName?.taken}<p class="ErrorMessage">That Group name is already taken.</p>{/if}
				</div>
			</div>
			
			<div class="FormRow">
				<div class="FormField">
					<label for="SecretCodeInput" class="FormLabel">Secret Code (recommended):</label>
					<input id="SecretCodeInput" name="SecretCode" type="text" label="SecretCode" class="FormFieldInput" />
				</div>
			</div>
			
			<div class="FormRow">
				<div class="FormField">
					<label for="WishlistInput" class="FormLabel">Your Gift Requests/Amazon Wishlist:</label>
					<input id="WishlistInput" name="Wishlist" type="text" label="Wishlist" class="FormFieldInput" />
				</div>
			</div>
	
			<div class="FormButtons">
				<button class="Button" type="submit">Submit</button>
			</div>
		</form>
    </div>

    <PageFooter />
</div>

<style>
    .Groups {}
    .Groups.Hidden {
        display: none;
    }
    
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
        font-size: 14px;
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

    .GroupListItemIcon {
        width: 20px;
        height: 20px;
        margin-right: 10px;
    }
    .GroupListItemIcon path {
        fill: rgb(127, 140, 159);
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
    
    .GroupListItemText {
        color: rgb(51, 65, 85);
        font-family: var(--SecondaryFont);
        font-size: 14px;
        margin-top: 2px;
    }

    .GroupListItem:hover .GroupListItemText {
        color: #FFFFFF;
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



    .CreateGroup {
        padding: 12px 14px;
    }

    .CreateGroupButton {
        display: flex;
        flex-direction: row;
        align-items: center;
        margin-bottom: 20px;
        width: 100%;
    }
</style>