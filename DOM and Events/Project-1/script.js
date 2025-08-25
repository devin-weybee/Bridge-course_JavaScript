let message;


let randomNum = Math.trunc(Math.random()*20)+1;
let score = 20;
let highScore = 0;

function checkVal(){
    const guess = document.querySelector('.guess').value;
    console.log(score)

    if(!guess){
        message = "Enter a number first !!";
        document.querySelector('.message').textContent = message;
    }else if(guess == randomNum){
        message = "Guess is  Correct !!"
        document.querySelector('.message').textContent = message;

        document.querySelector('.number').textContent = guess;
        document.querySelector('body').style.backgroundColor = "green"

        highScore = score > highScore ? score : highScore; 
        document.querySelector('.highscore').textContent = highScore;
    }else if(guess > randomNum){
        message = "Guess is too high!!";
        document.querySelector('.message').textContent = message;
        score--;
        document.querySelector('.score').textContent = score;
    }else{
        message = "Guess is too low";
        document.querySelector('.message').textContent = message;
        score--;
        document.querySelector('.score').textContent = score;
    }

    document.querySelector('.guess').value = "";
}

function again(){
    score = 20;
    
    document.querySelector('body').style.backgroundColor = "#222"
    document.querySelector('.message').textContent = "Start guessing..."
    document.querySelector('.number').textContent = "?"
    document.querySelector('.score').textContent = 20
    document.querySelector('.guess').value = "";
    randomNum = Math.trunc(Math.random()*20)+1
}