/*-------------------------------- Constants --------------------------------*/
const ROWS = 6
const COLS = 5


/*---------------------------- Variables (state) -----------------------------*/
let mysteryWord 
let currentGuess
let currentRow
let gameOver

/*------------------------ Cached Element References -------------------------*/

const boardEl = document.querySelector("#board")
const keyboardEl = document.querySelector("#keyboard")
const messageEl = document.querySelector("#message")
const restartBin = document.querySelector("#restart-bin")

/*-------------------------------- Functions --------------------------------*/

function init() {
    mysteryWord = words[Math.floor(Math.random() * words.length)]

    currentGuess = ""
    currentRow = 0
    gameOver = false

    messageEl.textContent = "Good Luck!"
}

/*----------------------------- Event Listeners ------------------------------*/

init()