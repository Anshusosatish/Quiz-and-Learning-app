// script.js

let questions = [
    {
        prompt: `1. What is the basic building block of a regular expression?`,
        options: [
            "Alphabet",
            "String",
            "Language",
            "Token",

        ],
        answer: "Alphabet",
    },

    {
        prompt: `2. Which of the following is a type of automaton?
`,
        options: [
            "Finite Automaton (FA)",
            "Pushdown Automaton (PDA)",
            "Turing Machine (TM)",
            "All of the above",
        ],
        answer: "All of the above",
    },

    {
        prompt: `1. What is the purpose of the transition function in a finite automaton?`,
        options: [
            "To define the language accepted by the automaton",
            "To specify the next state based on the current state and input symbol",
            "To determine the output of the automaton",
            "To specify the initial state of the automaton",
        ],
        answer: "To specify the next state based on the current state and input symbol",
    },

    {
        prompt: `4. Which of the following is a property of a regular language?`,
        options: [
            "It can be recognized by a finite automaton",
            "It can be recognized by a pushdown automaton",
            "It can be recognized by a Turing machine",
            "It is not recognizable by any automaton",

            ],
        answer: "It can be recognized by a finite automaton",
    },

    {
        prompt: `5. Which of the following is a type of grammar?
`,
        options: [
            "Regular grammar",
            "Context-free grammar",
            "Context-sensitive grammar",
            "All of the above",

        ],
        answer: "All of the above",
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

// quiz6's initial state
let currentQuestionIndex = 0;
let time = questions.length * 15;
let timerId;

// Start quiz6 and hide frontpage

function quiz6Start() {
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
        quiz6End();
    } else {
        getQuestion();
    }
}

// End quiz6 by hiding questions,
// Stop timer and show final score

function quiz6End() {
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

// End quiz6 if timer reaches 0

function clockTick() {
    time--;
    timerEl.textContent = time;
    if (time <= 0) {
        quiz6End();
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

// Start quiz6 after clicking start quiz6

startBtn.onclick = quiz6Start;