# Spell Checker (Basic English)

This project checks spelling with the Basic English dictionary from `words.json`.

## Features

- Text input + button to run spell check
- Detects misspelled words and shows them under the input
- Handles punctuation: `,.?!":;`
- Splits words by hyphen (`-`) and checks each part
- Treats words with a capital first letter as correct
- Lets user add one misspelled word at a time to a custom dictionary
- Clears warning message when user changes the text
- Has unit tests for core logic

## Run Locally

1. Install dependencies (optional, only for local server tool cache):
   ```bash
   npm install
   ```
2. Start the local server:
   ```bash
   npm start
   ```
3. Open `http://localhost:4173`.

## Test

```bash
npm test
```

## GitHub Flow (Professional and simple)

1. Create tickets in your project board.
2. Make one branch for one ticket.
3. Open one PR per ticket.
4. Merge to `main` after review.
5. Deployment updates automatically on merge.

## Deploy (GitHub Pages)

This repo includes `.github/workflows/deploy-pages.yml`.
When you push to `main`, GitHub Actions deploys the site to GitHub Pages.

After first push:
1. Go to repo `Settings` -> `Pages`
2. Source should be `GitHub Actions`
