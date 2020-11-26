'use-strict';
/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

// Selecting elements
const score0El = document.getElementById('score--0');
const score1El = document.getElementById('score--1');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
const diceEl = document.querySelector('.dice');
const current0El = document.querySelector('#current--0');
const current1El = document.querySelector('#current--1');

let currentScore, activePlayer, scores, isPlaying;

const reset = function () {
    currentScore = 0;
    scores = [0, 0];
    activePlayer = 0;
    isPlaying = true;

    score0El.textContent = 0;
    score1El.textContent = 0;
    current0El.textContent = 0;
    current1El.textContent = 0;

    diceEl.classList.add('hidden');
    document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--winner');
    document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--active');
};

const switchPlayer = function () {
    document.getElementById(`score--${activePlayer}`).textContent =
        scores[activePlayer];
    document.getElementById(`current--${activePlayer}`).textContent = 0;
    document
        .querySelector(`.player--${activePlayer}`)
        .classList.toggle('player--active');
    activePlayer = activePlayer === 0 ? 1 : 0;
    document
        .querySelector(`.player--${activePlayer}`)
        .classList.toggle('player--active');
    currentScore = 0;
};

const rollDice = function () {
    if (!isPlaying) return;
    // Generating a random number
    const diceNumber = Math.trunc(Math.random() * 6 + 1);
    // Update the image corresponding to the number
    if (diceEl.classList.contains('hidden')) {
        diceEl.classList.remove('hidden');
    }
    diceEl.src = `dice-${diceNumber}.png`;
    // Check for rolled 1
    if (diceNumber === 1) {
        // switch to next player and set total score to 0
        scores[activePlayer] = 0;
        switchPlayer();
    } else {
        currentScore += diceNumber;
        document.getElementById(
            `current--${activePlayer}`
        ).textContent = currentScore;
    }
};

const hold = function () {
    scores[activePlayer] += currentScore;
    if (scores[activePlayer] >= 100) {
        isPlaying = false;
        document.getElementById(`score--${activePlayer}`).textContent =
            scores[activePlayer];
        document
            .querySelector(`.player--${activePlayer}`)
            .classList.add('player--winner');
        document
            .querySelector(`.player--${activePlayer}`)
            .classList.remove('player--active');
    } else {
        switchPlayer();
    }
};

btnRoll.addEventListener('click', rollDice);
btnNew.addEventListener('click', reset);
btnHold.addEventListener('click', hold);

reset();
