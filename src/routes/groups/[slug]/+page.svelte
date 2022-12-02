<script>
    import { deserialize } from "$app/forms";
    import Header from "$lib/components/Header.svelte"
    import PageFooter from "$lib/components/PageFooter.svelte";

    export let data;
    export let form;
    export let { user, group } = data;
    export let inGroup = group.Members.find(member => member.uid == data.user.uid);
    export let groupOwner = group.Owner == user.uid;
    export let userData = inGroup ? group.Members[group.Members.findIndex(member => member.uid === data.user.uid)] : null;
    export let hideEditWishlistForm = true;
    
    async function generateMatches() {
        if (window.confirm("Really generate matches?")) {
            let formData = new FormData();
            formData.append("GroupID", group.id);
            let loginResponse = await fetch("?/GenerateMatches", {
                method: 'POST',
                body: formData
            });
            const { data } = deserialize(await loginResponse.text());
            if (data.success) location.reload();
            else console.log(data);
        }
    }

    function isLink(str) {
        var expression = /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/gi;        /^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_\+.~#?&\/=]*)$/;
        return expression.test(str);
    }

    // async function block(userID) {
    //         let formData = new FormData();
    //         formData.append("GroupID", group.id);
    //         let loginResponse = await fetch("?/GenerateMatches", {
    //             method: 'POST',
    //             body: formData
    //         });
    //         const { data } = deserialize(await loginResponse.text());
    //         if (data.success) location.reload();
    //         else console.log(data);
    // }
</script>

<svelte:head>
	<title>{group.Name}</title>
</svelte:head>

<Header title={group.Name} backLink="/groups" backText="← Back to Groups" />

<div class="Page PageWithHeader">
    {#if !inGroup}
        <form id="LoginForm" class="JoinGroupForm" method="post" action="?/joinGroup" autocomplete="off">
            <input type="hidden" name="GroupID" value={group.id} />
            {#if group.SecretCode !== ""}
                <div class="FormRow">
                    <div class="FormField">
                        <label for="SecretCodeInput" class="FormLabel">Enter Secret Code:</label>
                        <input id="SecretCodeInput" name="SecretCode" type="text" label="SecretCode" class="FormFieldInput" />
                    </div>
                </div>
            {/if}
            <div class="FormRow">
                <div class="FormField">
                    <label for="WishlistInput" class="FormLabel">Your Gift Requests/Amazon Wishlist:</label>
                    <input id="WishlistInput" name="Wishlist" type="text" label="Wishlist" class="FormFieldInput" />
                </div>
            </div>
            <button class="Button" type="submit">Join Group</button>
            {#if form?.SecretCode?.empty}<p class="ErrorMessage">Please enter the secret code.</p>{/if}
            {#if form?.SecretCode?.invalid}<p class="ErrorMessage">Invalid secret code.</p>{/if}
        </form>
    {:else}
        {#if group.MatchesGenerated}
            <!-- Your Match -->
            <div class="PageSection">
                <div class="PageSectionInner">
                    <h3 class="PageSectionTitle">Match:</h3>
                    <div class="UserMatch">
                        <img src="{userData.recipient.photoURL}" class="UserMatchImage" alt="Profile Pic" referrerpolicy="no-referrer" />
                        <div class="UserMatchInfo">
                            <p>You are getting a gift for <b>{userData.recipient.displayName}</b></p>
                            {#if isLink(userData.recipient.wishlist)}
                                <a rel="external" class="WishlistLink" href={userData.recipient.wishlist}>View {userData.recipient.displayName}'s Wishlist →</a>
                            {:else}
                                <p>They would like:
                                    <span class="Bold">{userData.recipient.wishlist}</span>
                                </p>
                            {/if}
                        </div>
                    </div>
                </div>
            </div>
        {/if}
        
        {#if groupOwner}
            <!-- Generate Matches -->
            <div class="PageSection OwnerControls">
                <div class="PageSectionInner">
                    <h3 class="PageSectionTitle">Owner Controls:</h3>
                    <button class="Button ButtonFullWidth" on:click={generateMatches}>
                        {#if group.MatchesGenerated}
                            Regenerate Matches
                        {:else}
                            Generate Matches
                        {/if}
                    </button>
                </div>
            </div>

            <!-- Show Matches -->
            <!-- {#if group.MatchesGenerated}
                <div class="PageSection OwnerControls">
                    <div class="PageSectionInner">
                        <h3 class="PageSectionTitle">Matches:</h3>
                        {#each group.Members as Member}
                            <p>
                                <img src="{Member.photoURL}" alt="" class="MatchPreviewImage" referrerpolicy="no-referrer" />
                                {Member.displayName}
                                ->
                                <img src="{Member.recipient.photoURL}" alt="" class="MatchPreviewImage" referrerpolicy="no-referrer" />
                                {Member.recipient.displayName}</p>
                        {/each}
                    </div>
                </div>
            {/if} -->
        {/if}

        <!-- Your Wishlist: -->
        <div class="PageSection">
            <div class="PageSectionInner">
                {#if hideEditWishlistForm}
                    <h3 class="PageSectionTitle">Your Wishlist:</h3>
                    {#if !isLink(userData.wishlist)}<p class="TextWishlist">{userData.wishlist}</p>{/if}
                    <div class="FormRow FormRow2Cols">
                        {#if isLink(userData.wishlist)}
                            <div class="FormField">
                                <a rel="external" class="Button ButtonFullWidth ButtonCentered" href={userData.wishlist}>View Wishlist</a>
                            </div>
                        {/if}
                        <div class="FormField">
                            <button class="Button ButtonSecondary ButtonFullWidth ButtonCentered EditWishlistButton" on:click={() => { hideEditWishlistForm = false; }}>Edit Wishlist</button>
                        </div>
                    </div>
                {:else}
                    <h3 class="PageSectionTitle">Update Wishlist:</h3>
                    <form id="UpdateWishlistForm" method="post" action="?/UpdateWishlist" class="EditWishlistForm" autocomplete="off">
                        <input type="hidden" name="UserID" value={user.uid} />
                        <input type="hidden" name="GroupID" value={group.id} />
                        <div class="FormRow">
                            <div class="FormField FormFieldGrow">
                                <input id="WishlistInput" name="Wishlist" type="text" label="Wishlist" class="FormFieldInput" value={userData.wishlist} />
                            </div>
                            <button type="submit" class="Button">Update</button>
                        </div>
                    </form>
                {/if}
            </div>
        </div>

        <!-- Group Members -->
        <div class="PageSection GroupMembers">
            <div class="PageSectionInner">
                <h3 class="PageSectionTitle">Members:</h3>
                <ul class="GroupMembersList">
                    {#if group.Members}
                        {#each group.Members as Member}
                            <li class="GroupMember">
                                <img class="GroupMemberPhoto" src="{Member.photoURL}" alt="Profile Pic" referrerpolicy="no-referrer" />
                                <div class="GroupMemberInfo">
                                    <span class="GroupMemberName">{Member.displayName}</span>
                                    {#if isLink(Member.wishlist)}
                                        <a rel="external" class="WishlistLink" href={Member.wishlist}>View Wishlist →</a>
                                    {:else}
                                        <p>{Member.wishlist}</p>
                                    {/if}
                                </div>
                                <!-- <button class="Button" on:click={block(Member.uid)}>Block</button> -->
                            </li>
                        {/each}
                    {/if}
                </ul>
            </div>
        </div>
    {/if}

    <PageFooter />
</div>

<style>
    .Bold {
        font-weight: 700;
    }

    .GroupDetail {
        padding: 0;
    }

    .JoinGroupForm {
        padding: 12px;
    }

    .GroupMembersList {
        list-style: none;
        padding: 0;
    }

    .GroupMember {
        display: flex;
        flex-direction: row;
        align-items: center;
        margin-bottom: 12px;
    }
    .GroupMember:last-child {
        margin: 0;
    }

    .GroupMemberPhoto {
        border-radius: 50%;
        max-width: 40px;
        max-height: 40px;
        margin-right: 12px;
    }

    .GroupMemberName {
        font-family: var(--SecondaryFont);
    }

    .UserMatch {
        display: flex;
        flex-direction: row;
        align-items: center;
    }

    .UserMatchImage {
        border-radius: 50px;
        width: 50px;
        height: 50px;
        margin-right: 12px;
    }

    .MatchPreviewImage {
        width: 20px;
        height: 20px;
        border-radius: 50px
    }

    .WishlistLink {
        border-bottom: 1px solid transparent;
        color: var(--PrimaryGreen);
        display: block;
        font-family: var(--SecondaryFont);
        text-decoration: none;
        width: fit-content;
    }
    .WishlistLink:hover {
        border-color: var(--PrimaryGreen);
    }
    .WishlistLink:not(:only-child) {
        margin-top: 5px;
    }

    .TextWishlist {
        margin-bottom: 12px;
    }
</style>