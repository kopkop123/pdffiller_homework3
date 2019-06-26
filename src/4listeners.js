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
