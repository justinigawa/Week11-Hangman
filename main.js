var inquirer = require('inquirer');

var Game = require('./game.js');

var Word = require('./word.js');

var Letter = require('./letter.js');

var words = ["hola", "hi", "hey"];

var HangmanGame = function() {

    this.wordInPlay = null; // move to method setupGame
    this.lettersOfTheWord = [];
    this.matchedLetters = [];
    this.guessedLetters = [];
    this.guessesLeft = 0;
    this.totalGuesses = 0;
    this.letterGuessed = null;
    this.wins = 0;
    this.wordView = null; // temp test
    // this.letter = null; // temp test
    this.setupGame = function(wordsToPick) {
        this.wordInPlayObj = new Game(wordsToPick);
        this.wordInPlay = this.wordInPlayObj.wordRandom;
        this.lettersOfTheWord = this.wordInPlay.split('');
        this.wordviewObj = new Letter(this.lettersOfTheWord, this.matchedLetters);
        this.wordView = this.wordviewObj.wordView;
        this.processUpdateTotalGuesses();
        // },
    };
    this.updatePage = function(letter) {
        if (this.guessesLeft === 0) {
            this.restartGame();
            //console.log("over");
        } else {
            // this.updateGuesses(letter);
            this.guessesObj = new Word.UpdateGuesses(letter, this.guessedLetters, this.lettersOfTheWord, this.guessesLeft);
            this.letterGuessed = this.guessesObj.guessedLetter;
            this.guessedLetters.push(this.guessesObj.guessedLetter);
            this.guessesLeft = this.guessesObj.guessesLeft;
            // this.updateMatchedLetters(letter);
            this.matchedObj = new Word.UpdateMatchedLetters(letter, this.lettersOfTheWord, this.matchedLetters);
            this.matchedLetters.push(this.matchedObj.matchedLetter);
            this.wordviewObj = new Letter(this.lettersOfTheWord, this.matchedLetters);
            this.wordView = this.wordviewObj.wordView;
            if (this.updateWins() === true) {
                this.restartGame();
            }
        }
    };
    this.processUpdateTotalGuesses = function() {
        this.totalGuesses = this.lettersOfTheWord.length + 5;
        this.guessesLeft = this.totalGuesses;
    };

    this.restartGame = function() {
        // document.querySelector('#guessed-letters').innerHTML = '';
        this.wordInPlay = null;
        this.lettersOfTheWord = [];
        this.matchedLetters = [];
        this.guessedLetters = [];
        this.guessesLeft = 0;
        this.totalGuesses = 0;
        this.letterGuessed = null;
        this.setupGame();
        this.rebuildWordView();
    };

    this.updateWins = function() {

        if (this.matchedLetters.length === 0) {
            var win = false;
        } else {
            var win = true;
        }
        for (var i = 0; i < this.lettersOfTheWord.length; i++) {
            if (this.matchedLetters.indexOf(this.lettersOfTheWord[i]) == -1) {
                win = false;
            }
        }
        if (win === true) {
            this.wins = this.wins + 1;
            var audio = new Audio(this.wordsToPick[this.wordInPlay].preview);
            audio.play();
            return true;
        } else {
            return false;
        }
    };
};

var play = new HangmanGame();

play.setupGame(words);

var playCount = play.totalGuesses;

var count = 0;

var letsPlay = function() {

    if (count < playCount) {
        inquirer.prompt([{
            name: "name",
            message: "Hint: Ways of saying Hello" + "\n" + " Guesses Left: " + play.guessesLeft + "\n" + " The Word " + play.wordView + " Your Guess: "
        }]).then(function(answers) {
            play.updatePage(answers.name);
            count++;
            letsPlay();
        });
    } else {
        console.log('Game Over');

    }
};

letsPlay();
