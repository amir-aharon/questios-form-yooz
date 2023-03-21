<!-- src/components/Form.svelte -->
<script>
  import { writable } from "svelte/store";
  import db from "../firebase";
  import { collection, addDoc } from "firebase/firestore";

  let question = "";
  let answer = "";
  let falseAnswer1 = "";
  let falseAnswer2 = "";
  let falseAnswer3 = "";

  const formStatus = writable("");

  let selectedOptionIndex = -1;
  const options = [
    { questionLimit: 85, answerLimit: 40, name: "פאזל טריוויה"},
    { questionLimit: 50, answerLimit: 40, name: "משחק הכדורים" },
    { questionLimit: 70, answerLimit: 55, name: "טריוויה"},
    { questionLimit: 23, answerLimit: 0, name: "נכון/לא נכון" },
  ];
  let selectedOption = selectedOptionIndex == -1 ? options[0] : options[selectedOptionIndex];

  let questionRemaining = selectedOption.questionLimit;
  let answerRemaining = selectedOption.answerLimit;

  let falseAnswer1Remaining = selectedOption.answerLimit;
  let falseAnswer2Remaining = selectedOption.answerLimit;
  let falseAnswer3Remaining = selectedOption.answerLimit;


  function updateQuestionRemaining() {
    questionRemaining = selectedOption.questionLimit - question.length;
  }

  function updateAnswerRemaining() {
    answerRemaining = selectedOption.answerLimit - answer.length;
  }

  function updateFalseAnswer1Remaining() {
    falseAnswer1Remaining = selectedOption.answerLimit - falseAnswer1.length;
  }

  function updateFalseAnswer2Remaining() {
    falseAnswer2Remaining = selectedOption.answerLimit - falseAnswer2.length;
  }

  function updateFalseAnswer3Remaining() {
    falseAnswer3Remaining = selectedOption.answerLimit - falseAnswer3.length;
  }


  async function submitForm() {
    if (question.length === 0 || (selectedOption.answerLimit === 0 && !answer) || (selectedOption.answerLimit > 0 && answer.length === 0)) {
      alert("נכון/לא נכון?");
      return;
    }

    try {
      const docRef = await addDoc(collection(db, "questions"), {
        question,
        answer,
        game: selectedOption.name,
        falseAnswers: selectedOptionIndex === 3 ? [] : [falseAnswer1, falseAnswer2, ...(selectedOptionIndex === 0 ? [] : [falseAnswer3])],
      });
      question = "";
      answer = "";
      falseAnswer1 = "";
      falseAnswer2 = "";
      falseAnswer3 = "";

      questionRemaining = selectedOption.questionLimit;
      answerRemaining = selectedOption.answerLimit;

      falseAnswer1Remaining = selectedOption.answerLimit;
      falseAnswer2Remaining = selectedOption.answerLimit;
      falseAnswer3Remaining = selectedOption.answerLimit;
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }

  function handleOptionChange(event) {
    selectedOptionIndex = event.target.value;
    selectedOption = options[selectedOptionIndex];
    updateAnswerRemaining();
    updateQuestionRemaining();
    updateFalseAnswer1Remaining();
    updateFalseAnswer2Remaining();
    updateFalseAnswer3Remaining();
    question = "";
    answer = "";
    falseAnswer1 = "";
    falseAnswer2 = "";
    falseAnswer3 = "";
  }

  </script>

<style>
  .form-container {
    display: flex;
    flex-direction: column;
    width: 80%;
    align-items: center;
  }

  form {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    background-color: #6b15a1;
    padding: 1rem;
    border-radius: 8px;
    width: 20%;
  }

  ::selection {
		color: #6b15a1;
		background: #f5f5f5;
	}

  textarea {
    background-color: #f5f5f5;
    border: 1px solid #e9e9f4;
    border-radius: 4px;
    padding: 0.5rem;
    color: #282828;
    text-align: right;
    font-size: 1rem;
    font-family: inherit;
    resize: vertical;
  }

  select {
    background-color: #f5f5f5;
    border: 1px solid #e9e9f4;
    border-radius: 4px;
    padding: 0.5rem;
    color: #282828;
    font-size: 1rem;
    font-family: inherit;
    width: 20%;
    margin-bottom: 1rem;
  }

  label {
    display:block;
    width:x;
    height:y;
    transform: translateY(10px);
    text-align:right;
    color:
    #e9e9f4;
  }

  button {
    background-color: #e9e9f4;
    border: 1px solid #e9e9f4;
    border-radius: 4px;
    padding: 0.5rem;
    cursor: pointer;
    color: #282828;
  }

  button:hover {
    background-color: #f5f5f5;
  }

  p {
    color: #282828;
    margin-top: 1rem;
  }

  h2 {
	  color: #e9e9f4;
    margin-top: -.5rem;
	}

</style>

<div class="form-container">
  {#if selectedOptionIndex <= -1}
    <h2>בחרו משחק אליו תרצו ליצור שאלות</h2>
  {/if}

  <select bind:value="{selectedOptionIndex}" on:change="{handleOptionChange}">
    <option value="0" dir="rtl">פאזל טריוויה</option>
    <option value="1" dir="rtl">משחק הכדורים</option>
    <option value="2" dir="rtl">טריוויה</option>
    <option value="3" dir="rtl">נכון/לא נכון</option>
  </select>

  {#if selectedOptionIndex > -1}
  <form on:submit|preventDefault="{submitForm}">
    <label for="question">נשארו {questionRemaining} תווים</label>
    <textarea
      type="text"
      id="question"
      bind:value="{question}"
      placeholder="שאלה"
      required
      dir="rtl"
      maxlength="{selectedOption.questionLimit}"
      rows="2"
      on:input="{updateQuestionRemaining}"
    />



    {#if selectedOptionIndex != 3}

      <label for="answer">נשארו {answerRemaining} תווים</label>
      <textarea
        type="text"
        id="answer"
        bind:value="{answer}"
        placeholder="תשובה נכונה"
        required
        dir="rtl"
        maxlength="{selectedOption.answerLimit}"
        rows="2"
        on:input="{updateAnswerRemaining}"
        disabled="{selectedOption.answerLimit === 0}"
      />

      <label for="falseAnswer1">נשארו {falseAnswer1Remaining} תווים</label>
      <textarea
        type="text"
        id="falseAnswer1"
        bind:value="{falseAnswer1}"
        placeholder="תשובה שגויה"
        required
        dir="rtl"
        maxlength="{selectedOption.answerLimit}"
        rows="2"
        on:input="{updateFalseAnswer1Remaining}"
      />

      <label for="falseAnswer2"> נשארו {falseAnswer2Remaining} תווים</label>
      <textarea
        type="text"
        id="falseAnswer2"
        bind:value="{falseAnswer2}"
        placeholder="תשובה שגויה"
        required
        dir="rtl"
        maxlength="{selectedOption.answerLimit}"
        rows="2"
        on:input="{updateFalseAnswer2Remaining}"
      />

      {#if selectedOptionIndex != 0}
      <label for="falseAnswer3">נשארו {falseAnswer3Remaining} תווים</label>
      <textarea
        type="text"
        id="falseAnswer3"
        bind:value="{falseAnswer3}"
        placeholder="תשובה שגויה"
        required
        dir="rtl"
        maxlength="{selectedOption.answerLimit}"
        rows="2"
        on:input="{updateFalseAnswer3Remaining}"
      />
    {/if}

    {:else}

    <div class="radio-container">
      <label>
        נכון
        <input type="radio" bind:group="{answer}" value="נכון" required>
      </label>
      <label>
        לא נכון
        <input type="radio" bind:group="{answer}" value="לא נכון" required>
      </label>
    </div>

  {/if}

  <button type="submit">Submit</button>

  </form>

    {#if $formStatus}
      <p>{$formStatus}</p>
    {/if}

  {/if}
  </div>
