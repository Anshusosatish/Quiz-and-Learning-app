// script.js

let questions = [
    {
        prompt: `1. What is the default value of a boolean variable in Java?`,
        options: [
            "true",
            "false",
            "null",
            "undefined",
        ],
        answer: "false",
    },

    {
        prompt: `2. Which of the following Java data types is used to represent a whole number?`,
        options: [
            "int",
            "double",
            "float",
            "boolean",

        ],
        answer: "int",
    },

    {
        prompt: `3. What is the purpose of the "import" statement in Java??`,
        options: [
            "To declare variables",
            "To define methods",
            "To import packages",
            "To export packages",
        ],
        answer: "To import packages",
    },

    {
        prompt: `4. Which of the following Java operators is used for modulus operation?`,
        options: [
            "+",
            "-",
            "*",
            "%",


            ],
        answer:  "%",
    },

    {
        prompt: `1. What is the difference between "break" and "continue" statements in Java?`,
        options: [
            "'break' is used to exit a loop, while 'continue' is used to skip the current iteration",
            "'break' is used to skip the current iteration, while 'continue' is used to exit a loop",
            "'break' is used for switch statements, while 'continue' is used for loops",
            "'break' is used for loops, while 'continue' is used for switch statements",
        ],
        answer: "'break' is used to exit a loop, while 'continue' is used to skip the current iteration",
    },
];

// Get Dom Elements

let questionsEl =
    document.querySelector(
        "#questions"
    );
let timerEl =
    document.querySelector("#timer");
let choicesEl =
    document.querySelector("#options");
let submitBtn = document.querySelector(
    "#submit-score"
);
let startBtn =
    document.querySelector("#start");
let nameEl =
    document.querySelector("#name");
let feedbackEl = document.querySelector(
    "#feedback"
);
let reStartBtn =
    document.querySelector("#restart");

// quiz3's initial state
let currentQuestionIndex = 0;
let time = questions.length * 15;
let timerId;

// Start quiz3 and hide frontpage

function quiz3Start() {
    timerId = setInterval(
        clockTick,
        1000
    );
    timerEl.textContent = time;
    let landingScreenEl =
        document.getElementById(
            "start-screen"
        );
    landingScreenEl.setAttribute(
        "class",
        "hide"
    );
    questionsEl.removeAttribute(
        "class"
    );
    getQuestion();
}

// Loop through array of questions and
// Answers and create list with buttons
function getQuestion() {
    let currentQuestion =
        questions[currentQuestionIndex];
    let promptEl =
        document.getElementById(
            "question-words"
        );
    promptEl.textContent =
        currentQuestion.prompt;
    choicesEl.innerHTML = "";
    currentQuestion.options.forEach(
        function (choice, i) {
            let choiceBtn =
                document.createElement(
                    "button"
                );
            choiceBtn.setAttribute(
                "value",
                choice
            );
            choiceBtn.textContent =
                i + 1 + ". " + choice;
            choiceBtn.onclick =
                questionClick;
            choicesEl.appendChild(
                choiceBtn
            );
        }
    );
}

// Check for right answers and deduct
// Time for wrong answer, go to next question

function questionClick() {
    if (
        this.value !==
        questions[currentQuestionIndex]
            .answer
    ) {
        time -= 10;
        if (time < 0) {
            time = 0;
        }
        timerEl.textContent = time;
        feedbackEl.textContent = `Wrong answer! 
        ${questions[currentQuestionIndex].answer}.`;
        feedbackEl.style.color = "red";
    } else {
        feedbackEl.textContent =
            "Correct!";
        feedbackEl.style.color =
            "green";
    }
    feedbackEl.setAttribute(
        "class",
        "feedback"
    );
    setTimeout(function () {
        feedbackEl.setAttribute(
            "class",
            "feedback hide"
        );
    }, 2000);
    currentQuestionIndex++;
    if (
        currentQuestionIndex ===
        questions.length
    ) {
        quiz3End();
    } else {
        getQuestion();
    }
}

// End quiz3 by hiding questions,
// Stop timer and show final score

function quiz3End() {
    clearInterval(timerId);
    let endScreenEl =
        document.getElementById(
            "quiz-end"
        );
    endScreenEl.removeAttribute(
        "class"
    );
    let finalScoreEl =
        document.getElementById(
            "score-final"
        );
    finalScoreEl.textContent = time;
    questionsEl.setAttribute(
        "class",
        "hide"
    );
}

// End quiz3 if timer reaches 0

function clockTick() {
    time--;
    timerEl.textContent = time;
    if (time <= 0) {
        quiz3End();
    }
}

// Save score in local storage
// Along with users' name

function saveHighscore() {
    let name = nameEl.value.trim();
    if (name !== "") {
        let highscores =
            JSON.parse(
                window.localStorage.getItem(
                    "highscores"
                )
            ) || [];
        let newScore = {
            score: time,
            name: name,
        };
        highscores.push(newScore);
        window.localStorage.setItem(
            "highscores",
            JSON.stringify(highscores)
        );
        alert(
            "Your Score has been Submitted"
        );
    }
}

// Save users' score after pressing enter

function checkForEnter(event) {
    if (event.key === "Enter") {
        saveHighscore();
        alert(
            "Your Score has been Submitted"
        );
    }
}
nameEl.onkeyup = checkForEnter;

// Save users' score after clicking submit

submitBtn.onclick = saveHighscore;

// Start quiz3 after clicking start quiz3

startBtn.onclick = quiz3Start;