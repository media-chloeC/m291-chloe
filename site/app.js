'use strict';

/* ==========================================================
   Yumnote — données et comportements (JavaScript natif)
   Pages : accueil, recherche, recette, favoris, profil
   ========================================================== */

/* ---------- Données ---------- */

const TAGS = {
  'vegetarien': { label: 'Végétarien', icone: 'leaf' },
  'sans-gluten': { label: 'Sans gluten', icone: 'wheat-off' }
};

/* Allergènes : repérés automatiquement dans la liste d'ingrédients de chaque recette.
   « sauf » écarte les faux positifs (ex. le lait de coco n'est pas du lait). */
const ALLERGENES = {
  'arachides': {
    label: 'Arachides',
    mots: ['arachide', 'cacahuete'],
    sauf: null
  },
  'lait': {
    label: 'Lait',
    mots: ['lait', 'creme', 'fromage', 'beurre', 'parmesan', 'yaourt', 'chevre', 'mozzarella'],
    sauf: /lait de coco|beurre de cacahuete/g
  },
  'oeufs': {
    label: 'Œufs',
    mots: ['oeuf'],
    sauf: null
  },
  'fruits-a-coque': {
    label: 'Fruits à coque',
    mots: ['noix', 'noisette', 'amande', 'pistache', 'cajou'],
    sauf: /noix de coco|noix de muscade/g
  }
};

const AVATARS = [
  { id: 'carotte', nom: 'Carotte', emoji: '🥕', fond: 'var(--c3)' },
  { id: 'poele', nom: 'Poêle', emoji: '🍳', fond: 'var(--m3)' },
  { id: 'avocat', nom: 'Avocat', emoji: '🥑', fond: 'var(--g7)' },
  { id: 'piment', nom: 'Piment', emoji: '🌶️', fond: 'var(--c7)' },
  { id: 'citron', nom: 'Citron', emoji: '🍋', fond: 'var(--m1)' }
];

/* Les recettes sont chargées depuis recette.json (voir chargerRecettes plus bas). */
let RECETTES = [];

/* Anciens identifiants (texte) → identifiants de recette.json, pour conserver les favoris déjà enregistrés */
const ANCIENS_IDS = {
  'risotto-champignons': '1',
  'tarte-poireaux': '2',
  'curry-veggie': '3',
  'salade-quinoa': '4',
  'soupe-potiron': '5',
  'gratin-dauphinois': '6',
  'salade-automne-noix': '7',
  'wok-cacahuete': '8',
  'poulet-citron': '9',
  'saumon-papillote': '10'
};

const ICONES = {
  'search': '<circle cx="11" cy="11" r="7"/><path d="m20 20-4.5-4.5"/>',
  'arrow-left': '<path d="M19 12H5"/><path d="m12 19-7-7 7-7"/>',
  'bookmark': '<path d="M6 3h12v18l-6-4-6 4z"/>',
  'user': '<circle cx="12" cy="8" r="4"/><path d="M4 21c0-4 3.6-7 8-7s8 3 8 7"/>',
  'home': '<path d="M3 11l9-8 9 8"/><path d="M5 10v10h14V10"/>',
  'leaf': '<path d="M5 19C5 9 11 4 20 4c0 9-5 15-15 15z"/><path d="M5 19c3-5 6-8 10-10"/>',
  'wheat-off': '<path d="M12 21V9"/><path d="M12 9c-2.5 0-4-1.5-4-4 2.5 0 4 1.5 4 4z"/><path d="M12 9c2.5 0 4-1.5 4-4-2.5 0-4 1.5-4 4z"/><path d="M12 15c-2.5 0-4-1.5-4-4 2.5 0 4 1.5 4 4z"/><path d="M12 15c2.5 0 4-1.5 4-4-2.5 0-4 1.5-4 4z"/><path d="M4 4l16 16"/>',
  'clock': '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
  'list': '<path d="M9 6h11M9 12h11M9 18h11"/><path d="M4 6h.01M4 12h.01M4 18h.01"/>',
  'folder-plus': '<path d="M12 19H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h4l2 3h8a2 2 0 0 1 2 2v3"/><path d="M16 19h6"/><path d="M19 16v6"/>',
  'plus': '<path d="M12 5v14M5 12h14"/>',
  'chevron-right': '<path d="m9 6 6 6-6 6"/>',
  'x': '<path d="M18 6 6 18M6 6l12 12"/>'
};

/* ---------- Utilitaires ---------- */

const STORE = {
  lire(cle, defaut) {
    try {
      const v = localStorage.getItem('yumnote:' + cle);
      return v ? JSON.parse(v) : defaut;
    } catch (e) {
      return defaut;
    }
  },
  ecrire(cle, valeur) {
    try {
      localStorage.setItem('yumnote:' + cle, JSON.stringify(valeur));
    } catch (e) { /* stockage indisponible : on continue sans mémoriser */ }
  }
};

function el(tag, classe, texte) {
  const n = document.createElement(tag);
  if (classe) n.className = classe;
  if (texte !== undefined) n.textContent = texte;
  return n;
}

function svg(nom) {
  return '<svg viewBox="0 0 24 24" focusable="false">' + ICONES[nom] + '</svg>';
}

function icone(nom) {
  const s = el('span', 'ico');
  s.setAttribute('aria-hidden', 'true');
  s.innerHTML = svg(nom);
  return s;
}

function injecterIcones() {
  document.querySelectorAll('[data-icon]').forEach(n => {
    n.className = 'ico';
    n.setAttribute('aria-hidden', 'true');
    n.innerHTML = svg(n.dataset.icon);
  });
}

function normaliser(texte) {
  return texte
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/œ/g, 'oe')
    .toLowerCase();
}

function pluriel(n, mot) {
  return n + ' ' + mot + (n > 1 ? 's' : '');
}

function recetteParId(id) {
  return RECETTES.find(r => r.id === String(id));
}

/* Allergènes repérés dans la liste d'ingrédients */
function allergenesDe(recette) {
  const base = normaliser(recette.ingredients.join(' '));
  return Object.keys(ALLERGENES).filter(cle => {
    const a = ALLERGENES[cle];
    const texte = a.sauf ? base.replace(a.sauf, ' ') : base;
    return a.mots.some(m => new RegExp('\\b' + m + 's?\\b').test(texte));
  });
}

/* Profil */
const PROFIL_DEFAUT = { avatar: 'avocat', pseudo: '', bio: '', regimes: [], allergies: [] };

function lireProfil() {
  const p = Object.assign({}, PROFIL_DEFAUT, STORE.lire('profil', {}));
  p.regimes = p.regimes.filter(t => TAGS[t]);
  p.allergies = p.allergies.filter(a => ALLERGENES[a]);
  return p;
}

function contientAllergene(recette, profil) {
  return recette.allergenes.some(a => profil.allergies.includes(a));
}

/* Favoris et collections */
function lireFavoris() {
  return STORE.lire('favoris', []).filter(id => recetteParId(id));
}

function lireCollections() {
  return STORE.lire('collections', []);
}

function ecrireCollections(collections) {
  STORE.ecrire('collections', collections);
}

function retirerDesCollections(idRecette) {
  ecrireCollections(lireCollections().map(c => Object.assign({}, c, {
    recettes: c.recettes.filter(id => id !== idRecette)
  })));
}

function nomDeCollectionExiste(nom) {
  return lireCollections().some(c => normaliser(c.nom) === normaliser(nom));
}

function creerCollection(nom, recettes) {
  const collection = {
    id: 'c' + Date.now().toString(36) + Math.random().toString(36).slice(2, 6),
    nom: nom,
    recettes: recettes
  };
  ecrireCollections(lireCollections().concat(collection));
  return collection;
}

/* ---------- Thèmes de couleurs (theme.json) ---------- */

/* Contenu de theme.json une fois chargé : { defaut, variables, themes: [...] } */
let THEMES = null;

/* Pose les couleurs d'un thème sur la page : chaque clé de theme.json est reliée
   à une variable CSS grâce à l'objet « variables » du même fichier. */
function appliquerCouleurs(variables, couleurs) {
  const racine = document.documentElement;
  Object.keys(variables).forEach(cle => {
    if (couleurs[cle]) racine.style.setProperty(variables[cle], couleurs[cle]);
  });

  /* Couleur de la barre du navigateur sur mobile */
  if (couleurs['principal']) {
    let meta = document.querySelector('meta[name="theme-color"]');
    if (!meta) {
      meta = document.createElement('meta');
      meta.name = 'theme-color';
      document.head.append(meta);
    }
    meta.content = couleurs['principal'];
  }
}

/* Applique tout de suite le dernier thème utilisé, avant le chargement de theme.json,
   pour éviter un éclair aux couleurs par défaut. */
function appliquerThemeEnCache() {
  const cache = STORE.lire('themeCache', null);
  if (cache && cache.variables && cache.couleurs) {
    appliquerCouleurs(cache.variables, cache.couleurs);
  }
}

async function chargerThemes() {
  const reponse = await fetch('theme.json');
  if (!reponse.ok) throw new Error('HTTP ' + reponse.status);
  const donnees = await reponse.json();
  if (!donnees || !donnees.variables || !Array.isArray(donnees.themes) || !donnees.themes.length) {
    throw new Error('theme.json invalide');
  }
  THEMES = donnees;
}

function themeChoisi() {
  const id = STORE.lire('theme', null);
  return THEMES.themes.find(t => t.id === id)
    || THEMES.themes.find(t => t.id === THEMES.defaut)
    || THEMES.themes[0];
}

function appliquerTheme(theme) {
  appliquerCouleurs(THEMES.variables, theme.couleurs);
  STORE.ecrire('themeCache', { variables: THEMES.variables, couleurs: theme.couleurs });
}

/* Chargement des recettes depuis recette.json */
function slugTag(tag) {
  return normaliser(String(tag)).trim().replace(/\s+/g, '-');
}

/* Adapte une recette de recette.json au format utilisé par le site :
   id → id (en texte), nom → titre, icone → emoji, tags → identifiants internes */
function depuisJson(r) {
  return {
    id: String(r.id),
    titre: r.nom,
    emoji: r.icone,
    tags: (r.tags || []).map(slugTag).filter(t => TAGS[t]),
    temps: r.temps,
    description: r.description || '',
    ingredients: r.ingredients || [],
    etapes: r.etapes || []
  };
}

async function chargerRecettes() {
  const reponse = await fetch('recette.json');
  if (!reponse.ok) throw new Error('HTTP ' + reponse.status);
  const donnees = await reponse.json();
  RECETTES = donnees
    .filter(r => r.id !== undefined && r.nom)
    .map(depuisJson);
  RECETTES.forEach(r => { r.allergenes = allergenesDe(r); });
}

function migrerAnciensIds() {
  const convertir = id => ANCIENS_IDS[id] || id;
  const favoris = STORE.lire('favoris', []);
  if (favoris.some(id => ANCIENS_IDS[id])) {
    STORE.ecrire('favoris', favoris.map(convertir));
  }
  const collections = lireCollections();
  if (collections.some(c => c.recettes.some(id => ANCIENS_IDS[id]))) {
    ecrireCollections(collections.map(c => Object.assign({}, c, { recettes: c.recettes.map(convertir) })));
  }
}

function afficherErreurChargement() {
  const zone = document.getElementById('contenu');
  const message = el('p', 'vide', 'Impossible de charger les recettes (recette.json). Ouvre le site avec un serveur local plutôt qu’en double-cliquant sur le fichier HTML.');
  message.setAttribute('role', 'alert');
  zone.prepend(message);
}

/* Éléments d'interface réutilisés */
function pastille(tag) {
  const p = el('span', 'tag');
  p.append(icone(TAGS[tag].icone), TAGS[tag].label);
  return p;
}

function etiquettes(recette) {
  const e = el('span', 'etiquettes');
  recette.tags.forEach(t => e.append(pastille(t)));
  return e;
}

function visuel(recette, classe, decoratif) {
  const v = el('div', classe);
  const e = el('span', null, recette.emoji);
  e.setAttribute('aria-hidden', 'true');
  v.append(e);
  if (decoratif) {
    v.setAttribute('aria-hidden', 'true');
  } else {
    v.setAttribute('role', 'img');
    v.setAttribute('aria-label', 'Illustration : ' + recette.titre.toLowerCase());
  }
  return v;
}

function lienRecette(recette) {
  return 'recette.html?id=' + encodeURIComponent(recette.id);
}

function carte(recette, i) {
  const li = el('li');
  const ton = (i + Math.floor(i / 2)) % 2 === 0 ? 'ton-corail' : 'ton-menthe';
  const a = el('a', 'card ' + ton);
  a.href = lienRecette(recette);
  a.append(visuel(recette, 'im', true), el('span', 't', recette.titre));
  li.append(a);
  return li;
}

function ligne(recette, i) {
  const li = el('li');
  const a = el('a', 'row ' + (i % 2 === 0 ? 'ton-corail' : 'ton-menthe'));
  a.href = lienRecette(recette);
  const corps = el('span');
  corps.append(el('span', 'tt', recette.titre), etiquettes(recette));
  a.append(visuel(recette, 'th', true), corps);
  li.append(a);
  return li;
}

function retourDepuisHistorique() {
  document.querySelectorAll('[data-back]').forEach(a => {
    a.addEventListener('click', e => {
      try {
        if (document.referrer && new URL(document.referrer).origin === location.origin && history.length > 1) {
          e.preventDefault();
          history.back();
        }
      } catch (err) { /* on laisse le lien fonctionner normalement */ }
    });
  });
}

/* ---------- Accueil ---------- */

function initAccueil() {
  const profil = lireProfil();
  const liste = RECETTES.filter(r =>
    profil.regimes.every(t => r.tags.includes(t)) && !contientAllergene(r, profil)
  );
  const zone = document.getElementById('recommandations');
  liste.forEach((r, i) => zone.append(carte(r, i)));

  if (!liste.length) {
    zone.after(el('p', 'vide', 'Aucune recette ne correspond à ton profil pour le moment.'));
  }

  const criteres = profil.regimes.map(t => TAGS[t].label.toLowerCase())
    .concat(profil.allergies.map(a => 'sans ' + ALLERGENES[a].label.toLowerCase()));
  const note = document.getElementById('note');
  note.textContent = criteres.length
    ? 'Selon ton profil : ' + criteres.join(', ') + '. '
    : 'Indique tes régimes et allergies pour affiner cette sélection. ';
  const lien = el('a', null, 'Modifier mon profil');
  lien.href = 'profil.html';
  note.append(lien);
}

/* ---------- Recherche ---------- */

function initRecherche() {
  const params = new URLSearchParams(location.search);
  const etat = {
    q: params.get('q') || '',
    regimes: new Set(TAGS[params.get('regime')] ? [params.get('regime')] : [])
  };

  const champ = document.getElementById('q');
  const compte = document.getElementById('compte');
  const zone = document.getElementById('resultats');
  const vide = document.getElementById('vide');
  const filtres = document.getElementById('filtres');
  champ.value = etat.q;

  Object.keys(TAGS).forEach(tag => {
    const b = el('button', 'filtre', TAGS[tag].label);
    b.type = 'button';
    b.setAttribute('aria-pressed', String(etat.regimes.has(tag)));
    b.addEventListener('click', () => {
      const actif = b.getAttribute('aria-pressed') !== 'true';
      b.setAttribute('aria-pressed', String(actif));
      if (actif) etat.regimes.add(tag); else etat.regimes.delete(tag);
      afficher();
    });
    filtres.append(b);
  });

  function afficher() {
    const profil = lireProfil();
    const mots = normaliser(etat.q).split(/\s+/).filter(Boolean);

    const correspondantes = RECETTES.filter(r => {
      for (const t of etat.regimes) {
        if (!r.tags.includes(t)) return false;
      }
      const texte = normaliser([r.titre, r.description, ...r.ingredients, ...r.tags.map(t => TAGS[t].label)].join(' '));
      return mots.every(m => texte.includes(m));
    });
    const visibles = correspondantes.filter(r => !contientAllergene(r, profil));
    const masquees = correspondantes.length - visibles.length;

    zone.replaceChildren(...visibles.map(ligne));

    let message = visibles.length
      ? pluriel(visibles.length, 'recette') + ' trouvée' + (visibles.length > 1 ? 's' : '') + '.'
      : 'Aucune recette trouvée.';
    if (masquees) {
      message += ' ' + pluriel(masquees, 'recette') + ' masquée' + (masquees > 1 ? 's' : '') + ' selon tes allergies.';
    }
    compte.textContent = message;

    if (visibles.length) {
      vide.hidden = true;
    } else {
      vide.hidden = false;
      vide.textContent = masquees
        ? 'Les recettes correspondantes contiennent un ingrédient que tu évites. Tu peux modifier tes allergies dans ton profil.'
        : 'Essaie un autre mot-clé ou retire un filtre.';
    }
  }

  champ.addEventListener('input', () => {
    etat.q = champ.value;
    afficher();
  });
  document.querySelector('[role="search"]').addEventListener('submit', e => e.preventDefault());

  afficher();
}

/* ---------- Détail d'une recette ---------- */

function bloc(titre, ...contenus) {
  const s = el('section', 'bloc');
  s.append(el('h2', null, titre), ...contenus);
  return s;
}

function initRecette() {
  const id = new URLSearchParams(location.search).get('id');
  const recette = recetteParId(id);
  const zone = document.getElementById('detail');
  const hero = document.getElementById('hero');

  if (!recette) {
    document.title = 'Recette introuvable — Yumnote';
    hero.hidden = true;
    const retour = el('a', 'btn', 'Retour à l’accueil');
    retour.href = 'index.html';
    zone.append(el('h1', null, 'Recette introuvable'), el('p', null, 'Cette recette n’existe pas ou a été retirée.'), retour);
    return;
  }

  document.title = recette.titre + ' — Yumnote';

  const image = document.getElementById('visuel');
  image.setAttribute('aria-label', 'Illustration : ' + recette.titre.toLowerCase());
  document.getElementById('visuel-emoji').textContent = recette.emoji;

  const infos = el('ul', 'infos');
  const temps = el('li');
  const chipTemps = el('span', 'chip chip--menthe');
  chipTemps.append(icone('clock'), recette.temps + ' min');
  temps.append(chipTemps);
  const nb = el('li');
  const chipNb = el('span', 'chip chip--corail');
  chipNb.append(icone('list'), pluriel(recette.ingredients.length, 'ingrédient'));
  nb.append(chipNb);
  infos.append(temps, nb);
  recette.tags.forEach(t => {
    const li = el('li');
    li.append(pastille(t));
    infos.append(li);
  });

  const ingredients = el('ul');
  recette.ingredients.forEach(t => ingredients.append(el('li', null, t)));
  const blocIngredients = bloc('Ingrédients', ingredients);
  if (recette.allergenes.length) {
    blocIngredients.append(el('p', 'allergenes',
      'Allergènes repérés : ' + recette.allergenes.map(a => ALLERGENES[a].label.toLowerCase()).join(', ') + '.'));
  }

  const etapes = el('ol');
  recette.etapes.forEach(t => etapes.append(el('li', null, t)));

  zone.append(
    el('h1', null, recette.titre),
    infos,
    bloc('Description', el('p', null, recette.description)),
    blocIngredients,
    bloc('Préparation', etapes)
  );

  /* Favori */
  const bouton = document.getElementById('fav');
  const statut = document.getElementById('statut');

  function majFavori(actif) {
    bouton.setAttribute('aria-pressed', String(actif));
    bouton.setAttribute('aria-label', actif ? 'Retirer des favoris' : 'Ajouter aux favoris');
  }

  majFavori(lireFavoris().includes(recette.id));

  bouton.addEventListener('click', () => {
    const favoris = new Set(lireFavoris());
    const actif = !favoris.has(recette.id);
    if (actif) {
      favoris.add(recette.id);
    } else {
      favoris.delete(recette.id);
      retirerDesCollections(recette.id);
    }
    STORE.ecrire('favoris', [...favoris]);
    majFavori(actif);
    statut.textContent = actif ? 'Recette ajoutée aux favoris.' : 'Recette retirée des favoris.';
  });
}

/* ---------- Favoris et collections ---------- */

function initFavoris() {
  const listeFavoris = document.getElementById('liste-favoris');
  const videFavoris = document.getElementById('vide-favoris');
  const listeCollections = document.getElementById('liste-collections');
  const videCollections = document.getElementById('vide-collections');
  const statut = document.getElementById('statut');

  const dlgAjout = document.getElementById('dlg-ajout');
  const ajoutRecette = document.getElementById('dlg-ajout-recette');
  const ajoutListe = document.getElementById('dlg-ajout-liste');
  const ajoutForm = document.getElementById('dlg-ajout-form');
  const ajoutNom = document.getElementById('dlg-ajout-nom');
  const ajoutErreur = document.getElementById('dlg-ajout-erreur');

  const dlgNouvelle = document.getElementById('dlg-nouvelle');
  const nouvelleForm = document.getElementById('dlg-nouvelle-form');
  const nouvelleNom = document.getElementById('dlg-nouvelle-nom');
  const nouvelleErreur = document.getElementById('dlg-nouvelle-erreur');
  const annulerNouvelle = document.getElementById('dlg-nouvelle-annuler');
  const boutonNouvelle = document.getElementById('btn-nouvelle');

  const ouvertes = new Set();
  let recetteEnCours = null;

  /* Liste des favoris */
  function ligneFavori(recette, i) {
    const li = el('li', 'fav ' + (i % 2 === 0 ? 'ton-corail' : 'ton-menthe'));
    const a = el('a');
    a.href = lienRecette(recette);
    const corps = el('span');
    corps.append(el('span', 'tt', recette.titre), etiquettes(recette));
    a.append(visuel(recette, 'th', true), corps);

    const b = el('button', 'btn-rond');
    b.type = 'button';
    b.dataset.ajout = recette.id;
    b.setAttribute('aria-label', 'Ajouter ' + recette.titre + ' à une collection');
    b.append(icone('folder-plus'));
    b.addEventListener('click', () => ouvrirAjout(recette));

    li.append(a, b);
    return li;
  }

  /* Collections */
  function carteCollection(collection) {
    const recettes = collection.recettes.map(recetteParId).filter(Boolean);
    const d = el('details', 'collection');
    d.dataset.id = collection.id;
    d.open = ouvertes.has(collection.id);
    d.addEventListener('toggle', () => {
      if (d.open) ouvertes.add(collection.id); else ouvertes.delete(collection.id);
    });

    const s = el('summary');
    const texte = el('span');
    texte.append(el('span', 'collection__nom', collection.nom), el('span', 'collection__nb', pluriel(recettes.length, 'recette')));
    if (recettes.length) {
      const apercu = el('span', 'collection__apercu');
      apercu.setAttribute('aria-hidden', 'true');
      recettes.slice(0, 4).forEach(r => apercu.append(el('span', 'mini', r.emoji)));
      texte.append(apercu);
    }
    const chevron = icone('chevron-right');
    chevron.classList.add('collection__chevron');
    s.append(texte, chevron);

    const corps = el('div', 'collection__corps');
    if (recettes.length) {
      const ul = el('ul');
      recettes.forEach(r => {
        const li = el('li');
        const a = el('a');
        a.href = lienRecette(r);
        a.append(visuel(r, 'th', true), r.titre);
        const retirer = el('button', 'btn-rond');
        retirer.type = 'button';
        retirer.setAttribute('aria-label', 'Retirer ' + r.titre + ' de la collection ' + collection.nom);
        retirer.append(icone('x'));
        retirer.addEventListener('click', () => {
          const toutes = lireCollections();
          const cible = toutes.find(c => c.id === collection.id);
          if (cible) cible.recettes = cible.recettes.filter(x => x !== r.id);
          ecrireCollections(toutes);
          rendre();
          statut.textContent = r.titre + ' retiré de ' + collection.nom + '.';
          const resume = document.querySelector('details[data-id="' + collection.id + '"] summary');
          if (resume) resume.focus();
        });
        li.append(a, retirer);
        ul.append(li);
      });
      corps.append(ul);
    } else {
      corps.append(el('p', 'aide-dlg', 'Cette collection est vide. Utilise le bouton dossier d’un favori pour y ajouter des recettes.'));
    }

    const supprimer = el('button', 'btn-ligne');
    supprimer.type = 'button';
    supprimer.append(icone('x'), 'Supprimer la collection');
    supprimer.addEventListener('click', () => {
      ecrireCollections(lireCollections().filter(c => c.id !== collection.id));
      ouvertes.delete(collection.id);
      rendre();
      statut.textContent = 'Collection « ' + collection.nom + ' » supprimée. Les recettes restent dans tes favoris.';
      boutonNouvelle.focus();
    });
    corps.append(supprimer);

    d.append(s, corps);
    return d;
  }

  function rendre() {
    const favoris = lireFavoris().map(recetteParId);
    listeFavoris.replaceChildren(...favoris.map(ligneFavori));
    videFavoris.hidden = favoris.length > 0;

    const collections = lireCollections();
    listeCollections.replaceChildren(...collections.map(carteCollection));
    videCollections.hidden = collections.length > 0;
  }

  /* Ajouter une recette à une collection */
  function rendreAjout() {
    const collections = lireCollections();
    ajoutListe.replaceChildren();
    if (!collections.length) {
      ajoutListe.append(el('p', 'aide-dlg', 'Tu n’as pas encore de collection. Crée la première ci-dessous.'));
    }
    collections.forEach(c => {
      const label = el('label', 'choix');
      const input = el('input');
      input.type = 'checkbox';
      input.checked = c.recettes.includes(recetteEnCours.id);
      input.addEventListener('change', () => {
        const toutes = lireCollections();
        const cible = toutes.find(x => x.id === c.id);
        if (!cible) return;
        if (input.checked) {
          if (!cible.recettes.includes(recetteEnCours.id)) cible.recettes.push(recetteEnCours.id);
        } else {
          cible.recettes = cible.recettes.filter(x => x !== recetteEnCours.id);
        }
        ecrireCollections(toutes);
        rendre();
        statut.textContent = input.checked
          ? recetteEnCours.titre + ' ajouté à ' + c.nom + '.'
          : recetteEnCours.titre + ' retiré de ' + c.nom + '.';
      });
      label.append(input, c.nom);
      ajoutListe.append(label);
    });
  }

  function ouvrirAjout(recette) {
    recetteEnCours = recette;
    ajoutRecette.textContent = recette.titre;
    ajoutErreur.textContent = '';
    ajoutNom.value = '';
    rendreAjout();
    dlgAjout.showModal();
  }

  dlgAjout.addEventListener('close', () => {
    if (!recetteEnCours) return;
    const b = document.querySelector('[data-ajout="' + recetteEnCours.id + '"]');
    if (b) b.focus();
  });

  ajoutForm.addEventListener('submit', e => {
    e.preventDefault();
    const nom = ajoutNom.value.trim();
    if (!nom) {
      ajoutErreur.textContent = 'Erreur : donne un nom à ta collection.';
      ajoutNom.focus();
      return;
    }
    if (nomDeCollectionExiste(nom)) {
      ajoutErreur.textContent = 'Erreur : une collection porte déjà ce nom.';
      ajoutNom.focus();
      return;
    }
    creerCollection(nom, [recetteEnCours.id]);
    ajoutErreur.textContent = '';
    ajoutNom.value = '';
    rendreAjout();
    rendre();
    statut.textContent = 'Collection « ' + nom + ' » créée avec ' + recetteEnCours.titre + '.';
  });

  /* Nouvelle collection vide */
  boutonNouvelle.addEventListener('click', () => {
    nouvelleNom.value = '';
    nouvelleErreur.textContent = '';
    dlgNouvelle.showModal();
  });

  annulerNouvelle.addEventListener('click', () => dlgNouvelle.close());

  dlgNouvelle.addEventListener('close', () => boutonNouvelle.focus());

  nouvelleForm.addEventListener('submit', e => {
    e.preventDefault();
    const nom = nouvelleNom.value.trim();
    if (!nom) {
      nouvelleErreur.textContent = 'Erreur : donne un nom à ta collection.';
      nouvelleNom.focus();
      return;
    }
    if (nomDeCollectionExiste(nom)) {
      nouvelleErreur.textContent = 'Erreur : une collection porte déjà ce nom.';
      nouvelleNom.focus();
      return;
    }
    creerCollection(nom, []);
    dlgNouvelle.close();
    rendre();
    statut.textContent = 'Collection « ' + nom + ' » créée.';
  });

  rendre();
}

/* ---------- Profil ---------- */

function initProfil() {
  const profil = lireProfil();
  const statut = document.getElementById('statut');

  function enregistrer() {
    STORE.ecrire('profil', profil);
    statut.textContent = 'Profil enregistré.';
  }

  /* Icône */
  const avatar = document.getElementById('avatar');
  const emoji = document.getElementById('avatar-emoji');

  function majAvatar() {
    const a = AVATARS.find(x => x.id === profil.avatar) || AVATARS[2];
    emoji.textContent = a.emoji;
    avatar.style.background = a.fond;
    avatar.setAttribute('aria-label', 'Icône de profil actuelle : ' + a.nom.toLowerCase());
  }

  const zoneIcones = document.getElementById('icones');
  AVATARS.forEach(a => {
    const label = el('label', 'icone');
    const input = el('input');
    input.type = 'radio';
    input.name = 'avatar';
    input.value = a.id;
    input.checked = a.id === profil.avatar;
    input.setAttribute('aria-label', a.nom);
    const rond = el('span', 'icone__rond', a.emoji);
    rond.style.background = a.fond;
    rond.setAttribute('aria-hidden', 'true');
    label.append(input, rond);
    zoneIcones.append(label);
    input.addEventListener('change', () => {
      profil.avatar = a.id;
      majAvatar();
      enregistrer();
    });
  });
  majAvatar();

  /* Pseudo et bio */
  const pseudo = document.getElementById('pseudo');
  const bio = document.getElementById('bio');
  pseudo.value = profil.pseudo;
  bio.value = profil.bio;
  pseudo.addEventListener('change', () => { profil.pseudo = pseudo.value.trim(); enregistrer(); });
  bio.addEventListener('change', () => { profil.bio = bio.value.trim(); enregistrer(); });

  /* Allergies et régimes */
  function options(zoneId, cles, table, cleProfil) {
    const zone = document.getElementById(zoneId);
    cles.forEach(cle => {
      const label = el('label', 'option');
      const input = el('input');
      input.type = 'checkbox';
      input.value = cle;
      input.checked = profil[cleProfil].includes(cle);
      label.append(input, table[cle].label);
      zone.append(label);
    });
    zone.addEventListener('change', () => {
      profil[cleProfil] = [...zone.querySelectorAll('input:checked')].map(i => i.value);
      enregistrer();
    });
  }

  /* Thème de couleurs */
  const zoneThemes = document.getElementById('themes');
  if (!THEMES) {
    zoneThemes.append(el('p', 'vide', 'Les thèmes sont indisponibles (theme.json introuvable). Ouvre le site avec un serveur local.'));
  } else {
    const actuel = themeChoisi();
    THEMES.themes.forEach(theme => {
      const label = el('label', 'option');
      const input = el('input');
      input.type = 'radio';
      input.name = 'theme';
      input.value = theme.id;
      input.checked = theme.id === actuel.id;

      const texte = el('span', 'option__texte');
      texte.append(el('span', null, theme.nom), el('span', 'option__desc', theme.description || ''));

      const nuancier = el('span', 'nuancier');
      nuancier.setAttribute('aria-hidden', 'true');
      ['principal', 'principal-vif', 'teinte-moyenne', 'accent-clair'].forEach(cle => {
        const nuance = el('span', 'nuance');
        nuance.style.background = theme.couleurs[cle];
        nuancier.append(nuance);
      });

      input.addEventListener('change', () => {
        appliquerTheme(theme);
        STORE.ecrire('theme', theme.id);
        statut.textContent = 'Thème « ' + theme.nom + ' » appliqué.';
      });

      label.append(input, texte, nuancier);
      zoneThemes.append(label);
    });
  }

  options('allergies', Object.keys(ALLERGENES), ALLERGENES, 'allergies');
  options('regimes', Object.keys(TAGS), TAGS, 'regimes');
}

/* ---------- Démarrage ---------- */

/* Dernier thème utilisé, appliqué sans attendre */
appliquerThemeEnCache();

document.addEventListener('DOMContentLoaded', async () => {
  injecterIcones();
  const page = document.body.dataset.page;

  /* Thème de couleurs : si theme.json est introuvable, les couleurs par défaut du CSS restent en place. */
  try {
    await chargerThemes();
    appliquerTheme(themeChoisi());
  } catch (e) {
    THEMES = null;
  }

  /* La page Profil n'a pas besoin des recettes : elle fonctionne même si le chargement échoue. */
  let pret = true;
  if (page !== 'profil') {
    try {
      await chargerRecettes();
      migrerAnciensIds();
    } catch (e) {
      pret = false;
      afficherErreurChargement();
    }
  }

  const pages = {
    accueil: initAccueil,
    recherche: initRecherche,
    recette: initRecette,
    favoris: initFavoris,
    profil: initProfil
  };
  const init = pages[page];
  if (pret && init) init();
  retourDepuisHistorique();
});
