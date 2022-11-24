<script>
    import { enhance } from "$app/forms";


	export let form;
</script>

<svelte:head>
	<title>🎅🏼 SS22 - Sign Up</title>
</svelte:head>

<!-- <h2 class="PageHeader">Sign Up</h2> -->
<header class="Header">
	<div class="HeaderInner">
		<h1 class="HeaderTitle">Sign Up</h1>
		<p class="HeaderSubtitle">Sign up with email and password.</p>
	</div>
</header>

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
	.SignupFormContainer {
		display: grid;
		place-content: center;
	}

	.SignupForm {
		display: flex;
		flex-direction: column;
		margin-bottom: 20px;
	}
</style>
