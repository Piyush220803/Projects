const questions = [
    {
        question: "What is the capital of Australia?",
        answers:[
            { text: "Sydney", correct: false},
            { text: "Melbourne", correct: false},
            { text: "Canberra", correct: true},
            { text: "Perth", correct: false},
        ]
    },
    {
        question: "Who is the author of the Harry Potter series?",
        answers: [
            { text: "J.K. Rowling", correct: true },
            { text: "Stephen King", correct: false },
            { text: "George R.R. Martin", correct: false },
            { text: "Dan Brown", correct: false },
        ]
    },
    {
        question: "What is the largest planet in our solar system?",
        answers: [
            { text: "Mars", correct: false },
            { text: "Jupiter", correct: true },
            { text: "Saturn", correct: false },
            { text: "Neptune", correct: false },
        ]
    },
    {
        question: "Who is the founder of Microsoft?",
        answers: [
            { text: "Bill Gates", correct: true },
            { text: "Steve Jobs", correct: false },
            { text: "Mark Zuckerberg", correct: false },
            { text: "Elon Musk", correct: false },
        ]
    },
    {
        question: "What is the chemical symbol for oxygen?",
        answers: [
            { text: "O", correct: true },
            { text: "H", correct: false },
            { text: "C", correct: false },
            { text: "N", correct: false },
        ]
    },
    {
        question: "Who painted the famous artwork 'The Starry Night'?",
        answers: [
            { text: "Vincent van Gogh", correct: true },
            { text: "Pablo Picasso", correct: false },
            { text: "Leonardo da Vinci", correct: false },
            { text: "Claude Monet", correct: false },
        ]
    }
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz(){
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

function showQuestion(){
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);

    });
}

function resetState(){
    nextButton.style.display = "none";
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e){
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if (isCorrect) {
        selectedBtn.classList.add("correct");
        score++;
    } else {
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach(button => {
        if (button.dataset.correct === "true") {
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}

nextButton.addEventListener("click", ()=>{
    if (currentQuestionIndex < questions.length) {
        handleNextButton();
    } else {
        startQuiz();
    }
})

function showScore(){
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";
}

function handleNextButton(){
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        showScore();
    }
}

startQuiz();