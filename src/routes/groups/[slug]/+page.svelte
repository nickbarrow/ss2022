<script>
    import { enhance } from "$app/forms";
    import { goto } from "$app/navigation";
    import Header from "$lib/components/Header.svelte"
    export let data;
    export let form;
    export let group = data.group;
    export let userGroupMemberData = group.Members[group.Members.findIndex(member => member.uid === data.user.uid)];

    // if (!data.group || !data.user) console.log(data.group, data.user)
    // const dontMatch = async (userID) => {
    //     console.log(userID);
	// 	let formData = new FormData();
	// 	formData.append("GroupID", group.id);
	// 	formData.append("BlockingUserID", data.user.uid);
	// 	formData.append("BlockedUser", userID);
	// 	let blockResponse = await fetch("?/blockUser", {
	// 		method: 'POST',
	// 		body: formData
	// 	});
	// 	const { data } = deserialize(await blockResponse.text());
    //     console.log(data);
	// 	// if (data.success) goto('/dashboard');
    // }
</script>
<svelte:head>
	<title>🎅🏼 SS22</title>
</svelte:head>

<Header title={group?.Name} />

<div class="Page PageWithHeader">
    <div class="Card Group">
        
        {#if !group.Members.find(member => member.uid === data.user.uid)}
            <form id="LoginForm" class="LoginForm" method="post" action="?/joinGroup" autocomplete="off">
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
            <!-- {#if group?.Owner == data.user.uid}
                <div class="CardSection OwnerControls">
                    <div class="CardSectionInner">
                        <h3 class="CardSectionTitle">Owner Controls:</h3>
                        <ul class="GroupMembersList">
                            <li class="GroupListItem">
                                <span class="GroupListItemText">Generate Matches</span>
                            </li>
                        </ul>
                    </div>
                </div>
            {/if} -->

            {#if userGroupMemberData.wishlist}
                <div class="CardSection">
                    <div class="CardSectionInner">
                        <h3 class="CardSectionTitle">You asked for:</h3>
                        <p>{userGroupMemberData.wishlist}</p>
                    </div>
                </div>
            {/if}

            <div class="CardSection GroupMembers">
                <div class="CardSectionInner">
                    <h3 class="CardSectionTitle">Members:</h3>
                    <ul class="GroupMembersList">
                        {#if group.Members}
                            {#each group.Members as Member}
                                <li class="GroupMember">
                                    <img class="GroupMemberPhoto" src="{Member.photoURL}" alt="Profile Pic" />
                                    <div class="GroupMemberInfo">
                                        <span class="GroupMemberName">{Member.displayName}</span>
                                        <p>{Member.wishlist}</p>
                                        <!-- <button on:click={() => { dontMatch(Member.uid) } }>Dont match</button> -->
                                    </div>
                                    <!-- <a href={Member.amazonWishlist}>Amazon Wishlist</a> -->
                                    <!-- <button class="GroupMemberDontMatch">X</button> -->
                                </li>
                            {/each}
                        {/if}
                    </ul>
                </div>
            </div>
        {/if}
        
    </div>
</div>

<style>
    .FormRow.FormRowWithButton {
        flex-direction: row;
        align-items: flex-end;
        margin-bottom: 4px;
    }

    .FormRow.FormRowWithButton .FormFieldInput {
        border-top-right-radius: 0;
        border-bottom-right-radius: 0;
    }

    .FormRow.FormRowWithButton .Button {
        flex-shrink: 0;
        border-top-left-radius: 0;
        border-bottom-left-radius: 0;
        z-index: 1;
    }

    .GroupMembersList {
        list-style: none;
    }

    .GroupMember {
        border-radius: 5px;
        display: flex;
        flex-direction: row;
        align-items: center;
        padding: 5px 10px;
        transition: .25s;
    }
    .GroupMember:hover {
        background-color: var(--PrimaryColor);
    }

    .GroupMemberPhoto {
        border-radius: 50%;
        max-width: 50px;
        max-height: 50px;
        margin-right: 16px;
    }

    .GroupMemberName {
        font-family: var(--SecondaryFont);
        transition: .25s;
    }
    .GroupMember:hover {
        color: #FFFFFF;
    }
</style>