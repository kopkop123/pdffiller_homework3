/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

import { variables as variable } from "./variables";
import { initGame } from "./init";
import { changePlayer } from "./player";

document.querySelector('.btn-roll').addEventListener('click', function() {
    variable.limitValue = Number(variable.limitInput.value) || 100;
    variable.limitInput.setAttribute("disabled", "disabled");

    let dice1 = Math.floor(Math.random() * 6) + 1;
    let dice2 = Math.floor(Math.random() * 6) + 1;
    let diceSumm = dice1 + dice2;

    variable.diceElement1.src = `dice-${dice1}.png`;
    variable.diceElement1.style.display = 'block';
    variable.diceElement2.src = `dice-${dice2}.png`;
    variable.diceElement2.style.display = 'block';

    if (dice1 !== variable.RESET_VALUE && dice2 !== variable.RESET_VALUE && dice1 !== dice2) {
        variable.current += diceSumm;
        document.getElementById('current-'+variable.activePlayer).textContent = variable.current;

        if (variable.scores[variable.activePlayer] + variable.current >= variable.limitValue) {
            alert(`Player ${variable.activePlayer} won!!!`);

            if(variable.results.hasOwnProperty(document.querySelector(`#name-${variable.activePlayer}`).textContent)) {
                variable.results[document.querySelector(`#name-${variable.activePlayer}`).textContent] += 1;
            } else {
                variable.results[document.querySelector(`#name-${variable.activePlayer}`).textContent] = 1;
            }

            localStorage.setItem('Results', JSON.stringify(variable.results));
        }
    } else {
        changePlayer();
    }
});

document.querySelector('.btn-hold').addEventListener('click', function() {
    variable.scores[variable.activePlayer] += variable.current;
    document.querySelector(`#score-${variable.activePlayer}`).textContent = variable.scores[variable.activePlayer];
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