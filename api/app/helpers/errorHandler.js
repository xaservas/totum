const logger = require('./logger');

// ! Attention ici, on est obligé de spécifier les 4 paramètres, même si l'on utilise pas le next

// Si le next n'est pas présent ce middleware sera considéré comme un middleaware classique et
// Express nous fournira la request dans le paramètre "err"
// eslint-disable-next-line no-unused-vars
module.exports = (err, request, response, next) => {
    logger.error(err);
    // On conditionne la gestion d'erreur en fonction de l'endroit ou est intervenue
    // l'erreur, si c'est une erreur utilisateur on utilise le status 40x si c'est une
    // erreur serveur on utilise un status 500

    let statusCode = 500;
    if (err.infos?.statusCode) {
        statusCode = err.infos.statusCode;
    }

    let { message } = err;
    if (statusCode === 500) {
        // SI jamais c'est notre faute, au cahce l'erreur sous le tapis et on la vend avec du
        // marketing
        message = 'Une erreur est survenue, veuillez réessayer plus tard…';
    }

    // ON peut ajouter également des cas particuliers
    // ici une erreur de BDD sur un doublon
    // err.code est retourné dans l'erreur du module PG : il représente une erreur de contrainte
    // unique
    if (err.code === '23505') {
        statusCode = 400;
        message = `${err.table} est déjà présent la base de données`;
    }

    response.status(statusCode).json({ error: message });
};
