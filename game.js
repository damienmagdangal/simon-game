const buttonColours = ["red", "blue", "green", "yellow"];
let gamePattern = [];
let userClickedPattern = [];
let level = 1;
let hasStarted = false;

$(document).keypress((e) => {
  if (e && hasStarted === false) {
    nextSequence();
  }
});

$(".btn").click((e) => {
  let userChosenColor = e.currentTarget.id;
  userClickedPattern.push(userChosenColor);
  playSound(userChosenColor);
  animateClick(userChosenColor);
  checkAnswer(userClickedPattern.length - 1);
});

function nextSequence() {
  $("h1").text(`Level: ${level}`);
  hasStarted = true;
  let randomNumber = Math.floor(Math.random() * 4);
  let randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
  console.log(gamePattern);
  playSound(randomChosenColour);
  animateNextSequence(randomChosenColour);
  userClickedPattern = [];
}

function animateClick(randomChosenColour) {
  $(`#${randomChosenColour}`).addClass("pressed");
  setTimeout(() => {
    $(`#${randomChosenColour}`).removeClass("pressed");
  }, 100);
}

function animateNextSequence(randomChosenColour) {
  $(`#${randomChosenColour}`).fadeOut(100).fadeIn(100);
}

function playSound(color) {
  let sound = new Audio(`./sounds/${color}.mp3`);
  sound.play();
}

function checkAnswer(currentLevel) {
  let status = "";
  console.log(currentLevel);
  console.log("User clicked: " + userClickedPattern);
  console.log("Game pattern: " + gamePattern);
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    status = "success";
    console.log("success");
    if (gamePattern.length === userClickedPattern.length) {
      level++;
      $("body").addClass("game-success");
      setTimeout(() => {
        $("body").removeClass("game-success");
      }, 500);
      setTimeout(() => {
        nextSequence();
      }, 1000);
    }
  } else {
    console.log("error");
    $("h1").text(`Wrong! Refresh to restart!`);
    $("body").addClass("game-over");
    setTimeout(() => {
      $("body").removeClass("game-over");
    }, 500);
    playSound("wrong");
  }
}
