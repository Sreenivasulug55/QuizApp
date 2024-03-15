let quizData = [
    {
        question: 'What is the capital of France?',
        options: ['Paris', 'London', 'Berlin', 'Madrid'],
        answer: 'Paris'
    },
    {
        question: 'Who directed the movie "The Shawshank Redemption"?',
        options: ['Steven Spielberg', 'Quentin Tarantino', 'Christopher Nolan', 'Frank Darabont'],
        answer: 'Frank Darabont'
    },
    {
        question: 'Who is the current president of the United States?',
        options: ['Barack Obama', 'Donald Trump', 'Joe Biden', 'George W. Bush'],
        answer: 'Joe Biden'
    },
    {
        question: 'Which famous playwright wrote "Romeo and Juliet"?',
        options: ['William Shakespeare', 'Arthur Miller', 'Tennessee Williams', 'Henrik Ibsen'],
        answer: 'William Shakespeare'
    },
    {
        question: 'Who is known as the "Iron Lady"?',
        options: ['Angela Merkel', 'Margaret Thatcher', 'Hillary Clinton', 'Theresa May'],
        answer: 'Margaret Thatcher'
    },
    {
        question: 'Which movie won the Academy Award for Best Picture in 2020?',
        options: ['Parasite', '1917', 'Joker', 'The Shape of Water'],
        answer: 'Parasite'
    },
    {
        question: 'Who invented the telephone?',
        options: ['Alexander Graham Bell', 'Thomas Edison', 'Nikola Tesla', 'Albert Einstein'],
        answer: 'Alexander Graham Bell'
    },
    {
        question: 'Which of the following is not a primary color?',
        options: ['Red', 'Yellow', 'Green', 'Blue'],
        answer: 'Green'
    }
];

let currentQuestion = 0;
let timeLeft = 60; // 60 seconds
let correctAnswers = 0;

const questionElement = document.getElementById('question');
const optionsElement = document.getElementById('options');
const timeElement = document.getElementById('time');
const startButton = document.getElementById('start-btn');
const startScreen = document.getElementById('start-screen');
const quizSection = document.getElementById('quiz-section');
const resultSection = document.getElementById('result-section');
const scoreElement = document.getElementById('score');

let timerInterval;

function startTimer() {
    timerInterval = setInterval(() => {
        timeLeft--;
        timeElement.innerText = timeLeft;
        if (timeLeft === 0) {
            clearInterval(timerInterval);
            alert('Time\'s up!');
            nextQuestion();
        }
    }, 1000);
}

function loadQuestion() {
    timeLeft = 60; // Reset timer for each question
    timeElement.innerText = timeLeft;
    startTimer();

    questionElement.innerText = quizData[currentQuestion].question;
    optionsElement.innerHTML = '';

    quizData[currentQuestion].options.forEach(option => {
        const button = document.createElement('button');
        button.innerText = option;
        button.classList.add('btn');
        button.classList.add('option-btn');
        button.addEventListener('click', () => selectOption(option));
        optionsElement.appendChild(button);
    });
}

function selectOption(option) {
    clearInterval(timerInterval);
    const optionButtons = document.querySelectorAll('.option-btn');
    optionButtons.forEach(btn => {
        btn.classList.remove('selected');
    });
    event.target.classList.add('selected');
    const selectedAnswer = event.target.innerText;
    checkAnswer(selectedAnswer);
}

function checkAnswer(selectedAnswer) {
    if (selectedAnswer === quizData[currentQuestion].answer) {
        correctAnswers++;
    }
    nextQuestion();
}

function nextQuestion() {
    clearInterval(timerInterval);
    currentQuestion++;
    if (currentQuestion < quizData.length) {
        loadQuestion();
    } else {
        displayResults();
    }
}

function displayResults() {
    quizSection.style.display = 'none';
    resultSection.style.display = 'block';
    scoreElement.innerText = `You scored ${correctAnswers} out of ${quizData.length} questions.`;
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

function startQuiz() {
    startScreen.style.display = 'none';
    quizSection.style.display = 'block';
    shuffleArray(quizData); // Shuffle the questions
    currentQuestion = 0;
    correctAnswers = 0;
    loadQuestion();
}

function exitQuiz() {
    clearInterval(timerInterval);
    const exitMessage = 'You have exited the quiz.';
    alert(exitMessage);
    document.body.innerHTML = `<div style="color: white; text-align: center; font-size: 24px; padding: 20px; border: 2px solid white; border-radius: 8px;">${exitMessage}</div>`;

}

function restartQuiz() {
    startScreen.style.display = 'block';
    resultSection.style.display = 'none';
}

startButton.addEventListener('click', startQuiz);