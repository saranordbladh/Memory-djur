const animals = ['🐶', '🐱', '🐰', '🐻', '🦁', '🐼', '🐨', '🐸'];
let gameDeck = [...animals, ...animals]; // Duplicera djuren
let flippedCards = [];
let matchedPairs = 0;

function shuffle(array) {
    return array.sort(() => Math.random() - 0.5);
}

function createCard(animal) {
    const card = document.createElement('div');
    card.classList.add('card');
    card.dataset.animal = animal;
    card.addEventListener('click', flipCard);
    return card;
}

function flipCard() {
    if (flippedCards.length < 2 && !this.classList.contains('flipped')) {
        this.classList.add('flipped');
        this.textContent = this.dataset.animal;
        flippedCards.push(this);

        if (flippedCards.length === 2) {
            setTimeout(checkMatch, 1000);
        }
    }
}

function checkMatch() {
    const [firstCard, secondCard] = flippedCards;

    if (firstCard.dataset.animal === secondCard.dataset.animal) {
        matchedPairs++;
        if (matchedPairs === animals.length) {
            setTimeout(() => alert('Du har vunnit!'), 500);
        }
    } else {
        firstCard.classList.remove('flipped');
        secondCard.classList.remove('flipped');
        firstCard.textContent = '';
        secondCard.textContent = '';
    }
    flippedCards = [];
}

function startGame() {
    matchedPairs = 0;
    flippedCards = [];
    gameDeck = shuffle(gameDeck);
    const gameContainer = document.getElementById('game-container');
    gameContainer.innerHTML = '';
    gameDeck.forEach(animal => {
        const card = createCard(animal);
        gameContainer.appendChild(card);
    });
}

document.getElementById('restart-button').addEventListener('click', startGame);

startGame();
