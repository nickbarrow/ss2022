<script>
    import { deserialize } from "$app/forms";
    import { goto } from "$app/navigation";
    import Header from "$lib/components/Header.svelte"
    import PageFooter from "$lib/components/PageFooter.svelte";
	
	const handleCredentialResponse = async response => {
		let formData = new FormData();
		formData.append("token", response.credential);
		let loginResponse = await fetch("?/GoogleLogin", {
			method: 'POST',
			body: formData
		});
		const { data } = deserialize(await loginResponse.text());
		if (data.success) goto('/groups');
		else alert('Error logging in with Google. Please try again or tell Nick shits broken');
	}

	const initGoogleLogin = () => {
		if (google?.accounts?.id) {
			google.accounts.id.initialize({
				client_id: "116108580723-v9f32pfgdgndbhm0qhm4tjdogdjtie0o.apps.googleusercontent.com",
				callback: handleCredentialResponse
			});
			google.accounts.id.renderButton(
				document.getElementById("GoogleLoginButton"),
				{ theme: "outline", size: "large" }
			);
		}
	}
</script>

<svelte:head>
	<title>🎅🏼 SS22 - Log In</title>
	<script src="https://accounts.google.com/gsi/client" async defer on:load={initGoogleLogin}></script>
</svelte:head>

<Header title={"Log In"} />

<div class="Page PageWithHeader">
	<div class="PageContent">
		<div style="display: flex; flex-direction: row; justify-content: center;">
			<div id="GoogleLoginButton"></div> 
		</div>
		
		<PageFooter />
	</div>
</div>