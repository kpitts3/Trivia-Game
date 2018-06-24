var questionArray = [
  {
    question: "What is the planet of the Time Lords?",
    answerList: ["Poosh", "Gallifrey", "Skaro", "Vortis"],
    correct: 1,
  },
  {
    question: "Which one of the following is given the nickname 'Potato Heads'?",
    answerList: ["Ood", "Daleks", "Cyber men", "Sontarans"],
    correct: 3,
  },
  {
    question: "What is the 10th Doctor's favorite catchphrase?",
    answerList: ["Allons-y!", "Fantastic!", "Who da man?", "Do you want a jelly baby?"],
    correct: 0,
  },
  {
    question: "What is the 11th Doctor's favorite food?",
    answerList: ["Pickles and Ketchup", "Fish Fingers and Custard", "Hot Dogs and Hummus", "Figgy Pudding and Marshmallows"],
    correct: 1,
  },
  {
    question: "John Barrowman plays what character in Doctor Who?",
    answerList: ["The 10th Doctor", "Rory Williams", "Mickey Smith", "Jack Harkness"],
    correct: 3,
  },
  {
    question: "Which one of the following villains is also a timelord like the Doctor?",
    answerList: ["Ood", "Daleks", "The Master", "Sontarans"],
    correct: 2,
  },
  {
    question: "The 10th Doctor had three main Companions. Who was not one of them?",
    answerList: ["Rose Tyler", "Amy Pond", "Martha Jones", "Donna Noble"],
    correct: 1,
  },
  {
    question: "What musical instrument did the second Doctor play, that supposedly helped him to think?",
    answerList: ["Kazoo", "Trombone", "Piccolo", "Recorder"],
    correct: 3,
  },
  {
    question: "What actor plays the 9th Doctor?",
    answerList: ["David Tennant", "Christopher Eccleston", "Arthur Darvill", "John Barrowman"],
    correct: 1,
  },
  {
    question: "Who do Morgaine and Mordred say the Doctor is?",
    answerList: ["Merlin", "Nicolas Flamel", "King Arthur", "Lancelot"],
    correct: 0,
  },
];

var displayArray = ["You Got It!", "Wrong!", "You are no Time Lord!", "See Your Final Score!"]
var gifArray = ["https://media.giphy.com/media/MSS0COPq80x68/giphy.gif", "https://media.giphy.com/media/8ggVeQfq7X33y/giphy.gif", "https://media.giphy.com/media/kKPWz3TC2LBGo/giphy.gif", "https://media.giphy.com/media/g5KhmX06Q0XBu/giphy.gif"]
var currentQuestion = 0;
var questionNum = 0;
var correctAns = 0;
var incorrectAns = 0;
var unanswered = 0;
var clicked = true;
var time;
var seconds;
var userSelect;
var newGif = $("<img>");
$("#restart").hide();

//Start button click function
$("#startGame").on("click", function () {
  startGame();
});

//restart button click function
$("#restart").on("click", function () {
  startGame();
});

//startGame function
function startGame() {
  $("#startGame").hide();
  $("#restart").hide();
  $("#message").empty();
  $("#timer").empty();
  $("#question").empty();
  $("#choices").empty();
  $("#correct").empty();
  $("#incorrect").empty();
  $("#unanswered").empty();
  $("#gif").empty();
  currentQuestion = 0;
  correctAns = 0;
  incorrectAns = 0;
  unanswered = 0;
  loadQuestion();
};

//startTimer function
function startTimer() {
  seconds = 15;
  $("#timer").html("Time Remaining: " + seconds);
  time = setInterval(countDown, 1000);
};

//Show countDown function
function countDown() {
  seconds--;
  $("#timer").html("Time Remaining: " + seconds);
  if (seconds <= 0) {    
    clicked = false;
    evalAnswer();
    clearInterval(time);
  }
};

//loadQuestion function/answer onclick function
function loadQuestion() {
  $("#message").empty();
  $("#gif").empty();
  
  //push random question from array to stage  
  if (currentQuestion <= questionArray.length - 1) {
    questionNum = currentQuestion + 1;
    $("#question").text("Question #" + questionNum + ": " + questionArray[currentQuestion].question);
    for (i = 0; i < questionArray[currentQuestion].answerList.length; i++) {
      var newButton = $("<button>");
      newButton.text(questionArray[currentQuestion].answerList[i]);
      newButton.addClass("choiceList");
      newButton.attr("data-listNum", i);
      $("#choices").append("<br>")
      $("#choices").append(newButton);
      $("#choices").append("<br>")
    };
    //call Timer function
    startTimer();
    //on click for buttons that will change page and evaluate answer
    $(".choiceList").on("click", function () {
      clicked = true;
      userSelect = $(this).attr("data-listNum");
      evalAnswer();
      clearInterval(time);
    });
  }
  else {
    finalScore();
  }
};

  //function to evaluate user's guess
  function evalAnswer() {
    $("#timer").empty();
    $("#question").empty();
    $("#choices").empty();

    if (userSelect == questionArray[currentQuestion].correct && clicked == true) {
      correctAns++;
      $("#message").text(displayArray[0]);
      newGif.attr("src",gifArray[0]);
      $("#gif").append(newGif);
      setTimeout(loadQuestion, 5000);
    }
    else if (userSelect != questionArray[currentQuestion].correct && clicked == true) {
      incorrectAns++;
      $("#message").text(displayArray[1]);
      $("#question").text("The correct answer is: " + questionArray[currentQuestion].answerList[questionArray[currentQuestion].correct]);
      newGif.attr("src",gifArray[1]);
      $("#gif").append(newGif);
      setTimeout(loadQuestion, 5000);
    }
    else {
      unanswered++;
      $("#question").text("The correct answer is: " + questionArray[currentQuestion].answerList[questionArray[currentQuestion].correct]);
      $("#message").text(displayArray[2]);
      newGif.attr("src",gifArray[2]);
      $("#gif").append(newGif);
      setTimeout(loadQuestion, 5000);
    };
    currentQuestion++;
    console.log(currentQuestion);
  };

//function to show the final score
function finalScore() {
  $("#gif").empty();
  $("#question").empty();
  $("#messsage").empty();
  $("#timer").empty();
  $("#choices").empty();
  clearInterval(time);
  
  newGif.attr("src",gifArray[3]);
  $("#gif").append(newGif);
  $("#message").text(displayArray[3])
  $("#correct").text("Correct Answers: " + correctAns);
  $("#incorrect").text("Incorrect Answers: " + incorrectAns);
  $("#unanswered").text("Unanswered: " + unanswered);  
  $("#restart").show();
};