CATEGORIE: code_categorie, nom, balise_picto
CREER_CATEGORIE, 0N UTILISATEUR, 01 CATEGORIE
UTILISATEUR: code_utilisateur, email, mot_de_passe, nom, prénom, photo, présentation, adresse, code_postal, ville, pays, coordonnés_GPS
ATTACHER, 11 UTILISATEUR, 11 META_UTILISATEUR
META_UTILISATEUR: code_meta, cookie, géolocalisation

APPARTIENT, 11 ACTIVITE, 0N CATEGORIE
PARTICIPER, 0N UTILISATEUR, 1N ACTIVITE
CREER_ACTIVITE, 0N UTILISATEUR, 11 ACTIVITE
ECRIT, 11 COMMENTAIRE, 0N UTILISATEUR
LISTE_NOIRE_JETON: code_jeton, jeton

NIVEAU: code_niveau, nom
CONTIENT_NIVEAU, 11 ACTIVITE, 0N NIVEAU
ACTIVITE: code_activite, nom, description, participant, date, adresse, code_postal, ville, pays, geo_repere
CONTIENT_COMMENTAIRE, 11 COMMENTAIRE, 0N ACTIVITE
COMMENTAIRE: code_commentaire, contenue, photo