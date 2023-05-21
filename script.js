let getComputerChoice = function() {
    let choices = ["Piedra", "Papel", "Tijeras"];
    let play = Math.floor(Math.random() * choices.length);
    return choices[play].toLowerCase();
}

let playRound = function(playerSelection, computerSelection) {
    let winner = "";
        console.log(playerSelection + " vs. " + computerSelection);

    if (playerSelection === computerSelection) {
        winner = "empate";
    } else if (playerSelection === "piedra" && computerSelection === "tijeras"
            || playerSelection === "papel" && computerSelection === "piedra"
            || playerSelection === "tijeras" && computerSelection === "papel") {
        winner = "player";
    } else {
        winner = "CPU";

    }

    
    if (winner === "empate") {
        console.log(playerSelection + " y " + computerSelection + ", es un empate!");
    } else if (winner === "CPU") {
        console.log(computerSelection + " le gana a " + playerSelection + ", perdiste!");
    } else {
        console.log(playerSelection + " le gana a " + computerSelection + ", ganaste!");
    }

    return winner;
}

let game = function(rondas = 5){
    console.log("Vamos a jugar " + rondas + " rondas.")
    let playerPoints = 0;
    let cpuPoints = 0;
    let playerSelection = "";
    let computerSelection = "";
    let tempWinner = "";
    for (let i = 0; i < rondas; i++) {
        playerSelection = prompt("Elija piedra, papel o tijeras").toLocaleLowerCase();
        computerSelection = getComputerChoice();
        tempWinner = playRound(playerSelection,computerSelection);
        if (tempWinner === "player") {
            playerPoints += 1;
        } else if (tempWinner === "CPU") {
            cpuPoints += 1;
        } else;
    }

    if (playerPoints > cpuPoints) {
        let winner = "Felicidades, has ganado por " + playerPoints + " a " + cpuPoints;
        return winner
    } else if (cpuPoints > playerPoints) {
        let winner = "Has perdido por " + cpuPoints + " a " + playerPoints;
        return winner
    } else {
        let winner = "Has empatado " + playerPoints + " a " + cpuPoints; 
        return winner
    }
}
