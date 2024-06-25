var words = [
    { word: "pen", hint: "Hint: It's used for writing." },
    { word: "book", hint: "Hint: You read this." },
    { word: "flower", hint: "Hint: It's a colorful plant." },
    { word: "tree", hint: "Hint: It's a tall plant with a trunk." },
    { word: "meat", hint: "Hint: It's food from animals." }
];

var secretWordObj, secretWord, hint;
var letterBoxContainer = document.getElementById('letterBoxContainer');
var guessButton = document.getElementById('guessButton');
var message = document.getElementById('message');
var hintElement = document.getElementById('hint');
var resetButton = document.getElementById('resetButton');
var timerElement = document.getElementById('timer');
var timer;
var guessLimit = 3;
var guessesRemaining = guessLimit;

function initializeGame() {
    var randomIndex = Math.floor(Math.random() * words.length);
    secretWordObj = words[randomIndex];
    secretWord = secretWordObj.word;
    hint = secretWordObj.hint;

    hintElement.textContent = hint;

    var letterBoxes = '';
    for (var i = 0; i < secretWord.length; i++) {
        letterBoxes += '<div class="letter-box"><input type="text" maxlength="1"></div>';
    }
    letterBoxContainer.innerHTML = letterBoxes;

    message.textContent = '';
    guessesRemaining = guessLimit;

    guessButton.style.display = 'inline-block';
    resetButton.style.display = 'none';

    guessButton.disabled = false;

    startTimer();
}

function startTimer() {
    var timeLeft = 30;
    timerElement.textContent = timeLeft;

    timer = setInterval(function() {
        timeLeft--;
        timerElement.textContent = timeLeft;

        if (timeLeft <= 0) {
            clearInterval(timer);
            finishGame("Time's up! The correct answer was \"" + secretWord + "\".");
        }
    }, 1000);
}

function finishGame(messageText) {
    clearInterval(timer);
    guessButton.disabled = true;
    message.textContent = messageText;
    resetButton.style.display = 'inline-block';
}

guessButton.addEventListener('click', function() {
    var letterInputs = letterBoxContainer.querySelectorAll('.letter-box input');
    var guess = '';

    letterInputs.forEach(function(input) {
        guess += input.value.toLowerCase();
    });

    if (guess === secretWord) {
        finishGame('Congratulations! You guessed the word correctly.');
    } else {
        guessesRemaining--;
        message.textContent = `Sorry, incorrect guess. ${guessesRemaining} guesses remaining.`;

        if (guessesRemaining === 0) {
            finishGame('Guesses finished. Try again!');
        }
    }
});

resetButton.addEventListener('click', function() {
    initializeGame();
});

initializeGame();
