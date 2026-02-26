import { addWordToDictionary, buildDictionary, checkText } from "./spellChecker.js";

const textInput = document.querySelector("#text-input");
const checkButton = document.querySelector("#check-button");
const output = document.querySelector("#output");

let basicDictionary = new Set();
const customDictionary = new Set();

checkButton.addEventListener("click", onCheckButtonClick);
textInput.addEventListener("input", clearOutput);

loadDictionary();

async function loadDictionary() {
  try {
    const response = await fetch("./words.json");

    if (!response.ok) {
      throw new Error("Dictionary file was not loaded.");
    }

    const words = await response.json();
    basicDictionary = buildDictionary(words);
    showInfo("Dictionary is ready. Write text and press Check spelling.");
  } catch (error) {
    showError("Could not load dictionary. Please refresh the page.");
    console.error(error);
  }
}

function onCheckButtonClick() {
  if (basicDictionary.size === 0) {
    showError("Dictionary is not ready yet.");
    return;
  }

  const text = textInput.value;
  const misspelledWords = checkText(text, basicDictionary, customDictionary);
  renderSpellCheckResult(misspelledWords);
}

function renderSpellCheckResult(misspelledWords) {
  clearOutput();

  if (misspelledWords.length === 0) {
    showSuccess("No spelling mistakes found.");
    return;
  }

  const message = document.createElement("p");
  message.className = "error-message";
  message.textContent = "These words are misspelled:";
  output.appendChild(message);

  const list = document.createElement("ul");
  list.className = "mistake-list";

  for (const word of misspelledWords) {
    const item = document.createElement("li");

    const wordLabel = document.createElement("span");
    wordLabel.className = "bad-word";
    wordLabel.textContent = word;

    const addButton = document.createElement("button");
    addButton.className = "add-button";
    addButton.type = "button";
    addButton.textContent = "Add to dictionary";

    // This button adds one word and then checks the text again.
    addButton.addEventListener("click", () => {
      addWordToDictionary(word, customDictionary);
      onCheckButtonClick();
    });

    item.append(wordLabel, addButton);
    list.appendChild(item);
  }

  output.appendChild(list);
}

function clearOutput() {
  output.innerHTML = "";
}

function showInfo(text) {
  clearOutput();

  const info = document.createElement("p");
  info.className = "info-message";
  info.textContent = text;
  output.appendChild(info);
}

function showSuccess(text) {
  const success = document.createElement("p");
  success.className = "success-message";
  success.textContent = text;
  output.appendChild(success);
}

function showError(text) {
  clearOutput();

  const error = document.createElement("p");
  error.className = "error-message";
  error.textContent = text;
  output.appendChild(error);
}
