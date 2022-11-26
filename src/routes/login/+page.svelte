<script>
    import { enhance, deserialize } from "$app/forms";
    import { goto } from "$app/navigation";
    import Header from "$lib/components/Header.svelte"
	
	const handleCredentialResponse = async response => {
		let formData = new FormData();
		formData.append("token", response.credential);
		let loginResponse = await fetch("?/GoogleLogin", {
			method: 'POST',
			body: formData
		});
		const { data } = deserialize(await loginResponse.text());
		if (data.success) goto('/dashboard');
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

	// export let form;
</script>

<svelte:head>
	<title>🎅🏼 SS22 - Log In</title>
	<script src="https://accounts.google.com/gsi/client" async defer on:load={initGoogleLogin}></script>
	<!-- <script>
        function handleCredentialResponse(response) {
          console.log("Encoded JWT ID token: " + response.credential);
        }
        window.onload = function () {
			google.accounts.id.initialize({
				client_id: "818474822063-c7pvp6u1dlgcurj9c1mehnsgrgdmgloc.apps.googleusercontent.com",
				callback: handleCredentialResponse
			});
			google.accounts.id.renderButton(
				document.getElementById("GoogleLoginButton"),
				{ theme: "outline", size: "large" }
			);
        }
    </script> -->
</svelte:head>

<Header title={"Log In"} />

<div class="Page PageWithHeader">
	<div class="Card">
		<h4 class="SmallTitle">Sign in with Google:</h4>
		<div id="GoogleLoginButton"></div> 
		
		<!-- <form id="LoginForm" class="LoginForm" method="post" action="?login" use:enhance>
			<div class="FormRow">
				<div class="FormField">
					<label for="EmailInput" class="FormLabel">Email</label>
					<input id="EmailInput" name="Email" type="text" label="Email" class="FormFieldInput" />
					{#if form?.email?.empty}<p class="ErrorMessage">Please enter an email address.</p>{/if}
					{#if form?.email?.invalid}<p class="ErrorMessage">Invalid email.</p>{/if}
				</div>
			</div>
			
			<div class="FormRow">
				<div class="FormField">
					<label for="PasswordInput" class="FormLabel">Password</label>
					<input id="PasswordInput" name="Password" type="password" label="Password" class="FormFieldInput" />
					{#if form?.password?.empty}<p class="ErrorMessage">Please enter a password.</p>{/if}
					{#if form?.password?.invalid}<p class="ErrorMessage">Invalid login.</p>{/if}
				</div>
			</div>
	
			<div class="FormButtons">
				<button class="Button" type="submit">Submit</button>
			</div>
		</form>
		
		<p>Don't have an account? <a href="/signup">Sign Up</a></p> -->
	</div>
</div>

<style>
	p {
		font-size: 14px;
	}

	.LoginForm {
		display: flex;
		flex-direction: column;
		margin-bottom: 20px;
	}

	#GoogleLoginButton {
		width: 100%;
	}
</style>
