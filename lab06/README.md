# Lab 06 — fetch-app

This app implements the React Native “Using Fetch” example (Movies), then switches to a public Products endpoint (no Lab 5 needed).

## Short answers
- **Promises**: `fetch()` returns a Promise that resolves to a Response, and `response.json()` returns another Promise for parsed data.
- **JSON**: The code calls `response.json()` to turn the server’s JSON into a JS object, then maps it into list items.
- **Hooks**: `useEffect` triggers fetching on mount and when the selected dataset changes; `useState` stores loading, error, and list data.
- **HTTP methods**: Uses `GET` via `fetch(url, { method: "GET" })` to read data.
- **Invalid URL behavior**: If the URL is invalid or returns non-OK, we throw/catch the error and show a red error box with the message.

## Run
```bash
cd lab06/fetch-app
npm install
npx expo start --tunnel
