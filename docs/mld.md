UTILISATEUR: (code_utilisateur, email, mot_de_passe, nom, prénom, photo, présentation, adresse, code_postal, ville, pays, coordonés_GPS, #code_meta, created_at, updated_at)

ACTIVITE: (code_activite, nom, description, participants_max, date, #code_niveau, adresse, code_postal, ville, pays, geo_repere, #code_utilisateur, #code_categorie, created_at, updated_at)

COMMENTAIRE: (code_commentaire, contenue, photo, #code_utilisateur, #code_activite, created_at, updated_at)

NIVEAU: (code_niveau, nom)

META_UTILISATEUR: (code_meta, cookie, géolocalisation, #code_utilisateur, created_at, updated_at)

CATEGORIE: (code_categorie, nom, image, #code_utilisateur, created_at, updated_at)

PARTICIPER: (code_participer, #code_utilisateur, #code_activite, created_at, updated_at)

LISTE_NOIRE_JETON: (code_jeton, jeton, created_at, updated_at)
