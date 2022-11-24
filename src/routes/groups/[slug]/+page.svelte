<script>
    import Header from "$lib/components/Header.svelte"
    export let data;
    export let group = data.group;
</script>
<svelte:head>
	<title>🎅🏼 SS22</title>
</svelte:head>

<Header title={group?.Name} />

<div class="Page PageWithHeader">
    <div class="Card Group">
        {#if group.Owner == data.user.uid}
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
        {/if}
        
        <div class="CardSection GroupMembers">
            <div class="CardSectionInner">
                <h3 class="CardSectionTitle">Members:</h3>
                <ul class="GroupMembersList">
                    {#if group.Members}
                        {#each group.Members as MemberUID}
                            <li class="GroupListItem">
                                <span class="GroupListItemText">{MemberUID}</span>
                            </li>
                        {/each}
                    {/if}
                </ul>
            </div>
        </div>
    </div>
</div>

<style>
</style>