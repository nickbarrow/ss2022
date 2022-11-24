<script>
    import { enhance } from "$app/forms";


	export let form;
</script>

<svelte:head>
	<title>🎅🏼 SS22 - Log In</title>
</svelte:head>

<header class="Header">
	<div class="HeaderInner">
		<h1 class="HeaderTitle">Log In</h1>
		<p class="HeaderSubtitle">Log In with email and password.</p>
	</div>
</header>

<div class="Page PageWithHeader">
	<div class="Card">
		<form id="LoginForm" class="LoginForm" method="post" use:enhance>
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
		
		<p>Don't have an account? <a href="/signup">Sign Up</a></p>
	</div>
</div>

<style>
	.LoginForm {
		display: flex;
		flex-direction: column;
		margin-bottom: 20px;
	}
</style>
