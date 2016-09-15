
// pseudo - constructor which would create a ChosenWord object with the argument from the main.js setupGame.
var ChosenWord = function(wordsToPick){
	this.wordRandom = wordsToPick[Math.floor(Math.random() * wordsToPick.length)];
};

module.exports = ChosenWord;


