# Acessibilité

## Constats de l'audit (avant)
###	Constat	Critère concerné
1	Le titre « Risotto aux champignons » n'avait pas de couleur définie : il héritait de la couleur du thème (clair en mode sombre) et devenait quasi invisible sur fond blanc, ratio ≈ 1,1:1 (estimé depuis la capture)	Contraste (WCAG 1.4.3)
2	Icônes blanches sur le corail 
#D85A30 : ratio 3,87:1, juste au-dessus du minimum pour une icône (3:1) mais sous 4,5:1	Contraste (1.4.3 / 1.4.11)
3	Vert des visuels 
#1D9E75 sur blanc : ratio 3,39:1, marge très faible	Contraste non textuel (1.4.11)
4	Sous-label 
#712B13 sur 
#F0997B : 4,64:1, passe de justesse	Contraste (1.4.3)
5	Icônes de 16 px (≈ 33 px à l'échelle 390 px) sans zone tactile définie	Cibles tactiles (2.5.8)
6	Aucun indicateur de focus clavier	Focus visible (2.4.7)
7	Navigation du bas uniquement en icônes, état actif indiqué par la couleur seule	Utilisation de la couleur (1.4.1)
8	Régime alimentaire (végétarien, sans gluten) en petit texte coloré, sans icône	Utilisation de la couleur (1.4.1)
9	Champ de recherche sans libellé accessible, images sans équivalent textuel	Perceptible / Robuste (1.1.1, 4.1.2)
## Modifications apportées
Objectif 1 — Contrastes (≥ 4,5:1 texte, ≥ 3:1 grands titres et éléments d'interface)
Palette ajustée :
corail visuels 
#D85A30 → 
#B8421C (blanc dessus : 3,87 → 5,48:1)
vert en-tête 
#0F6E56 → 
#0B5240 (blanc dessus : 6,20 → 9,15:1)
vert des visuels 
#1D9E75 → 
#0F6E56 (sur blanc : 3,39 → 6,20:1)
Toutes les couleurs de texte sont maintenant explicites (plus aucun héritage du thème) : cause directe du constat n°1.
### Textes sur cartes simplifiés en #111.
Élément	Combinaison	Ratio	Seuil
Titre en-tête (Yumnote)	#FFF sur 
#0B5240	9,15:1	3:1 (≥ 24 px gras)
Titre détail (24 px)	#111 sur #FFF	18,88:1	3:1
Titre carte corail	#111 sur 
#F0997B	8,59:1	4,5:1
Titre carte menthe	#111 sur 
#9FE1CB	12,68:1	4,5:1
Badge « Végé friendly »	#FFF sur 
#04342C	13,70:1	4,5:1
Pastille de régime	#111 sur #FFF	18,88:1	4,5:1
Description	#111 sur 
#E1F5EE	16,63:1	4,5:1
Placeholder de recherche	
#0B5240 sur 
#E1F5EE	8,06:1	4,5:1
Navigation active	#FFF sur 
#04342C	13,70:1	4,5:1
Navigation inactive	
#C8EFE0 sur 
#04342C	11,01:1	4,5:1
Bordure du champ de recherche	
#0B5240 sur #FFF	9,15:1	3:1
Icône sur bouton rond	#FFF sur 
#04342C	13,70:1	3:1
Anneau blanc des boutons sur visuel	#FFF sur 
#B8421C	5,48:1	3:1
Objectif 2 — Clavier & focus
Éléments interactifs en vrais button / input, donc accessibles à Tab, Maj+Tab, Entrée et Espace.
Indicateur de focus : double anneau (3 px blanc + 3 px vert foncé 
#04342C), visible sur fond clair, coloré et foncé :
#04342C sur blanc : 13,70:1
#04342C sur 
#F0997B : 6,23:1
#FFF sur 
#04342C : 13,70:1
outline transparent conservé pour que le focus reste visible en mode contraste élevé.
Le focus est montré dans la maquette : 1re carte (Accueil), bouton Retour (Détail), champ (Recherche).
Objectif 3 — Cibles tactiles (≥ 24 px, visé 48 px)
Élément	Avant	Après
Bouton recherche, retour, favoris	icône ≈ 33 px, zone non définie	48 × 48 px
Éléments de navigation	icône seule	≥ 64 px de haut, 1/3 de la largeur
Champ de recherche	non défini	52 px de haut
Cartes et lignes de résultats	non défini	cliquables en entier (≥ 84 px de haut en liste)

Tailles de texte : minimum 14 px (pastilles, navigation), 16 px pour le corps, 24 px pour le titre de page.

## Autres corrections (utilisation de la couleur, équivalents textuels)
Navigation : libellés ajoutés (Profil, Accueil, Carnet) ; page active signalée par une barre supérieure, le gras et aria-current="page", pas par la couleur seule.
Régimes alimentaires : pastille avec icône + texte (feuille pour végétarien, épi barré pour sans gluten).
Images : chaque visuel a un équivalent textuel (role="img" + aria-label).
Boutons à icône : aria-label (Rechercher, Retour, Ajouter aux favoris) ; favori avec aria-pressed.
Recherche : aria-label sur le champ, nombre de résultats annoncé via aria-live="polite" (filtrage instantané du brief).
Structure : un seul <h1> par page, sous-titres en <h2>, navigation dans <nav aria-label>.
### Remédiations chiffrées (Objectif 5)
Titre du détail : 1,1:1 → 18,88:1 (couleur #111 explicite).
Cibles tactiles : ≈ 33 px sans zone définie → 48 × 48 px minimum.
Icônes sur corail : 3,87:1 → 5,48:1 (
#B8421C).
Visuels verts : 3,39:1 → 6,20:1 (
#0F6E56).
