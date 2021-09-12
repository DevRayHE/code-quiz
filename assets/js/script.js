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

// Main render function to render the page based on user input
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
		clearInterval(mainTimer);
		let score = mainTimerCount;
		// Store score to local storage.
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
		anchor.setAttribute("class","button");
		// input.setAttribute("id", "initial");


		main.append(form);
		form.append(label, input, anchor);
		anchor.appendChild(submit);
		label.textContent = "Enter Initial: ";
		anchor.textContent = "Submit";
		anchor.setAttribute("class","button");
		// submit.textContent = "Submit";

		// let initial = document.getElementById("initial").value;
		// alert(initial);

		// function getInput(event) {
		// 	event.preventDefault();
		// 	let userInput = document.getElementById("initial").value;
		// 	return userInput;
		// }

		let initial = anchor.addEventListener("click", function(e) {
			// Prevent browser default behaviour to store value properly to  local storage.
			e.preventDefault();
			e.stopPropagation();
			let userInput = document.getElementById("initial").value;
			console.log("user input captured");

			// Retrive from highscore from local storage+ b
			// let highscoreIsEmpty = localStorage.getItem("highscores");

			if (localStorage.getItem("highscores")) {
				var highscores = JSON.parse(localStorage.getItem("highscores"));
				console.log("Get Item");
				console.log(highscores);
			}
			else {
				var highscores = {};
				console.log("Get item is empty");
			}
	
			console.log("userInput is captured as this: " + userInput);
			highscores[userInput] = score;
			console.log(highscores);

			localStorage.setItem("highscores", JSON.stringify(highscores));
			return highscores;
		});
		console.log(initial);

		// let highscores = JSON.parse(localStorage.getItem("highscores"));
		// console.log(highscores);
		
		
		// console.log(initial);

		// submit.addEventListener("click", function(event) {
		// 	event.preventDefault();
		// })
		
		// document.createElement("input");
		// main.appendChild(input);
		// <input class="text-input" id="initial" type="text" placeholder="Initial"></input>
	}
	else if (toRender === "highScorePage") {
		// If highscores contains record.
		if (localStorage.getItem("highscores")) {
			var highscores = JSON.parse(localStorage.getItem("highscores"));
			console.log("after parse: " + highscores);


			// Convert highscores entries to an Array of arrays.
			let arrHighscores = Object.entries(highscores);
			// arrHighscores = Object.entries(highscores);
			// arrHighscores = Object.entries(highscores);
			console.log("after  convert to array: " + arrHighscores);

			// Sort the high scores based on score and assign to a variable.
			console.log("before sort: " + arrHighscores);
			let sortedHighscores = arrHighscores.sort((a,b) => b[1] - a[1]);
			console.log("after sort: " + arrHighscores);

			console.log(sortedHighscores);
			console.log(typeof(sortedHighscores));
			localStorage.setItem("highscores", JSON.stringify(sortedHighscores));
			highscores = JSON.parse(localStorage.getItem("highscores"));
			console.log("updated local storage highscores should be sorted now: " + JSON.parse(localStorage.getItem("highscores")));

			let ol = document.querySelector("ol");
			// let strSortedHighscores = Object.entries(sortedHighscores);
			for (const key in highscores) {
				let li = document.createElement("li");
				ol.appendChild(li);
				// li.textContent = (parseInt(`${key}`) + 1)  + " - " + `${sortedHighscores[key]}`;
				li.textContent = `${key}` + " - " + `${highscores[key]}`;
				// console.log(`${key}`);
				// console.log(`${sortedHighscores[key]}`);
			}

			// let testObj = {
			// 	a: 22,
			// 	b: 33,
			// 	c: 44,
			// } 

			// for (const key in testObj) {
			// 	console.log(`${key}`);
			// 	console.log(`${testObj[key]}`);
			// }
		}
		else {
			var highscores = {};
		}

		let clearHistory = document.querySelector("#clear-highscores");
		clearHistory.addEventListener("click", function() {
			localStorage.removeItem("highscores");
			render("highScorePage");
		});
		
	}
}

function updateQuestion () {

	// Render result page after all questions answered
	console.log(questions.length);
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

	// Retrives current html file, and call function accordingly.
	let currentPage = location.href;

	if (currentPage.endsWith("index.html") || currentPage.endsWith("code-quiz/")) {
		console.log("current page is index html!");
		render("startQuiz");
	}
	else if (currentPage.endsWith("highscores.html") || currentPage.endsWith("highscores/")){
		console.log("current page is highscores html!");
		render("highScorePage");
	}
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
