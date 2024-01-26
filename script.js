const gameBoard = document.getElementById('gameBoard');
const cards = ['🍎', '🍌', '🍓', '🍇', '🍎', '🍌', '🍓', '🍇'];
let selectedCards = [];
let matchedPairs = 0;

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

function createCard(cardValue) {
    const card = document.createElement('div');
    card.classList.add('card', 'hidden');
    card.dataset.value = cardValue;
    card.addEventListener('click', () => onCardClicked(card));
    return card;
}

function onCardClicked(card) {
    if (selectedCards.length < 2 && card.classList.contains('hidden')) {
        card.classList.remove('hidden');
        card.textContent = card.dataset.value;
        selectedCards.push(card);

        if (selectedCards.length === 2) {
            checkForMatch();
        }
    }
}

function checkForMatch() {
    const [firstCard, secondCard] = selectedCards;

    if (firstCard.dataset.value === secondCard.dataset.value) {
        matchedPairs++;
        selectedCards = [];

        if (matchedPairs === cards.length / 2) {
            alert('おめでとう！ すべてのペアを見つけました！');
        }
    } else {
        setTimeout(() => {
            firstCard.classList.add('hidden');
            secondCard.classList.add('hidden');
            firstCard.textContent = '';
            secondCard.textContent = '';
            selectedCards = [];
        }, 1000);
    }
}

shuffleArray(cards);
cards.forEach(cardValue => {
    gameBoard.appendChild(createCard(cardValue));
});
