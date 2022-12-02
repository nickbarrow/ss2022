<script>
    import { enhance } from "$app/forms";
    import Header from "$lib/components/Header.svelte";
    import PageFooter from "$lib/components/PageFooter.svelte";

    export let form;
</script>

<svelte:head>
	<title>🎅🏼 SS22 - Create Group</title>
</svelte:head>

<Header title={"Create"} backLink="/groups" backText="← Back to Groups" />

<div class="Page PageWithHeader">
    <div class="PageContent">
        <h3 class="PageContentHeader">Group Details:</h3>
        <form id="CreateGroupForm" class="CardSection CreateGroupForm" method="post" autocomplete="off" use:enhance>
			<div class="FormRow">
				<div class="FormField">
					<label for="GroupNameInput" class="FormLabel">Name:</label>
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