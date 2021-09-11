var main = document.querySelector("main");
var mainHeaderEl = document.querySelector("header");
// document.querySelector("#question")
var timerEl = document.getElementById("timer");
var viewHighScoreEl = document.getElementById("high-score");
var notificationEl = document.getElementById("notification");

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


// render function to render elements based on user input
function render(toRender) {
	// Render Start Quiz elments on initial load of the page
	if (toRender === "startQuiz") {
		console.log("startquiz!");
		mainHeaderEl.textContent = "Coding Quiz Challenge";
		var intro = document.createElement("p");
		var startQuizBtn = document.createElement("button");

		intro.innerText = "Try to answer the following code-related questions within the time limit.\n Keep in mind that incorrect answers will penalize your score time by 3 seconds!";
		startQuizBtn.textContent = "Start Quiz";

		main.append(intro);
		main.append(startQuizBtn);

		startQuizBtn.setAttribute("style", "justify-content: end");

		startQuizBtn.addEventListener("click", function() {
			// Removes both intro and start quiz button elements.
			main.removeChild(intro, startQuizBtn);
			main.removeChild(startQuizBtn);
			render("questions");
		});
	}
	// Render questions when start Quiz button or answer is chosen
	else if (toRender === "questions"){
		updateQuestion();
	}
	// Rdner all done elements by the end of questions or timer is up
	else if (toRender === "allDone") {
		mainHeaderEl.textContent = "All done!";
	}
}

function updateQuestion () {
	console.log("updatequestions function initiated!");
	var currentQuestion = questions[currentQuestionIndex];

	mainHeaderEl.innerText = currentQuestion.question;

	// var answer1El = document.getElementById("answer1");
	// var answer2El = document.getElementById("answer2");
	// var answer3El = document.getElementById("answer3");
	// var answer4El = document.getElementById("answer4");

	// Create 4 buttons with unique ID.
	var answer1El = document.createElement("button");
	var answer2El = document.createElement("button");
	var answer3El = document.createElement("button");
	var answer4El = document.createElement("button");
	answer1El.setAttribute("id", "answer1");
	answer2El.setAttribute("id", "answer2");
	answer3El.setAttribute("id", "answer3");
	answer4El.setAttribute("id", "answer4");

	// Append buttons to the main tag
	main.append(answer1El, answer2El, answer3El, answer4El);

	// Assign answer text into each button
	answer1El.innerText = currentQuestion.answers[0];
	answer2El.innerText = currentQuestion.answers[1];
	answer3El.innerText = currentQuestion.answers[2];
	answer4El.innerText = currentQuestion.answers[3];

	mainHeaderEl.setAttribute("class", "sub-header");
	// answer1El.setAttribute("class", "button");
	// answer2El.setAttribute("class", "button");
	// answer3El.setAttribute("class", "button");
	// answer4El.setAttribute("class", "button");
	// currentQuestionIndex++;


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
}



// check right/wrong selection function
function checkAnswer (clickedAnswer) {
	var currentQuestion = questions[currentQuestionIndex];
	var answerIsCorrect = false;

	if (currentQuestion === null) {
		return;
	}

	// Render correct answer notification
	if (currentQuestion.correctAnswer === clickedAnswer) {
		answerIsCorrect = true;
	}
	else { // Render wrong notification and minus 3 seconds.
		answerIsCorrect = false;
		mainTimerCount -= 3;
	}

	// renderNotification(clickedAnswer);
	notificationTimer(answerIsCorrect);
	currentQuestionIndex++;
}

// init function to call when page is loaded
function init() {
	render("startQuiz");
}

init();
// updateQuestion();

// function renderNotification(correctAnswer) {
// 	if(correctAnswer) {
// 		notificationEl.textContent = "Correct!";
// 		console.log("correct answer");
// 	}
// 	else {
// 		notificationEl.innerText = "Wrong!\n Minus 3 seconds!"
// 		console.log("wrong answer");
// 	}
// }


// Seperate codes into different functions:


// check win / lose function
// function to setItem and or getItem from localStorage
// 

// Main game time 75 seconds.
var mainTimerCount = 35;

// main timer function to control game time
function mainTimer() {
	timerEl.textContent = "Time: " + mainTimerCount;

	// Sets timer
	timer = setInterval(function() {
		mainTimerCount--;
		timerEl.textContent = "Time: " + mainTimerCount;
		// Does not goes into negative time
		if (mainTimerCount >= 0) {
			mainTimerCount--;
		}
		if (mainTimerCount <= 0) {
			// timerEl.innerText = 0;
			clearInterval(timer);
		}
	}, 1000);
}

mainTimer();

// timer function to contorl notification display time
function notificationTimer(answerIsCorrect) {
	// Notification display time 2 seconds or if questions refreshes.
	var notificationTimerCount = 2;

	timer = setInterval(function() {
		notificationTimerCount--;

		if (answerIsCorrect) {
			notificationEl.textContent = "Correct!";
			console.log("correct answer");
		}
		else {
			notificationEl.innerText = "Wrong!\n Minus 3 seconds!";
			console.log("wrong answer");
		}

		if (notificationTimerCount === 0) {
			notificationEl.textContent = "";
			main.removeChild(answer1El);
			render ("question");
			clearInterval(timer);
		}
	}, 1000);
	// Only update question at the end of notification display
	
}