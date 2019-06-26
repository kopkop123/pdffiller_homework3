import { variables as variable } from "./variables";

export const changePlayer = () => {
  variable.current = 0;
  document.getElementById('current-'+variable.activePlayer).textContent = 0;
  document.querySelector(`.player-${variable.activePlayer}-panel`).classList.toggle('active');
  variable.activePlayer = +!variable.activePlayer;
  variable.diceElement1.style.display = 'none';
  variable.diceElement2.style.display = 'none';
  document.querySelector(`.player-${variable.activePlayer}-panel`).classList.toggle('active');
}