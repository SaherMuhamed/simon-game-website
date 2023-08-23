let level = 0;
let gamePattern = [];
let userClickedPattern = [];
let isGameStarted = false;
let buttonColors = ["red", "blue", "green", "yellow"];


$("button").click(function () {
    let userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);

    animatePress(userChosenColour);
    playSound(userChosenColour);
    checkAnswer(userClickedPattern.length-1);
});

$(document).keypress(function (event) {
    // $("h1").text(event.key);
    // console.log(event.key);
    isGameStarted = true;
    if (isGameStarted) {
        $("h1").text(`Level ${level}`);
        nextSequence();
    }
});

function nextSequence() {
    let randomNumber = Math.floor(Math.random() * 4);
    let randomChosenColor = buttonColors[randomNumber];
    
    userClickedPattern = [];
    level++;
    $("h1").text(`Level ${level}`);

    gamePattern.push(randomChosenColor);

    $(`#${randomChosenColor}`).fadeOut(150).fadeIn(150);
    playSound(randomChosenColor);
}

function playSound(colorName) {
    let sound = new Audio(`./sounds/${colorName}.mp3`);
    sound.play();
}

function animatePress(currentColor) {
    $(`#${currentColor}`).addClass("pressed");
    setTimeout(function () {
        $(`#${currentColor}`).removeClass("pressed");
    }, 100);
}

function checkAnswer(currentLevel) {
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
      console.log("success");
      if (userClickedPattern.length === gamePattern.length){
        setTimeout(function () {
          nextSequence();
        }, 1000);
      }
    } else {
        let wrongAnswerSound = new Audio(`./sounds/wrong.mp3`);
        wrongAnswerSound.play();
        $("h1").text("Game Over!, Press Any Key to Restart");
        $("body").addClass("game-over");
        setTimeout(function () {
            $("body").removeClass("game-over");
          }, 200);
        startOver();
      console.log("wrong");
    }
}

function startOver() {
    level = 0;
    isGameStarted = true;
    gamePattern = [];
}