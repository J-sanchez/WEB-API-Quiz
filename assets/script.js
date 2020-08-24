//Questions
var questions = [{
    title: "Inside which HTML element do we put the JavaScript?",
    choices: ["javascript", "js", "script", "scripting"],
    answer: "script"
},
{
    title: "What is the correct JavaScript syntax to write 'Hello World'?",
    choices: ["response.write('Hello World')", "'Hello World'", "document.wrote('Hello World')", "(Hello World)"],
    answer: "document.wrote('Hello World')"
},
{
    title: " An external JavaScript must contain the script tag",
    choices: ["True", "False"],
    answer: "False"
},
{
    title: "How do you create a function?",
    choices: ["function:myFunction()", "function=myFunction()", "function myFunction()", "myFunction():function"],
    answer: "function myFunction"
},
{
    title: "How does a 'for' loop start?",
    choices: ["or (i = 0; i <= 5)", "for (i = 0; i <= 5; i++)", "for i = 1 to 5", "for (i <= 5; i++)"],
    answer: "for (i = 0; i <= 5; i++)"
}
]
// Score and timer
var score = 0;
var currentQuestion = -1;
var timeLeft = 0;
var timer;

//starts the countdown timer once user clicks the 'start' button
function start() {

    timeLeft = 60;
    document.getElementById("timeLeft").innerHTML = timeLeft;

    timer = setInterval(function() {
        timeLeft--;
        document.getElementById("timeLeft").innerHTML = timeLeft;
        //proceed to end the game function when timer is below 0 at any time
        if (timeLeft <= 0) {
            clearInterval(timer);
            endGame(); 
        }
    }, 1000);

    next();
}
function endGame() {
    clearInterval(timer);

    var quizContent = `
    <h2>Game over!</h2>
    <h3>You got a ` + score +  ` /100!</h3>
    <h3>That means you got ` + score / 20 +  ` questions correct!</h3>
    <input type="text" id="name" placeholder="UserName"> 
    <button onclick="setScore()">Set score!</button>`;

    document.getElementById("landing-container").innerHTML = quizContent;
}

//store the scores on local storage
function setScore() {
    localStorage.setItem("highscore", score);
    localStorage.setItem("highscoreName",  document.getElementById('name').value);
    getScore();
}


function getScore() {
    var quizContent = `
    <h2>` + localStorage.getItem("highscoreName") + `'s highscore is:</h2>
    <h1>` + localStorage.getItem("highscore") + `</h1><br> 
    
    <button onclick="clearScore()">Clear score!</button><button onclick="resetGame()">Play Again!</button>
    
    `;

    document.getElementById("landing-container").innerHTML = quizContent;
}

//clears HighScore in Local
function clearScore() {
    localStorage.setItem("highscore", "");
    localStorage.setItem("highscoreName",  "");
    var allScores = localStorage.getItem("allScores");
allScores = JSON.parse(allScores);
}

//reset the game 
function resetGame() {
    clearInterval(timer);
    score = 0;
    currentQuestion = -1;
    timeLeft = 0;
    timer = null;

    document.getElementById("timeLeft").innerHTML = timeLeft;

    var quizContent = `
    <h3>
        Click to play AGAIN!   
    </h3>
    <button onclick="start()">Start!</button>`;

    document.getElementById("landing-container").innerHTML = quizContent;
}

//deduct 10 seconds after wrong answer
function incorrect() {
    timeLeft -= 10; 
    next();
}

//increases the score by 20points if the user chooses the correct answer
function correct() {
    score += 20;
    next();
}

//loops through the questions 
function next() {
    currentQuestion++;

    if (currentQuestion > questions.length - 1) {
        endGame();
        return;
    }

    var quizContent = "<h2>" + questions[currentQuestion].title + "</h2>"

    for (var buttonLoop = 0; buttonLoop < questions[currentQuestion].choices.length; buttonLoop++) {
        var buttonCode = "<button onclick=\"[ANS]\">[CHOICE]</button>"; 
        buttonCode = buttonCode.replace("[CHOICE]", questions[currentQuestion].choices[buttonLoop]);
        if (questions[currentQuestion].choices[buttonLoop] == questions[currentQuestion].answer) {
            buttonCode = buttonCode.replace("[ANS]", "correct()");
        } else {
            buttonCode = buttonCode.replace("[ANS]", "incorrect()");
        }
        quizContent += buttonCode
    }


    document.getElementById("landing-container").innerHTML = quizContent;
}

// Checks answer responses
function checkAnswer(answer){
    correct = quizQuestions[currentQuestion].correctAnswer;

    if (answer === correct && currentQuestion !== finalQuestion){
        score++;
        alert("That Is Correct!");
        currentQuestion++;
        generateQuizQuestion();
        //display if answer is correct.
    }else if (answer !== correct && currentQuestion !== finalQuestion){
        alert("That Is Incorrect.")
        currentQuestion++;
        generateQuizQuestion();
        //display if answer is wrong.
    }else{
        showScore();
    }
}