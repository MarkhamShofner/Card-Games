// wait til ready
$(document).ready(function() {

  // put all functions inside an object
  var warGame = {


    deckMain: [],
    deck1: [],
    deck2: [],
    suits: ["hearts", "diamonds", "spades", "clubs"],

    // initialize the decks
    makeDeck: function() {
      for (var i = 0; i < this.suits.length; i++) {
        for (var j = 2; j <= 14; j++) {
          var card = {
            rank: j,
            suit: this.suits[i],
          };
          this.deckMain.push(card);
        }
      }
      // console.log(this.deckMain);
    },

    shuffleSplit: function() {
      // split random and equal set of 26 cards into each player's deck
      // TODO clean mechanism to toggle between which array to deal towards
      var deal = 1;
      while (this.deckMain.length > 0) {
        var randomIndex = Math.floor(Math.random() * this.deckMain.length);
        var cardMove = this.deckMain.splice(randomIndex, 1);
        if (deal === 1) {
          this.deck1.push(cardMove[0]);
          deal = 2;
        } else {
          this.deck2.push(cardMove[0]);
          deal = 1;
        }
      }
    },

    // compare value of two cards and assign an outcome and the battle-array
    compareCards: function(card1, card2) {
      var outcome = {
        result: "",
        array: [],
      };
      if (card1.rank > card2.rank) {
        outcome.result = "player1";
        outcome.array.push(card1, card2);
      } else if (card2.rank > card1.rank) {
        outcome.result = "player2";
        outcome.array.push(card2, card1);
      } else {
        outcome.result = "tie";
        outcome.array.push(card1, card2);
      }
      console.log(card1.rank);
      console.log(card2.rank);
      console.log(outcome);
      return outcome;
    },

    playHand: function() {
      var cardA = this.deck1.splice(0,1)[0];
      var cardB = this.deck2.splice(0,1)[0];
      var outcome = (this.compareCards(cardA, cardB));
      if (outcome.result === "player1") {
        console.log("player 1 wins the battle!");
        for (var i = 0; i < outcome.array.length; i++) {
          this.deck1.push(outcome.array[i]);
        }
      } else if (outcome.result === "player2") {
        console.log("player 2 wins the battle!");
        for (var j = 0; j < outcome.array.length; j++) {
          this.deck2.push(outcome.array[j]);
        }
      } else {
        //TODO figure out where to determine war
        console.log("WAR!!!");
      }
      console.log(this.deck1);
      console.log(this.deck2);
    },

    // test code
    yellowBackground: $("p").on("click", function() {
      $(this).css("background", "green");
    }),

    //call the playHand on clicks
    callHand: function() {
      $("#play").on("click", function() {
        // TODO, how to make it say "this.playHand()" and work, not just "warGame.playHand"
        warGame.playHand();
      });
    },

    initializeGame: function() {
      this.makeDeck();
      this.shuffleSplit();
      this.callHand();
    }
  };

  warGame.initializeGame();
  // warGame.playHand();

});
