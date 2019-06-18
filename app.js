/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

const RESET_VALUE = 2;

let scores = [0, 0];
let activePlayer = 0;
let current = 0;
const diceElement1 = document.querySelector('.dice-1');
const diceElement2 = document.querySelector('.dice-2');
const limitInput = document.querySelector('.limit');
let limitValue = null;

function Gamer(name) {
  this.name = name;
}

Gamer.prototype.getScore = function() {

}

Gamer.prototype.setScore = function() {

}


Gamer.prototype.resetScore = function() {

}


const initGame = () => {
  document.querySelector('#current-0').textContent = 0;
  document.querySelector('#current-1').textContent = 0;
  document.querySelector('#score-0').textContent = 0;
  document.querySelector('#score-1').textContent = 0;
  diceElement1.style.display = 'none';
  diceElement2.style.display = 'none';
  limitInput.removeAttribute("disabled");
  let results = JSON.parse(localStorage.getItem('Results')) || {};

  let player0 = new Gamer(document.querySelector('#name-0').textContent = prompt('Введите ваше имя', 'Игрок 1') || 'Игрок 1');
  let player1 = new Gamer(document.querySelector('#name-1').textContent = prompt('Введите ваше имя', 'Игрок 2') || 'Игрок 2');
}

initGame();

document.querySelector('.btn-roll').addEventListener('click', function() {
  limitValue = Number(limitInput.value) || 100;
  limitInput.setAttribute("disabled", "disabled");

  let dice1 = Math.floor(Math.random() * 6) + 1;
  let dice2 = Math.floor(Math.random() * 6) + 1;
  let diceSumm = dice1 + dice2;

  diceElement1.src = `dice-${dice1}.png`;
  diceElement1.style.display = 'block';
  diceElement2.src = `dice-${dice2}.png`;
  diceElement2.style.display = 'block';

  if (dice1 !== RESET_VALUE && dice2 !== RESET_VALUE && dice1 !== dice2) {
    current += diceSumm;
    document.getElementById('current-'+activePlayer).textContent = current;

    if (scores[activePlayer] + current >= limitValue) {
      alert(`Player ${activePlayer} won!!!`);

      if(results.hasOwnProperty(document.querySelector(`#name-${activePlayer}`).textContent)) {
        results[document.querySelector(`#name-${activePlayer}`).textContent] += 1;
      } else {
        results[document.querySelector(`#name-${activePlayer}`).textContent] = 1;
      }

      localStorage.setItem('Results', JSON.stringify(results));
    }
  } else {
    changePlayer();
  }
});

const changePlayer = () => {
  current = 0;
  document.getElementById('current-'+activePlayer).textContent = 0;
  document.querySelector(`.player-${activePlayer}-panel`).classList.toggle('active');
  activePlayer = +!activePlayer;
  diceElement1.style.display = 'none';
  diceElement2.style.display = 'none';
  document.querySelector(`.player-${activePlayer}-panel`).classList.toggle('active');
}

document.querySelector('.btn-hold').addEventListener('click', function() {
  scores[activePlayer] += current;
  document.querySelector(`#score-${activePlayer}`).textContent = scores[activePlayer];
  changePlayer();
});


document.querySelector('.btn-winners').addEventListener('click', function() {
  let resultObj = JSON.parse(localStorage.getItem('Results'));
  let resultArr = [];

  for(let user in resultObj) {
    resultArr.push([user, resultObj[user]]);
  }

  resultArr.sort((a, b) => b[1] - a[1]);

  alert(resultArr);
  console.table(resultArr);
});


document.querySelector('.btn-new').addEventListener('click', function() {
  initGame();
});
