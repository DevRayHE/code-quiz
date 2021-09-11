var main = document.querySelector("main");
var mainHeaderEl = document.querySelector("header");
var mainSection = document.querySelector("#main-section");
// document.querySelector("#question")
var viewHighScoreEl = document.getElementById("high-score");
var timerEl = document.getElementById("timer");
// var notificationEl = document.querySelectorAll(".notification");

// var mainHeaderEl = document.createElement("header");
// main.appendChild(mainHeaderEl);

// Main game time 75 seconds.
var mainTimerCount = 35;
var currentQuestionIndex = 0;

// Stores questions in an array of objects
var questions = [
	{
		question: "question 1?",
		answers: ["a", "b", "c", "d"],
		correctAnswer: 0,
	},
	{
		question: "question 2?",
		answers: ["a2", "b2", "c2", "d2"],
		correctAnswer: 0,
	},
	{
		question: "question 3?",
		answers: ["a3", "b3", "c3", "d3"],
		correctAnswer: 0,
	},
	{
		question: "question 4?",
		answers: ["a4", "b4", "c4", "d4"],
		correctAnswer: 0,
	},
	{
		question: "question 5?",
		answers: ["a5", "b5", "c5", "d5"],
		correctAnswer: 0,
	},
	{
		question: "question 6?",
		answers: ["a6", "b6", "c6", "d6"],
		correctAnswer: 0,
	},
];

// function init() {
// 	render("startQuiz");
// }

// render function to render elements based on user input
function render(toRender) {

	// Render Start Quiz elments on initial load of the page
	if (toRender === "startQuiz") {
		console.log("startquiz!");

		viewHighScoreEl.textContent = "View Highscores";
		mainHeaderEl.textContent = "Coding Quiz Challenge";
		var intro = document.createElement("p");
		var startQuizBtn = document.createElement("button");

		intro.innerText = "Try to answer the following code-related questions within the time limit.\n Keep in mind that incorrect answers will penalize your score time by 3 seconds!";
		startQuizBtn.innerText = "Start Quiz";

		mainHeaderEl.setAttribute("class", "main-header");
		mainSection.append(intro);
		mainSection.appendChild(startQuizBtn);
		// mainSection.append(startQuizBtn);

		startQuizBtn.addEventListener("click", function() {
			// Removes both intro and start quiz button elements on mouse click.
			mainSection.removeChild(intro);
			mainSection.removeChild(startQuizBtn);
			mainTimer ();
			render("questions");
		});
	}
	// Render questions when start Quiz button or answer is chosen
	else if (toRender === "questions"){
		updateQuestion();
	}
	// Render result page by the end of questions or timer is up
	else if (toRender === "result") {
		// Hide timer element, stops main timer, sent score to local storage
		timerEl.setAttribute("style", "display:none");
		clearInterval(mainTimer);
		let score = mainTimerCount;
		localStorage.setItem("score", score);
		mainHeaderEl.textContent = "All done!";
		mainSection.textContent = "Your final score is: " + localStorage.getItem("score");
		let form = document.createElement("form");
		let label = document.createElement("label");
		let input = document.createElement("input");
		let submit = document.createElement("button");
		let anchor = document.createElement("a");
		input.class= "text";
		input.placeholder = "initial";
		input.id = "initial";

		submit.href = "highscores.html";
		anchor.setAttribute("href", "highscores.html");
		// input.setAttribute("id", "initial");


		main.append(form);
		// form.appendChild(label);
		// form.appendChild(input);
		form.append(label, input, anchor);
		anchor.appendChild(submit);
		label.textContent = "Enter Initial: ";
		submit.textContent = "Submit";

		// let initial = document.getElementById("initial").value;
		// alert(initial);

		// function getInput(event) {
		// 	event.preventDefault();
		// 	let userInput = document.getElementById("initial").value;
		// 	return userInput;
		// }

		var initial = submit.addEventListener("click", function(event) {
			// event.preventDefault();
			let userInput = document.getElementById("initial").value;
			
			let highscores = {
				initialA: 44,
			};
	
			highscores[userInput] = score;
			console.log(highscores);

			localStorage.setItem("highscores", JSON.stringify(highscores));
			return userInput;
		});
		console.log(initial);

		let highscores = JSON.parse(localStorage.getItem("highscores"));
		
		
		// console.log(initial);

		// submit.addEventListener("click", function(event) {
		// 	event.preventDefault();
		// })
		
		// document.createElement("input");
		// main.appendChild(input);
		// <input class="text-input" id="initial" type="text" placeholder="Initial"></input>
	}
}

function updateQuestion () {

	// Render result page after all questions answered
	if (currentQuestionIndex === questions.length) {
		return render("result");
	}

	console.log("updatequestions function initiated!");
	var currentQuestion = questions[currentQuestionIndex];

	mainHeaderEl.innerText = currentQuestion.question;

	// Create 4 buttons with unique ID only when render questions for the first time
	if(currentQuestionIndex === 0) {
		var answer1El = document.createElement("button");
		var answer2El = document.createElement("button");
		var answer3El = document.createElement("button");
		var answer4El = document.createElement("button");

		// Append buttons to the main section and set style for them.
		mainSection.append(answer1El,answer2El,answer3El,answer4El);
		mainSection.setAttribute("class", "flex-column");
		mainHeaderEl.setAttribute("class", "sub-header");
		answer1El.setAttribute("id", "answer1");
		answer2El.setAttribute("id", "answer2");
		answer3El.setAttribute("id", "answer3");
		answer4El.setAttribute("id", "answer4");

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
	else {
		answer1El = document.getElementById("answer1");
		answer2El = document.getElementById("answer2");
		answer3El = document.getElementById("answer3");
		answer4El = document.getElementById("answer4");
	}

	console.log("index:" + currentQuestionIndex);
	// Assign answer text into each button
	answer1El.innerText = currentQuestion.answers[0];
	answer2El.innerText = currentQuestion.answers[1];
	answer3El.innerText = currentQuestion.answers[2];
	answer4El.innerText = currentQuestion.answers[3];

	// localStorage.setItem("answer1Btn",JSON.stringify(answer1El));

	// var testEl = JSON.parse(localStorage.getItem("answer1Btn"));
	// console.log(testEl)
}

// Function relation tree..... 
// init() {
// 	render() {
// 		if (S) {
// 			click event = > render() {

// 			}
// 		}
// 		else if(Q) {
// 			updateQuestion(Q) {
// 				click event => checkAnswer(clickedPosition) {
// 					notificationTimerFunc() {
// 						render(Q) {

// 						}
// 					}
// 				}
// 			}
// 		}

// 	}
// 	mainTimerFunc () {

// 	}
// }

// check right/wrong selection function
function checkAnswer (clickedAnswer) {
	// mainSection.removeChild(answer1El);
	var currentQuestion = questions[currentQuestionIndex];
	var answerIsCorrect = false;

	// if (currentQuestion === null) {
	// 	return;
	// }

	// Render correct answer notification
	if (currentQuestion.correctAnswer === clickedAnswer) {
		answerIsCorrect = true;
	}
	else { // Render wrong notification and minus 6 seconds.
		answerIsCorrect = false;
		mainTimerCount -= 6;
	}

	currentQuestionIndex++;
	console.log("checkanswer" + currentQuestionIndex);
	notificationTimer(answerIsCorrect);
}

// main timer function to control game time
function mainTimer () {
	timerEl.textContent = "Time: " + mainTimerCount;

	// Sets timer
	mainTimer = setInterval(function() {
		mainTimerCount--;
		timerEl.textContent = "Time: " + mainTimerCount;
		// Does not goes into negative time
		// if (mainTimerCount >= 0) {
		// 	mainTimerCount--;
		// }
		if (mainTimerCount <= 0) {
			timerEl.textContent = "Time: 0";
			clearInterval(mainTimer);
			render("result");
		}
	}, 1000);
}

// timer function to contorl notification display time
function notificationTimer(answerIsCorrect) {
	// Notification display time 1 seconds 
	console.log("noti" + currentQuestionIndex);
	let TimerCount = 1;
	// var notificationEl = document.createElement("div");
	// notificationEl.setAttribute("id", "notification");
	// main.appendChild(notificationEl);

	let notificationEl = document.querySelector("#notification");
	notificationEl.setAttribute("style", "border-top: solid");

	if (answerIsCorrect) {
		notificationEl.innerText = notificationEl.dataset.correct;
		// notificationEl.dataset.state = "visible";
		// notificationEl.setAttribute("data-state")
		// notificationEl.textContent = "Correct!";
		// console.log("correct answer");
	}
	else {
		notificationEl.innerText = notificationEl.dataset.wrong;
		// notificationEl.innerText = "Wrong!\n Minus 3 seconds!";
		// Scale and turns timer font to red on wrong answer
		timerEl.setAttribute("class", "timer-wrong");
		// console.log("wrong answer");
	}

	Timer = setInterval(function() {
		TimerCount--;
	
		if (TimerCount === 0) {
			// Remove notification element
			// main.removeChild(notificationEl);
			// mainSection.removeChild(answer1El);
			notificationEl.innerText = "";
			notificationEl.setAttribute("style", "border-top: none");

			// Reset timer font to normal
			timerEl.removeAttribute("class");
			render("questions");
			clearInterval(Timer);
			
		}
	}, 1000);
}

// init function to call when page is loaded
function init () {
	// var mainHeaderEl = document.createElement("header");
	// main.appendChild(mainHeaderEl);
	// viewHighScoreEl.textContent = "View Highscores";
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


// check win / lose function
// function to setItem and or getItem from localStorage
// 
