export const variables = {
    RESET_VALUE: 2,
    scores: [0, 0],
    activePlayer: 0,
    current: 0,
    diceElement1: document.querySelector('.dice-1'),
    diceElement2: document.querySelector('.dice-2'),
    limitInput: document.querySelector('.limit'),
    limitValue: null,
    results: JSON.parse(localStorage.getItem('Results')) || {}
}