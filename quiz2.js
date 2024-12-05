// script.js

let questions = [
    {
        prompt: `1.What is the time complexity of Binary Search?`,
        options: [
            "O(n)",
            "O(log n)",
            "O(n log n)",
            "O(1)",
,
        ],
        answer: "O(log n)",
    },

    {
        prompt: `2. Which algorithm is used for finding the shortest path in a graph?`,
        options: [
            "Depth-First Search (DFS)",
            "Breadth-First Search (BFS)",
            "Dijkstra's algorithm",
            "Bellman-Ford algorithm",
        ],

        answer: "Dijkstra's algorithm",
    },

    {
        prompt: `3.What is the worst-case time complexity of QuickSort?`,
        options: [
            "O(n log n)",
            "O(n^2)",
            "O(n)",
            "O(log n)",
        ],
        answer: "O(n^2)",
    },

    {
        prompt: `4.Which data structure is used for implementing a stack?`,
        options: [
            "Array",
            "Linked List",
            "Tree",
            "Graph",
        ],
        answer: "Linked List",
    },

    {
        prompt: `5. What is the time complexity of Merge Sort?`,
        options: [
            "O(n log n)",
            "O(n^2)",
            "O(n)",
            "O(log n)",
        ],
        answer: "O(n log n)",
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

// quiz2's initial state
let currentQuestionIndex = 0;
let time = questions.length * 15;
let timerId;

// Start quiz2 and hide frontpage

function quiz2Start() {
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
        quiz2End();
    } else {
        getQuestion();
    }
}

// End quiz2 by hiding questions,
// Stop timer and show final score

function quiz2End() {
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

// End quiz2 if timer reaches 0

function clockTick() {
    time--;
    timerEl.textContent = time;
    if (time <= 0) {
        quiz2End();
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

// Start quiz2 after clicking start quiz2

startBtn.onclick = quiz2Start;