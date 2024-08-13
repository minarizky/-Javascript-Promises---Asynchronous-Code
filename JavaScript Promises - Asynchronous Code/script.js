// Part 1: Number Facts
const favoriteNumber = 42;
const url = `http://numbersapi.com/${favoriteNumber}?json`;
const urlMultiple = `http://numbersapi.com/[7,13,42]?json`;
const urlFact = `http://numbersapi.com/${favoriteNumber}?json`;

// 1. Get a Fact About Your Favorite Number
fetch(url)
  .then(response => response.json())
  .then(data => {
    const fact = document.createElement('p');
    fact.textContent = `Fact about number ${favoriteNumber}: ${data.text}`;
    document.getElementById('favorite-number-fact').appendChild(fact);
  })
  .catch(err => console.error(err));

// 2. Get Data on Multiple Numbers in a Single Request
fetch(urlMultiple)
  .then(response => response.json())
  .then(data => {
    for (const num in data) {
      const fact = document.createElement('p');
      fact.textContent = `Fact about number ${num}: ${data[num]}`;
      document.getElementById('multiple-numbers-facts').appendChild(fact);
    }
  })
  .catch(err => console.error(err));

// 3. Get 4 Facts on Your Favorite Number
const factPromises = [];

for (let i = 0; i < 4; i++) {
  factPromises.push(fetch(urlFact).then(response => response.json()));
}

Promise.all(factPromises)
  .then(facts => {
    facts.forEach(fact => {
      const factElement = document.createElement('p');
      factElement.textContent = `Another fact about number ${favoriteNumber}: ${fact.text}`;
      document.getElementById('multiple-facts-favorite-number').appendChild(factElement);
    });
  })
  .catch(err => console.error(err));

// Part 2: Deck of Cards
let deckId;

fetch('https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1')
  .then(response => response.json())
  .then(data => {
    deckId = data.deck_id;
  });

document.getElementById('draw-card').addEventListener('click', () => {
  fetch(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=1`)
    .then(response => response.json())
    .then(data => {
      if (data.remaining === 0) {
        document.getElementById('draw-card').disabled = true;
        alert('No more cards left in the deck!');
        return;
      }

      const card = data.cards[0];
      const cardHtml = `
        <div class="card">
          <img src="${card.image}" alt="${card.value} of ${card.suit}">
        </div>`;
      document.getElementById('cards-container').innerHTML += cardHtml;
    })
    .catch(err => console.error(err));
});
