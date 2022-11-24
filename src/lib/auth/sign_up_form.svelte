<script>
	import { FloatingLabelInput } from 'flowbite-svelte';
	
	import { Form, TextInput, PasswordInput, Button } from 'carbon-components-svelte';
	import { createEventDispatcher } from "svelte"
	let dispatch = createEventDispatcher()
	let username, email, password;
	
	function signup() {
		dispatch("signup", {
			username,
			email,
			password
		})
	}
</script>

<div class="form">
	<Form>
		<FloatingLabelInput style="outlined" id="floating_outlined" name="floating_outlined" type="text" label="Floating outlined" />
		<FloatingLabelInput style="outlined" id="floating_outlined" name="floating_outlined" type="text" label="Floating outlined" />
		<FloatingLabelInput style="outlined" id="floating_outlined" name="floating_outlined" type="text" label="Floating outlined" />
		<!-- <TextInput bind:value={username} labelText="Username" placeholder="Enter your username" name="username"/> -->
		<!-- <TextInput bind:value={email} labelText="Email address" placeholder="Enter your email" type="email" name="email" /> -->
		<!-- <PasswordInput
			bind:value={password}
			tooltipAlignment="start"
			tooltipPosition="left"
			labelText="Password"
			placeholder="Enter password"
			name="password"
		/> -->

		<Button size="small" on:click={signup}>Sign Up</Button>
	</Form>
</div>

<style>
	.form {
		width: 400px;
	}
	.form .space {
		margin: .6em 0;
	}
</style>
