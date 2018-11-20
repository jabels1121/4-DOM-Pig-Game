/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLOBAL score.
- After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

let scores, roundScore, activePlayer, gamePlaying;

let player1ScoreSelector = document.getElementById("score-0");
let player2ScoreSelector = document.getElementById("score-1");
let currentScorePlayer1 = document.getElementById('current-0');
let currentScorePlayer2 = document.getElementById('current-1');

document.addEventListener('DOMContentLoaded', init);
document.querySelector('.btn-new').addEventListener('click', init);

document.querySelector('.btn-roll').addEventListener('click', () => {
    if (gamePlaying) {
        //1. Roll the dice;
        let dice = Math.floor(Math.random() * 6) + 1;

        //2. Display the result of dice roll;
        let diceDOM = document.querySelector('.dice');
        diceDOM.src = `dice-${dice}.png`;
        diceDOM.style.display = 'block';

        //3. Add to the round score of the player IF dice are NOT a 1.
        if (dice !== 1) {
            // Add to current player score
            roundScore += dice;
            document.getElementById(`current-${activePlayer}`).textContent = roundScore;
        } else {
            // Change to the next player.
            changeToTheNextPlayer();
        }
    }
});

document.querySelector('.btn-hold').addEventListener('click', () => {
    if (gamePlaying) {
        // 1. Add current score to global
        scores[activePlayer] += +document.getElementById(`current-${activePlayer}`).textContent;

        // 2. Update the UI.
        document.getElementById(`score-${activePlayer}`).textContent = scores[activePlayer];

        // 3. Check if player won the game. And if he is not a winner then change to the next player.
        if (scores[activePlayer] >= 20) {
            document.querySelector(`.dice`).style.display = 'none';
            document.getElementById(`name-${activePlayer}`).textContent = 'WINNER!';
            document.querySelector(`.player-${activePlayer}-panel`).classList.add('winner');
            document.querySelector(`.player-${activePlayer}-panel`).classList.remove('active');
            gamePlaying = false;
        } else {
            changeToTheNextPlayer();
        }
    }
});

function init() {
    //1. Set all player score values to start position and this is a 0. And turn player 1 to start.
    scores = [0, 0];
    activePlayer = 0;
    roundScore = 0;
    gamePlaying = true;
    player1ScoreSelector.textContent = '0';
    player2ScoreSelector.textContent = '0';
    currentScorePlayer1.textContent = '0';
    currentScorePlayer2.textContent = '0';
    document.querySelector(`.dice`).style.display = 'none';
    document.querySelector(`.player-${activePlayer}-panel`).classList.add('active');
    document.querySelector(`.player-1-panel`).classList.remove('active');
    document.getElementById(`name-0`).textContent = 'Player 1';
    document.getElementById(`name-1`).textContent = 'Player 2';
    document.querySelector(`.player-0-panel`).classList.remove('winner');
    document.querySelector(`.player-1-panel`).classList.remove('winner');
}

function changeToTheNextPlayer() {
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
    roundScore = 0;
    document.querySelector(`.dice`).style.display = 'none';
    currentScorePlayer1.textContent = '0';
    currentScorePlayer2.textContent = '0';
    document.querySelector(`.player-0-panel`).classList.toggle('active');
    document.querySelector(`.player-1-panel`).classList.toggle('active');
}

/* YOUR 3 CHALLENGES:
  Change the game to follow these rules:

  1. A player looses his ENTIRE score when he rolls two 6 in a row. After that, it`s the next player`s turn.

  2. Add an input field to the HTML where players can set the winning score, so that they can change the predefined
  score of 100. (Hint: you can read that value with the .value property in JavaScript. This is a good opportunity to use
  google to figure this out.)

  3. Add another dice to the game, so that there are two dices now. The player looses his current score when one of them
  is a 1. (Hint: you will need CSS to position second dice, so take a loot at the CSS code for the first one.)
*/
















