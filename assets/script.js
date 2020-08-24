//Questions
var questions = [{
    title: "Inside which HTML element do we put the JavaScript?",
    choices: ["<javascript>", "<js>", "<script>", "<scripting>"],
    answer: "<script>"
},
{
    title: "What is the correct JavaScript syntax to write 'Hello World'?",
    choices: ["response.write('Hello World')", "'Hello World'", "document.wrote('Hello World')", "(Hello World)"],
    answer: "document.wrote('Hello World')"
},
{
    title: " An external JavaScript must contain the <script> tag",
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