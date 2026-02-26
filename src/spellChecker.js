const EDGE_PUNCTUATION_REGEX = /^[,.?!":;]+|[,.?!":;]+$/g;

export function buildDictionary(words) {
  const dictionary = new Set();

  for (const word of words) {
    dictionary.add(String(word).toLowerCase());
  }

  return dictionary;
}

export function splitIntoWordParts(text) {
  const result = [];
  const tokens = text.split(/\s+/);

  for (const token of tokens) {
    const parts = token.split("-");

    for (const part of parts) {
      const cleanPart = part.replace(EDGE_PUNCTUATION_REGEX, "");

      if (cleanPart !== "") {
        result.push(cleanPart);
      }
    }
  }

  return result;
}

export function checkText(text, dictionary, customDictionary = new Set()) {
  const misspelledWords = [];
  const alreadyAdded = new Set();
  const parts = splitIntoWordParts(text);

  for (const part of parts) {
    // Names like "Ali" or "London" are always accepted.
    if (/^[A-Z]/.test(part)) {
      continue;
    }

    const lowerWord = part.toLowerCase();
    const inMainDictionary = dictionary.has(lowerWord);
    const inCustomDictionary = customDictionary.has(lowerWord);

    if (!inMainDictionary && !inCustomDictionary && !alreadyAdded.has(lowerWord)) {
      misspelledWords.push(lowerWord);
      alreadyAdded.add(lowerWord);
    }
  }

  return misspelledWords;
}

export function addWordToDictionary(word, customDictionary) {
  const cleanWord = word.trim().toLowerCase();

  if (cleanWord !== "") {
    customDictionary.add(cleanWord);
  }
}
