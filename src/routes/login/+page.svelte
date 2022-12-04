<script>
    import { onMount } from "svelte";
    import { goto } from "$app/navigation";
    import {  GoogleAuthProvider, onAuthStateChanged, signInWithPopup } from "firebase/auth";
	import { auth } from "$lib/firebaseClient";
    import Header from "$lib/components/Header.svelte"
    import PageFooter from "$lib/components/PageFooter.svelte";
	
	const loginWithGoogle = () => {
		const provider = new GoogleAuthProvider();
		signInWithPopup(auth, provider)
			.then(() => {
				goto('/groups');
			})
			.catch((e) => {
				console.log(e);
			});
	};

	onMount(() => {
		console.log("Login onMount user: ", auth.currentUser);

		onAuthStateChanged(auth, newUser => {
			console.log('Login user updated: ', newUser?.uid);
			if (newUser) goto('/groups');
		});
	});
</script>

<svelte:head>
	<title>🎅🏼 SS22 - Log In</title>
</svelte:head>

<Header title={"Log In"} />

<div class="Page PageWithHeader">
	<div class="PageContent">
		<div class="Centered">
			<button class="Button ButtonLarge" on:click={loginWithGoogle}>Log In With Google</button>
		</div>
		
		<PageFooter />
	</div>
</div>

<style>
	.Centered {
		display: flex;
		flex-direction: row;
		justify-content: center;
	}
</style>