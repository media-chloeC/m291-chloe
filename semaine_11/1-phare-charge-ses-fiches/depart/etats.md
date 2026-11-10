# Les quatre états de Phare

Remplissez une ligne par test, avec ce que vous **voyez**, pas ce que vous attendiez. Recopiez les messages de la console tels quels, même en anglais.

| Test | Ce que montre la page | Ce que dit la console | Onglet Réseau : fichier et code |
| --- | --- | --- | --- |

| 1. `data.json`, réseau lent (3G) | La page affiche un message de chargement | pas d'erreur dans la console | tous les fichier sont présent avec un temps de chargement de 4, 130ms |

| 2. `data-absent.json`, sans `.catch` | La page affiche un message de chargement | la console affiche une erreur 404 | network nous affiche que c'est le fichier data-absent.json qu'on trouve pas |

| 3. `data-absent.json`, avec `.catch` | la page affiche un message d'erreur de chargement | erreur 404 | data-absent pas la |

| 4. `data-absent.json`, avec le contrôle `reponse.ok` | la page affiche un message d'erreur de chargement | erreur 404 + indique le fichier mancant | data-absent pas la |

| 5. `casse.json` | erruer de chargement | erreur de syntaxe | pas de problème dans network |

| 6. `vide.json`, avant le contrôle de la liste vide | aucun lieu pour le moment | pas de problème dans console | pas de problème dans network |

## Deux questions

1. Dans quel test l'onglet Réseau dit-il `200` alors que la page échoue ? Pourquoi ?

   Réponse : -

2. Au test 2, que devient le message « Chargement des lieux… » ? Qu'est-ce que la personne qui attend en conclut ?

   Réponse : -
