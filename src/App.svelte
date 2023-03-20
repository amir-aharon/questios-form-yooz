<!-- src/App.svelte -->
<script>
	import Form from "./components/Form.svelte";
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

</style>

<main>
	<h1>שאלות ותשובות למשחקים</h1>
	<Form />
</main>
