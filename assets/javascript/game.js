var trivia = {
  initialScreen: "",
  correctCounter: 0,
  inCorrectCounter: 0,
  unAnsweredCounter: 0,
  // Trying to add a sound on click even but got stuck and couldnt get this to work. I will fix this in the future
  clickSound: new Audio("assets/sounds/button-click.mp3"),
  gameHTML: "",
  questionsArray: [
                  "What was Robert E Lee's most famous horse?", "In the United States which breed of dog is commonly known as a firehouse dog?", "When adjusted for inflation, which is the highest grossing film of all time?", "In which state was the first oil well drilled in the United States?", "How many moons does the planet Venus have?"],
  answerArray: [
                ["Juno", "Rufus", "Traveller", "Peter"], ["Labrador", "German Shepard", "Dalmation", "Corgy"], ["The Titanic", "Toy Story", "Top Gun", "Gone With the Wind"], ["Texas", "Pennsylvania", "New York", "North Carolina"], ["1", "Zero", "10", ""],],
  correctAnswers: [
                  "C. Traveller", "C. Dalmation", "D. Gone With the Wind", "B. Pennsylvania", "B. Zero"],
  imageArray: [
              "<img class='center-block img-right' src='assets/images/horse.jpg'>", "<img class='center-block img-right' src='assets/images/Dalmatian.jpg'>", "<img class='center-block img-right' src='assets/images/gwtw.jpg'>", "<img class='center-block img-right' src='assets/images/Penn.jpg'>", "<img class='center-block img-right' src='assets/images/venus.jpg'>"],
  clock: "",
  questionCounter: 0,
  timeCounter: 20,
};


//FUNCTIONS
//===========================================
function startScreen(){
  //Create the start button
  trivia.initialScreen = "<p class='text-center main-button'><a class='btn btn-primary btn-lg start-button text-center' href='#'>Begin!</a></p>";
  //Add Start button to main-area
  $(".main-area").html(trivia.initialScreen);
};

function timer(){
  trivia.clock = setInterval(twentySeconds, 1000);
  function twentySeconds(){
    if(trivia.timeCounter === 0){
      timeOutLoss();
      clearInterval(trivia.clock);
    }
    if(trivia.timeCounter > 0) {
      trivia.timeCounter --;
    }
    $(".timer").html(trivia.timeCounter);
  }
};

function wait(){
  if(trivia.questionCounter < 4) {
    trivia.questionCounter ++;
    generateHTML();
    trivia.timeCounter = 20;
    timer();
  }
  else {
    finalScreen();
  }
};

function win(){
  trivia.correctCounter ++;
  trivia.gameHTML = "<p class='text-center'> Time Remaining: <span class='timer'>" + trivia.timeCounter + "</span></p>" + "<p class='text-center'>Correct! The answer is: " + trivia.correctAnswers[trivia.questionCounter] + "</p>" + trivia.imageArray[trivia.questionCounter];
  $(".main-area").html(trivia.gameHTML);
  setTimeout(wait, 4000);
};

function loss(){
  trivia.inCorrectCounter ++;
  trivia.gameHTML = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>" + trivia.timeCounter + "</span></p>" + "<p class='text-center'>Wrong! The correct answer is: "+ trivia.correctAnswers[trivia.questionCounter] + "</p>" + trivia.imageArray[trivia.questionCounter];
	$(".main-area").html(trivia.gameHTML);
	setTimeout(wait, 4000);
};

function timeOutLoss(){
  trivia.unAnsweredCounter ++;
  trivia.gameHTML = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>" + trivia.timeCounter + "</span></p>" + "<p class='text-center'>You ran out of time!  The correct answer was: " + trivia.correctAnswers[trivia.questionCounter] + "</p>" + trivia.imageArray[trivia.questionCounter];
	$(".main-area").html(trivia.gameHTML);
	setTimeout(wait, 4000);
};

function finalScreen(){
  trivia.gameHTML = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>" + trivia.timeCounter + "</span></p>" + "<p class='text-center'>All done, here's how you did!" + "</p>" + "<p class='summary-correct'>Correct Answers: " + trivia.correctCounter + "</p>" + "<p>Wrong Answers: " + trivia.inCorrectCounter + "</p>" + "<p>Unanswered: " + trivia.unAnsweredCounter + "</p>" + "<p class='text-center reset-button-container'><a class='btn btn-primary btn-lg btn-block reset-button' href='#' role='button'>Reset The Quiz!</a></p>";
  $(".main-area").html(trivia.gameHTML);
};

function resetGame(){
  trivia.questionCounter = 0;
  trivia.correctCounter = 0;
  trivia.inCorrectCounter = 0;
  trivia.unAnsweredCounter = 0;
  trivia.timeCounter = 20;
  generateHTML();
  timer();
};

function generateHTML(){
  trivia.gameHTML = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>20</span></p><p class='text-center'>" + trivia.questionsArray[trivia.questionCounter] + "</p><button class='first-answer answer'>A. " + trivia.answerArray[trivia.questionCounter][0] + "</button><br><button class='answer'>B. "+trivia.answerArray[trivia.questionCounter][1]+"</button><br><button class='answer'>C. "+trivia.answerArray[trivia.questionCounter][2]+"</button><br><button class='answer'>D. "+trivia.answerArray[trivia.questionCounter][3]+"</button>";
  $(".main-area").html(trivia.gameHTML);
}


//MAIN GAME LOGIC
//===========================================
startScreen();

//start-button click
$("body").on("click", ".start-button", function(event){
	event.preventDefault();
	trivia.clickSound.play();
	generateHTML();

	timer();
}); // Closes start-button click

$("body").on("click", ".answer", function(event){
	trivia.clickSound.play();
  //If correct answer
  selectedAnswer = $(this).text();
	if(selectedAnswer === trivia.correctAnswers[trivia.questionCounter]) {

		clearInterval(trivia.clock);
		win();
	}
  //If incorrect ansewr
	else {

		clearInterval(trivia.clock);
		loss();
	}
}); // Close .answer click

//reset-button click
$("body").on("click", ".reset-button", function(event){
		resetGame();
}); // Closes reset-button click