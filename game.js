var buttonColors = ["red","blue","green","yellow"];
var gamePattern = [];
var userClickedPattern = [];
var isGameStarted = false;
var level = 0;

$(".btn").on("click", function(){
  var userChosenColor = $(this).attr("id");
  userClickedPattern.push(userChosenColor);
  playSound(userChosenColor);
  animatePress(userChosenColor);
  checkAnswer(level);
});

$(this).on("keydown", function(){
  if (isGameStarted == false) {
      nextSequence();
      isGameStarted = true;
  }
})

function playSound(sound){
  switch (sound) {
    case "red":
      var redSound = new Audio('sounds/red.mp3');
      redSound.play();
      break;
    case "blue":
      var blueSound = new Audio('sounds/blue.mp3');
      blueSound.play();
      break;
    case "green":
      var greenSound = new Audio('sounds/green.mp3');
      greenSound.play();
      break;
    case "yellow":
      var yellowSound = new Audio('sounds/yellow.mp3');
      yellowSound.play();
      break;
    case "wrong":
      var wrongSound = new Audio('sounds/wrong.mp3');
      wrongSound.play();
      break;
    default:

  }
}

function animatePress(currentColor){
  $("#" + currentColor).addClass("pressed");
  setTimeout(function(){
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}

function nextSequence(){
  var random = Math.floor(Math.random()*4);
  var randomChosenColor = buttonColors[random];

  level += 1;
  $("#level-title").text("level " + level);

  gamePattern.push(randomChosenColor);

  $("#" + randomChosenColor).fadeOut().fadeIn();
  playSound(randomChosenColor);
}

function checkAnswer(currentLevel){
  var c = 0;
  if(gamePattern[c] == userClickedPattern[c]){
    if(currentLevel == userClickedPattern.length){
      setTimeout(nextSequence ,1000);
      userClickedPattern = [];
    }
    c += 1;
  }
  else{
    playSound("wrong");
    $("body").addClass("game-over");
    setTimeout(function(){
      $("body").removeClass("game-over");
    },100);
    $("#level-title").text("Game Over, Press Any Key to Restart");
    startOver();
  }
}

function startOver(){
  level = 0;
  gamePattern = [];
  userClickedPattern = [];
  isGameStarted = false;
}
