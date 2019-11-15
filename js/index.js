const cardsWrapper = document.querySelector('.cards-wrapper')
const btnWrapper = document.querySelector('.btn-wrapper')
const startBtn = document.getElementById('start-game')
const btns = document.querySelectorAll('.btn')

// decided to use constructor functions with methods on the deck itself like deck.shuffle(), deck.show(), etc
// no particular reason for doing it this way, it just makes the most sense to me, and I wanted to try to
// do it my own way make the code my own, so you could maybe see more of how I approached the problem

class Deck {
	constructor() {
		this.suits = [ 'hearts', 'spades', 'diamonds', 'clubs' ] // populating the deck with 13 cards for each suit and putting into 1 array
		this.cards = this.suits.reduce((arr, suit, index) => {
			const cards = []
			// put a counter into each card object to make it an easy sort later on
			let count
			if (index === 0) count = 0
			if (index !== 0) count = 13 * index
			for (let i = 1; i <= 13; i += 1) {
				const cardObject = {
					value: i,
					suit,
					count
				}
				cards.push(cardObject)
				count++
			} // spread the cards into the accumulator(deck)
			arr.push(...cards)
			return arr
		}, [])
		this.shuffle = this.shuffle.bind(this)
		this.toggleShow = this.toggleShow.bind(this)
		this.unshuffle = this.unshuffle.bind(this)
	}

	displayCards() {
		this.cards.forEach((card, i) => {
			const positionFromLeft = i * 25
			const cardElement = document.createElement('div')
			cardElement.setAttribute('data-value', card.value)
			cardElement.style.backgroundImage = `url('./assets/cards/${card.suit}-${card.value}.svg')`
			cardElement.classList.add('card')
			cardElement.style.left = `${positionFromLeft}px`
			cardsWrapper.append(cardElement)
		})
	}

	toggleShow() {
		cardsWrapper.classList.toggle('hidden')
	}

	shuffle() {
		// shuffle the card objects in the array
		for (let i = this.cards.length - 1; i > 0; i--) {
			const j = Math.floor(Math.random() * i)
			const temp = this.cards[i]
			this.cards[i] = this.cards[j]
			this.cards[j] = temp
		}
		// update the dom to reflect the shuffled array
		// perhaps this could have been done without clearing out the nodelist but i wasn't entirely
		while (cardsWrapper.firstChild) {
			cardsWrapper.removeChild(cardsWrapper.firstChild)
		}
		this.displayCards()
	}

	unshuffle() {
		// sort cards by the count that i put into each card object
		const unshuffled = this.cards.sort((a, b) => {
			return a.count - b.count
		})
		this.cards = unshuffled
		while (cardsWrapper.firstChild) {
			cardsWrapper.removeChild(cardsWrapper.firstChild)
		}
		this.displayCards()
	}
}

// Function to clear out the initial button and create new buttons to play the game.
function displayButtons() {
	btns.forEach((btn) => {
		btn.classList.toggle('hide')
	})
}

// Function to start the game by clearing the wrapper, creating
// and appending the buttons and all the cards to the DOM
function startGame() {
	const deck = new Deck()
	displayButtons()
	deck.displayCards()
	document.getElementById('shuffle').addEventListener('click', deck.shuffle)
	document.getElementById('toggle-show').addEventListener('click', deck.toggleShow)
	document.getElementById('unshuffle').addEventListener('click', deck.unshuffle)
}

startBtn.addEventListener('click', startGame)
