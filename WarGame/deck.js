const SUITS = ["♥", "♦", "♠", "♣"];
const VALS = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K", "A"];
class Deck {
  constructor(cards = newDeck()) {
    this.cards = cards;
  }
  shuffle() {
    for (var i = this.cards.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var temp = this.cards[i];
      this.cards[i] = this.cards[j];
      this.cards[j] = temp;
    }
  }
  addCard(card) {
    this.cards.push(card);
  }
  popCard() {
    return this.cards.shift();
    
  }
  
}

class Card {
  constructor(suit, val) {
    this.suit = suit;
    this.val = val;
  }
  divGenFlipped() {
    const cardDiv = document.createElement("div");
    cardDiv.setAttribute('id', this.val + this.suit)
    cardDiv.innerText = this.suit;
    var color = this.suit === "♥" || this.suit === "♦" ? "red" : "black";
    cardDiv.classList.add("card", color);
    cardDiv.dataset.value = `${this.val} ${this.suit}`;
    return cardDiv;

  }

  divGenUnflipped()
  {
    const cardDiv = document.createElement("div");
    cardDiv.setAttribute('id', this.val + this.suit)
    cardDiv.innerText = "?";
    cardDiv.classList.add("card", "black");
    cardDiv.dataset.value = "?";
    return cardDiv;
  }

}

function newDeck() {
  return SUITS.flatMap((suit) => {
    return VALS.map((val) => {
      return new Card(suit, val);
    });
  });
}
export default Deck;
