const bunyan = require('bunyan');
const path = require('path');

const streams = [];
// !['production','test'].includes(process.env.NODE_ENV)
// equivalent à
// process.env.NODE_ENV !== 'production' && process.env.NODE_ENV !== 'test'
// Si on est pas en production ou en test
if (!['production', 'test'].includes(process.env.NODE_ENV)) {
    // alors on affiche l'erreur dans la console
    streams.push({
        level: 'info',
        stream: process.stdout, // log INFO and above to stdout
    });
}
streams.push({
    level: 'error',
    // on peut si on le souhaite séparer les fichiers de log par tranche de temps défini. Cela
    // permet d'éviter d'avoir des fichiers trop volumineux
    // Et surtout de ne pas grader ad vitam aeternam des informations devenus obsolètes
    type: 'rotating-file',
    path: path.resolve(`${__dirname}../../../log/cadex-error.log`), // log ERROR and above to a file
    period: '1d', // daily rotation
    count: 3, // keep 3 back copies
});

const log = bunyan.createLogger({
    name: 'Totum',
    streams,
});

module.exports = log;
