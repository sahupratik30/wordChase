//Levels
const levels = {
  easy: 8,
  medium: 5,
  hard: 3,
};
let currentLevel = levels.easy;
//Global variables.
let time = currentLevel;
let score = 0;
let isPlaying;
let highScore = 0;

//DOM Elements.
const button = document.getElementById("start-btn");
const inputWord = document.getElementById("input-word");
const currentWord = document.getElementById("word");
const seconds = document.getElementById("seconds");
const message = document.getElementById("message");
const timeDisplay = document.getElementById("time");
const scoreDisplay = document.getElementById("score");
const high_score = document.getElementById("highscore");
const difficulty = document.getElementById("difficulty");
const resetBtn = document.getElementById("reset-btn");
window.addEventListener("load", setHighScore);
seconds.innerHTML = currentLevel;
difficulty.addEventListener("change", changeDifficulty);
button.addEventListener("click", init);
resetBtn.addEventListener("click", resetScore);

function init() {
  isPlaying = true;
  //Autofocus on input box
  inputWord.focus();
  //Disable the start button
  button.disabled = true;
  //Load random word
  loadWord();
  //Start matching inputWord with currentWord
  inputWord.addEventListener("input", startMatch);
  //Countdown timer
  setInterval(countDown, 1000);
  //Check game status
  setInterval(checkStatus, 50);
}
//Match word
function startMatch() {
  if (matchWord()) {
    isPlaying = true;
    time = currentLevel;
    loadWord();
    inputWord.value = "";
    score++;
  }
  if (score === -1) {
    scoreDisplay.innerHTML = 0;
  } else {
    scoreDisplay.innerHTML = score;
  }
}
//Function to match inputWord to currentWord.
function matchWord() {
  if (inputWord.value.trim() === currentWord.innerHTML.toLowerCase()) {
    message.style.color = "green";
    message.innerHTML = "Correct!";
    return true;
  } else {
    message.innerHTML = "";
    return false;
  }
}

//Function to load a random word.
async function loadWord() {
  const url = "https://random-words-api.vercel.app/word";
  let response = await fetch(url);
  let data = await response.json();
  let word = data[0].word;
  currentWord.innerHTML = word;
}
//Function to CountDown time.
function countDown() {
  //Check if time is not run out
  if (time > 0 && isPlaying) {
    //Decrease time
    time--;
  } else if (time === 0) {
    isPlaying = false;
  }
  if (isPlaying) {
    timeDisplay.innerHTML = time;
  } else {
    timeDisplay.innerHTML = 0;
  }
}
//Function to check status of the game.
function checkStatus() {
  if (!isPlaying && time === 0) {
    message.style.color = "red";
    message.innerHTML = "Game Over!";
    //Set the highscore
    if (score > localStorage.getItem("highscore")) {
      highScore = score;
      localStorage.setItem("highscore", highScore);
    }
    //Call function to set the high score.
    setHighScore();
    score = -1;
  }
}
//Function to set the high score.
function setHighScore() {
  high_score.innerHTML = localStorage.getItem("highscore");
}
//Function to reset the high score.
function resetScore() {
  if (window.confirm("Are you sure to reset the high score?")) {
    localStorage.setItem("highscore", 0);
    high_score.innerHTML = localStorage.getItem("highscore");
  }
}
//Function to change difficulty level.
function changeDifficulty() {
  //Get the chosen difficulty level
  let level = difficulty.value;
  if (level == "Easy") {
    currentLevel = levels.easy;
    seconds.innerHTML = currentLevel;
    time = currentLevel;
  } else if (level == "Medium") {
    currentLevel = levels.medium;
    seconds.innerHTML = currentLevel;
    time = currentLevel;
  } else {
    currentLevel = levels.hard;
    seconds.innerHTML = currentLevel;
    time = currentLevel;
  }
}
