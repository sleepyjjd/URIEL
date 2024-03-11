//question arrays

var q1 = [
    "1",
    "What is the Chemical Symbol for Gold?",
    "Ge",
    "Au",
    "Ag",
    "Fe",
    3,
  ];
  
  var q2 = [
    "2",
    "Identify the element symbol 'Ne'",
    "Neon",
    "Nitrogen",
    "Nickel",
    "Sodium",
    2,
  ];
  
  var q3 = [
    "3",
    "Which element is represented by the Symbol 'Ag'?",
    "Silver",
    "Gold",
    "Aluminum",
    "Argon",
    2,
  ];
  
  var q4 = [
    "4",
    "Which element has the atomic number 1?",
    "Hydrogen",
    "Helium",
    "Lithium",
    "Beryllium",
    2,
  ];
  
  var q5 = [
    "5",
    "What is the Chemical Symbol for Iron?",
    "I",
    "Ir",
    "In",
    "Fe",
    5,
  ];
  var q6 = [
    "6",
    "What is the Chemical Symbol for Potassium?",
    "Ka",
    "K",
    "Ke",
    "Kr",
    3,
  ];
  var q7 = [
    "7",
    "Which element has the symbol 'Ni'?",
    "Phosphorus",
    "Copper",
    "Nickel",
    "Hydrogen",
    4,
  ];
  var q8 = [
    "8",
    "What is the Atomic Mass of Oxygen?",
    "16",
    "15",
    "14",
    "13",
    2,
  ];
  var q9 = [
    "9",
    "Identify the element with the Symbol 'Pb'",
    "Phosphorus",
    "Platinum",
    "Lead",
    "Palladium",
    4,
  ];
  var q10 = [
    "10",
    "Which Elements is a Noble Gas?",
    "Carbon",
    "Sodium",
    "Helium",
    "Chlorine",
    4,
  ];
  var q11 = [
    "11",
    "What is the molar mass of Sodium Hydroxide (NaOH)?",
    "38g/mol",
    "40g/mol",
    "44g/mol",
    "23g/mol",
    3,
  ];
  var q12 = [
    "12",
    "What is the molar mass of glucose (C6H12O6)?",
    "360g/mol",
    "120g/mol",
    "160g/mol",
    "180g/mol",
    5,
  ];
  var q13 = [
    "13",
    "How many moles are in 4.20g of water?",
    "0.233 moles",
    "0.315 moles",
    "0.715 moles",
    "1.175 moles",
    2,
  ];
  var q14 = [
    "14",
    "What is the molar mass of CO2?",
    "32g/mol",
    "26g/mol",
    "14g/mol",
    "44g/mol",
    5,
  ];
  var q15 = [
    "15",
    "What is the mass in grams of 0.728 moles of NaHCO3?",
    "52.74g",
    "61.16g",
    "76.51g",
    "43.21g",
    3,
  ];

   


  
  // for answer checking, score retention, and clock management (number of questions din indicated dito para lumabas sa screen)
  var numQuestions = 5;
  var questArray = [q1, q2, q3, q4, q5,q6,q7,q8,q9,q10,q11,q12,q13,q14,q15];
  var currentScore = 0;
  var questionIndex = 0;
  var currentQuestArray = q1;
  var timeLeft = 300;
  
  //gameScores array used for leaderboard.
  var gameScores = JSON.parse(localStorage.getItem("results")) || [];
  
  //variable assignments to get elements (response kung ano correct ans kineme)
  var questNum = document.getElementById("qNum");
  var questText = document.getElementById("qText");
  var ans1 = document.getElementById("answer1");
  var ans2 = document.getElementById("answer2");
  var ans3 = document.getElementById("answer3");
  var ans4 = document.getElementById("answer4");
  var resButton = document.getElementById("showResult");
  var countdown = document.getElementById("clock");
  var qCard = document.getElementById("question-card");
  var startButton = document.getElementById("start-button");
  var startBox = document.getElementById("start");
  var gameOverBox = document.getElementById("game-over");
  var finalScore = document.getElementById("score-span");
  var playAgainButton = document.getElementById("play-again");
  var leaderButton = document.getElementById("register-score");
  var leaderBoard = document.getElementById("leaderboard");
  var initButton = document.getElementById("initial-entry");
  var inputData = document.getElementById("input-form");
  var leaveBoard = document.getElementById("leave-board");
  var clearScores = document.getElementById("clear-scores");
  var recentScores = document.getElementById("recent-scores");
  
  function loadQuestion(questArray) {
    questNum.textContent = "Question " + questArray[0];
    questText.textContent = questArray[1];
    ans1.textContent = questArray[2];
    ans2.textContent = questArray[3];
    ans3.textContent = questArray[4];
    ans4.textContent = questArray[5];
    currentAnswer = questArray[6];
    resButton.setAttribute("style", "display:none");
  }
  
  function startGame() {
    startBox.setAttribute("style", "display:none");
    qCard.setAttribute("style", "display:block");
    gameOverBox.setAttribute("style", "display:none");
    leaderBoard.setAttribute("style", "display:none");
    timeLeft = 300;
    score = 0;
    questionIndex = 0;
    var questArray = [q1, q2, q3, q4, q5,q6,q7,q8,q9,q10,q11,q12,q13,q14,q15];
    currentQuestArray = q1;
    loadQuestion(q1);
    timer();
  }
  
  function clearQuestion() {
    questNum.textContent = "";
    questText.textContent = "";
    ans1.textContent = "";
    ans2.textContent = "";
    ans3.textContent = "";
    ans4.textContent = "";
    resButton.textContent = "";
    ans1.setAttribute("style", "background-color:white");
    ans2.setAttribute("style", "background-color:white");
    ans3.setAttribute("style", "background-color:white");
    ans4.setAttribute("style", "background-color:white");
  }
  
  function nextQuestion() {
    clearQuestion();
    questionIndex++;
    if (questionIndex === questArray.length) {
      gameOver();
    }
    currentQuestArray = questArray[questionIndex];
    loadQuestion(currentQuestArray);
  }
  
  function gameOver() {
    qCard.setAttribute("style", "display:none");
    timeLeft = 0;
    gameOverBox.setAttribute(
      "style",
      "display:flex; flex-direction: column; justify-items:center; align-content: center; align-items: center; "
    );
    finalScore.textContent = currentScore;
  }
  
  function openLeader() {
    startBox.setAttribute("style", "display:none");
    qCard.setAttribute("style", "display:none");
    gameOverBox.setAttribute("style", "display:none");
    leaderBoard.setAttribute(
      "style",
      "display:flex; flex-direction: column; justify-items:center; align-content: center; align-items: center;"
    );
  
   
  }
  
  function clearLeader() {
    localStorage.clear();
    location.reload();
  }
  
  /*timer function eto and controls clock*/
  function timer() {
    var timeInterval = setInterval(function () {
      countdown.textContent = "Seconds Remaining: " + timeLeft;
      timeLeft--;
  
      if (timeLeft <= 0) {
        clearInterval(timeInterval);
        gameOver();
      }
    }, 1000);
  }
  
  
  //button for start game
  startButton.addEventListener("click", startGame);
  
  //button event listeners for answer check. checks index of button pushed against the current question answer.
  //for answers response sha eto ung lumalabas kapag mali answer
  ans1.addEventListener("click", function () {
    if (currentAnswer === 2) {
      ans1.setAttribute("style", "background-color:green");
      currentScore += 10; //sa oras to pag tumama dagdag time
      resButton.setAttribute("style", "display:block");
      resButton.textContent = "Correct! Your Current Score is: " + currentScore;
      setTimeout(nextQuestion, 1000);
    } else {
      ans1.setAttribute("style", "background-color:red");
      resButton.setAttribute("style", "display:block");
      timeLeft -= 10;//sa oras to pag tumama dagdag time
      resButton.textContent =
        "Sorry. The Correct Answer was " +
        currentQuestArray[currentAnswer] +
        ". Your Current Score is: \n" +
        currentScore;
      setTimeout(nextQuestion, 1000);
    }
  });
  
  // same here response rin sha
    ans2.addEventListener("click", function () {
    if (currentAnswer === 3) {
      ans2.setAttribute("style", "background-color:green");
      currentScore += 10; //sa oras to pag tumama dagdag time
      resButton.setAttribute("style", "display:block");
      resButton.textContent = "Correct! Your Current Score is: " + currentScore;
      setTimeout(nextQuestion, 1000);
    } else {
      ans2.setAttribute("style", "background-color:red");
      resButton.setAttribute("style", "display:block");
      timeLeft -= 10;//sa oras to pag tumama dagdag time
      resButton.textContent =
        "Sorry. The Correct Answer was " +
        currentQuestArray[currentAnswer] +
        ". Your Current Score is: \n" +
        currentScore;
      setTimeout(nextQuestion, 1000);
    }
  });
  
  ans3.addEventListener("click", function () {
    if (currentAnswer === 4) {
      ans3.setAttribute("style", "background-color:green");
      currentScore += 10;
      resButton.setAttribute("style", "display:block");
      resButton.textContent = "Correct! Your Current Score is: " + currentScore;
      setTimeout(nextQuestion, 1000);
    } else {
      ans3.setAttribute("style", "background-color:red");
      resButton.setAttribute("style", "display:block");
      timeLeft -= 10;
      resButton.textContent =
        "Sorry. The Correct Answer was " +
        currentQuestArray[currentAnswer] +
        ". Your Current Score is: \n" +
        currentScore;
      setTimeout(nextQuestion, 1000);
    }
  });
  
  ans4.addEventListener("click", function () {
    if (currentAnswer === 5) {
      ans4.setAttribute("style", "background-color:green");
      currentScore += 10;
      resButton.setAttribute("style", "display:block");
      resButton.textContent = "Correct! Your Current Score is: " + currentScore;
      setTimeout(nextQuestion, 1000);
    } else {
      ans4.setAttribute("style", "background-color:red");
      resButton.setAttribute("style", "display:block");
      timeLeft -= 10;
      resButton.textContent =
        "Sorry. The Correct Answer was " +
        currentQuestArray[currentAnswer] +
        ". Your Current Score is: \n" +
        currentScore;
      setTimeout(nextQuestion, 1000);
    }
  });
  
  resButton.addEventListener("click", function () {
    numQuestions--;
    if (numQuestions === 0) {
      gameOver();
    } else nextQuestion();
  });
  
  playAgainButton.addEventListener("click", startGame);
  
  leaderButton.addEventListener("click", openLeader);
  
  //form event listiner to capture initials.
  
  initButton.addEventListener("click", function (event) {
    event.preventDefault();
  
    var initials = document.querySelector("#initials").value;
    var score = currentScore;
  
    //add new key-value pair to gameScores array
    gameScores.push({ initial: initials, score: score });
  
    localStorage.setItem("results", JSON.stringify(gameScores));
  
    var li = document.createElement("li");
  
    //append new li item to list of scores
    li.textContent = initials + " - " + score;
    document.getElementById("data").append(li);
  });
  









  
  leaveBoard.addEventListener("click", startGame);
  clearScores.addEventListener("click", clearLeader);
  recentScores.addEventListener("click", openLeader);