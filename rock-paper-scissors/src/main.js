// Warte darauf, dass das DOM vollständig geladen ist
document.addEventListener('DOMContentLoaded', () => {
  const scoreElement = document.getElementById('score');
  let score = 0;

  const choices = ['rock', 'paper', 'scissors'];
  const buttons = document.querySelectorAll('button[data-choice]');

  const startscreen = document.getElementById('startscreen');
  const resultsScreen = document.getElementById('results');
  const rulesScreen = document.getElementById('rules');

  const userChoiceDisplay = document.getElementById('userchoice');
  const computerChoiceDisplay = document.getElementById('computerchoice');
  const resultDisplay = document.getElementById('result');

  const playAgainButton = document.getElementById('playagain');
  const closeRulesButton = document.getElementById('closebutton');
  const startButton = document.getElementById('startbutton');

  // Funktion für den Start des Spiels
  startButton.addEventListener('click', () => {
    startscreen.style.display = 'none'; // Starte das Spiel, indem der Startbildschirm ausgeblendet wird
  });

  // Funktion zum Schließen der Regeln
  closeRulesButton.addEventListener('click', () => {
    rulesScreen.style.display = 'none';
  });

  // Funktion zur Wahl des Computers
  function getComputerChoice() {
    const randomIndex = Math.floor(Math.random() * choices.length);
    return choices[randomIndex];
  }

  // Funktion zur Bestimmung des Spielersieg
  function determineWinner(playerChoice, computerChoice) {
    if (playerChoice === computerChoice) {
      return 'Draw';
    }
    if (
      (playerChoice === 'rock' && computerChoice === 'scissors') ||
      (playerChoice === 'paper' && computerChoice === 'rock') ||
      (playerChoice === 'scissors' && computerChoice === 'paper')
    ) {
      return 'You win';
    } else {
      return 'Computer wins';
    }
  }

  // Funktion für die Spiellogik
  function playGame(playerChoice) {
    const computerChoice = getComputerChoice();
    const winner = determineWinner(playerChoice, computerChoice);

    // Zeige die Ergebnisse auf dem Bildschirm an
    userChoiceDisplay.innerHTML = `<img src="/images/${playerChoice}.svg" alt="${playerChoice}" class="w-full h-full" />`;
    computerChoiceDisplay.innerHTML = `<img src="/images/${computerChoice}.svg" alt="${computerChoice}" class="w-full h-full" />`;

    resultDisplay.textContent = winner;

    // Punktestand aktualisieren, wenn der Spieler gewonnen hat
    if (winner === 'You win') {
      score++;
    } else if (winner === 'Computer wins') {
      score--;
    }

    scoreElement.textContent = score;

    // Zeige das Ergebnisbildschirm an
    resultsScreen.style.display = 'flex';
  }

  // Eventlistener für die Buttons, die den Spielzug des Spielers aufnehmen
  buttons.forEach(button => {
    button.addEventListener('click', (event) => {
      const playerChoice = event.target.getAttribute('data-choice');
      playGame(playerChoice);
    });
  });

  // Eventlistener für den "Play Again"-Button
  playAgainButton.addEventListener('click', () => {
    resultsScreen.style.display = 'none'; // Ergebnisbildschirm ausblenden
    startscreen.style.display = 'flex'; // Startbildschirm anzeigen
  });

  // Regeln anzeigen
  const showRulesButton = document.getElementById('showRules');
  if (showRulesButton) {
    showRulesButton.addEventListener('click', () => {
      rulesScreen.style.display = 'flex'; // Zeige Regeln an
    });
  }
});
