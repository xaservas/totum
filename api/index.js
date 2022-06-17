require('dotenv').config();
const express = require('express');
const cors = require('cors');
const expressJSDocSwagger = require('express-jsdoc-swagger');
const logger = require('./app/helpers/logger');

const router = require('./app/routers/index');

const port = process.env.PORT || 3000;

const app = express();

app.set('view engine', 'ejs');
app.set('views', './app/views');

const options = {
  info: {
    version: '1.0.0',
    title: 'Totum',
    description: 'Totum API',
  },
  baseDir: __dirname,
  filesPattern: './**/*.js',
  swaggerUIPath: '/api-docs',
  exposeSwaggerUI: true,
  notRequiredAsNullable: false,
  swaggerUiOptions: {},

  security: {
    BearerAuth: {
      type: 'http',
      scheme: 'bearer',
    },
  },
};

expressJSDocSwagger(app)(options);

// Middleware d'interprétation d'un corps de requête envoyée en post sous forme de JSON
app.use(express.json());
// On peut si on veut le permettre, ajouter l'interpretation de données sous forme urlencoded
app.use(express.urlencoded({ extended: true }));

app.use(
  cors({
    origin: '*',
  })
);

app.use(router);

app.listen(port, () => {
  logger.info(`http://localhost:${port}`);
});
