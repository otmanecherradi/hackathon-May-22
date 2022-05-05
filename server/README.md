# Hackathon 22 - May 25th 2022

## Server side

### Prerequisites

- Latest Node.js version.
  - [nvm](https://github.com/nvm-sh/nvm) or [nvm-windows](https://github.com/coreybutler/nvm-windows) can be used to install / manage Node.js versions

### Setup

Install dependencies:

```sh
npm i
```

### Environment Config

Copy the `.env.sample` file into a file named `.env` and update the variables accordingly.

```sh
cp .env.sample .env
```

Also update the file named `src/env.js` with the variables accordingly.

### Running

After installing dependencies, creating the `.env` file and updating the `src/env.js` file, run the API:

```sh
npm start
```

For development:

```sh
npm run dev
```

### Description

Includes API Server utilities:

- [express](https://www.npmjs.com/package/express)
  - Fast, unopinionated, minimalist web framework for node.js
- [morgan](https://www.npmjs.com/package/morgan)
  - HTTP request logger middleware for node.js
- [helmet](https://www.npmjs.com/package/helmet)
  - Helmet helps you secure your Express apps by setting various HTTP headers. It's not a silver bullet, but it can help!
- [dotenv](https://www.npmjs.com/package/dotenv)
  - Dotenv is a zero-dependency module that loads environment variables from a `.env` file into `process.env`
- [compression](https://www.npmjs.com/package/compression)
  - Node.js compression middleware.
- [cors](https://www.npmjs.com/package/cors)
  - CORS is a node.js package for providing a Connect/Express middleware that can be used to enable CORS with various options.
- [knex.js](https://www.npmjs.com/package/knex)
  - A SQL query builder that is flexible, portable, and fun to use!
- [mysql](https://www.npmjs.com/package/mysql)
  - This is a node.js driver for mysql. It is written in JavaScript, does not require compiling, and is 100% MIT licensed.

Development utilities:

- [nodemon](https://www.npmjs.com/package/nodemon)
  - nodemon is a tool that helps develop node.js based applications by automatically restarting the node application when file changes in the directory are detected.
- [eslint](https://www.npmjs.com/package/eslint)
  - ESLint is a tool for identifying and reporting on patterns found in ECMAScript/JavaScript code.
