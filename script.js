// wait til ready
$(document).ready(function() {

  // put all functions inside an object
  var warGame = {

  // TEST Code
  // $("p").on("click", function() {
  //   $(this).css("background", "yellow");
  // });

  // initialize the decks
  deckMain: [],
  deck1: [],
  deck2: [],
  suits: ["hearts", "diamonds", "spades", "clubs"],

  makeDeck: function () {
    for (var i = 0; i < this.suits.length; i++) {
      for (var j = 2; j <= 14; j++) {
        var card = {
          rank: j,
          suit: this.suits[i],
        };
        this.deckMain.push(card);
      }
    }
  },

  shuffleSplit: function () {
    // split random and equal set of 26 cards into each player's deck
    // TODO clean mechanism to toggle between which array to deal towards
    var deal = 1;
    while (this.deckMain.length > 0) {
      var randomIndex = Math.floor(Math.random() * this.deckMain.length);
      var cardMove = this.deckMain.splice(randomIndex, 1);
      if (deal === 1) {
        this.deck1.push(cardMove);
        deal = 2;
      } else {
        this.deck2.push(cardMove);
        deal = 1;
      }
    }
    // TEST code to see player decks
    // console.log(this.deck1);
    // console.log(this.deck2);
  },

  // compare value of two cards and assign an outcome and the battle-array
  compareCards: function (card1, card2) {
    var outcome = {
      result: "",
      array: [],
    };
    // console.log(card1.rank);
    // console.log(card2.rank);
    if (card1.rank > card2.rank) {
      outcome.result = "player1";
      outcome.array.push(card1,card2);
    } else if (card2.rank > card1.rank) {
      outcome.result = "player2";
      outcome.array.push(card2,card1);
    } else {
      outcome.result = "tie";
      outcome.array.push(card1,card2);
    }
    // console.log(outcome);
  },


  determineWinner: function () {
    var card1 = this.deck1[0];
    var card2 = this.deck2[0];
    var outcome = (this.compareCards(card1,card2));
    console.log("5");
    console.log(outcome);
  },

  initializeGame: function () {
    this.makeDeck();
    this.shuffleSplit();
  }
};

  var test1 = {
    rank: 14
  };
  var test2 = {
    rank: 14
  };

  warGame.compareCards (test1, test2);
  warGame.initializeGame();
  warGame.determineWinner();

});
