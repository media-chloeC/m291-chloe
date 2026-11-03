# Les étiquettes de la location d'instruments

Une ligne par étiquette. La colonne « Sert à » répond aux questions 2, 3 et 4 de la méthode : afficher, filtrer, trier. Une étiquette qui ne sert à rien de tout cela n'entre pas dans le fichier, sauf `id`.

| Étiquette | Écran      | Sert à (afficher, filtrer, trier) | Sorte de valeur | Unique ? | Exemple |

| id            | invisble   | trier                             | num             | oui      | ---                |
| nom           | visible    | afficher, filtrer et trier        | text            | non      | flûte              |
| Famille       | visible    | afficher, filtrer et trier        | text            | non      | Vent               |
| Prix          | visible    | afficher, filtrer et trier        | num             | non      | 25                 |
| Disponible    | invisible  | afficher et trier                 | bool            | non      | false -> emprunté  |
| taille        | visible    | afficher, filtrer et trier        | text            | non      | enfant             |
| etat mat      | visible    | afficher et trier                 | text            | non      | etui a remplacer   |


Pourquoi le nom de l'instrument ne suffit pas à distinguer les fiches (une phrase) :
ON peut avoir plusieurs fois le même instrument à emprunter.

Suggestion de l'IA que j'ai refusée, et pourquoi :
