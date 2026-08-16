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

const popupEl = document.querySelector("#game-popup")
const popupTitleEl = document.querySelector("#popup-title")
const popupMessageEl = document.querySelector("#popup-message")
const popupBtn = document.querySelector("#popup-btn")

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
        showPopup("Invalid Guess", "Word must be 5 letters")
        return
    }

    if (!isValidWord()) {
        showPopup("Invalid Guess", "That is not a valid word")
        currentGuess = ""
        updateBoard()
        return
    }

    const statuses = getLetterStatuses()
    updateTileColor(statuses)
    updateKeyboardColors(statuses)

    if (currentGuess === mysteryWord) {
        gameOver = true
        showPopup("You Won!", "You did it!", true)
        return
    }

    currentRow++
    currentGuess = ""

    if (currentRow === ROWS) {
        gameOver = true
        showPopup("You Lost", `The word was ${mysteryWord}`, true)
        return
    }
}



function isValidWord() {
    return WORDS.includes(currentGuess.toLowerCase())
}

function getLetterStatuses() {
    const statuses = new Array(COLS).fill("absent")
    const mysteryLetters = mysteryWord.split("")

   
    for (let i = 0; i < COLS; i++) {
        if (currentGuess[i] === mysteryWord[i]) {
            statuses[i] = "correct"
            mysteryLetters[i] = null
        }
    }

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

function updateKeyboardColors(statuses){
const rank = {
    absent:1,
     present:2,
      correct:3}

const buttons = keyboardEl.querySelectorAll(".key")

for(let index =0 ; index < COLS; index++){
    const letter = currentGuess[index]
    const newStatus = statuses[index]

     buttons.forEach(function(button)
{if (button.textContent !== letter) return 
    const currentStatus = button.dataset.status 
    if(!currentStatus || rank[newStatus] >  rank[currentStatus]){

 if(currentStatus){
    button.classList.remove(currentStatus)
 }
 button.classList.add(newStatus)
 button.dataset.status = newStatus
}
})
}
}



function restartGame() {
    const tiles = boardEl.querySelectorAll(".tile")
    const buttons = keyboardEl.querySelectorAll(".key")

    tiles.forEach(function(tile) {
        tile.textContent = ""
        tile.className = "tile"
    })

    buttons.forEach(function(button) {
        button.className = "key"
        button.dataset.status = ""
    })

    closePopup()
    init()
}

function createKeyboard() {
    const keys = [
        "Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P",
        "A", "S", "D", "F", "G", "H", "J", "K", "L",
        "Z", "ENTER", "X", "C", "V", "B", "N", "M","BACKSPACE"
    ]


    keys.forEach(function(key) {
        const button = document.createElement("button")

        button.textContent = key
        button.classList.add("key")

       if (key === "ENTER" || key === "BACKSPACE") {
            button.classList.add("wide-key")
        }

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

function showPopup(title, message, isGameOver= false) {
    popupTitleEl.textContent = title
    popupMessageEl.textContent = message

popupBtn.textContent = isGameOver? "Play Again" : "OK"

    popupEl.classList.remove("hidden")
}

function closePopup() {
    popupEl.classList.add("hidden")
}



/*----------------------------- Event Listeners ------------------------------*/

init()
createKeyboard()
showPopup("Good Luck!", "Try to guess the mystery word!")
document.addEventListener("keydown", handleKeyPress)
keyboardEl.addEventListener("click", handleKeyboardClick)

popupBtn.addEventListener("click", function(){
   if (gameOver){
 restartGame()
}else{
    closePopup()
}


})