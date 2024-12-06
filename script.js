// Lista de palavras para o jogo (em português)
const words = ['teclado', 'programador', 'computador', 'programação', 'mensagem', 'desenvolvedor', 'tecnologia', 'internet'];

// Seleciona uma palavra aleatória
let secretWord = words[Math.floor(Math.random() * words.length)];

// Estado inicial
let attemptsLeft = 6;
let guessedLetters = [];
let wrongLetters = [];

// Referências aos elementos
const wordContainer = document.getElementById('wordContainer');
const wordLengthDisplay = document.getElementById('wordLength');
const message = document.getElementById('message');
const letterInput = document.getElementById('letterInput');
const guessButton = document.getElementById('guessButton');
const attemptsLeftDisplay = document.getElementById('attemptsLeft');
const wrongLettersDisplay = document.getElementById('wrongLetters');
const restartButton = document.getElementById('restartButton');

// Exibe a quantidade de letras na palavra
wordLengthDisplay.textContent = `A palavra tem ${secretWord.length} letras.`;

// Exibe a palavra com placeholders
function displayWord() {
  wordContainer.innerHTML = secretWord
    .split('')
    .map((letter) => (guessedLetters.includes(letter) ? letter : '_'))
    .join(' ');
}

// Verifica se o jogador ganhou
function checkWin() {
  if (secretWord.split('').every((letter) => guessedLetters.includes(letter))) {
    message.textContent = 'Parabéns, você ganhou!';
    endGame();
  }
}

// Verifica se o jogador perdeu
function checkLoss() {
  if (attemptsLeft <= 0) {
    message.textContent = `Você perdeu! A palavra era: ${secretWord}`;
    endGame();
  }
}

// Lida com o fim do jogo
function endGame() {
  letterInput.disabled = true;
  guessButton.disabled = true;
  restartButton.classList.remove('hidden');
}

// Lida com a tentativa do jogador
function handleGuess() {
  const guess = letterInput.value.toLowerCase();
  letterInput.value = '';

  if (!guess || guessedLetters.includes(guess) || wrongLetters.includes(guess)) {
    message.textContent = 'Você já tentou essa letra ou não digitou nada!';
    return;
  }

  if (secretWord.includes(guess)) {
    guessedLetters.push(guess);
    message.textContent = 'Boa! Você acertou uma letra!';
  } else {
    wrongLetters.push(guess);
    attemptsLeft--;
    attemptsLeftDisplay.textContent = attemptsLeft;
    wrongLettersDisplay.textContent = wrongLetters.join(', ');
    message.textContent = 'Ops! Letra errada.';
  }

  displayWord();
  checkWin();
  checkLoss();
}

// Reinicia o jogo
function restartGame() {
  secretWord = words[Math.floor(Math.random() * words.length)];
  attemptsLeft = 6;
  guessedLetters = [];
  wrongLetters = [];
  letterInput.disabled = false;
  guessButton.disabled = false;
  restartButton.classList.add('hidden');
  message.textContent = '';
  attemptsLeftDisplay.textContent = attemptsLeft;
  wrongLettersDisplay.textContent = '';
  wordLengthDisplay.textContent = `A palavra tem ${secretWord.length} letras.`;
  displayWord();
}

// Eventos
guessButton.addEventListener('click', handleGuess);
restartButton.addEventListener('click', restartGame);

// Inicia o jogo
displayWord();
