import  { Gamer }  from "./gamer";
import { variables as variable } from "./variables";

export const initGame = () => {
  document.querySelector('#current-0').textContent = 0;
  document.querySelector('#current-1').textContent = 0;
  document.querySelector('#score-0').textContent = 0;
  document.querySelector('#score-1').textContent = 0;
  variable.diceElement1.style.display = 'none';
  variable.diceElement2.style.display = 'none';
  variable.limitInput.removeAttribute("disabled");

  new Gamer(document.querySelector('#name-0').textContent = prompt('Введите ваше имя', 'Игрок 1') || 'Игрок 1');
  new Gamer(document.querySelector('#name-1').textContent = prompt('Введите ваше имя', 'Игрок 2') || 'Игрок 2');
}

initGame();