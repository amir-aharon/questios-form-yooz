<!-- src/components/Form.svelte -->
<script>
    import { writable } from "svelte/store";
    import db from "../firebase";
    import { collection, addDoc } from "firebase/firestore";

    let question = "";
    let answer = "";
    const formStatus = writable("");

    let selectedOptionIndex = 0;
    const options = [
        { questionLimit: 85, answerLimit: 40, name: "פאזל טריוויה" },
        { questionLimit: 50, answerLimit: 40, name: "משחק הכדורים" },
        { questionLimit: 70, answerLimit: 55, name: "טריוויה"},
        { questionLimit: 23, answerLimit: 0, name: "נכון/לא נכון" },
    ];
    let selectedOption = options[selectedOptionIndex];

    let questionRemaining = selectedOption.questionLimit;
    let answerRemaining = selectedOption.answerLimit;

    function updateQuestionRemaining() {
        questionRemaining = selectedOption.questionLimit - question.length;
    }

    function updateAnswerRemaining() {
            answerRemaining = selectedOption.answerLimit - answer.length;
    }

    async function submitForm() {
      try {
        const docRef = await addDoc(collection(db, "questions"), {
          question,
          answer,
          game: selectedOption.name,
        });
        question = "";
        answer = "";
      } catch (e) {
        console.error("Error adding document: ", e);
      }
    }

    function handleOptionChange(event) {
        selectedOptionIndex = event.target.value;
        selectedOption = options[selectedOptionIndex];
        updateAnswerRemaining();
        updateQuestionRemaining();
        question = "";
        answer = "";
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



  label {display:block; width:x; height:y; text-align:right; color: #e9e9f4;}

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
  </style>


  <div class="form-container">

    <select bind:value={selectedOptionIndex} on:change={handleOptionChange}>
        <option value="0" dir="rtl">פאזל טריוויה</option>
        <option value="1" dir="rtl">משחק הכדורים</option>
        <option value="2" dir="rtl">טריוויה</option>
        <option value="3" dir="rtl">נכון/לא נכון</option>
      </select>

    <form on:submit|preventDefault={submitForm}>
        <label for="question">נשארו {questionRemaining} תווים</label>
        <textarea type="text" id="question" bind:value={question} placeholder="שאלה" required dir="rtl" maxlength={selectedOption.questionLimit} rows="2" on:input={updateQuestionRemaining}/>
        {#if selectedOption.answerLimit > 0}
        <label for="question">נשארו {answerRemaining} תווים</label>
        <textarea type="text" id="answer" bind:value={answer} placeholder="תשובה" required dir="rtl" maxlength={selectedOption.answerLimit} rows="2" on:input={updateAnswerRemaining} disabled={selectedOption.answerLimit === 0}/>
        {/if}
        <button type="submit">Submit</button>
    </form>

    {#if $formStatus}
      <p>{$formStatus}</p>
    {/if}
  </div>
