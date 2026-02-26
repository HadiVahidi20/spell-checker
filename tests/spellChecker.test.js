import assert from "node:assert/strict";
import test from "node:test";
import { buildDictionary, checkText } from "../src/spellChecker.js";

test("checkText handles punctuation, hyphen and capital words", () => {
  const dictionary = buildDictionary([
    "he",
    "go",
    "to",
    "the",
    "island",
    "blue",
    "green",
    "like",
    "egg"
  ]);

  assert.deepEqual(checkText("he go to the island,", dictionary), []);
  assert.deepEqual(checkText("blue-green", dictionary), []);
  assert.deepEqual(checkText("Ali go to London", dictionary), []);
  assert.deepEqual(checkText("he like egg-nog", dictionary), ["nog"]);
  assert.deepEqual(checkText("go to birmingham", dictionary), ["birmingham"]);
});

test("checkText uses custom dictionary words", () => {
  const dictionary = buildDictionary(["go", "to", "the"]);
  const customDictionary = new Set(["birmingham"]);

  assert.deepEqual(checkText("go to birmingham", dictionary, customDictionary), []);
});
