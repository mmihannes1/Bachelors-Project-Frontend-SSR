# Shift Manager Web App

This is a project created by PUM-06 with the purpose of comparing CSR and SSR rendering.
Below is the starting guide for setting up the project on your own system.

## Getting Started

To get started, follow these steps:

1. Clone the repository:

```bash
git clone https://gitlab.liu.se/kandidat_vt24/client-group/server-rendered-frontend.git
```

2. Make sure ur inside the project directory, else navigate to project directory:

```bash
cd server-rendered-frontend
```

3. Install the dependencies:

```bash
npm install
```

4. Set up VScode settings
   Press `ctrl + shift + p` and go to `> Prefrences: Open Workspace Settings (JSON)`.
   Paste the following code below and save.

```bash
"css.lint.unknownAtRules": "ignore"
```

5. Start the development server in the project directory:

```bash
npm run dev
```

This will start the development server and open the application in your default browser.

## Available Scripts

In the project directory, you can run the following scripts:

- `npm run dev`: Starts the development server.
- `npm run build`: Builds the production-ready application.
- `npm run serve`: Serves the production build locally.
- `npm run format:fix`: Formats the code with Prettier.

You will mainly use `npm run dev`. When the app is running the web app will automatically re-render on save.

## Folder Structure

Inside the `./src` you can find the main files used for development. The rest of files inside `root` is mostly used for configuration and can for the most part be ignored.
