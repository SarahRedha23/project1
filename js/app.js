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
const restartBin = document.querySelector("#restart-btn")

/*-------------------------------- Functions --------------------------------*/

function init() {
    mysteryWord = words[Math.floor(Math.random() * words.length)]

    currentGuess = ""
    currentRow = 0
    gameOver = false

    messageEl.textContent = "Good Luck!"
}

function createBoard(){
    for(let row =0; row < ROWS; row++){
            for(let col = 0; col < COLS; col++){
            
             const tile = document.createElement("div")
             tile.classList.add("tile")
             boardEl.appendChild(tile)    
    }
        
    }
}

function handleKeyPress(event){
    console.log(event.key)
    if(gameOver){
        return
    }
    const key = event.key.toUpperCase()

     if(key === "BACKSPACE"){
        removeLetter()
     }else if(key === "ENTER"){
        submitGuess()
     } else if(key.length === 1 && key >= "A" && key <= "Z"){
        addLetter(key)
    }

}

function addLetter(letter){
    if (currentGuess.length >= COLS){
        return
    }
    currentGuess += letter
    updateBoard()
}

function updateBoard(){
    const tiles = boardEl.querySelectorAll(".tile")

    for(let index = 0; index < COLS; index++){
        const tileindex = currentRow * COLS + index
        tiles[tileindex].textContent = currentGuess[index] || ""
    }
}

function removeLetter(){
    if(currentGuess.length === 0){
        return
    }
    currentGuess = currentGuess.slice(0, -1)
    updateBoard()
}

function submitGuess(){
    if(currentGuess.length !== COLS){
        messageEl.textContent = "Word must be 5 letters"
        return
    }
    messageEl.textContent =    `You guessed ${currentGuess}`
}
/*----------------------------- Event Listeners ------------------------------*/

init()
createBoard()

document.addEventListener("keydown", handleKeyPress)