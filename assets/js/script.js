var main = document.querySelector("main");
var mainHeaderEl = document.querySelector("header");
var mainSection = document.querySelector("#main-section");
var viewHighScoreEl = document.getElementById("high-score");
var timerEl = document.getElementById("timer");

// Main game time 75 seconds.
var mainTimerCount = 75;
var currentQuestionIndex = 0;

// Stores questions in an array of objects
var questions = [
	{
		question: "Why so Javascript and Java have similar name?",
		answers: ["They both originated on the island of Java", 
		"JavasScript's syntax is loosley based on Java's", 
		"Both A and B", 
		"None of the above"],
		correctAnswer: 1,
	},
	{
		question: "Which is not valid data type in Javascript?",
		answers: ["Undefinded", "Boolean", "float", "Number"],
		correctAnswer: 2,
	},
	{
		question: "Purpose of designing the Javascript?",
		answers: ["To Perform Server Side Scripting Opertion",
		"To add interactivity to HTML Pages", 
		"To Style HTML Pages", 
		"All of the above"],
		correctAnswer: 3,
	},
	{
		question: "Which of the following function of Array object removes the last element from an array and returns that element?",
		answers: ["push()", "delete()", "pop()", "link()"],
		correctAnswer: 2,
	},
	{
		question: "What are the types of Pop up boxes available in JavaScript?",
		answers: ["Prompt", "Alert", "Confirm", "All of the above"],
		correctAnswer: 3,
	},
	{
		question: "Original Name of Javascript is?",
		answers: ["Mocha", "LiveScript", "Escript", "Javascript"],
		correctAnswer: 0,
	},
];

// Main render function to render the page based on parameter: startQuiz Or questions Or all done Or highscorespage
function render(toRender) {

	// var updateHighscore = false;

	// Render Start Quiz elments on initial load of the page
	if (toRender === "startQuiz") {
		viewHighScoreEl.textContent = "View Highscores";
		mainHeaderEl.textContent = "Coding Quiz Challenge";
		var intro = document.createElement("p");
		var startQuizBtn = document.createElement("button");

		intro.textContent = "Try to answer the following code-related questions within the time limit.\n Keep in mind that incorrect answers will penalize your score time by 6 seconds!";
		startQuizBtn.textContent = "Start Quiz";

		mainHeaderEl.setAttribute("class", "main-header");
		mainSection.setAttribute("class", "flex-column");
		intro.style.padding = "3rem";
		intro.style.maxWidth = "75%";
		startQuizBtn.style.width = "fit-content";
		startQuizBtn.style.alignSelf = "center";
		mainSection.append(intro);
		mainSection.append(startQuizBtn);

		startQuizBtn.addEventListener("click", function() {
			// Removes both intro and start quiz button elements on mouse click.
			intro.remove();
			startQuizBtn.remove();
			mainTimer ();
			render("questions");
		});
	}
	// Render questions when start Quiz button or answer is chosen
	else if (toRender === "questions"){
		// Render result page after all questions answered
		if (currentQuestionIndex === questions.length) {
			document.querySelector("ol").remove();
			return render("allDone");
		}

		// Assign question based on current index
		var currentQuestion = questions[currentQuestionIndex];
		mainHeaderEl.setAttribute("class", "sub-header");
		mainHeaderEl.textContent = currentQuestion.question;

		// Create 4 buttons with unique ID only when render questions for the first time
		if(currentQuestionIndex === 0) {
			var answerListEl = document.createElement("ol");
			var answer1El = document.createElement("button");
			var answer2El = document.createElement("button");
			var answer3El = document.createElement("button");
			var answer4El = document.createElement("button");

			// Append buttons to the main section and set style for them.
			mainSection.append(answerListEl);
		
			// Create 4 li element and append them under orderd list
			for (let i=0; i < 4; i++) {
				answerListEl.appendChild(document.createElement("li"));
			}
			const allLiEl = document.querySelectorAll("li");
			allLiEl[0].append(answer1El);
			allLiEl[1].append(answer2El);
			allLiEl[2].append(answer3El);
			allLiEl[3].append(answer4El);
			mainSection.setAttribute("class", "flex-column");
			// mainHeaderEl.setAttribute("class", "sub-header");
			answer1El.setAttribute("id", "answer1");
			answer2El.setAttribute("id", "answer2");
			answer3El.setAttribute("id", "answer3");
			answer4El.setAttribute("id", "answer4");

			// Add event listener to check answer
			answer1El.addEventListener("click", function () {
				// Call the check answer function
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

	// Assign answer text into each button
	answer1El.textContent = currentQuestion.answers[0];
	answer2El.textContent = currentQuestion.answers[1];
	answer3El.textContent = currentQuestion.answers[2];
	answer4El.textContent = currentQuestion.answers[3];
	}
	// Render result page by the end of questions or when timer is up
	else if (toRender === "allDone") {
		// Hide timer element, stops main timer, sent score to local storage
		clearInterval(gameTimer);
		let score = mainTimerCount;
		// Store score to local storage.
		localStorage.setItem("userScore", score);
		mainHeaderEl.textContent = "All done!";
		let pTag = document.createElement("p");
		mainSection.append(pTag);
		pTag.textContent = "Your final score is: " + localStorage.getItem("userScore");
		// Create form elements
		let form = document.createElement("form");
		let label = document.createElement("label");
		let input = document.createElement("input");
		let submit = document.createElement("button");
		let anchor = document.createElement("a");
		input.class= "text";
		input.placeholder = "initial";
		input.id = "initial";
		// Input validation check
		input.required = true;

		main.append(form);
		form.append(label, input, anchor);
		anchor.appendChild(submit);
		label.textContent = "Enter Initial: ";
		submit.textContent = "Submit";

		submit.addEventListener("click", function(event) {
			// Prevent browser default behaviour to store value properly to  local storage.
			event.preventDefault();

			let userInput = document.getElementById("initial").value;
			// // TO DO: not finalized yet, need to stop submit link to next page action on invalid input.
			// Input validation check
			if (userInput === "") {
				window.alert("Invalid input!");
				return userInput = document.getElementById("initial").value;
			}

			// Retrive from highscore from local storage if not empty.
			if (localStorage.getItem("highscores")) {
				var highscores = JSON.parse(localStorage.getItem("highscores"));
			}
			else {
				// Create empty object
				var highscores = {};
			}
	
			highscores[userInput] = score;

			// Convert highscores entries to an Array of arrays.
			let arrHighscores = Object.entries(highscores);

			// Sort the high scores based on score and assign to a variable.
			let sortedArrHighscores = arrHighscores.sort((a,b) => b[1] - a[1]);

			// Converting sorted Array of arrays high scores back to an object, to use stringify store in local storage properly.
			let objHighscores = Object.fromEntries(sortedArrHighscores);
			localStorage.setItem("highscores", JSON.stringify(objHighscores));

			// On click event, render a new page after all the above code finish running
			location.href = "highscores.html";
		});
		
	} // Render highscores page
	else if (toRender === "highscoresPage") {
		// If highscores contains record.
		// Change to sort only happens when a new highscore is captured
		if (localStorage.getItem("highscores")) {
			var highscores = JSON.parse(localStorage.getItem("highscores"));

			let ol = document.querySelector("ol");
			// Loop to render li item for each high score
			for (const key in highscores) {
				let li = document.createElement("li");
				li.style.padding = "6px";
				li.style.margin = "1em";
				ol.appendChild(li);
				li.textContent = `${key}` + " - " + `${highscores[key]}`;
			}

		}
		else {
			var highscores = {};
		}

		let clearHistory = document.querySelector("#clear-highscores");
		clearHistory.addEventListener("click", function() {
			// Confirmation box to confirm action
			let confirm = window.confirm("Select OK to clear all the high scores!");
			if (confirm) {
				localStorage.removeItem("highscores");
				// Refresh the page on click
				location.href = "highscores.html";
			}	
		});
	}
}

// check right/wrong selection function
function checkAnswer (clickedAnswer) {

	var currentQuestion = questions[currentQuestionIndex];
	var answerIsCorrect = false;

	// Render correct answer notification
	if (currentQuestion.correctAnswer === clickedAnswer) {
		answerIsCorrect = true;
	}
	else { // Render wrong notification and minus 6 seconds.
		answerIsCorrect = false;
		// check current time is bigger than 6, avoid minus score edge case
		if (mainTimerCount >= 6) {
			mainTimerCount -= 6;
		} else if (mainTimerCount < 6) {
			// Set mainTimerCount to 1 will display score and timer properly as 0, setting it to 0, will display -1 as score, of which should be avoided.
			mainTimerCount = 1;
		}
	}

	currentQuestionIndex++;
	notificationTimer(answerIsCorrect);
}

// main timer function to display game time
function mainTimer () {
	timerEl.textContent = "Time: " + mainTimerCount;

	// Sets timer
	gameTimer = setInterval(function() {
		mainTimerCount--;
		timerEl.textContent = "Time: " + mainTimerCount;
		// Does not goes into negative time
		// if (mainTimerCount >= 0) {
		// 	mainTimerCount--;
		// }
		if (mainTimerCount <= 0) {
			timerEl.textContent = "Time: 0";
			clearInterval(gameTimer);
			document.querySelector("ol").remove();
			render("allDone");
		}
	}, 1000);
}

// timer function to contorl notification display time
function notificationTimer(answerIsCorrect) {
	// Notification display time 1 seconds 
	let TimerCount = 1;

	let notificationEl = document.querySelector("#notification");
	notificationEl.setAttribute("style", "border-top: solid");


	// Jquery to select all buttons on page and disable them while notification is visible
	$( ":button").attr("disabled",true);

	// Display notification message
	if (answerIsCorrect) {
		notificationEl.textContent = notificationEl.dataset.correct;
	}
	else {
		notificationEl.textContent = notificationEl.dataset.wrong;
		// Scale and turns timer font to red on wrong answer
		timerEl.setAttribute("class", "timer-wrong");
	}

	Timer = setInterval(function() {
		TimerCount--;
		if (TimerCount === 0) {
			// Remove notification element
			notificationEl.textContent = "";
			notificationEl.setAttribute("style", "border-top: none");

			// Jquery to select all buttons on page and enable them after notification timer is done
			$( ":button").attr("disabled",false);

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
		render("highscoresPage");
	}
}

init();
