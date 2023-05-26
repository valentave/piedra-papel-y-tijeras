let playerScore = 0;
let cpuScore = 0;
const playerPoints = document.querySelector("#playerPoints");
const cpuPoints = document.querySelector("#cpuPoints");
const gameBody = document.querySelector("#gameBody");
const gameResult = document.querySelector("#gameResult");
const buttonsContainer = document.querySelector("#buttonsContainer");
const roundComment = document.querySelector(".round-comment");
const resultComment = document.querySelector(".result-comment");
const mainTitle = document.querySelector("#mainTitle");
const restart = document.querySelector("#btn-restart");

const restartBtn = document.querySelector("#btn-restart > button");
restartBtn.addEventListener("click", () =>{
    playerScore = 0;
    updateScores("player", playerScore);
    cpuScore = 0;
    updateScores("cpu",cpuScore);
    gameRound.setAttribute("style", "display: none;");
    roundComment.textContent = "Elije una opción";
    buttonsContainer.removeAttribute("style");
    resultComment.textContent = "";
    restart.setAttribute("style","display: none;");
})

// Botón de play
const playButton = document.querySelector("#playButton > button");
playButton.addEventListener("click", () =>{
    playButton.classList.add("hidden");
    gameBody.removeAttribute("style");
    gameResult.removeAttribute("style");
    mainTitle.classList.add("low-main-title");
})

// Botones de selección
const buttons = document.querySelectorAll(".selection");
buttons.forEach((button) => {
  button.addEventListener('click', () => {
    playRound(button.id,getComputerChoice());
    gameRound.removeAttribute("style");
  });
});

// Función que hace elegir una opción a la computadora
// undefined -> string
let getComputerChoice = function() {
    let choices = ["piedra", "papel", "tijeras"];
    let play = Math.floor(Math.random() * choices.length);
    return choices[play];
}

// Activa y muestra en el DOM la elección del usuario y de la CPU
let showSelections = function(playerSelection, computerSelection){
    const player = document.querySelector(".img-player");
    const computer = document.querySelector(".img-cpu");
    player.setAttribute("src","images/"+playerSelection+".png");
    computer.setAttribute("src","images/"+computerSelection+".png");
    const gameRound = document.querySelector("#gameRound");
    gameRound.classList.remove("hidden");
}

let showResult = function(winner, playerSelection, computerSelection){
    if (winner === "empate"){
        roundComment.textContent = playerSelection.charAt(0).toUpperCase()
         + playerSelection.slice(1) + " vs " + computerSelection;
    } else if (winner === "player"){
        roundComment.textContent = playerSelection.charAt(0).toUpperCase()
         + playerSelection.slice(1) + " vence a " + computerSelection;
    } else {
        roundComment.textContent = computerSelection.charAt(0).toUpperCase()
         + computerSelection.slice(1) + " vence a " + playerSelection;
    }
}

// Función que se encarga de elegir el ganador de una ronda
// string, string -> string
let playRound = function(playerSelection, computerSelection) {
    let winner = "";
        showSelections(playerSelection, computerSelection);
    if (playerSelection === computerSelection) {
        winner = "empate";
        roundComment.textContent = playerSelection + " vs. " + computerSelection;
    } else if (playerSelection === "piedra" && computerSelection === "tijeras"
            || playerSelection === "papel" && computerSelection === "piedra"
            || playerSelection === "tijeras" && computerSelection === "papel") {
        winner = "player";
        playerScore += 1;
        updateScores("player",playerScore);
    } else {
        winner = "CPU";
        cpuScore += 1;
        updateScores("cpu",cpuScore);
    }
    showResult(winner,playerSelection,computerSelection);
}

let isGameOver = function(){
    return(playerScore == 5 || cpuScore == 5);
}

let printWinner = function(){
    if (playerScore == 5){
        resultComment.textContent = "¡Ganaste!";
    } else {
        resultComment.textContent = "Perdiste";
    }
}

let askRestart = function(){
    restart.removeAttribute("style");
}

let finishGame = function(){
    buttonsContainer.style.display = "none";
    printWinner();
    askRestart();
    //playerPoints.textContent = 0;
    //cpuPoints.textContent = 0;
}

let updateScores = function(user,points){
    if (user === "player"){
        playerPoints.textContent = "Player: " + points;
    } else {
        cpuPoints.textContent = "CPU: " + points;
    }
    if (isGameOver()){
        finishGame();
    }
}