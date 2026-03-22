const questions = [
  {
    question: "What does HTML stand for?",
    answers: [
      { text: "Hyper Text Markup Language", correct: true },
      { text: "High Text Machine Language", correct: false },
      { text: "Hyper Tool Multi Language", correct: false },
      { text: "Home Tool Markup Language", correct: false }
    ]
  },
  {
    question: "Which language is used for styling web pages?",
    answers: [
      { text: "HTML", correct: false },
      { text: "CSS", correct: true },
      { text: "Python", correct: false },
      { text: "C++", correct: false }
    ]
  },
  {
    question: "Which language makes websites interactive?",
    answers: [
      { text: "CSS", correct: false },
      { text: "HTML", correct: false },
      { text: "JavaScript", correct: true },
      { text: "SQL", correct: false }
    ]
  },
  {
    question: "Which tag is used for the largest heading in HTML?",
    answers: [
      { text: "<h6>", correct: false },
      { text: "<heading>", correct: false },
      { text: "<h1>", correct: true },
      { text: "<head>", correct: false }
    ]
  }
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");
const scoreElement = document.getElementById("score");
const timerElement = document.getElementById("timer");

let currentQuestionIndex = 0;
let score = 0;
let timeLeft = 15;
let timer;

function startQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  scoreElement.innerText = score;
  nextButton.innerText = "Next";
  showQuestion();
}

function showQuestion() {
  resetState();
  startTimer();

  let currentQuestion = questions[currentQuestionIndex];
  questionElement.innerText = currentQuestion.question;

  currentQuestion.answers.forEach(answer => {
    const button = document.createElement("button");
    button.innerText = answer.text;
    button.classList.add("btn");

    if (answer.correct) {
      button.dataset.correct = "true";
    }

    button.addEventListener("click", selectAnswer);
    answerButtons.appendChild(button);
  });
}

function resetState() {
  clearInterval(timer);
  nextButton.style.display = "none";
  while (answerButtons.firstChild) {
    answerButtons.removeChild(answerButtons.firstChild);
  }
}

function startTimer() {
  timeLeft = 15;
  timerElement.innerText = timeLeft;

  timer = setInterval(() => {
    timeLeft--;
    timerElement.innerText = timeLeft;

    if (timeLeft <= 0) {
      clearInterval(timer);
      autoRevealAnswer();
    }
  }, 1000);
}

function autoRevealAnswer() {
  Array.from(answerButtons.children).forEach(button => {
    if (button.dataset.correct === "true") {
      button.classList.add("correct");
    }
    button.disabled = true;
  });

  nextButton.style.display = "block";
}

function selectAnswer(e) {
  clearInterval(timer);

  const selectedBtn = e.target;
  const isCorrect = selectedBtn.dataset.correct === "true";

  if (isCorrect) {
    selectedBtn.classList.add("correct");
    score++;
    scoreElement.innerText = score;
  } else {
    selectedBtn.classList.add("wrong");
  }

  Array.from(answerButtons.children).forEach(button => {
    if (button.dataset.correct === "true") {
      button.classList.add("correct");
    }
    button.disabled = true;
  });

  nextButton.style.display = "block";
}

function showScore() {
  resetState();
  questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
  timerElement.innerText = 0;
  nextButton.innerText = "Play Again";
  nextButton.style.display = "block";
}

function handleNextButton() {
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    showQuestion();
  } else {
    showScore();
  }
}

nextButton.addEventListener("click", () => {
  if (currentQuestionIndex < questions.length) {
    handleNextButton();
  } else {
    startQuiz();
  }
});

startQuiz();