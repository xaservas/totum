UTILISATEUR: (code_utilisateur, email, mot_de_passe, nom, prénom, photo, présentation, adresse, code_postal, ville, pays, #code_meta, created_at, updated_at)

ACTIVITE: (code_activite, nom, description, niveau, adresse, code_postal, ville, pays, geo_repere, #code_utilisateur, #code_categorie, created_at, updated_at)

COMMENTAIRE: (code_commentaire, contenue, photo, #code_utilisateur, #code_activite, created_at, updated_at)

META_UTILISATEUR: (code_meta, cookie, géolocalisation, #code_utilisateur, created_at, updated_at)

CATEGORIE: (code_categorie, nom, image, #code_utilisateur, created_at, updated_at)

PARTICIPER: (code_participer, #code_utilisateur, #code_activite, created_at, updated_at)
