import { WORDS } from "./word.js"

/*-------------------------------- Constants --------------------------------*/
const ROWS = 6
const COLS = 5

/*---------------------------- Variables (state) -----------------------------*/

let mysteryWord
let currentGuess = ""
let currentRow = 0
let gameOver = false

/*------------------------ Cached Element References -------------------------*/

const instructionsEl = document.querySelector("#instructions")
const howToPlayBtn = document.querySelector("#how-to-play-btn")
const boardEl = document.querySelector("#board")
const keyboardEl = document.querySelector("#keyboard")
const messageEl = document.querySelector("#message")
const restartBtn = document.querySelector("#restart-btn")

/*-------------------------------- Functions --------------------------------*/

howToPlayBtn.addEventListener("click", function(event) {
    event.preventDefault()
    instructionsEl.classList.toggle("hidden")
})

function init() {
    const randomIndex = Math.floor(Math.random() * WORDS.length)

    mysteryWord = WORDS[randomIndex].toUpperCase()
    currentGuess = ""
    currentRow = 0
    gameOver = false

    messageEl.textContent = "Good Luck!"
}

function handleKeyPress(event) {
    if (gameOver) {
        return
    }

    const key = event.key.toUpperCase()

    if (key === "BACKSPACE") {
        removeLetter()
    } else if (key === "ENTER") {
        submitGuess()
    } else if (key.length === 1 && key >= "A" && key <= "Z") {
        addLetter(key)
    }
}

function addLetter(letter) {
    if (currentGuess.length >= COLS) {
        return
    }

    currentGuess += letter
    updateBoard()
}

function updateBoard() {
    const tiles = boardEl.querySelectorAll(".tile")

    for (let index = 0; index < COLS; index++) {
        const tileIndex = currentRow * COLS + index

        tiles[tileIndex].textContent = currentGuess[index] || ""
    }
}

function removeLetter() {
    if (currentGuess.length === 0) {
        return
    }

    currentGuess = currentGuess.slice(0, -1)
    updateBoard()
}

function submitGuess() {
    if (currentGuess.length !== COLS) {
        messageEl.textContent = "Word must be 5 letters"
        return
    }

    if (!isValidWord()) {
        messageEl.textContent = "Not a valid word"
        currentGuess = ""
        updateBoard()
        return
    }
    const statuses = getLetterStatuses()
    updateTileColor(statuses)

    if (currentGuess === mysteryWord) {
        gameOver = true
        messageEl.textContent = "You won! 🎉"
        return
    }

    currentRow++
    currentGuess = ""

    if (currentRow === ROWS) {
        gameOver = true
        messageEl.textContent = `You lose! The word was ${mysteryWord}`
        return
    }

    messageEl.textContent = "Try again!"
}

function isValidWord() {
    return WORDS.includes(currentGuess.toLowerCase())
}

function getLetterStatuses() {
    const statuses = new Array(COLS).fill("absent")
    const mysteryLetters = mysteryWord.split("")

    // First pass: check for exact matches
    for (let i = 0; i < COLS; i++) {
        if (currentGuess[i] === mysteryWord[i]) {
            statuses[i] = "correct"
            mysteryLetters[i] = null
        }
    }

    // Second pass: check for letters in the wrong position
    for (let i = 0; i < COLS; i++) {
        if (statuses[i] === "correct") continue

        const foundIndex = mysteryLetters.indexOf(currentGuess[i])

        if (foundIndex !== -1) {
            statuses[i] = "present"
            mysteryLetters[foundIndex] = null
        }
    }

    return statuses
}

function updateTileColor(statuses){
    const tiles = boardEl.querySelectorAll(".tile") 
    for(let index = 0; index< COLS; index++){
        const tileIndex = currentRow * COLS + index
        tiles[tileIndex].classList.add(statuses[index])
    }
}



function restartGame() {
    const tiles = boardEl.querySelectorAll(".tile")

    tiles.forEach(function(tile) {
        tile.textContent = ""
        tile.className = "tile"
    })

    init()
}

function createKeyboard() {
    const keys = [
        "Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P",
        "A", "S", "D", "F", "G", "H", "J", "K", "L",
        "ENTER",
        "Z", "X", "C", "V", "B", "N", "M",
        "BACKSPACE"
    ]

    keys.forEach(function(key) {
        const button = document.createElement("button")

        button.textContent = key
        button.classList.add("key")

        keyboardEl.appendChild(button)
    })
}

function handleKeyboardClick(event) {
    if (gameOver) {
        return
    }

    const key = event.target.textContent

    if (key === "ENTER") {
        submitGuess()
    } else if (key === "BACKSPACE") {
        removeLetter()
    } else {
        addLetter(key)
    }
}



/*----------------------------- Event Listeners ------------------------------*/

init()
createKeyboard()

document.addEventListener("keydown", handleKeyPress)
restartBtn.addEventListener("click", restartGame)
keyboardEl.addEventListener("click", handleKeyboardClick)