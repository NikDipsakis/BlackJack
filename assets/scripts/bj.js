class Card {
    constructor(name, suit) {
        this.name = name
        this.suit = suit
    };

    introFullCard() {
        let number
        let suit
        if (this.name === 'J') {
            number = 'Jack';
        } else if (this.name === 'Q') {
            number = 'Queen';
        } else if (this.name === 'K') {
            number = 'King';
        } else if (this.name === 'A') {
            number = 'Ace';
        };

        if (this.suit === '♥️') {
            suit = 'Hearts'

        } else if (this.suit === '♣️') {
            suit = 'Spades'

        } else if (this.suit === '♠️') {
            suit = 'Clubs'

        } else if (this.suit === '♦️') {
            suit = 'Diamonds'
        };

        return `${number} of ${suit}`
    };
}

class Deck {
    constructor(array, suits) {
        this.cards

        let newDeck = []

        for (let number of array) {
            for (let suit of suits) {
                newDeck.push(new Card(number, suit))
            }
        }
        this.cards = newDeck
        this.deckOriginalSize = newDeck.length
    };

    shuffleDeck() {
        let shuffledDeck = this.cards.sort(function () {
            return Math.random() - 0.5;
        })
        this.cards = shuffledDeck
    }
    remainingCards() {
        return this.cards.length
    }

    deckDraw() {
        return this.cards.shift()
    }
};

class Player {
    constructor(name, hand) {
        this.name = name
        this.hand = hand
    }
}

function areTwoCardsTheSame(card1, card2) {
    if (card1.name == card2.name && card1.suit == card2.suit) {
        return true
    }
    return false
}

const allCards = [2, 3, 4, 5, 6, 7, 8, 9, 10, 'J', 'Q', 'K', 'A'];
const cardSuits = ['♥️', '♣️', '♠️', '♦️'];
const symbolToText = {
    '♥️': 'hearts',
    '♣️': 'spades',
    '♠️': 'clubs',
    '♦️': 'diamonds'
}
console.log(symbolToText['♥️'])
const deck = new Deck(allCards, cardSuits)
deck.shuffleDeck()
const playerNick = new Player('Nick', [deck.deckDraw(deck)])
const playerKostas = new Player('Kostas', [deck.deckDraw(deck)])
const demoPlayer = new Player('Demo', [{ name: 'A', suit: '♥️' } ,{ name: 'K', suit: '♥️' } ])
console.log(demoPlayer)


function checkAceCount(player) {
    let aceCount = 0
    for (i = 0; i < player.hand.length; i++) {
        if (player.hand[0].name && player.hand[1].name === 'A') {
            aceCount += 21
            break
        }
        if (player.hand[i].name === 'A') {
            aceCount += 1
        }
        

    } return aceCount
}

function getHandValue(player) {
    let cardSum = 0
    if (checkAceCount(player) === 21) {
        cardSum += 21
        return cardSum
    } else if (checkAceCount(player) === 2) {
        cardSum += 12
    } else if (checkAceCount(player) === 3) {
        cardSum += 12
    } else if (checkAceCount(player) === 1) {
        cardSum += 11
    }

    for (i = 0; i < player.hand.length; i++) {
        let cardValue = player.hand[i].name
        if (cardValue === 'J' || cardValue === 'Q' || cardValue === 'K') {
            cardSum += 10;
        } else if (cardValue === 'A') {
            cardSum += 0
        } else {
            cardSum += Number(cardValue)
        }
    }
    return cardSum
}

function checkIfBust(player) {
    if (getHandValue(player) <= 21) {
        return false
    } else return true
}
//console.log(checkIfBust(demoPlayer));
//console.log(getHandValue(demoPlayer));
//console.log(checkAceCount(demoPlayer))


function createPlayerElement(playerInput) {
    let parent = document.querySelector(".players-section")
    let child = document.createElement("div")
    child.setAttribute("class", "player")

    
    child.innerHTML = `<h3>${playerInput}</h3>
    <div id="player-cards" class="player-cards">
      <img src="assets/images/CardFronts/Aclubs.png" />
      <div class="buttons">
      <button id="hit-button" class="hit-button">Hit</button>
      <button id="stay-button" class="stay-button">Stay</button>
        <p id="results" class="results"></p>
      </div>
    </div>`

    parent.appendChild(child)

}
console.log(demoPlayer.name)

function displayPlayerCard (player){
    let parent = document.querySelector(".players-section")
    let child = document.createElement("div")
    child.setAttribute("class", "player")

    
    child.innerHTML = `<h3>${player.name}</h3>
    <div id="player-cards" class="player-cards">
      <img src="assets/images/CardFronts/${demoPlayer.hand[0].name + symbolToText[demoPlayer.hand[0].suit]}.png" />
      <div class="buttons">
      <button id="hit-button" class="hit-button">Hit</button>
      <button id="stay-button" class="stay-button">Stay</button>
        <p id="results" class="results"></p>
      </div>
    </div>`

    parent.appendChild(child)
}

const dealButton = document.getElementById("deal");


//dealButton.addEventListener('click', createPlayerElement(demoPlayer))
dealButton.addEventListener('click', (e) => displayPlayerCard(demoPlayer))

