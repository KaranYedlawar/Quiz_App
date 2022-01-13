const startButton = document.getElementById('start-btn')
const nextButton = document.getElementById('next-btn')
const questionContainerElement = document.getElementById('question-container')
const questionElement = document.getElementById('question')
const answerButtonsElement = document.getElementById('answer-buttons')
let shuffleQuestions, currentQuestionIndex

startButton.addEventListener('click',startGame)
nextButton.addEventListener('click', () => {
    currentQuestionIndex++
    setNextQuestion()
})

function startGame() {
    console.log('Started')
    startButton.classList.add('hide')
    shuffleQuestions = questions.sort(() => Math.random() - .5)
    currentQuestionIndex = 0
    questionContainerElement.classList.remove('hide')
    setNextQuestion()
}

function setNextQuestion() {
    resetState()
    showQuestion(shuffleQuestions[currentQuestionIndex])
}

function showQuestion(question) {
    questionElement.innerText = question.question
    question.answers.forEach(answer => {
        const button = document.createElement('button')
        button.innerText = answer.text
        button.classList.add('btn')
        if(answer.correct) {
            button.dataset.correct = answer.correct
        }
        button.addEventListener('click', selectAnswer)
        answerButtonsElement.appendChild(button)
    })
}

function resetState() {
    clearStatusClass(document.body)
    nextButton.classList.add('hide')
    while (answerButtonsElement.firstChild) {
        answerButtonsElement.removeChild (answerButtonsElement.firstChild)
    }
}

function selectAnswer(e) {
    const selectedButton = e.target
    const correct = selectedButton.dataset.correct
    setStatusClass(document.body, correct)
    Array.from(answerButtonsElement.children).forEach(button => {
        setStatusClass(button, button.dataset.correct)
    })
    if(shuffleQuestions.length > currentQuestionIndex + 1) {
        nextButton.classList.remove('hide')
    } else {
        startButton.innerText = 'Restart'
        startButton.classList.remove('hide')
    }
}

function setStatusClass(element, correct) {
    clearStatusClass(element)
    if(correct) {
        element.classList.add('correct')
    } else {
        element.classList.add('wrong')
    }
}

function clearStatusClass(element){
    element.classList.remove('correct')
    element.classList.remove('wrong')
}

const questions = [
    {
        question: 'Q) Which programming language is used to create Ethereum?',
        answers: [
            { text:'C++', correct: false },
            { text:'Java', correct: false },
            { text:'JavaScript', correct: true },
            { text:'Python', correct: false }
        ]
    },
    {
        question: 'Q) RGB color is use to change the background color or text within HTML. what does RGB stand for?',
        answers: [
            { text:'Rust-Gilt-Bronze', correct: false },
            { text:'Red-Gray-Burgundy', correct: false },
            { text:'Rose-Gold-Brown', correct: false },
            { text:'Red-Green-Blue', correct: true }
        ]
    },
    {
        question: 'Q) An object that can be used in accessing another object, is known to be ',
        answers: [
            { text:'Pointer', correct: true },
            { text:'Arrays', correct: false },
            { text:'Structure', correct: false },
            { text:'Reference', correct: true }
        ]
    },
    {
        question: 'Q) In a linked list array, the object are referred to as',
        answers: [
            { text:'Instances', correct: false },
            { text:'Attributes', correct: false },
            { text:'Nodes', correct: true },
            { text:'Entity', correct: false }
        ]
    },
    {
        question: 'Q) A function or a mapping of inputs to outputs is called',
        answers: [
            { text:'Process', correct: false },
            { text:'Algorithm', correct: false },
            { text:'Program', correct: false },
            { text:'Problem', correct: true }
        ]
    }
]