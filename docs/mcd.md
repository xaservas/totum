# MCD

ECRIT, 11 COMMENTAIRE, 0N UTILISATEUR
UTILISATEUR: code_utilisateur, email, mot_de_passe, nom, prénom, photo, présentation, adresse, code_postal, ville, pays
ATTACHER, 11 UTILISATEUR, 11 META_UTILISATEUR
META_UTILISATEUR: code_meta, cookie, géolocalisation

COMMENTAIRE: code_commentaire, contenue, photo
CREER_ACTIVITE, 0N UTILISATEUR, 11 ACTIVITE
PARTICIPER, 0N UTILISATEUR, 1N ACTIVITE
CREER_CATEGORIE, 0N UTILISATEUR, 01 CATEGORIE

CONTIENT, 11 COMMENTAIRE, 0N ACTIVITE
ACTIVITE: code_activite, nom, niveau, adresse, code_postal, ville, pays, geo_repere
APPARTIENT, 11 ACTIVITE, 0N CATEGORIE
CATEGORIE: code_categorie, nom, image