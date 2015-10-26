// wait til ready
$(document).ready(function() {
  // TEST Code
  $("p").on("click", function() {
    $(this).css("background", "yellow");
  });

  // initialize the decks
  var deckMain = [];
  var deck1 = [];
  var deck2 = [];

  var suits = ["hearts", "diamonds", "spades", "clubs"];

  function makeDeck() {
    for (var i = 0; i < suits.length; i++) {
      for (var j = 2; j <= 14; j++) {
        var card = {
          rank: j,
          suit: suits[i],
        };
        deckMain.push(card);
      }
    }
  }

  function shuffleSplit() {
    // split random and equal set of 26 cards into each player's deck

    // TODO clean mechanism to toggle between which array to deal towards
    var deal = 1;
    while (deckMain.length > 0) {
      var randomIndex = Math.floor(Math.random() * deckMain.length);
      var cardMove = deckMain.splice(randomIndex, 1);
      if (deal === 1) {
        deck1.push(cardMove);
        deal = 2;
      } else {
        deck2.push(cardMove);
        deal = 1;
      }
    }
    // TEST code to see player decks
    console.log(deck1);
    console.log(deck2);
  }

  function initializeGame() {
    makeDeck();
    shuffleSplit();
  }

  initializeGame();

});
