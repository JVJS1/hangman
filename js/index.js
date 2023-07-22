const alfabet = "abcdefghijklmnopqrstuvwxyz";
const maxLives = 10;
let livesCounter = maxLives;
const winMessage = "Congratulaions! You won!";
const loseMessage = "I'm sorry... You're out of lives...";
const words = ["java", "html", "javascript", "css", "python"];
let guesses = [];
let wordToGuess = undefined;


window.addEventListener("DOMContentLoaded", () => {
    buildKeyboard();

    setLivesCounter(maxLives);

    newGame();

    const newGameButton = document.getElementById("newGame");
    newGameButton.addEventListener("click", newGame);

    const hintButton = document.getElementById("hint");
    hintButton.addEventListener("click", displayHint);
});

function displayHint() {
    const remainingLetters = [];
    for (const letter of wordToGuess) {
        if (!guesses.includes(letter)){
            remainingLetters.push(letter);
        }
    }
    const hintIndex = getRandomInt(remainingLetters.length);

    const hintContainer = document.getElementById("hintContainer");
    hintContainer.innerText = `Your hint is: ${remainingLetters[hintIndex]}`;
    const hintButton = document.getElementById("hint");
    hintButton.disabled = true;
}

function setLivesCounter(counter) {
    const livesCounterElement = document.getElementById("livesCounter");
    livesCounter = counter;
    livesCounterElement.innerText = livesCounter;
}

function buildKeyboard() {
    const keyboard = document.getElementById("keyboard");
    for(const letter of alfabet){
        const keyButton = buildKey(letter);
        keyButton.addEventListener("click", () => {
            keyButton.disabled = true;
            guess(letter)
        });
        keyboard.appendChild(keyButton);
    }
}

function guess(char) {
    guesses.push(char);
    const winLoseSection = document.getElementById("winLose");
    if (wordToGuess.includes(char)) {
        // actualizam cuvantul de pe pagina
        updateHiddenWord();
        if (isGameWon()) {
            // informeaza userul ca a castigat
            winLoseSection.innerText = winMessage;
        }
    } else {
        // actualizam vietile ramase
        setLivesCounter(livesCounter - 1);
        if (livesCounter < 1) {
            // informeaza userul ca a pierdut
            winLoseSection.innerText = loseMessage;
        }
    }
}

function isGameWon() {
    for (const letter of wordToGuess) {
        if (!guesses.includes(letter)) {
            return false;
        }
    }

    return true;
}

function updateHiddenWord() {
    let hiddenWord = document.getElementById ("hiddenWord");
    hiddenWord.innerHTML = "";
    for(const letter of wordToGuess){
        const letterBox = document.createElement("span");
        const letterParagraph = document.createElement("p");
        if (!guesses.includes(letter)) {
            letterParagraph.classList.add("invisible");
        }        
        letterParagraph.innerText = letter;
        letterBox.appendChild(letterParagraph);
        hiddenWord.appendChild(letterBox);
    }
}

function buildKey(letter){
    const keyButton = document.createElement("button");
    keyButton.innerText = letter;
    keyButton.classList.add("keyboardKey");
    return keyButton;
}

function newGame(){ 
    guesses = [];
    setLivesCounter(maxLives);
    const wordIndex = getRandomInt(words.length);
    wordToGuess = words[wordIndex];
    // goleste html-ul pentru cuvantul ghicit
    let hiddenWord = document.getElementById ("hiddenWord");
    hiddenWord.innerHTML = "";
    // goleste html-ul pentru mesajul win/lose
    const winLoseSection = document.getElementById("winLose");
    winLoseSection.innerHTML = "";
    // alege un cuvant aleator pentru ghicit si creaza html-ul pentru linii
    for(const letter of wordToGuess){
        const letterBox = document.createElement("span");
        const letterParagraph = document.createElement("p");
        letterParagraph.classList.add("invisible");
        letterParagraph.innerText = letter;
        letterBox.appendChild(letterParagraph);
        hiddenWord.appendChild(letterBox);
    }
    // todo: reset hint button, reset hint message
    const hintButton = document.getElementById("hint");
    hintButton.disabled = false;
    const hintContainer = document.getElementById("hintContainer");
    hintContainer.innerHTML = "";
    resetKeyboard();
}

function resetKeyboard() {
    const keyboard = document.getElementById("keyboard");
    for (const child of keyboard.children) {
        child.disabled = false;
    }
}

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}