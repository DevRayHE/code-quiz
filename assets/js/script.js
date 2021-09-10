var questionEl = document.getElementById("question");
// document.querySelector("#question")
var answer1El = document.getElementById("answer1");
var answer2El = document.getElementById("answer2");
var answer3El = document.getElementById("answer3");
var answer4El = document.getElementById("answer4");
var timerEl = document.getElementById("timer");
var viewHighScoreEl = document.getElementById("high-score");

viewHighScoreEl.textContent = "View Highscores";


// Stores questions in an array of objects
var questions = [
	{
		question: "question 1?",
		answers: ["a", "b", "c", "d"],
		correctAnswer: 0,
	},
	{
		question: "question 2?",
		answers: ["a", "b", "c", "d"],
		correctAnswer: 0,
	},
	{
		question: "question 3?",
		answers: ["a", "b", "c", "d"],
		correctAnswer: 0,
	},
	{
		question: "question 4?",
		answers: ["a", "b", "c", "d"],
		correctAnswer: 0,
	},
	{
		question: "question 5?",
		answers: ["a", "b", "c", "d"],
		correctAnswer: 0,
	},
	{
		question: "question 6?",
		answers: ["a", "b", "c", "d"],
		correctAnswer: 0,
	},
];

var currentQuestionIndex = 0;

function updateQuestion () {
	var currentQuestion = questions[currentQuestionIndex];

	questionEl.innerText = currentQuestion.question;
	answer1El.innerText = currentQuestion.answers[0];
	answer2El.innerText = currentQuestion.answers[1];
	answer3El.innerText = currentQuestion.answers[2];
	answer4El.innerText = currentQuestion.answers[3];

	// currentQuestionIndex++;
}

function checkAnswer (clickedAnswer) {
	var currentQuestion = questions[currentQuestionIndex];

	if (currentQuestion === null) {
			return;
	}

	if (currentQuestion.correctAnswer === clickedAnswer) {
			console.log("correct answer");
	}
	else {
			console.log("wrong answer");
	}

	currentQuestionIndex++;
	updateQuestion ();
}

answer1El.addEventListener("click", function () {
	checkAnswer(0);
});
answer2El.addEventListener("click", function () {
	checkAnswer(1);
});
answer3El.addEventListener("click", function () {
	checkAnswer(2);
});
answer4El.addEventListener("click", function () {
	checkAnswer(3);
});


updateQuestion();


// Seperate codes into different functions:

// init function to call when start quiz is clicked
// check right/wrong selection function
// check win / lose function
// render function to render elements based on user input
// function to setItem and or getItem from localStorage
// 


var timerCount = 15;

// timer function to control time
function startTimer() {
	timerEl.textContent = "Time: 15";

	// Sets timer
	timer = setInterval(function() {
		timerCount--;
		timerEl.textContent = "Time: " + timerCount;
		
		
		// Does not goes into negative time
		// if (timerCount >= 0) {
		// 	timerCount--;
		// }
		if (timerCount === 0) {
			// timerEl.innerText = 0;
			clearInterval(timer);
		}
	}, 1000);
}

startTimer();