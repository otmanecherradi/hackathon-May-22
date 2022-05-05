const app = require('./app');

const env = require('./env');

const port = env.PORT || 8080;

app.listen(port, () => {
  console.log(`:: Listening on http://localhost:${port} ::`);
});
