const INITIAL_LIVES = 3;
let lives = INITIAL_LIVES;
let streak = 0;
let bestStreak = 0;

let currentNum = Math.floor(Math.random() * 100) + 1;

const currentNumSpan = document.getElementById('current-number');
const livesSpan = document.getElementById('lives');
const streakSpan = document.getElementById('streak');
const bestStreakSpan = document.getElementById('best-streak');
const messageP = document.getElementById('message');

const higherBtn = document.getElementById('higher-btn');
const lowerBtn = document.getElementById('lower-btn');

currentNumSpan.textContent = currentNum;

function makeGuess(userChoice) {
    const nextNum = Math.floor(Math.random() * 100) + 1;
    
    let isCorrect = false;
    if (userChoice === 'higher' && nextNum >= currentNum) {
        isCorrect = true;
    } else if (userChoice === 'lower' && nextNum <= currentNum) {
        isCorrect = true;
    }

    if (isCorrect) {
        streak++;
        if (streak > bestStreak) bestStreak = streak;
        messageP.textContent = `Correct! The next number was ${nextNum}.`;
    } else {
        lives--;
        streak = 0;
        messageP.textContent = `Wrong! The next number was ${nextNum}.`;
    }

    currentNum = nextNum;
    currentNumSpan.textContent = currentNum;
    livesSpan.textContent = lives;
    streakSpan.textContent = streak;
    bestStreakSpan.textContent = bestStreak;

    if (lives <= 0) {
        messageP.textContent = `Game Over! Restarting...`;
        setTimeout(resetGame, 2000);
    }
}

function resetGame() {
    lives = INITIAL_LIVES;
    streak = 0;
    currentNum = Math.floor(Math.random() * 100) + 1;
    currentNumSpan.textContent = currentNum;
    livesSpan.textContent = lives;
    streakSpan.textContent = streak;
    messageP.textContent = '';
}

higherBtn.addEventListener('click', () => { if(lives > 0) makeGuess('higher'); });
lowerBtn.addEventListener('click', () => { if(lives > 0) makeGuess('lower'); });