
const crosswordWords = [{"word":"REGISTRADORES","clue":"Armazenam temporariamente valores usados pelo processador.","row":1,"col":11,"dir":"V","number":4},{"word":"RAM","clue":"Guarda dados e programas enquanto o computador está ligado.","row":1,"col":11,"dir":"H","number":4},{"word":"ROM","clue":"Memória que mantém informações mesmo sem energia.","row":12,"col":3,"dir":"V","number":13},{"word":"EEPROM","clue":"Memória não volátil que permite apagar e regravar eletricamente.","row":0,"col":2,"dir":"H","number":1},{"word":"DMA","clue":"Permite transferência de dados entre dispositivos e memória sem ocupar continuamente o processador.","row":0,"col":13,"dir":"V","number":3},{"word":"CACHE","clue":"Memória pequena e rápida que reduz o tempo de acesso a dados frequentes.","row":9,"col":1,"dir":"V","number":11},{"word":"UC","clue":"Coordena e controla a execução das instruções.","row":3,"col":2,"dir":"V","number":6},{"word":"CPU","clue":"Componente central que executa instruções e coordena operações do computador.","row":8,"col":2,"dir":"H","number":9},{"word":"FLASH","clue":"Tipo de memória não volátil usada em cartões e unidades de armazenamento.","row":8,"col":9,"dir":"H","number":10},{"word":"ULA","clue":"Parte do processador responsável por operações matemáticas e lógicas.","row":11,"col":6,"dir":"H","number":12},{"word":"MEMORIADEMASSA","clue":"Armazena grande volume de dados de forma persistente.","row":13,"col":0,"dir":"H","number":14},{"word":"DUALCORE","clue":"Processador que possui dois núcleos de execução.","row":6,"col":2,"dir":"H","number":8},{"word":"DATABUS","clue":"Conjunto de linhas que transporta os valores entre componentes.","row":3,"col":4,"dir":"V","number":7},{"word":"QUADCORE","clue":"Processador que possui quatro núcleos de execução.","row":3,"col":1,"dir":"H","number":5},{"word":"ADDRESSBUS","clue":"Transporta a localização da informação que será acessada.","row":15,"col":4,"dir":"H","number":15},{"word":"MICROCONTROLADOR","clue":"Circuito integrado que reúne processamento, memória e periféricos para controle.","row":0,"col":7,"dir":"V","number":2}];

const quizQuestions = [
  { question: "Qual componente executa instruções e coordena as operações principais do computador?", options: ["CPU", "RAM", "ROM", "Barramento de dados"], answer: 0, explanation: "A CPU é a unidade central responsável pela execução das instruções." },
  { question: "Qual parte do processador realiza operações matemáticas e lógicas?", options: ["Unidade de Controle", "ULA", "Registradores", "Memória cache"], answer: 1, explanation: "A ULA executa operações aritméticas e lógicas." },
  { question: "Qual memória armazena temporariamente dados e programas em execução?", options: ["ROM", "Flash", "RAM", "EEPROM"], answer: 2, explanation: "A RAM é usada para armazenar temporariamente dados e programas em uso." },
  { question: "Qual é a principal função da Unidade de Controle?", options: ["Armazenar arquivos permanentemente", "Realizar cálculos matemáticos", "Exibir imagens no monitor", "Coordenar a execução das instruções"], answer: 3, explanation: "A Unidade de Controle coordena e controla o funcionamento do processador." },
  { question: "O que caracteriza uma memória não volátil?", options: ["Perde os dados ao desligar", "Mantém os dados mesmo sem energia", "Só funciona dentro da CPU", "Armazena apenas números"], answer: 1, explanation: "Memórias não voláteis preservam as informações mesmo sem alimentação elétrica." },
  { question: "Qual barramento transporta a localização da informação que será acessada?", options: ["Address bus", "Data bus", "Barramento USB", "Barramento de controle"], answer: 0, explanation: "O address bus carrega os endereços de memória ou de dispositivos." },
  { question: "Qual tecnologia permite transferir dados entre memória e dispositivos sem intervenção contínua da CPU?", options: ["Cache", "EEPROM", "DMA", "Dual core"], answer: 2, explanation: "DMA significa acesso direto à memória e reduz a participação contínua da CPU na transferência." },
  { question: "Um processador quad core possui quantos núcleos de processamento?", options: ["Um", "Dois", "Três", "Quatro"], answer: 3, explanation: "Quad core indica um processador com quatro núcleos." }
];

const hangmanWords = [
  { word: "CPU", hint: "Componente central que executa instruções." },
  { word: "ULA", hint: "Realiza operações matemáticas e lógicas." },
  { word: "REGISTRADORES", hint: "Pequenas memórias internas do processador." },
  { word: "RAM", hint: "Memória temporária de programas em execução." },
  { word: "ROM", hint: "Memória que mantém dados sem energia." },
  { word: "EEPROM", hint: "Memória regravável eletricamente." },
  { word: "FLASH", hint: "Memória não volátil comum em cartões e pendrives." },
  { word: "CACHE", hint: "Memória rápida que reduz o tempo de acesso." },
  { word: "MEMORIADEMASSA", hint: "Armazenamento persistente de grande capacidade." },
  { word: "DMA", hint: "Técnica de acesso direto à memória." },
  { word: "ADDRESSBUS", hint: "Barramento que transporta endereços." },
  { word: "DATABUS", hint: "Barramento que transporta dados." },
  { word: "MICROCONTROLADOR", hint: "Circuito integrado usado em sistemas de controle." },
  { word: "DUALCORE", hint: "Processador com dois núcleos." },
  { word: "QUADCORE", hint: "Processador com quatro núcleos." }
];

const tabs = document.querySelectorAll(".tab");
tabs.forEach(tab => {
  tab.addEventListener("click", () => {
    tabs.forEach(item => item.classList.remove("active"));
    document.querySelectorAll(".mode-panel").forEach(panel => panel.classList.remove("active"));
    tab.classList.add("active");
    document.getElementById(tab.dataset.tab).classList.add("active");
  });
});

// CRUZADINHA
const gridElement = document.getElementById("crossword-grid");
const cells = {};
const occupied = {};
let activeCrosswordWord = null;
let activeDirection = "H";

// Mapeia cada casa ocupada e registra todas as palavras que passam por ela.
crosswordWords.forEach(item => {
  for (let i = 0; i < item.word.length; i++) {
    const row = item.row + (item.dir === "V" ? i : 0);
    const col = item.col + (item.dir === "H" ? i : 0);
    const key = row + "-" + col;
    if (!occupied[key]) occupied[key] = { row, col, letter: item.word[i], numbers: [], words: [] };
    if (occupied[key].letter !== item.word[i]) {
      console.error("Conflito de letras na cruzadinha:", key, item.word);
    }
    if (i === 0 && !occupied[key].numbers.includes(item.number)) occupied[key].numbers.push(item.number);
    occupied[key].words.push(item);
  }
});

const gridRows = Math.max(...Object.values(occupied).map(cell => cell.row)) + 1;
const gridColumns = Math.max(...Object.values(occupied).map(cell => cell.col)) + 1;
gridElement.style.gridTemplateColumns = `repeat(${gridColumns}, var(--crossword-cell-size))`;
gridElement.style.gridTemplateRows = `repeat(${gridRows}, var(--crossword-cell-size))`;
gridElement.setAttribute("aria-label", `Tabuleiro da cruzadinha com ${gridRows} linhas e ${gridColumns} colunas`);

for (let row = 0; row < gridRows; row++) {
  for (let col = 0; col < gridColumns; col++) {
    const key = row + "-" + col;
    const cell = document.createElement("div");
    cell.dataset.key = key;
    if (occupied[key]) {
      cell.className = "cell";
      if (occupied[key].numbers.length) {
        const number = document.createElement("span");
        number.className = "cell-number";
        number.textContent = occupied[key].numbers.join("/");
        cell.appendChild(number);
      }
      const input = document.createElement("input");
      input.type = "text";
      input.maxLength = 1;
      input.autocomplete = "off";
      input.spellcheck = false;
      input.setAttribute("aria-label", `Linha ${row + 1}, coluna ${col + 1}`);
      input.dataset.row = row;
      input.dataset.col = col;
      input.addEventListener("focus", () => selectWordAt(row, col, false));
      input.addEventListener("click", () => selectWordAt(row, col, false));
      input.addEventListener("input", event => {
        const normalized = event.target.value.toUpperCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^A-Z]/g, "");
        event.target.value = normalized.slice(-1);
        cell.classList.remove("correct", "wrong");
        cell.classList.add("filled");
        if (event.target.value) {
          selectWordAt(row, col, false);
          updateCrosswordProgress();
          focusNextLetter(row, col, 1);
        } else {
          updateCrosswordProgress();
        }
      });
      input.addEventListener("keydown", event => {
        if (["ArrowRight", "ArrowLeft", "ArrowUp", "ArrowDown"].includes(event.key)) {
          event.preventDefault();
          const delta = event.key === "ArrowRight" ? [0, 1] : event.key === "ArrowLeft" ? [0, -1] : event.key === "ArrowDown" ? [1, 0] : [-1, 0];
          const target = findInput(row + delta[0], col + delta[1]);
          if (target) target.focus();
          return;
        }
        if (event.key === "Backspace" && !event.target.value) {
          event.preventDefault();
          focusNextLetter(row, col, -1);
        }
      });
      cell.appendChild(input);
      cells[key] = { element: cell, input };
    } else {
      cell.className = "cell blocked";
      cell.setAttribute("aria-hidden", "true");
    }
    gridElement.appendChild(cell);
  }
}

function findInput(row, col) {
  return cells[row + "-" + col] ? cells[row + "-" + col].input : null;
}

function getWordCellKeys(item) {
  return item.word.split("").map((letter, index) => {
    const row = item.row + (item.dir === "V" ? index : 0);
    const col = item.col + (item.dir === "H" ? index : 0);
    return row + "-" + col;
  });
}

function getWordValue(item) {
  return getWordCellKeys(item).map(key => cells[key].input.value).join("");
}

function focusNextLetter(row, col, step) {
  if (!activeCrosswordWord) return;
  const keys = getWordCellKeys(activeCrosswordWord);
  const currentKey = row + "-" + col;
  const currentIndex = keys.indexOf(currentKey);
  const nextKey = keys[currentIndex + step];
  if (nextKey && cells[nextKey]) cells[nextKey].input.focus();
}

function selectWordAt(row, col, focusFirst) {
  const key = row + "-" + col;
  const candidates = (occupied[key]?.words || []).filter(item => item.dir === activeDirection);
  const fallback = occupied[key]?.words || [];
  const selected = candidates[0] || fallback[0];
  if (selected) selectCrosswordWord(selected, focusFirst);
}

function selectCrosswordWord(item, focusFirst = false) {
  activeCrosswordWord = item;
  activeDirection = item.dir;
  document.querySelectorAll(".direction-btn").forEach(button => {
    const active = button.dataset.direction === activeDirection;
    button.classList.toggle("active", active);
    button.setAttribute("aria-pressed", String(active));
  });
  document.querySelectorAll(".cell").forEach(cell => cell.classList.remove("in-word", "word-start"));
  getWordCellKeys(item).forEach((key, index) => {
    if (cells[key]) {
      cells[key].element.classList.add("in-word");
      if (index === 0) cells[key].element.classList.add("word-start");
    }
  });
  document.querySelectorAll(".clue-item").forEach(clue => {
    clue.classList.toggle("active", clue.dataset.word === item.word && clue.dataset.number === String(item.number) && clue.dataset.direction === item.dir);
  });
  if (focusFirst) {
    const keys = getWordCellKeys(item);
    const firstEmpty = keys.find(key => !cells[key].input.value) || keys[0];
    cells[firstEmpty].input.focus();
  }
}

function renderClues(direction, elementId) {
  const list = document.getElementById(elementId);
  crosswordWords.filter(item => item.dir === direction).sort((a, b) => a.number - b.number).forEach(item => {
    const li = document.createElement("li");
    li.className = "clue-item";
    li.dataset.word = item.word;
    li.dataset.number = item.number;
    li.dataset.direction = item.dir;
    const button = document.createElement("button");
    button.type = "button";
    button.className = "clue-button";
    button.setAttribute("aria-label", `Selecionar palavra ${item.number}: ${item.clue}`);
    const number = document.createElement("b");
    number.className = "clue-number";
    number.textContent = String(item.number).padStart(2, "0");
    const clue = document.createElement("span");
    clue.className = "clue-text";
    clue.textContent = item.clue;
    const status = document.createElement("span");
    status.className = "clue-status";
    status.textContent = "○";
    button.append(number, clue, status);
    button.addEventListener("click", () => selectCrosswordWord(item, true));
    li.appendChild(button);
    list.appendChild(li);
  });
}

renderClues("V", "vertical-clues");
renderClues("H", "horizontal-clues");

document.querySelectorAll(".direction-btn").forEach(button => {
  button.addEventListener("click", () => {
    activeDirection = button.dataset.direction;
    const current = activeCrosswordWord;
    const candidate = current && current.dir === activeDirection ? current : crosswordWords.find(item => item.dir === activeDirection);
    if (candidate) selectCrosswordWord(candidate, false);
  });
});

function updateCrosswordProgress() {
  let solved = 0;
  crosswordWords.forEach(item => {
    const isSolved = getWordValue(item) === item.word;
    if (isSolved) solved++;
    const clue = document.querySelector(`.clue-item[data-word="${item.word}"][data-number="${item.number}"][data-direction="${item.dir}"]`);
    if (clue) {
      clue.classList.toggle("solved", isSolved);
      const mark = clue.querySelector(".clue-status");
      if (mark) mark.textContent = isSolved ? "✓" : "○";
    }
  });
  document.getElementById("crossword-count").textContent = `${String(solved).padStart(2, "0")}/${crosswordWords.length}`;
  document.getElementById("crossword-progress-bar").style.width = `${solved / crosswordWords.length * 100}%`;
}

document.getElementById("check-crossword").addEventListener("click", () => {
  let correct = 0;
  crosswordWords.forEach(item => {
    if (getWordValue(item) === item.word) correct++;
  });
  Object.entries(cells).forEach(([key, cell]) => {
    const value = cell.input.value;
    cell.element.classList.remove("correct", "wrong");
    if (value) cell.element.classList.add(value === occupied[key].letter ? "correct" : "wrong");
  });
  updateCrosswordProgress();
  const result = document.getElementById("crossword-result");
  result.classList.toggle("success", correct === crosswordWords.length);
  result.classList.toggle("needs-work", correct !== crosswordWords.length);
  result.textContent = correct === crosswordWords.length
    ? `Ritual concluído! As ${correct} palavras estão corretas. O grimório foi decifrado.`
    : `${correct} de ${crosswordWords.length} palavras corretas. As casas verdes estão certas; revise as vermelhas e complete as vazias.`;
});

document.getElementById("reset-crossword").addEventListener("click", () => {
  Object.entries(cells).forEach(([key, cell]) => {
    cell.input.value = "";
    cell.element.classList.remove("correct", "wrong", "filled", "in-word", "word-start");
  });
  document.querySelectorAll(".clue-item").forEach(clue => {
    clue.classList.remove("solved", "active");
    clue.querySelector(".clue-status").textContent = "○";
  });
  document.getElementById("crossword-result").className = "result-line";
  document.getElementById("crossword-result").textContent = "Tabuleiro limpo. As pistas estão prontas para uma nova tentativa.";
  updateCrosswordProgress();
  if (activeCrosswordWord) selectCrosswordWord(activeCrosswordWord, false);
});

selectCrosswordWord(crosswordWords.find(item => item.dir === "H"), false);
updateCrosswordProgress();

// QUIZ
let currentQuestion = 0;
let quizScore = 0;
let questionAnswered = false;
function showQuestion() {
  const item = quizQuestions[currentQuestion];
  questionAnswered = false;
  document.getElementById("quiz-progress-label").textContent = "PERGUNTA " + String(currentQuestion + 1).padStart(2, "0") + " DE " + String(quizQuestions.length).padStart(2, "0");
  document.getElementById("quiz-progress-bar").style.width = ((currentQuestion) / quizQuestions.length * 100) + "%";
  document.getElementById("quiz-feedback").textContent = "Selecione uma alternativa para responder.";
  document.getElementById("next-question").disabled = true;
  document.getElementById("next-question").innerHTML = currentQuestion === quizQuestions.length - 1 ? "Ver resultado <span>→</span>" : "Próxima pergunta <span>→</span>";
  const content = document.getElementById("quiz-content");
  content.innerHTML = "<h4 class='quiz-question'>" + item.question + "</h4><div class='quiz-options'></div>";
  const options = content.querySelector(".quiz-options");
  item.options.forEach((option, index) => {
    const button = document.createElement("button");
    button.className = "quiz-option";
    button.innerHTML = "<span class='letter'>" + String.fromCharCode(65 + index) + "</span><span>" + option + "</span>";
    button.addEventListener("click", () => answerQuestion(index));
    options.appendChild(button);
  });
}
function answerQuestion(index) {
  if (questionAnswered) return;
  questionAnswered = true;
  const item = quizQuestions[currentQuestion];
  const buttons = document.querySelectorAll(".quiz-option");
  buttons.forEach((button, i) => {
    button.disabled = true;
    if (i === item.answer) button.classList.add("correct");
    else if (i === index) button.classList.add("incorrect");
  });
  if (index === item.answer) {
    quizScore++;
    document.getElementById("quiz-feedback").textContent = "Resposta correta! " + item.explanation;
  } else {
    document.getElementById("quiz-feedback").textContent = "Não foi dessa vez. " + item.explanation;
  }
  document.getElementById("next-question").disabled = false;
}
document.getElementById("next-question").addEventListener("click", () => {
  if (!questionAnswered) return;
  if (currentQuestion < quizQuestions.length - 1) {
    currentQuestion++;
    showQuestion();
  } else {
    document.getElementById("quiz-progress-bar").style.width = "100%";
    document.getElementById("quiz-progress-label").textContent = "RODADA FINALIZADA";
    document.getElementById("quiz-content").innerHTML = "<div class='quiz-finish'><h4 class='quiz-question'>Você concluiu o desafio!</h4><p>Seu resultado: <strong>" + quizScore + " de " + quizQuestions.length + " acertos</strong>.</p></div>";
    document.getElementById("quiz-feedback").textContent = "Recomece para tentar melhorar sua pontuação.";
    document.getElementById("next-question").disabled = false;
    document.getElementById("next-question").textContent = "Jogar novamente ↻";
    document.getElementById("next-question").onclick = () => {
      currentQuestion = 0; quizScore = 0; showQuestion();
      document.getElementById("next-question").onclick = null;
    };
  }
});
showQuestion();

// FORCA
let selectedHangman;
let guessedLetters = [];
let hangmanLives = 6;
let hangmanFinished = false;

function startHangman() {
  const previousWord = selectedHangman?.word;
  const options = hangmanWords.filter(item => item.word !== previousWord);
  selectedHangman = options[Math.floor(Math.random() * options.length)];
  guessedLetters = [];
  hangmanLives = 6;
  hangmanFinished = false;
  document.getElementById("hangman-hint").textContent = "Pista: " + selectedHangman.hint;
  document.getElementById("hangman-status").textContent = "Você tem seis tentativas. Escolha uma letra.";
  document.getElementById("hangman-status").className = "hangman-status";
  const keyboard = document.getElementById("hangman-keyboard");
  keyboard.innerHTML = "";
  "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("").forEach(letter => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "key";
    button.textContent = letter;
    button.dataset.letter = letter;
    button.setAttribute("aria-label", `Escolher letra ${letter}`);
    button.addEventListener("click", () => guessHangmanLetter(letter));
    keyboard.appendChild(button);
  });
  drawHangman();
}

function drawHangman() {
  const wordElement = document.getElementById("hangman-word");
  wordElement.innerHTML = "";
  const letters = selectedHangman.word.split("");
  wordElement.classList.toggle("long-word", letters.length > 10);
  letters.forEach(letter => {
    const slot = document.createElement("span");
    slot.className = "hangman-letter";
    const visible = guessedLetters.includes(letter) || hangmanFinished;
    slot.textContent = visible ? letter : "";
    if (visible) slot.classList.add("revealed");
    wordElement.appendChild(slot);
  });

  const wrongCount = 6 - hangmanLives;
  const drawing = document.getElementById("hangman-drawing");
  drawing.dataset.wrong = String(wrongCount);
  drawing.querySelectorAll(".hangman-part").forEach(part => {
    part.classList.toggle("visible", Number(part.dataset.step) <= wrongCount);
  });
  document.getElementById("hangman-lives").textContent = String(hangmanLives).padStart(2, "0");
  document.getElementById("hangman-mistakes").textContent = `${wrongCount} / 6 erros`;
  document.querySelectorAll("#mistake-track span").forEach((mark, index) => {
    mark.classList.toggle("used", index < wrongCount);
  });

  const guessedContainer = document.getElementById("hangman-guessed");
  guessedContainer.innerHTML = "";
  const wrongLetters = guessedLetters.filter(letter => !selectedHangman.word.includes(letter));
  if (!guessedLetters.length) {
    guessedContainer.textContent = "Nenhuma ainda";
  } else {
    guessedLetters.forEach(letter => {
      const chip = document.createElement("span");
      chip.className = selectedHangman.word.includes(letter) ? "guess-chip hit" : "guess-chip miss";
      chip.textContent = letter;
      guessedContainer.appendChild(chip);
    });
  }

  document.querySelectorAll("#hangman-keyboard .key").forEach(button => {
    const letter = button.dataset.letter;
    button.disabled = hangmanFinished || guessedLetters.includes(letter);
    button.classList.toggle("hit", guessedLetters.includes(letter) && selectedHangman.word.includes(letter));
    button.classList.toggle("miss", guessedLetters.includes(letter) && !selectedHangman.word.includes(letter));
  });
}

function guessHangmanLetter(letter) {
  if (hangmanFinished || guessedLetters.includes(letter)) return;
  guessedLetters.push(letter);
  if (!selectedHangman.word.includes(letter)) hangmanLives--;

  const won = selectedHangman.word.split("").every(char => guessedLetters.includes(char));
  if (won) {
    hangmanFinished = true;
    document.getElementById("hangman-status").textContent = "Palavra revelada! Você venceu o desafio.";
    document.getElementById("hangman-status").className = "hangman-status success";
  } else if (hangmanLives <= 0) {
    hangmanFinished = true;
    document.getElementById("hangman-status").textContent = `Suas tentativas terminaram. A palavra era ${selectedHangman.word}.`;
    document.getElementById("hangman-status").className = "hangman-status failure";
  } else {
    document.getElementById("hangman-status").textContent = `Letra ${selectedHangman.word.includes(letter) ? "encontrada" : "não encontrada"}. Restam ${hangmanLives} tentativas.`;
    document.getElementById("hangman-status").className = "hangman-status";
  }
  drawHangman();
}

document.getElementById("new-hangman").addEventListener("click", startHangman);
document.addEventListener("keydown", event => {
  const hangmanPanel = document.getElementById("hangman");
  if (!hangmanPanel.classList.contains("active")) return;
  if (/^[a-z]$/i.test(event.key) && !event.ctrlKey && !event.altKey && !event.metaKey) {
    guessHangmanLetter(event.key.toUpperCase());
  }
});

startHangman();

