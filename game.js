const question = document.getElementById("question");
const choices = Array.from(document.getElementsByClassName("choice-text"));
const progressText = document.getElementById("progressText");
const scoreText = document.getElementById("score");
const progressBarFull = document.getElementById("progressBarFull");
let currentQuestion = {};
let acceptingAnswers = false;
let score = 0;
let questionCounter = 0;
let availableQuesions = [];



let questions = [
  {
    question: "Wähle den passenden Wort. Etwas in Kauf... ",
    choice1: "beachten",
    choice2: "nehmnen",
    choice3: "ziehen",
    choice4: "ablegen",
    answer: 2
  },
  {
    question:
      "Ergänze mit dem passendem Wort: die Ruhe...",
    choice1: "leisten",
    choice2: "besorgen",
    choice3: "nehmnen",
    choice4: "bewahren",
    answer: 4
  },
  {
    question: "Ergänze mit dem passendem Wort: etwas zur Sprache...",
    choice1: "machen",
    choice2: "bringen",
    choice3: "leisten",
    choice4: "setzen",
    answer: 2
  },
    {
    question: "Ergänze mit dem passendem Wort: fur etwas Sorge...",
    choice1: "nehmen",
    choice2: "bewahren",
    choice3: "tragen",
    choice4: "ziehen",
    answer: 3
  },
      {
    question: "Ergänze mit dem passendem Wort: etwas aufs Spiel...",
    choice1: "stellen",
    choice2: "leisten",
    choice3: "tragen",
    choice4: "setzen",
    answer: 4
  },
  {
    question: "Ergänze mit dem passendem Wort: etwas in Aussicht...",
    choice1: "nehmen",
    choice2: "setzen",
    choice3: "stellen",
    choice4: "bewahren",
    answer: 3
  },
        {
    question: "Ergänze mit dem passendem Wort: Vorwurfe...",
    choice1: "halten",
    choice2: "erheben",
    choice3: "stellen",
    choice4: "ziehen",
    answer: 2
  },
            {
    question: "Ergänze mit dem passendem Wort: jn in Mitleidenschaft...",
    choice1: "ziehen",
    choice2: "setzen",
    choice3: "einbringen",
    choice4: "nehmen",
    answer: 1
  }
];



//CONSTANTS
const CORRECT_BONUS = 1;
const MAX_QUESTIONS = questions.length;

startGame = () => {
  questionCounter = 0;
  score = 0;
  availableQuesions = [...questions];
  getNewQuestion();
};

getNewQuestion = () => {
  if (availableQuesions.length === 0 || questionCounter >= MAX_QUESTIONS) {
    localStorage.setItem("mostRecentScore", score);
    //go to the end page
    return window.location.assign("end.html");
  }
  questionCounter++;
  progressText.innerText = `Question ${questionCounter}/${MAX_QUESTIONS}`;
  //Update the progress bar
  progressBarFull.style.width = `${(questionCounter / MAX_QUESTIONS) * 100}%`;

  const questionIndex = Math.floor(Math.random() * availableQuesions.length);
  currentQuestion = availableQuesions[questionIndex];
  question.innerText = currentQuestion.question;

  choices.forEach(choice => {
    const number = choice.dataset["number"];
    choice.innerText = currentQuestion["choice" + number];
  });

  availableQuesions.splice(questionIndex, 1);
  acceptingAnswers = true;
};

choices.forEach(choice => {
  choice.addEventListener("click", e => {
    if (!acceptingAnswers) return;

    acceptingAnswers = false;
    const selectedChoice = e.target;
    const selectedAnswer = selectedChoice.dataset["number"];

    const classToApply =
      selectedAnswer == currentQuestion.answer ? "correct" : "incorrect";

    if (classToApply === "correct") {
      incrementScore(CORRECT_BONUS);
    }

    selectedChoice.parentElement.classList.add(classToApply);

    setTimeout(() => {
      selectedChoice.parentElement.classList.remove(classToApply);
      getNewQuestion();
    }, 1000);
  });
});

incrementScore = num => {
  score += num;
  scoreText.innerText = score;
};

startGame();
