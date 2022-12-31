//Access element using class
const viewHighScore = document.querySelector('.view_highscores');
const timeEl = document.querySelector('.timer');
const description = document.querySelector('.description');
const startBtn = document.querySelector('.start_button');
const quiz = document.querySelector('.quiz');
const askQuestion = document.querySelector('.questions');
const answerChoice = document.querySelectorAll('.multiple_choice');
const checkAnswer = document.querySelector('.check_answer');
const completedQuiz = document.querySelector('.completed_quiz');
const finalScore = document.querySelector('.final_score')
const finish = document.querySelector('.finish');
const highScores = document.querySelector('.high_scores');
const scoreList = document.querySelector('.score_list');
const submitBtn = document.querySelector('.submit_button');
const backBtn = document.querySelector('.back_btn');
const clearBtn = document.querySelector('.clear_btn');

//Access element using id
const answer1 = document.querySelector('#answer1');
const answer2 = document.querySelector('#answer2');
const answer3 = document.querySelector('#answer3');
const answer4 = document.querySelector('#answer4');
const initialsInput = document.querySelector('#initials');

//Question bank for the coding quiz challenge
let quizQuestions = [
    {
        question: 'Which of the following IS NOT a JavaScript Data Type?',
        choices: ['1. undefined', '2. number', '3. boolean', '4. float'],
        answer: '4'
    },
    {
        question: 'which of the following IS A VALID type of function javascript supports?',
        choices: ['1. named function', '2. anonymous function', '3. both of the above', '4. none of the above'],
        answer: '3'
    },
    {
        question: 'Arrays in JavaScript can be used to store _______.',
        choices: ['1. numbers and strings', '2. other arrays', '3. booleans', '4. all of the above'],
        answer: '4'
    },
    {
        question: 'String values must be enclosed within _______ when being assigned to variables.',
        choices: ['1. commas', '2. curly brackets', '3. quotes', '4. parenthesis'],
        answer: '3'
    },
    {
        question: 'Javascript is an _______ language?',
        choices: ['1. Object-Oriented', '2. Object-based', '3. Procedural', '4. None of the above'],
        answer: '1'
    },
    {
        question: 'Which of the following is used to define a variable in Javascript?',
        choices: ['1. var', '2. const', '3. let', '4. All of the above'],
        answer: '4'
    }
];

let scores = [];
let questionNumber = 0;
let questionCount = 1;
//Set timer to 60 seconds
let timeLeft = 60;

function setTime() {
    //Sets interval in variable
    let timerInterval = setInterval(function () {
        timeLeft--;
        timeEl.textContent = 'Time: ' + timeLeft;

        if (timeLeft == 0) {
            //Stops execution of action at set interval
            clearInterval(timerInterval);
            //Sets h1 element to 'Time is up!'
            finish.textContent = 'Time is up!';
            //Calls gameOver to display the final score of 0
            gameOver();
        } else if (questionCount >= quizQuestions.length + 1) {
            //Stops execution of action at set intervel
            clearInterval(timerInterval);
            //Calls gameOver to display the final score
            gameOver();
        }
    }, 1000);
};

function startQuiz() {
    description.style.display = 'none';
    //Displays first question
    quiz.style.display = 'block';
    questionNumber = 0;
    //Starts timer
    setTime();
    showQuestion(questionNumber);
};

//Shows question with their respective answer choices
function showQuestion(n) {
    askQuestion.textContent = quizQuestions[n].question;
    answer1.textContent = quizQuestions[n].choices[0];
    answer2.textContent = quizQuestions[n].choices[1];
    answer3.textContent = quizQuestions[n].choices[2];
    answer4.textContent = quizQuestions[n].choices[3];
    questionNumber = n;
};

//Add click event to startBtn element to start the timer and display the first question
startBtn.addEventListener('click', startQuiz);

//Tells the user if they answered the question correct or wrong
function checkAnswerChoice(event) {
    event.preventDefault();
    //Displays the check_answer section
    checkAnswer.style.display = 'block';
    //Line stops displaying after 1 second
    setTimeout(function () {
        checkAnswer.style.display = 'none';
    }, 1000);

    //Tests if correct answer condition is met 
    if (quizQuestions[questionNumber].answer === event.target.value) {
        checkAnswer.textContent = 'Correct 😃!';
    } else {
        checkAnswer.textContent = 'Incorrenct 😟!';
        //10 second penalty for wrong answers
        timeLeft = timeLeft - 10;
    };

    if (questionNumber < quizQuestions.length - 1) {
        showQuestion(questionNumber + 1);
    } else {
        gameOver();
    }

    questionCount++;
};

//Displays the users score 
function gameOver() {
    quiz.style.display = 'none';
    completedQuiz.style.display = 'block';
    timeLeft = timeLeft < 0 ? 0 : timeLeft;
    finalScore.textContent = 'Your final score is ' + timeLeft + '.';
}

//Add click event for answerChoice element to call checkAnswerChoice function
answerChoice.forEach(function (click) {
    click.addEventListener('click', checkAnswerChoice);
});


//Renders initials and scores into a score list as <li> elemenets
function renderScores() {
    scoreList.innerHTML = '';
    scoreList.style.display = 'block';

    let highScores = sort();

    //Render new li for each score
    for (let i = 0; i < scores.length; i++) {
        let highScore = highScores[i];

        let li = document.createElement('li');
        li.textContent = highScore.initials + ' - ' + highScore.score;
        li.setAttribute('data-index', i);
        li.style.backgroundColor = 'rgb(' + [210, 186, 236, 0.531].join(',') + ')';
        scoreList.appendChild(li);
    };

    init();
};

function init() {
    //Retrieve stored scores from local storage
    let storedScores = JSON.parse(localStorage.getItem('scores'));

    //If stored value exists, set scores to those values
    if (storedScores !== null) {
        scores = storedScores;
    } else {
        //If stored value doesn't exist, set scores to an empty array
        scores = [];
    };
    return scores;
};

//Sort scores from highest to lowest
function sort() {
    let unsortedList = init();
    //If scores from init function doesn't exist, exit function 
    if (init == null) {
        return;
    } else {
        //Sort scores from highest value to lowest
        unsortedList.sort(function (a, b) {
            return b.score - a.score;
        })

        return unsortedList;
    };
};

//Store scores and initials to local storage 
function storeScores() {
    //Save initials and score values to highScore
    let highScore = {
        initials: initialsInput.value.trim(),
        score: timeLeft
    };

    //If highScore doesn't exist, exit function
    if (highScore === '') {
        return;
    };

    //Push highScore values to scores array
    scores.push(highScore);

    //Stringify and set key in localStorage to scores array
    localStorage.setItem('scores', JSON.stringify(scores));
    renderScores();
};

//Add click event to submitBtn element
submitBtn.addEventListener('click', function (event) {
    event.preventDefault();
    completedQuiz.style.display = 'none';
    //Displays high scores
    highScores.style.display = 'block';
    //Calls storeScores to push data to localStorage
    storeScores();
});

//Calls init to retrieve data and render it to the page on load
init();

//Add click event to viewHighscore element
viewHighScore.addEventListener('click', function (event) {
    event.preventDefault();
    description.style.display = 'none';
    quiz.style.display = 'none';
    completedQuiz.style.display = 'none';
    checkAnswer.style.display = 'none';
    //Displays high scores
    highScores.style.display = 'block';
    //Re-renders the high score list
    renderScores();
});

//Add click event to backBtn element
backBtn.addEventListener('click', function (event) {
    event.preventDefault();
    //Go back to main page
    location.reload();
});

//Add click event to clearBtn element
clearBtn.addEventListener('click', function (event) {
    event.preventDefault();
    //Clears data from localStorage
    localStorage.clear();
    //Re-renders the high score list
    renderScores();
});