// script.js

let questions = [
    {
        prompt: `1. What is the primary function of a microprocessor?`,
        options: [
            "Memory Storage",
            "Input/Output Operations",
            "Executing Instructions",
            "Power Supply",
        ],
        answer: "Executing Instructions",
    },

    {
        prompt: `2. Which of the following microprocessors was the first 8-bit microprocessor?`,
        options: [
            "Intel 4004",
            "Intel 8008",
            "Zilog Z80",
            "Motorola 6800",

        ],
        answer: "Intel 8008",
    },

    {
        prompt: `3. What is the function of the Arithmetic Logic Unit (ALU) in a microprocessor?`,
        options: [
            "Memory Management",
            "Input/Output Operations",
            "Executing Instructions",
            "Performing Arithmetic and Logical Operations",


        ],
        answer: "Performing Arithmetic and Logical Operations",
    },

    {
        prompt: `1. Which of the following buses is used for data transfer in a microprocessor?`,
        options: [
            "Address Bus",
            "Data Bus",
            "Control Bus",
            "Instruction Bus",

            ],
        answer: "Data Bus",
    },

    {
        prompt: `5. What is the clock speed of a microprocessor measured in?`,
        options: [
            "Hertz (Hz)",
            "Kilohertz (kHz)",
            "Megahertz (MHz)",
            "Gigahertz (GHz)",

        ],
        answer: "Gigahertz (GHz)",
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

// quiz4's initial state
let currentQuestionIndex = 0;
let time = questions.length * 15;
let timerId;

// Start quiz4 and hide frontpage

function quiz4Start() {
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
        quiz4End();
    } else {
        getQuestion();
    }
}

// End quiz4 by hiding questions,
// Stop timer and show final score

function quiz4End() {
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

// End quiz4 if timer reaches 0

function clockTick() {
    time--;
    timerEl.textContent = time;
    if (time <= 0) {
        quiz4End();
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

// Start quiz4 after clicking start quiz4

startBtn.onclick = quiz4Start;