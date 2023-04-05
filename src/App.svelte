<!-- src/App.svelte -->
<script>
	import QuestionForm from "./components/QuestionForm.svelte";
	import { writable } from "svelte/store";
  import db from "./firebase";
  import { collection, addDoc } from "firebase/firestore";
	let src = "./images/logo.jpg";
	let companyName = "";
	let gameType = "";
	let showForm = false;

	let selectedOptionIndex
	let gameID = "";

	const options = [
    { questionLimit: 85, answerLimit: 40, name: "פאזל טריוויה"},
    { questionLimit: 50, answerLimit: 40, name: "משחק הכדורים" },
    { questionLimit: 70, answerLimit: 55, name: "טריוויה"},
    { questionLimit: 23, answerLimit: 0, name: "נכון/לא נכון" },
  ];

	let selectedOption = null;

	function handleOptionChange(event) {
    selectedOptionIndex = event.target.value;
    selectedOption = options[selectedOptionIndex];
		if (selectedOptionIndex === 100)
			selectedOption = null;

	}

	async function createNewGame() {
		console.log(selectedOption)
		if (!companyName || !selectedOption) {
					alert('אנא מלאו את כל השדות');
					return;
		}
		try {
			const gameData = {
				questions: [],
				company: companyName,
				gameType: selectedOption.name,
			};

			const gameDocRef = await addDoc(collection(db, "games"), gameData);
			console.log("New game created with ID:", gameDocRef.id);
			gameID = gameDocRef.id;
			showForm = true;

		} catch (e) {
			console.error("Error creating a new game: ", e);
		}

	}

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
			min-height: 100vh;
			justify-content: center;
			background-color: #6b15a1;
			padding: 1rem;
	}

	h1 {
			color: #e9e9f4;
			margin-bottom: 1rem;
	}

	img {
			background-color: #ffffff;
			padding: 2rem;
			position: absolute;
			left: 1rem;
			top: 1rem;
			width: 8rem;
			border-radius: 1rem;
	}

</style>

<main>
	<h1>שאלות ותשובות למשחקים</h1>
	{#if !showForm}
			<div>
					<input type="text" id="companyName" bind:value={companyName} dir="rtl" placeholder="שם החברה"/>
			</div>
			<div>
				<select id="gameType" bind:value="{selectedOptionIndex}" on:change="{handleOptionChange}">
					<option value="100" dir="rtl" disabled selected>בחרו משחק</option>
					<option value="0" dir="rtl">פאזל טריוויה</option>
					<option value="1" dir="rtl">משחק הכדורים</option>
					<option value="2" dir="rtl">טריוויה</option>
					<option value="3" dir="rtl">נכון/לא נכון</option>
				</select>
			</div>
			<button type="button" on:click="{createNewGame}">הבא</button>

	{/if}
	{#if showForm}
			<QuestionForm {gameID} {selectedOptionIndex} />
	{/if}
	<img src={src} alt="Yooz Logo" />
</main>
