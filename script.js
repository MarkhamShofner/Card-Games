// wait til page is ready
$(document).ready(function() {

  //begin the war game by running the itilialize game script
  warGame.initializeGame();
});

//TODO write a game summary overall
// puts all functions and variables inside an object
var warGame = {

  // initialize the decks
  deckMain: [],
  deck1: [],
  deck2: [],
  suits: ["Hearts", "Diamonds", "Spades", "Clubs"],

  // vessel object to track status of the hand, and the current array of the hand
  vessel: {
    status: "normal",
    array: [],
    owner: "",
  },

  // create the base main deck
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
  },

  // split random and equal set of 26 cards into each player's deck
  shuffleSplit: function() {
    var deal = 1;
    while (this.deckMain.length > 0) {
      var randomIndex = Math.floor(Math.random() * this.deckMain.length);
      var cardMove = this.deckMain.splice(randomIndex, 1);
      if (deal === 1) {
        cardMove[0].owner = "1";
        this.deck1.push(cardMove[0]);
        deal = 2;
      } else {
        cardMove[0].owner = "2";
        this.deck2.push(cardMove[0]);
        deal = 1;
      }
    }
  },

  // creates initial quiver setup (of 26 arrows on the left, and 26 on the right)
  setQuiver: function() {
    for (var i = 0; i <= 52; i++) {
      var div = document.createElement("div");
      $("#quivers").append(div);
      $(div).attr("class", "square one");
      if (i < 26) {
        $(div).attr("class", "square two");
      } else {}
    }
  },

  // shows the current score in a #
  // assigns the html on the screen to be the length of deck1
  showScore: function() {
    $("#score1").html(this.deck1.length);
  },

  // shows the current score in images
  // assigns the lengths of each deck to the number of arrows (by classes)
  // TODO have the images show up simultaneously, instead of lagging on the right
  showQuiver: function() {
    for (var i = 0; i < 52; i++) {
      var activeSquare = $(".square").eq(i);
      if (i < this.deck1.length) {
        activeSquare.attr("class", "square one");
      } else {
        activeSquare.attr("class", "square two");
      }
    }
  },

  // runs the component events for a hand to work
  runHand: function() {
    this.takeCards();
    this.executeHand();
  },

  // Add cards (1 for normal, 4 for war) to the end of the vessel array
  takeCards: function() {
    if (this.vessel.status === "normal") {
      this.vessel.array.push(this.deck1.splice(0, 1)[0]);
      this.vessel.array.push(this.deck2.splice(0, 1)[0]);
    } else {
      for (var i = 0; i < 4; i++) {
        this.vessel.array.push(this.deck1.splice(0, 1)[0]);
        this.vessel.array.push(this.deck2.splice(0, 1)[0]);
      }
    }
    console.log(this.vessel.array);
  },

  // compare the last two cards in the vessel array to determine which player wins
  measureCards: function() {
    var outcome = {
      result: "",
    };
    var card1 = this.vessel.array[this.vessel.array.length - 2];
    var card2 = this.vessel.array[this.vessel.array.length - 1];

    this.showCard(card1);
    this.showCard(card2);
    if (card1.rank > card2.rank) {
      outcome.result = "Player 1";
      console.log("Player 1 wins");
      $(".resultArrow").attr("class", "resultArrow one");
    } else if (card2.rank > card1.rank) {
      outcome.result = "Player 2";
      console.log("Player 2 wins");
      $(".resultArrow").attr("class", "resultArrow two");
    } else {
      console.log("War!");
      outcome.result = "WAR";
      this.vessel.status = "WAR";
      $(".resultArrow").attr("class", "resultArrow");
    }
    $("#result").html(outcome.result);
    return outcome;
  },



  // executeHand
  executeHand: function() {
    var outcome = this.measureCards();
    if (outcome.result === "Player 1") {
      for (var i = 0; i < this.vessel.array.length; i++) {
        this.deck1.push(this.vessel.array[i]);
      }
      this.vessel.array = [];
      this.vessel.status = "normal";
    } else if (outcome.result === "Player 2") {
      for (var j = 0; j < this.vessel.array.length; j++) {
        this.deck2.push(this.vessel.array[j]);
      }
      this.vessel.array = [];
      this.vessel.status = "normal";
    } else {
      //TODO figure out where to determine war
      alert("WAR!");
      this.runHand();
    }
  },

  //call the playHand on clicks of the play button
  callHand: function() {
    var self = this;
    $("#play").on("click", function() {
      // debugger;
      self.runHand();
      self.showQuiver();
      self.showScore();
    });
  },

  //shows the value of the cards
  showCard: function(card) {
    var rank, suit;
    switch (card.rank) {
      case 2:
        rank = "2";
        break;
      case 3:
        rank = "3";
        break;
      case 4:
        rank = "4";
        break;
      case 5:
        rank = "5";
        break;
      case 6:
        rank = "6";
        break;
      case 7:
        rank = "7";
        break;
      case 8:
        rank = "8";
        break;
      case 9:
        rank = "9";
        break;
      case 10:
        rank = "10";
        break;
      case 11:
        rank = "J";
        break;
      case 12:
        rank = "Q";
        break;
      case 13:
        rank = "K";
        break;
      case 14:
        rank = "A";
        break;
    }
    switch (card.suit) {
      case "Clubs":
        suit = "\u2663";
        break;
      case "Diamonds":
        suit = "\u2666";
        break;
      case "Spades":
        suit = "\u2665";
        break;
      case "Hearts":
        suit = "\u2660";
        break;
    }
    if (card.owner === "1") {
      console.log(rank + suit + "belongs to player 1");
      $("#card1").attr("class", "card one activated");
      $("#card1").html(rank + suit);
    } else {
      console.log(rank + suit + "belongs to player 2");
      $("#card2").attr("class", "card two activated");
      $("#card2").html(rank + suit);
    }
    
  },

  initializeGame: function() {
    this.makeDeck();
    this.shuffleSplit();
    this.callHand();
    this.setQuiver();
  }
};
