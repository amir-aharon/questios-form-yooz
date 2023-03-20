<!-- src/App.svelte -->
<script>
	import Form from "./components/Form.svelte";
	let src = "./images/logo.jpg"
</script>

<style>

	::selection {
		color: #6b15a1;
		background: #f5f5f5;
	}

	main {
		display: flex;
		flex-direction: column;
		align-items: center;
		height: 100vh;
		justify-content: center;
		background-color: #6b15a1;
	}

	h1 {
		color: #e9e9f4;
		margin-bottom: 1rem;
	}

	img {
		background-color: #ffffff;
		padding: 2rem;
		position: absolute;
		left: -9rem;
		bottom: -5rem;
		transform: scale(0.5);
		border-radius: 2rem;
	}

</style>

<main>
	<h1>שאלות ותשובות למשחקים</h1>
	<Form />
	<img src={src} alt="Yooz Logo">
</main>
