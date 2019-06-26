const RESET_VALUE = 2;

let scores = [0, 0];
let activePlayer = 0;
let current = 0;
const diceElement1 = document.querySelector('.dice-1');
const diceElement2 = document.querySelector('.dice-2');
const limitInput = document.querySelector('.limit');
let limitValue = null;
let results = JSON.parse(localStorage.getItem('Results')) || {};