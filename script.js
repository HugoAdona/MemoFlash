document.addEventListener("DOMContentLoaded", () => {
  loadFlashcards();
});

function addFlashcard() {
  const question = document.getElementById("question").value;
  const answer = document.getElementById("answer").value;

  if (question && answer) {
    const flashcardContainer = document.getElementById("flashcards-container");

    const flashcard = document.createElement("div");
    flashcard.className = "flashcard";
    flashcard.innerHTML = `
            <div class="flashcard-inner">
                <div class="flashcard-front">
                    <p>${question}</p>
                    <div class="actions">
                        <button onclick="editFlashcard(this)">Edit</button>
                        <button onclick="deleteFlashcard(this)">Delete</button>
                    </div>
                </div>
                <div class="flashcard-back">
                    <p>${answer}</p>
                    <div class="actions">
                        <button onclick="editFlashcard(this)">Edit</button>
                        <button onclick="deleteFlashcard(this)">Delete</button>
                    </div>
                </div>
            </div>
        `;
    flashcard.addEventListener("click", () => flipFlashcard(flashcard));
    flashcard.dataset.question = question;
    flashcard.dataset.answer = answer;

    flashcardContainer.appendChild(flashcard);

    document.getElementById("question").value = "";
    document.getElementById("answer").value = "";

    saveFlashcards();
  }
}

function flipFlashcard(flashcard) {
  flashcard.classList.toggle("flipped");
}

function editFlashcard(button) {
  const flashcard = button.closest(".flashcard");
  const question = flashcard.dataset.question;
  const answer = flashcard.dataset.answer;

  document.getElementById("question").value = question;
  document.getElementById("answer").value = answer;

  flashcard.remove();
  saveFlashcards();
}

function deleteFlashcard(button) {
  const flashcard = button.closest(".flashcard");
  flashcard.remove();
  saveFlashcards();
}

function saveFlashcards() {
  const flashcards = document.querySelectorAll(".flashcard");
  const flashcardsData = Array.from(flashcards).map((flashcard) => ({
    question: flashcard.dataset.question,
    answer: flashcard.dataset.answer,
  }));
  localStorage.setItem("flashcards", JSON.stringify(flashcardsData));
}

function loadFlashcards() {
  const flashcardsData = JSON.parse(localStorage.getItem("flashcards")) || [];
  const flashcardContainer = document.getElementById("flashcards-container");

  flashcardsData.forEach((data) => {
    const flashcard = document.createElement("div");
    flashcard.className = "flashcard";
    flashcard.innerHTML = `
            <div class="flashcard-inner">
                <div class="flashcard-front">
                    <p>${data.question}</p>
                    <div class="actions">
                        <button onclick="editFlashcard(this)">Edit</button>
                        <button onclick="deleteFlashcard(this)">Delete</button>
                    </div>
                </div>
                <div class="flashcard-back">
                    <p>${data.answer}</p>
                    <div class="actions">
                        <button onclick="editFlashcard(this)">Edit</button>
                        <button onclick="deleteFlashcard(this)">Delete</button>
                    </div>
                </div>
            </div>
        `;
    flashcard.dataset.question = data.question;
    flashcard.dataset.answer = data.answer;
    flashcard.addEventListener("click", () => flipFlashcard(flashcard));

    flashcardContainer.appendChild(flashcard);
  });
}
