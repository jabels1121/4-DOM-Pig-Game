/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLOBAL score.
- After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

/* YOUR 3 CHALLENGES:
  Change the game to follow these rules:

  1. A player looses his ENTIRE score when he rolls two 6 in a row. After that, it`s the next player`s turn. // DONE

  2. Add an input field to the HTML where players can set the winning score, so that they can change the predefined
  score of 100. (Hint: you can read that value with the .value property in JavaScript. This is a good opportunity to use
  google to figure this out.) // DONE

  3. Add another dice to the game, so that there are two dices now. The player looses his current score when one of them
  is a 1. (Hint: you will need CSS to position second dice, so take a look at the CSS code for the first one.)
*/

let scores, roundScore, activePlayer, diceSequence, gamePlaying, scoreLimit, numberOfDices;

let player1ScoreSelector = document.getElementById("score-0");
let player2ScoreSelector = document.getElementById("score-1");
let currentScorePlayer1 = document.getElementById('current-0');
let currentScorePlayer2 = document.getElementById('current-1');
let scoreLimitSelector = document.getElementById('scoreLimit');
let diceNumbersSelector = document.getElementById('dices');

document.addEventListener('DOMContentLoaded', init);
document.querySelector('.btn-new').addEventListener('click', startAGame);

document.querySelector('.btn-roll').addEventListener('click', () => {
    if (gamePlaying) {
        if (numberOfDices === 1) {
            //1. Roll the dice;
            let dice = Math.floor(Math.random() * 6) + 1;

            // Check the rule of two 6 sequence in a row.


            //2. Display the result of dice roll;
            let diceDOM = document.querySelector('.dice');
            diceDOM.src = `dice-${dice}.png`;
            diceDOM.style.display = 'block';

            //3. Add to the round score of the player IF dice are NOT a 1.
            if (dice === 6 && diceSequence === 6) {
                scores[activePlayer] = 0;
                document.getElementById(`score-${activePlayer}`).textContent = scores[activePlayer];
                changeToTheNextPlayer();
            } else if(dice !== 1) {
                roundScore += dice;
                document.getElementById(`current-${activePlayer}`).textContent = roundScore;
            } else {
                changeToTheNextPlayer();
            }
            diceSequence = dice;

        } else {
            //1. Roll the dices;
            let firstDice = Math.floor(Math.random() * 6) + 1;
            let secondDice = Math.floor(Math.random() * 6) + 1;

            //2. Display the result of dice roll;
            document.querySelector('.dice').src = `dice-${firstDice}.png`;
            document.querySelector('.dice').style.display = 'block';

            document.getElementById('second-dice').src = `dice-${secondDice}.png`;
            document.getElementById('second-dice').style.display = 'block';

            //3. Add to the round score of the player IF dice are NOT a 1.
            if (firstDice !== 1 && secondDice !== 1) {
                roundScore += firstDice + secondDice;
                document.getElementById(`current-${activePlayer}`).textContent = roundScore;
            } else {
                changeToTheNextPlayer();
            }
        }
    }
});

document.getElementById('scoreLimit').addEventListener('change', () => {
    if (!gamePlaying) {
        scoreLimit = +document.getElementById('scoreLimit').value;
    }
});

document.getElementById('dices').addEventListener('change', () => {
    if (!gamePlaying) {
        numberOfDices = +document.getElementById('dices').value;
    }
});


document.querySelector('.btn-hold').addEventListener('click', () => {
    if (gamePlaying) {
        // 1. Add current score to global
        scores[activePlayer] += +document.getElementById(`current-${activePlayer}`).textContent;

        // 2. Update the UI.
        document.getElementById(`score-${activePlayer}`).textContent = scores[activePlayer];

        // 3. Check if player won the game. And if he is not a winner then change to the next player.
        if (scores[activePlayer] >= scoreLimit) {
            if (document.getElementById('second-dice')) {
                document.getElementById('second-dice').style.display = 'none';
            }
            document.querySelector(`.dice`).style.display = 'none';
            document.getElementById(`name-${activePlayer}`).textContent = 'WINNER!';
            document.querySelector(`.player-${activePlayer}-panel`).classList.add('winner');
            document.querySelector(`.player-${activePlayer}-panel`).classList.remove('active');
            document.querySelector(`.btn-new`).innerHTML = "<i class=\"ion-ios-plus-outline\"></i>new game";
            document.querySelector('.btn-new').style.display = 'block';
            document.getElementById('scoreLimit').removeAttribute('disabled');
            document.getElementById('dices').removeAttribute('disabled');
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
    scoreLimit = +scoreLimitSelector.value;
    numberOfDices = +diceNumbersSelector.value;
    gamePlaying = false;

    player1ScoreSelector.textContent = '0';
    player2ScoreSelector.textContent = '0';
    currentScorePlayer1.textContent = '0';
    currentScorePlayer2.textContent = '0';

    document.querySelector(`.btn-new`).innerHTML = "<i class=\"ion-ios-plus-outline\"></i>start game";
    document.querySelector(`.dice`).style.display = 'none';

}

function startAGame() {
    if (scoreLimit > 0) {
        gamePlaying = true;

        scoreLimitSelector.setAttribute('disabled', '');
        diceNumbersSelector.setAttribute('disabled', '');
        document.querySelector('.btn-new').style.display = 'none';

        player1ScoreSelector.textContent = '0';
        player2ScoreSelector.textContent = '0';
        currentScorePlayer1.textContent = '0';
        currentScorePlayer2.textContent = '0';

        scores = [0, 0];
        activePlayer = 0;
        roundScore = 0;
        scoreLimit = +scoreLimitSelector.value;
        numberOfDices = +diceNumbersSelector.value;

        if (numberOfDices === 2) {
            let secondDice = document.createElement('img');
            secondDice.setAttribute('src', 'dice-1.png');
            secondDice.setAttribute('alt', 'dice');
            secondDice.setAttribute('id', 'second-dice');
            secondDice.style.display = 'none';
            document.querySelector('.wrapper').appendChild(secondDice);
        } else if (document.getElementById('second-dice') && numberOfDices === 1) {
            document.getElementById('second-dice').remove();
        }

        document.querySelector(`.player-${activePlayer}-panel`).classList.add('active');
        document.querySelector(`.player-1-panel`).classList.remove('active');
        document.getElementById(`name-0`).textContent = 'Player 1';
        document.getElementById(`name-1`).textContent = 'Player 2';
        document.querySelector(`.player-0-panel`).classList.remove('winner');
        document.querySelector(`.player-1-panel`).classList.remove('winner');
    }
}

function changeToTheNextPlayer() {
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
    roundScore = 0;
    diceSequence = 0;

    document.querySelector(`.dice`).style.display = 'none';
    currentScorePlayer1.textContent = '0';
    currentScorePlayer2.textContent = '0';
    document.querySelector(`.player-0-panel`).classList.toggle('active');
    document.querySelector(`.player-1-panel`).classList.toggle('active');

    if (numberOfDices === 2) {
        document.getElementById('second-dice').style.display = 'none';
    }
}















