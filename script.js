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
    console.log(this.deck1);
    console.log(this.deck2);
  },

  initializeGame: function () {
    this.makeDeck();
    this.shuffleSplit();
  }
};

  warGame.initializeGame();

});
