# Analog Archivist

A responsive archive interface for rare records, printed matter, and field recordings.

## Run locally

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
npm run preview
```

## Deploy to Vercel

Import this folder as a Vercel project. The included `vercel.json` sets the build command, static output directory, and SPA route fallback. No environment variables or backend service are required.

The collection log and saved entries are stored in the visitor's browser with `localStorage`.
