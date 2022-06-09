function controllerHandler(controller) {
    return async (request, response, next) => {
        try {
            // Un controller c'est un middleware et don il a besoin de request , response et
            // potentiellement next. Il faut donc lui transmettre ce que le router avait transmis au
            // middleware d'encapsulation de controller
            await controller(request, response, next);
        } catch (err) {
            // On conditionne la gestion d'erreur en fonction de l'endroit ou est intervenue
            // l'erreur, si c'est une erreur utilisateur on utilise le status 40x si c'est une
            // erreur serveur on utilise un status 500

            /// `${err.table} est déjà présent la base de données`
            next(err);
        }
    };
}

module.exports = controllerHandler;
