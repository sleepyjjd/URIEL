//cards i2
const deckCards = [
  "chlorine.jpg",
  "chlorine1.jpg",
  "zinc.jpg",
  "zinc1.jpg",
  "silver.jpg",
  "silver1.jpg",
  "oxygen.jpg",
  "oxygen1.jpg",
  "nickel.jpg",
  "nickel1.jpg",
  "iodine.jpg",
  "iodine1.jpg",
  "hydrogen.jpg",
  "hydrogen1.jpg",
  "helium.jpg",
  "helium1.jpg",
  ];
  
  const deck = document.querySelector(".deck");
  let opened = [];
  let matched = [];
  let gameMode = "";
  
  const modal = document.getElementById("modal");
  const startModal = document.getElementById("start-modal");
  
  const reset = document.querySelector(".reset-btn");
  const playAgain = document.getElementById("play-again");
  const movesCount = document.querySelector(".moves-counter");
  const easyGame = document.getElementById("easyGame");
  const mediumGame = document.getElementById("mediumGame");
  const hardGame = document.getElementById("hardGame");
  
  let moves = 0;
  const star = document.getElementById("star-rating").querySelectorAll(".star");
  let starCount = 3;
  const timeCounter = document.querySelector(".timer");
  let time;
  let minutes = 0;
  let seconds = 0;
  let timeStart = false;
  
  let best_moves = 0;
  let best_time = 0;
  // get the best moves and best time if present
  
  // function for getting the best score 
  //nalabas sa taas 
  function getBestScores(bestMoves, bestTime) {
    if (localStorage.getItem(bestMoves)) {
      best_moves = localStorage.getItem(bestMoves);
    }
    if (localStorage.getItem(bestTime)) {
      best_time = localStorage.getItem(bestTime);
    }
  }
  
  //function for setting the best score to localStorage
  function setBestScores(bestMoves, bestTime) {
    localStorage.setItem(bestMoves, best_moves);
    localStorage.setItem(bestTime, best_time);
  }
  
  function showModalStart() {
    startModal.style.display = "block";
  }
  
  showModalStart();
  
  function shuffle(array) {
    let currentIndex = array.length,
      temporaryValue,
      randomIndex;
  
    while (currentIndex !== 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
    return array;
  }
  
  function startGame() {
    let cards = [];
    console.log(gameMode, mediumGame);
    if (gameMode === "easy") {
      cards = deckCards.slice(0, 4);
      deck.classList.add("easy");
    } else if (gameMode === "medium") {
      deck.classList.add("medium");
      cards = deckCards.slice(0, 8);
    } else {
      deck.classList.add("hard");
      cards = [...deckCards];
    }
  
    
    const shuffledDeck = shuffle(cards);

    for (let i = 0; i < shuffledDeck.length; i++) {
   
      const liTag = document.createElement("LI");
     
      liTag.classList.add("card");
     
      const addImage = document.createElement("IMG");

      liTag.appendChild(addImage);
    
      addImage.setAttribute("src", "img/" + shuffledDeck[i]);
    
      addImage.setAttribute("alt", "image of vault boy from fallout");
   
  
      const divTag = document.createElement("DIV");
      divTag.classList.add("tilt");
      divTag.appendChild(liTag);
  
      updateReflection(liTag, 100, 0);
      liTag.addEventListener("mousemove", (event) => {
        const scale = 0.03;
        const midX = (liTag.clientHeight / 2) * scale;
        const mouseXoffset = event.offsetX * scale;
        const mouseX = mouseXoffset - midX;
  
        const midY = (liTag.clientWidth / 2) * scale;
        const mouseYoffset = event.offsetY * scale;
        const mouseY = mouseYoffset - midY;
        updateReflection(liTag, mouseX * 50, mouseY * 50);
        const rotation = `rotateX(${mouseY}deg) rotateY(${mouseX}deg)`;
        liTag.style.transform = rotation;
      });
  
      liTag.addEventListener("mouseleave", (event) => {
        // liTag.style.transform = `rotateX(0deg) rotateY(0deg)`;
      });
  
      
      liTag.addEventListener("click", (event) => {
        liTag.style.transform = `rotateX(0deg) rotateY(180deg)`;
      });
  
      deck.appendChild(divTag);
    }
  }
  
  function removeCard() {
    
    while (deck.hasChildNodes()) {
      deck.removeChild(deck.firstChild);
    }
  }
  
  function timer() {
    time = setInterval(function () {
      seconds++;
      if (seconds === 60) {
        minutes++;
        seconds = 0;
      }
  
      timeCounter.innerHTML =
        minutes.toLocaleString("en-US", {
          minimumIntegerDigits: 2,
          useGrouping: false,
        }) +
        ":" +
        seconds.toLocaleString("en-US", {
          minimumIntegerDigits: 2,
          useGrouping: false,
        });
    }, 1000);
  }
  
  function stopTime() {
    clearInterval(time);
  }
  
  function resetEverything() {
    // top time, reset the minutes and seconds
    stopTime();
    timeStart = false;
    seconds = 0;
    minutes = 0;
    timeCounter.innerHTML = "00:00";
    // reset star count and the add the class back to show stars again
    star[1].firstElementChild.classList.add("fa-star");
    star[2].firstElementChild.classList.add("fa-star");
    starCount = 3;
    // reset moves count 
    moves = 0;
    movesCount.innerHTML = 0;
    // clear both arrays that hold the opened and matched cards
    matched = [];
    opened = [];
    // clear the deck
    removeCard();
  
    if (gameMode === "easy") deck.classList.remove("easy");
    else if (gameMode === "medium") deck.classList.remove("medium");
    else deck.classList.remove("hard");
    startModal.style.display = "block";
  }
  
  function movesCounter() {
    // Update the html for the moves counter
    movesCount.innerHTML++;
    // Keep track of the number of moves for every pair checked
    moves++;
  }
  
  function starRating() {
    if (moves === 14) {
      // first element child is the <i> within the <li>
      star[2].firstElementChild.classList.remove("fa-star");
      starCount--;
    }
    if (moves === 18) {
      star[1].firstElementChild.classList.remove("fa-star");
      starCount--;
    }
  }
  
  function compareTwo() {
   
    if (opened.length === 2) {
        
        document.body.style.pointerEvents = "none";

       
        if (opened[0].src === opened[1].src.replace("1.jpg", ".jpg")) {
   
            match();
        } else {
            noMatch();
        }
    }
}
  
  function match() {
    /* Access the two cards in opened array and add
    the class of match to the imgages parent: the <li> tag
    */
    setTimeout(function () {
      opened[0].parentElement.classList.add("match");
      opened[1].parentElement.classList.add("match");
      // Push the matched cards to the matched array
      matched.push(...opened);
      // Allow for further mouse clicks on cards
      document.body.style.pointerEvents = "auto";
      // Check to see if the game has been won with all 8 pairs
      winGame();
      // Clear the opened array
      opened = [];
    }, 600);
    // Call movesCounter to increment by one
    movesCounter();
    starRating();
  }
  
  function noMatch() {
   
    setTimeout(function () {
      opened[0].parentElement.classList.remove("flip");
      opened[1].parentElement.classList.remove("flip");
      document.body.style.pointerEvents = "auto";

      opened = [];
    }, 700);
 
    movesCounter();
    starRating();
  }
  
  function calculateBestScores(bestMoves, bestTime) {
    let total_time = minutes * 60 + seconds;
    best_moves = 0;
    best_time = 0;
 
    getBestScores(bestMoves, bestTime);
    if (best_moves == 0 || best_time == 0) {
      best_moves = moves;
      best_time = total_time;
    } else {
   
      best_moves = Math.min(best_moves, moves);
      best_time = Math.min(best_time, total_time);
    }
    setBestScores(bestMoves, bestTime);
  }
  
  function AddStats() {
  
  
    const details = document.getElementById("modal-details");
    
    for (let i = 1; i <= 3; i++) {
      const statsElement = document.createElement("p");
      statsElement.classList.add("stats");
      details.appendChild(statsElement);
    }
  
  
    let p = details.querySelectorAll("p.stats");
    let best_minute = Math.floor(best_time / 60);
    let best_second = best_time % 60;
    
  
    p[0].innerHTML = `Time taken: ${minutes} Minutes and ${seconds} Seconds (Best Time: ${best_minute} Minutes and ${best_second} Seconds)`;
    p[1].innerHTML = `Moves Taken: ${moves} (Best Moves: ${best_moves})`;
    p[2].innerHTML = `Your Star Rating is: ${starCount}/3`;
  }
  function displayModal() {
   
    const modalClose = document.getElementsByClassName("close")[0];
 
    modal.style.display = "block";
  
    modalClose.onclick = function () {
      modal.style.display = "none";
    };
   
    window.onclick = function (event) {
      if (event.target == modal) {
        modal.style.display = "none";
      }
    };
  }
  
  function winGame() {
    let len = 0;
    if (gameMode === "easy") len = 4;
    else len = gameMode === "medium" ? 8 : 16;
  
    if (matched.length === len) {
      stopTime();
      if (gameMode === "hard") {
        calculateBestScores("bestMovesHard", "bestTimeHard");
      } else if (gameMode === "medium") {
        calculateBestScores("bestMovesMedium", "bestTimeMedium");
      } else {
        calculateBestScores("bestMovesEasy", "bestTimeEasy");
      }
      AddStats();
      displayModal();
    }
  }
  
  deck.addEventListener("click", function (evt) {
    if (evt.target.nodeName === "LI") {
      // Start the timer after the first click of one card
      // Executes the timer() function
      if (timeStart === false) {
        timeStart = true;
        timer();
      }
      // Call flipCard() function
      flipCard();
    }
  
    //Flip the card and display cards img
    function flipCard() {
      // When <li> is clicked add the class .flip to show img
      evt.target.classList.add("flip");
      // Call addToOpened() function
      addToOpened();
    }
  
    //Add the fliped cards to the empty array of opened
    function addToOpened() {
      /* If the opened array has zero or one other img push another
        img into the array so we can compare these two to be matched
        */
      if (opened.length === 0 || opened.length === 1) {
        // Push that img to opened array
        opened.push(evt.target.firstElementChild);
      }
      // Call compareTwo() function
      compareTwo();
    }
  });
  
  reset.addEventListener("click", resetEverything);
  
  easyGame.addEventListener("click", function () {
    console.log("ENTROU");
    startModal.style.display = "none";
    gameMode = "easy";
    startGame();
  });
  
  mediumGame.addEventListener("click", function () {
    startModal.style.display = "none";
    gameMode = "medium";
    console.log("ENTROU");
    startGame();
  });
  
  hardGame.addEventListener("click", function () {
    startModal.style.display = "none";
    gameMode = "hard";
    console.log("ENTROU");
    startGame();
  });
  
  playAgain.addEventListener("click", function () {
    modal.style.display = "none";
    resetEverything();
  });
  
  function updateReflection(card, degree, percentage) {
    card.style.background = `linear-gradient(${degree}deg, rgba(23, 180, 109 ,0.6) 0%,rgba(23, 180, 109,0.8) ${percentage}%,rgba(23, 180, 109,0.7) 100%)`;
    card.style.backgroundSize = "cover";
  }