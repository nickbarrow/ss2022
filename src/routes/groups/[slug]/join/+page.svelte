<script>
    import { enhance } from "$app/forms";
    import Header from "$lib/components/Header.svelte";

    export let form;
    export let data;
    export let { user, group } = data;
</script>


<svelte:head>
	<title>{group.Name}</title>
</svelte:head>

<Header title={group.Name} backLink="/groups" backText="← Back to Groups" />

<div class="Page PageWithHeader">
    <div class="PageContent">
        <h3 class="PageContentHeader">Join {group.Name}</h3>
        <form id="JoinGroupForm" class="JoinGroupForm" method="POST" autocomplete="off" use:enhance>
            <input type="hidden" name="GroupID" value={group.id} />
            <input type="hidden" name="UserID" value={user.uid} />
            <input type="hidden" name="UserDisplayName" value={user.displayName} />
            <input type="hidden" name="UserPhotoURL" value={user.photoURL} />
            {#if group.SecretCode !== ""}
                <div class="FormRow">
                    <div class="FormField">
                        <label for="SecretCodeInput" class="FormLabel">Enter Secret Code:</label>
                        <input id="SecretCodeInput" name="SecretCode" class="FormFieldInput" type="text" />
                        {#if form?.SecretCode?.empty}<p class="ErrorMessage">Please enter the secret code.</p>{/if}
                        {#if form?.SecretCode?.invalid}<p class="ErrorMessage">Invalid secret code.</p>{/if}
                    </div>
                </div>
            {:else}
                <input type="hidden" name="SecretCode" value="" />
            {/if}
            <div class="FormRow">
                <div class="FormField">
                    <label for="WishlistInput" class="FormLabel">Your Gift Requests/Amazon Wishlist:</label>
                    <input id="WishlistInput" name="Wishlist" class="FormFieldInput" type="text" />
                </div>
            </div>
            <button class="Button" type="submit">Join Group</button>
        </form>
    </div>
</div>
