NIVEAU: code_niveau, nom
CONTIENT_NIVEAU, 11 ACTIVITE, 0N NIVEAU
ACTIVITE: code_activite, nom, description, participant, date, adresse, code_postal, ville, pays, geo_repere
APPARTIENT, 11 ACTIVITE, 0N CATEGORIE
CATEGORIE: code_categorie, nom, balise_picto

COMMENTAIRE: code_commentaire, contenue, photo
CONTIENT_COMMENTAIRE, 11 COMMENTAIRE, 0N ACTIVITE
PARTICIPER, 0N UTILISATEUR, 1N ACTIVITE
CREER_ACTIVITE, 0N UTILISATEUR, 11 ACTIVITE
CREER_CATEGORIE, 0N UTILISATEUR, 01 CATEGORIE

ECRIT, 11 COMMENTAIRE, 0N UTILISATEUR
UTILISATEUR: code_utilisateur, email, mot_de_passe, nom, prénom, photo, présentation, adresse, code_postal, ville, pays
ATTACHER, 11 UTILISATEUR, 11 META_UTILISATEUR
META_UTILISATEUR: code_meta, cookie, géolocalisation

LISTE_NOIRE_JETON: code_jeton, jeton
