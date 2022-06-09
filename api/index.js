require('dotenv').config();
const express = require('express');
const expressJSDocSwagger = require('express-jsdoc-swagger');
const logger = require('./app/helpers/logger');

const router = require('./app/routers');

const port = process.env.PORT || 3000;

const app = express();

app.set('view engine', 'ejs');
app.set('views', './app/views');

const options = {
    info: {
        version: '1.0.0',
        title: 'Totum',
    },
    baseDir: __dirname,
    // Glob pattern to find your jsdoc files (multiple patterns can be added in an array)
    filesPattern: './**/*.js',
    // URL where SwaggerUI will be rendered
    swaggerUIPath: '/api-docs',
    // Expose OpenAPI UI
    exposeSwaggerUI: true,
    // Set non-required fields as nullable by default
    notRequiredAsNullable: false,
    // You can customize your UI options.
    // you can extend swagger-ui-express config. You can checkout an example of this
    // in the `example/configuration/swaggerOptions.js`
    swaggerUiOptions: {},
};

expressJSDocSwagger(app)(options);

// Middleware d'interprétation d'un corps de requête envoyée en post sous forme de JSON
app.use(express.json());
// On peut si on veut le permettre, ajouter l'interpretation de données sous forme urlencoded
app.use(express.urlencoded({ extended: true }));

app.use(router);

app.listen(port, () => {
    logger.info(`http://localhost:${port}`);
});
