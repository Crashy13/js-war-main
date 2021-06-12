(function() {
  'use strict'

const Card = function({value, suit} = {}) {
  this.value = value;
  this.suit = suit;
}

Card.prototype.print = function() {
  const suits = [
    'Hearts',
    'Diamonds',
    'Spades',
    'Clubs'
  ];

  const values = [
    null,
    null,
    '2',
    '3',
    '4',
    '5',
    '6',
    '7',
    '8',
    '9',
    '10',
    'J',
    'Q',
    'K',
    'A',
  ]

   return `${values[this.value]} of ${suits[this.suit]}`;
}

const Deck = function() {
  this.cards = [];

  for(let i = 0; i < 4; i++) {
    for(let j = 2; j <= 14; j++) {
      this.cards.push(new Card({ suit: i, value: j }));
    }
  }
}


const Player = function({ name } = {}) {
  this.name = name;
  this.hand = [];
  this.cardCount = 0;
  this.draw = null;
}


const Game = function() {
  const player1 = prompt(`Enter Player 1's name:`)
  const player2 = prompt(`Enter Player 2's name:`)

  this.player1 = new Player({ name: player1 });
  this.player2 = new Player({ name: player2 });
  this.deck = new Deck();
  this.pot = [];

}

Game.prototype.shuffle = function(deck) {
  let i = deck.length, j, temp;

  while(i--){
    j = Math.floor(Math.random() * i + 1); // math.random is some number between 0 and 1, not including 1; (i + 1) caps the random number at but not including 53; math.floor rounds down to whole number
    temp = deck[i]; // sets temp to value of deck[i]
    deck[i] = deck[j]; // changes the value of deck[i] to a random number
    deck[j] = temp; // moves the original value of deck[i] to temp
  }
}

Game.prototype.deal = function() {
  this.shuffle(this.deck.cards); // calls the shuffle method inside the deal method
  this.player1.hand = this.deck.cards.filter((item, index) => !(index % 2)); // for all even numbers, there's no remainder so the 0 is falsy but the ! flips it to truthy, odd numbers have a remainder which id truthy, the ! flips it to falsy
  this.player2.hand = this.deck.cards.filter((item, index) => index % 2);

  this.player1.cardCount = this.player1.hand.length;
  this.player2.cardCount = this.player2.hand.length;
}

Game.prototype.draw = function() {
  const player1Card = this.player1.hand.shift();
  const player2Card = this.player2.hand.shift();

  this.player1.cardCount -= 1;
  this.player2.cardCount -= 1;

  if(!this.player1.cardCount) {
    this.shuffle(this.player1.hand);
  }

  if(!this.player2.cardCount) {
    this.shuffle(this.player2.hand);
  }

  this.player1.draw = player1Card;
  this.player2.draw = player2Card;

  this.pot = [player1Card, player2Card, ...this.pot];
  console.log(`${this.player1.name} draws a ${player1Card.print()}.`);
  console.log(`${this.player2.name} draws a ${player2Card.print()}.`)

  this.compare(player1Card, player2Card);

}

Game.prototype.compare = function(player1Card, player2Card) {
  if(player1Card.value > player2Card.value){
      this.player1.hand.push(player1Card)
      this.player1.hand.push(player2Card)
      this.player1.length += 2
      console.log(`${this.player1.name} has ${this.player1.hand.length}`)
      console.log(`${this.player2.name} has ${this.player2.hand.length}`)

  } else if(player2Card.value > player1Card.value){
      this.player2.hand.push(player2Card)
      this.player2.hand.push(player1Card)
      this.player2.length += 2
      console.log(`${this.player1.name} has ${this.player1.hand.length}`)
      console.log(`${this.player2.name} has ${this.player2.hand.length}`)

  } else if(player1Card.value === player2Card.value) {
      console.log(`This means WAR!`)
      console.log(`Both players put three cards face down and draw again.`)
      game.war()
  }

  while(this.player1.hand.length > 0 && this.player2.hand.length > 0) {
    game.draw();
  }
  game.checkWin();
}

Game.prototype.checkWin = function() {
  if(this.player1.hand == 0) {
    console.log(`${this.player2.name} wins the game!`)
  }else if(this.player2.hand == 0) {
    console.log(`${this.player1.name} wins the game!`)
  }
}

let warArray = []

Game.prototype.war = function() {
  const player1Card = this.player1.hand[0]
  const player2Card = this.player2.hand[0]

  let length = 0;
  if (this.player1.hand.length < 5 || this.player2.hand.length < 5) {
    if (this.player1.hand.length > this.player2.hand.length) {
      length = this.player2.hand.length -1
    } else if (this.player1.hand.length < this.player2.hand.length) {
      length = this.player1.hand.length -1
    }
  } else {
    length = 3;
  }
  for (let i = 0; i < length; i++) {
    warArray.push(player1Card)
    this.player1.hand.shift()
    warArray.push(player2Card);
    this.player2.hand.shift()
  }

  game.compareWar(player1Card, player2Card);
}

Game.prototype.compareWar = function(player1Card, player2Card) {
  if (player1Card.value > player2Card.value) {
    this.player1.hand.push.apply(this.player1.hand, warArray)
    this.player1.hand.push(player1Card)
    this.player2.hand.push(player2Card)
    warArray.length = 0;
    game.checkWin();
  } else if (player1Card.value < player2Card.value) {
    this.player2.hand.push.apply(this.player2.hand, warArray);
    this.player2.hand.push(player1Card);
    this.player2.hand.push(player2Card);
    warArray.length = 0;
    game.checkWin()
  } else if (player1Card.value === player2Card.value) {
    game.war()
  }

}



Game.prototype.play = function() {
  this.shuffle(this.deck.cards); // will shuffle the cards
  this.deal(); // then deal them when play is called

  console.log(`Let's play WAR!`);
  console.log('\n');

  game.draw();

}

const game = new Game();
game.play();
})();
