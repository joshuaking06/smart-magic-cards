const suit = 'hearts'
const cardsWrapper = document.querySelector('.cards-wrapper')

// decided to use constructor functions with methods on the deck itself like deck.shuffle(), deck.show(), etc
// no particular reason for doing it this way, it just makes the most sense to me, and I wanted to try to
// do it my own way make the code my own, so you could maybe see more of how I approached the problem

class Deck {
	constructor() {
		this.suits = [ 'hearts', 'spades', 'diamonds', 'clubs' ]
		// populating the deck with 13 cards for each suit and putting into 1 array
		this.cards = this.suits.reduce((arr, suit) => {
			const cards = []
			for (let i = 1; i <= 13; i += 1) {
				const cardObject = {
					value: i,
					suit
				}
				cards.push(cardObject)
			}
			// spread the cards into the accumulator
			arr.push(...cards)
			return arr
		}, [])
	}

	displayCards() {
		this.cards.forEach((card, i) => {
			const positionFromLeft = i * 25
			const cardElement = document.createElement('div')
			cardElement.setAttribute('data-value', card.value)
			cardElement.classList.add('card', `${card.suit}-${card.value}`)
			cardElement.style.left = `${positionFromLeft}px`
			cardsWrapper.append(cardElement)
		})
	}
}

const deck = new Deck()

function createCards() {
	const cards = []
	// Create an array with objects containing the value and the suit of each card
	for (let i = 1; i <= 13; i += 1) {
		const cardObject = {
			value: i,
			suit
		}
		cards.push(cardObject)
	}

	// For each dataObject, create a new card and append it to the DOM
	cards.forEach((card, i) => {
		const positionFromLeft = i * 15
		const cardElement = document.createElement('div')
		cardElement.setAttribute('data-value', card.value)
		cardElement.classList.add('card', `${card.suit}-${card.value}`)
		cardElement.style.left = `${positionFromLeft}px`
		cardsWrapper.append(cardElement)
	})
}

// Function to clear out the initial button and create new buttons to play the game.
function createButtons() {
	console.log('hello')
}

// Function to start the game by clearing the wrapper, creating
// and appending the buttons and all the cards to the DOM
function startGame() {
	createButtons()
	deck.displayCards()
}

document.getElementById('start-game').addEventListener('click', startGame)
