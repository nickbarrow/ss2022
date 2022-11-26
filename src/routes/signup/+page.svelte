<script>
    import { enhance } from "$app/forms";
    import Header from "$lib/components/Header.svelte"

	export let form;
</script>

<svelte:head>
	<title>🎅🏼 SS22 - Sign Up</title>
</svelte:head>


<Header title={"Sign Up"} subtitle={"Sign up with email and password."} />

<div class="Page PageWithHeader">
	<div class="Card">	
		<form id="SignupForm" class="SignupForm" method="post" use:enhance>
			<div class="FormRow">
				<div class="FormField">
					<label for="EmailInput" class="FormLabel">Email</label>
					<input id="EmailInput" name="Email" type="text" label="Email" class="FormFieldInput" />
					{#if form?.email?.invalid}<p class="ErrorMessage">Invalid email!</p>{/if}
					{#if form?.email?.empty}<p class="ErrorMessage">Please enter an email address.</p>{/if}
					{#if form?.email?.unavailable}<p class="ErrorMessage">Email already in use.</p>{/if}
				</div>
			</div>
			
			<div class="FormRow">
				<div class="FormField">
					<label for="PasswordInput" class="FormLabel">Password</label>
					<input id="PasswordInput" name="Password" type="password" label="Password" class="FormFieldInput" />
					{#if form?.password?.empty}<p class="ErrorMessage">Please enter a password.</p>{/if}
					{#if form?.password?.weak}<p class="ErrorMessage">Password must be at least 6 characters.</p>{/if}
				</div>
			</div>
	
			<div class="FormButtons">
				<button class="Button" type="submit">Submit</button>
			</div>
		</form>
		
		<p>Already have an account? <a href="/login">Log In</a></p>
	</div>
</div>


<style>
	p {
		font-size: 14px;
	}

	.SignupForm {
		display: flex;
		flex-direction: column;
		margin-bottom: 20px;
	}
</style>
