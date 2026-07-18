# Developer Portfolio

[![Frontend checks](https://github.com/rassay2s/developer-portfolio/actions/workflows/frontend-checks.yml/badge.svg)](https://github.com/rassay2s/developer-portfolio/actions/workflows/frontend-checks.yml)

A responsive, multi-page portfolio for Rami Assayed. The project presents my
background, development services, contact information, and selected interactive
features in a lightweight frontend without a framework dependency.

## Highlights

- Responsive navigation and layouts for mobile, tablet, and desktop
- Modular JavaScript with focused FAQ, weather, and contact components
- Live weather data from the Bright Sky API
- Accessible navigation controls, form feedback, and descriptive media text
- Automated syntax, reference, and behavior checks with GitHub Actions
- Optimized images and background video for faster page delivery

## Technology

- Semantic HTML5
- Responsive CSS, Grid, and Flexbox
- Modern JavaScript modules
- Fetch API and async/await
- Node.js built-in test runner
- GitHub Actions

## Project structure

```text
developer-portfolio/
├── index.html
├── about.html
├── services.html
├── help.html
├── contact.html
├── assets/
│   ├── css/
│   ├── images/
│   ├── js/
│   └── video/
├── tests/
└── .github/workflows/
```

## Run locally

Serve the repository with any static HTTP server:

```sh
npx serve .
```

Then open the URL shown in the terminal. `index.html` is the entry page.

## Validation

No dependency installation is required for the automated tests when using a
current Node.js release:

```sh
npm test
```

## Author

Rami Assayed — [GitHub](https://github.com/rassay2s) · [LinkedIn](https://www.linkedin.com/in/rami-assayed)

## License

This project is available under the terms in [LICENSE](LICENSE).
