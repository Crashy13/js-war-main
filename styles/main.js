const names = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A']
const suits = ['Hearts', 'Diamonds', 'Spades', 'Puppypaws']
const values = [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14]


function Cards(suits, values, names) {
  this.suits = suits,
  this.values = values
  this.names = names
}

function Deck() {
  newDeck = [];
  for(i = 0; i < suits.length; i++) {
    for(j = 0; j < values.length; j++) {
      newDeck.push(new Cards(suits[i], values[j], names[j]))
    }
  }
  return newDeck
}
let playDeck = new Deck();

function shuffle(deck) {
  i = 0;
  j = 0;
    for(i = 0; i < deck.length; i++) { // loops through the deck called
      j = Math.floor(Math.random() * deck.length); // selects a random number and multiplies it by the length of the deck then rounds it down to a whole number
      temp = deck[i];
      deck[i] = deck[j];
      deck[j] = temp // swap around the "cards" to create an array with objects in a different order
  }
  return deck
}
////////////////////////////////////////////////////////////////////////////////
function Deal () {

}


function Player(name) {
  this.name = name
  this.hand = []
}


function Game({player1, player2} = {}) {
  this.player1 = player1,
  this.player2 = player2
}

let player1 = prompt('What is your name?');
let player2 = prompt('WHat is your name?');

let game = new Game({player1, player2});

console.log(game.player1);
console.log(game.player2);
