class Card {
    constructor(name, suit) {
        this.name = name
        this.suit = suit
        this.isReveald = true
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
        this.result = 0
    }
}


function areTwoCardsTheSame(card1, card2) {
    if (card1.name == card2.name && card1.suit == card2.suit) {
        return true
    }
    return false
}

const allCards = [2, 3, 4, 5, 6, 7, 8, 9, 10, 'J', 'Q', 'K', 'A'];
const cardSuits = ['♥️', '♠️', '♣️', '♦️'];
const symbolToText = {
    '♥️': 'hearts',
    '♠️': 'spades',
    '♣️': 'clubs',
    '♦️': 'diamonds'
}

const deck = new Deck(allCards, cardSuits)
const dealerPlayer = new Player('Dealer', [])
const playerNick = new Player('Nick', [])
const playerKostas = new Player('Kostas', [])
const demoPlayer = new Player('Demo', [])
const dealBtn = document.getElementById("deal");
const playerhitBtn = document.getElementById("hit-button");
deck.shuffleDeck()


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


function dealDealer(player) {
    player.hand.isReveald = false
    let parent = document.querySelector(".dealer")
    let parent2 = document.querySelector(".dealer-sum")
    let child = document.createElement("div")
    child.setAttribute("class", "dealer-cards")
    player.hand.push(deck.deckDraw(), deck.deckDraw())

    if (player.hand.isReveald === false) {
        parent2.innerHTML = ``
        child.innerHTML = `
    <div id="dealer-cards" class="dealer-cards">
    <img id="hidden" class="hidden" src="assets/images/CardBacks/unique.jpg" />
      <img src="assets/images/CardFronts/${player.hand[1].name + symbolToText[player.hand[1].suit]}.png" />
    </div>`
    } else {
        parent2.innerHTML = `${getHandValue(player)}`
        child.innerHTML = `
    <div id="dealer-cards" class="dealer-cards"><img src="assets/images/CardFronts/${player.hand[0].name + symbolToText[player.hand[0].suit]}.png" />
    <img src="assets/images/CardFronts/${player.hand[1].name + symbolToText[player.hand[1].suit]}.png" /></div>`
    }

    parent.appendChild(child)
}


function dealPlayerCard(player) {
    let parent = document.querySelector(".players-section")
    let child = document.createElement("div")
    child.setAttribute("class", "player")

    child.innerHTML = `<h3>${player.name}</h3>
    <div class="buttons" id="buttons">
        <button id= ${player.name}-hit-button class="hit-button">Hit</button>
        <button id="${player.name}-stay-button" class="stay-button">Stay</button>
      </div>
    <div id="player-cards" class="${player.name}-cards">
    </div>
    <p id="${player.name}-results" class="results">Results: ${player.result}</p>`
    parent.appendChild(child)
    const hitBtn = document.getElementById(`${player.name}-hit-button`);
    hitBtn.addEventListener('click', (e) => hitPlayer(player))
    hitPlayer(player)
    i = i + 1
}

function hitPlayer(player) {
    player.hand.push(deck.deckDraw(deck))
    console.log(player)
    displayCard(player)

}

function displayCard(player) {
    let parent = document.querySelector(`.${player.name}-cards`)
    parent.innerHTML = ``

    for (let i = 0; i < player.hand.length; i++) {
        // console.log(player.hand[i])
        if (player.hand[i].isReveald) {
            parent.innerHTML += `<div id="${player.hand[i].name + symbolToText[player.hand[i].suit]}"><img src="assets/images/CardFronts/${player.hand[i].name + symbolToText[player.hand[i].suit]}.png" /></div>`
        }
        else {
            parent.innerHTML += `<div id="${player.hand[i].name + symbolToText[player.hand[i].suit]}"><img id="hidden" class="hidden" src="assets/images/CardBacks/unique.jpg" /></div>`
        }
    }

}

function flipCard(player) {
    let parent = document.querySelector(`.${player.name}-cards`)
    player.hand.isReveald === true
    parent.innerHTML = ''
    for (let card of player.hand) {
        card.isReveald = true
    }

    displayCard(player)
}

const players = [playerNick, demoPlayer, playerKostas]
var i = 0

dealBtn.addEventListener('click', (e) => dealPlayerCard(players[i]))
dealBtn.addEventListener('click', (e) => dealDealer(dealerPlayer))
const dealFlipButton = document.querySelector(".flip").addEventListener("click", () => flipCard(playerNick))