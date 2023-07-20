const alfabet = "abcdefghijklmnopqrstuvwxyz";
const maxLives = 5;
let livesCounter = maxLives;
const words = ["java", "html", "javascript", "css", "python"];
let wordToGuess = undefined;


window.addEventListener("DOMContentLoaded", () => {
    buildKeyboard();

    setLivesCounter(maxLives);

    const newGameButton = document.getElementById("newGame");
    newGameButton.addEventListener("click", newGame);
});

function setLivesCounter(counter) {
    const livesCounterElement = document.getElementById("livesCounter");
    livesCounter = counter;
    livesCounterElement.innerText = livesCounter;
}

function buildKeyboard() {
    const keyboard = document.getElementById("keyboard");
    for(const letter of alfabet){
        const keyButton = buildKey(letter);
        keyboard.appendChild(keyButton);
    }
}

function buildKey(letter){
    const keyButton = document.createElement("button");
    keyButton.innerText = letter;
    keyButton.classList.add("keyboardKey");
    return keyButton;
}

function newGame(){ 
    const wordIndex = getRandomInt(words.length - 1);
    wordToGuess = words[wordIndex];
    console.log(wordToGuess);
    let hiddenWord = document.getElementById ("hiddenWord");
    hiddenWord.innerHTML = "";
    for(const letter of wordToGuess){
        const letterBox = document.createElement("span");
        const letterParagraph = document.createElement("p");
        letterParagraph.classList.add("invisible");
        letterParagraph.innerText = letter;
        letterBox.appendChild(letterParagraph);
        hiddenWord.appendChild(letterBox);
    }
}

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}