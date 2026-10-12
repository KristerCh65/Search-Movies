# Search Movies

A React app that searches movies by title using the [OMDb API](https://www.omdbapi.com/), lists the results and shows the details of each movie.

**Live demo:** https://kristerch65.github.io/Search-Movies/

## Features

- Search movies by title
- Results shown as poster cards with title and year
- Details page with plot, genres, director, writers, cast, runtime, release date, IMDb rating and Metascore
- Responsive layout styled with Bulma and custom CSS

## Tech stack

- React 18 (class components)
- Bulma
- OMDb API
- Create React App
- GitHub Actions + GitHub Pages for deployment

## Project structure

```
search-movies/
├── public/
└── src/
    ├── App.js                  # Search page; shows Details when the URL has ?id=
    ├── Components/
    │   ├── searchForm.js       # Search input, calls the OMDb search endpoint
    │   ├── MoviesList.js       # Grid of results
    │   ├── movie.js            # Movie card
    │   └── Title.js
    └── Pages/
        └── Details.js          # Movie details, fetched by IMDb ID
```

## Running locally

Requires Node.js 18 or later.

```bash
cd search-movies
npm install
npm start
```

Then open http://localhost:3000/Search-Movies.

Other scripts:

- `npm run build` builds the production bundle into `search-movies/build`
- `npm test` runs the tests

## Deployment

Every push to `master` runs [.github/workflows/deploy.yml](.github/workflows/deploy.yml), which builds the app and publishes it to GitHub Pages. You can also run it manually from the **Actions** tab.

The `homepage` field in `search-movies/package.json` is set to `https://kristerch65.github.io/Search-Movies` so asset paths match the Pages URL. If you fork this repo, change it to your own URL.

## Author

Krister Chavez: [Portfolio](https://kristerch65.github.io/) · [GitHub](https://github.com/KristerCh65)
