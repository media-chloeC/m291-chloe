'use strict';

const TAGS = {
  'vegetarien': { label: 'Végétarien', icone: 'leaf' },
  'sans-gluten': { label: 'Sans gluten', icone: 'wheat-off' }
};

const RECETTES = [
  {
    id: 'risotto-champignons',
    titre: 'Risotto aux champignons',
    emoji: '🍄',
    tags: ['vegetarien'],
    temps: 30,
    description: 'Un risotto crémeux aux champignons de saison, prêt en 30 minutes.',
    ingredients: ['300 g de riz arborio', '300 g de champignons de Paris', '1 oignon', '1 l de bouillon de légumes chaud', '10 cl de vin blanc', '40 g de fromage râpé', '2 c. à soupe d’huile d’olive', 'Sel et poivre'],
    etapes: ['Fais revenir l’oignon émincé dans l’huile d’olive.', 'Ajoute les champignons en lamelles et cuis 5 minutes.', 'Verse le riz, remue 1 minute, puis déglace au vin blanc.', 'Ajoute le bouillon louche par louche en remuant, pendant environ 18 minutes.', 'Hors du feu, incorpore le fromage, sale et poivre.']
  },
  {
    id: 'tarte-poireaux',
    titre: 'Tarte aux poireaux',
    emoji: '🥧',
    tags: ['vegetarien'],
    temps: 45,
    description: 'Une tarte salée fondante, parfaite pour un repas simple.',
    ingredients: ['1 pâte brisée', '4 poireaux', '20 cl de crème', '3 œufs', '100 g de fromage râpé', 'Sel, poivre et muscade'],
    etapes: ['Préchauffe le four à 200 °C et garnis un moule avec la pâte.', 'Émince les poireaux et fais-les fondre 10 minutes à la poêle.', 'Mélange les œufs, la crème, le fromage et les épices.', 'Répartis les poireaux sur la pâte, verse l’appareil et cuis 30 minutes.']
  },
  {
    id: 'curry-veggie',
    titre: 'Curry veggie',
    emoji: '🍛',
    tags: ['vegetarien', 'sans-gluten'],
    temps: 35,
    description: 'Un curry de légumes au lait de coco, servi avec du riz basmati.',
    ingredients: ['1 petit chou-fleur', '1 patate douce', '400 ml de lait de coco', '2 c. à soupe de pâte de curry (vérifie l’étiquette)', '200 g de riz basmati', '1 oignon'],
    etapes: ['Coupe le chou-fleur et la patate douce en morceaux.', 'Fais revenir l’oignon, ajoute la pâte de curry puis les légumes.', 'Verse le lait de coco et laisse mijoter 20 minutes.', 'Cuis le riz et sers-le avec le curry.']
  },
  {
    id: 'salade-quinoa',
    titre: 'Salade de quinoa',
    emoji: '🥗',
    tags: ['vegetarien', 'sans-gluten'],
    temps: 15,
    description: 'Une salade fraîche et rassasiante, prête en un quart d’heure.',
    ingredients: ['200 g de quinoa', '1 concombre', '2 tomates', '1 avocat', '1 citron', '3 c. à soupe d’huile d’olive', 'Quelques feuilles de menthe'],
    etapes: ['Cuis le quinoa 12 minutes dans l’eau bouillante, puis égoutte-le.', 'Coupe le concombre, les tomates et l’avocat en dés.', 'Mélange le tout avec le jus de citron, l’huile et la menthe.']
  },
  {
    id: 'soupe-potiron',
    titre: 'Soupe de potiron',
    emoji: '🎃',
    tags: ['vegetarien', 'sans-gluten'],
    temps: 40,
    description: 'Une soupe veloutée et réconfortante pour les soirs d’automne.',
    ingredients: ['800 g de potiron', '1 pomme de terre', '1 oignon', '75 cl d’eau ou de bouillon', '10 cl de crème', 'Sel et poivre'],
    etapes: ['Coupe le potiron, la pomme de terre et l’oignon en morceaux.', 'Couvre d’eau ou de bouillon et cuis 25 minutes.', 'Mixe, ajoute la crème, sale et poivre.']
  },
  {
    id: 'gratin-dauphinois',
    titre: 'Gratin dauphinois',
    emoji: '🥔',
    tags: ['vegetarien', 'sans-gluten'],
    temps: 60,
    description: 'Des pommes de terre fondantes gratinées à la crème.',
    ingredients: ['1 kg de pommes de terre', '40 cl de crème', '20 cl de lait', '1 gousse d’ail', 'Muscade, sel et poivre'],
    etapes: ['Préchauffe le four à 180 °C et frotte un plat à l’ail.', 'Coupe les pommes de terre en fines rondelles.', 'Dispose-les dans le plat et couvre avec le lait et la crème assaisonnés.', 'Cuis 50 minutes jusqu’à ce que le dessus soit doré.']
  },
  {
    id: 'poulet-citron',
    titre: 'Poulet rôti au citron',
    emoji: '🍗',
    tags: ['sans-gluten'],
    temps: 55,
    description: 'Des cuisses de poulet dorées, parfumées au citron et au thym.',
    ingredients: ['4 cuisses de poulet', '2 citrons', '4 gousses d’ail', 'Quelques brins de thym', '2 c. à soupe d’huile d’olive', 'Sel et poivre'],
    etapes: ['Préchauffe le four à 200 °C.', 'Dispose le poulet dans un plat avec l’ail, le thym et les citrons coupés.', 'Arrose d’huile, sale, poivre et enfourne 45 minutes.']
  },
  {
    id: 'saumon-papillote',
    titre: 'Saumon en papillote',
    emoji: '🐟',
    tags: ['sans-gluten'],
    temps: 25,
    description: 'Un saumon tendre cuit à la vapeur avec des légumes et de l’aneth.',
    ingredients: ['2 pavés de saumon', '1 courgette', '1 citron', 'Un peu d’aneth', '1 c. à soupe d’huile d’olive', 'Sel et poivre'],
    etapes: ['Préchauffe le four à 190 °C.', 'Place chaque pavé sur une feuille de papier cuisson avec des rondelles de courgette.', 'Ajoute citron, aneth, huile, sel et poivre, puis ferme les papillotes.', 'Cuis 15 minutes.']
  }
];

const ICONES = {
  'search': '<circle cx="11" cy="11" r="7"/><path d="m20 20-4.5-4.5"/>',
  'arrow-left': '<path d="M19 12H5"/><path d="m12 19-7-7 7-7"/>',
  'bookmark': '<path d="M6 3h12v18l-6-4-6 4z"/>',
  'user': '<circle cx="12" cy="8" r="4"/><path d="M4 21c0-4 3.6-7 8-7s8 3 8 7"/>',
  'home': '<path d="M3 11l9-8 9 8"/><path d="M5 10v10h14V10"/>',
  'book': '<path d="M4 4h10a4 4 0 0 1 4 4v12H8a4 4 0 0 1-4-4z"/><path d="M4 16a4 4 0 0 1 4-4h10"/>',
  'leaf': '<path d="M5 19C5 9 11 4 20 4c0 9-5 15-15 15z"/><path d="M5 19c3-5 6-8 10-10"/>',
  'wheat-off': '<path d="M12 21V9"/><path d="M12 9c-2.5 0-4-1.5-4-4 2.5 0 4 1.5 4 4z"/><path d="M12 9c2.5 0 4-1.5 4-4-2.5 0-4 1.5-4 4z"/><path d="M12 15c-2.5 0-4-1.5-4-4 2.5 0 4 1.5 4 4z"/><path d="M12 15c2.5 0 4-1.5 4-4-2.5 0-4 1.5-4 4z"/><path d="M4 4l16 16"/>',
  'clock': '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
  'list': '<path d="M9 6h11M9 12h11M9 18h11"/><path d="M4 6h.01M4 12h.01M4 18h.01"/>'
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
  return texte.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
}

function pluriel(n, mot) {
  return n + ' ' + mot + (n > 1 ? 's' : '');
}

function pastille(tag) {
  const p = el('span', 'tag');
  p.append(icone(TAGS[tag].icone), TAGS[tag].label);
  return p;
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
  const etiquettes = el('span', 'etiquettes');
  recette.tags.forEach(t => etiquettes.append(pastille(t)));
  corps.append(el('span', 'tt', recette.titre), etiquettes);
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
  const regimes = STORE.lire('profil', { regimes: [] }).regimes.filter(t => TAGS[t]);
  const liste = RECETTES.filter(r => regimes.every(t => r.tags.includes(t)));
  const zone = document.getElementById('recommandations');
  liste.forEach((r, i) => zone.append(carte(r, i)));

  const note = document.getElementById('note');
  if (regimes.length) {
    note.textContent = 'Selon ton profil : ' + regimes.map(t => TAGS[t].label.toLowerCase()).join(', ') + '. ';
  } else {
    note.textContent = 'Indique tes régimes alimentaires pour affiner cette sélection. ';
  }
  const lien = el('a', null, 'Modifier mon profil');
  lien.href = 'profil.html';
  note.append(lien);
}

/* ---------- Recherche ---------- */

function initRecherche() {
  const params = new URLSearchParams(location.search);
  const etat = {
    q: params.get('q') || '',
    regimes: new Set(TAGS[params.get('regime')] ? [params.get('regime')] : []),
    favoris: params.get('favoris') === '1'
  };

  const champ = document.getElementById('q');
  const compte = document.getElementById('compte');
  const zone = document.getElementById('resultats');
  const vide = document.getElementById('vide');
  const filtres = document.getElementById('filtres');
  champ.value = etat.q;

  if (etat.favoris) {
    const accueil = document.querySelector('.nv a[href="index.html"]');
    const carnet = document.getElementById('nav-carnet');
    if (accueil) accueil.removeAttribute('aria-current');
    if (carnet) carnet.setAttribute('aria-current', 'page');
  }

  function bouton(libelle, actif, quandClic) {
    const b = el('button', 'filtre', libelle);
    b.type = 'button';
    b.setAttribute('aria-pressed', String(actif));
    b.addEventListener('click', () => {
      const maintenant = b.getAttribute('aria-pressed') !== 'true';
      b.setAttribute('aria-pressed', String(maintenant));
      quandClic(maintenant);
      afficher();
    });
    return b;
  }

  Object.keys(TAGS).forEach(tag => {
    filtres.append(bouton(TAGS[tag].label, etat.regimes.has(tag), actif => {
      if (actif) etat.regimes.add(tag); else etat.regimes.delete(tag);
    }));
  });
  filtres.append(bouton('Favoris', etat.favoris, actif => { etat.favoris = actif; }));

  function afficher() {
    const favoris = new Set(STORE.lire('favoris', []));
    const mots = normaliser(etat.q).split(/\s+/).filter(Boolean);

    const trouvees = RECETTES.filter(r => {
      if (etat.favoris && !favoris.has(r.id)) return false;
      for (const t of etat.regimes) {
        if (!r.tags.includes(t)) return false;
      }
      const texte = normaliser([r.titre, r.description, ...r.ingredients, ...r.tags.map(t => TAGS[t].label)].join(' '));
      return mots.every(m => texte.includes(m));
    });

    zone.replaceChildren(...trouvees.map(ligne));
    compte.textContent = trouvees.length
      ? pluriel(trouvees.length, 'recette') + ' trouvée' + (trouvees.length > 1 ? 's' : '')
      : 'Aucune recette trouvée';

    if (trouvees.length) {
      vide.hidden = true;
    } else {
      vide.hidden = false;
      vide.textContent = etat.favoris && favoris.size === 0 && !mots.length && !etat.regimes.size
        ? 'Ton carnet est vide. Ouvre une recette et appuie sur le favori pour la garder ici.'
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

function bloc(titre, contenu) {
  const s = el('section', 'bloc');
  s.append(el('h2', null, titre), contenu);
  return s;
}

function initRecette() {
  const id = new URLSearchParams(location.search).get('id');
  const recette = RECETTES.find(r => r.id === id);
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

  const description = el('p', null, recette.description);
  const ingredients = el('ul');
  recette.ingredients.forEach(t => ingredients.append(el('li', null, t)));
  const etapes = el('ol');
  recette.etapes.forEach(t => etapes.append(el('li', null, t)));

  zone.append(
    el('h1', null, recette.titre),
    infos,
    bloc('Description', description),
    bloc('Ingrédients', ingredients),
    bloc('Préparation', etapes)
  );

  /* Favori */
  const bouton = document.getElementById('fav');
  const statut = document.getElementById('statut');

  function majFavori(actif) {
    bouton.setAttribute('aria-pressed', String(actif));
    bouton.setAttribute('aria-label', actif ? 'Retirer des favoris' : 'Ajouter aux favoris');
  }

  majFavori(STORE.lire('favoris', []).includes(recette.id));

  bouton.addEventListener('click', () => {
    const favoris = new Set(STORE.lire('favoris', []));
    const actif = !favoris.has(recette.id);
    if (actif) favoris.add(recette.id); else favoris.delete(recette.id);
    STORE.ecrire('favoris', [...favoris]);
    majFavori(actif);
    statut.textContent = actif ? 'Recette ajoutée aux favoris.' : 'Recette retirée des favoris.';
  });
}

/* ---------- Profil ---------- */

function initProfil() {
  const profil = STORE.lire('profil', { regimes: [] });
  const zone = document.getElementById('choix');
  const statut = document.getElementById('statut');

  Object.keys(TAGS).forEach(tag => {
    const label = el('label', 'choix');
    const input = el('input');
    input.type = 'checkbox';
    input.value = tag;
    input.checked = profil.regimes.includes(tag);
    label.append(input, TAGS[tag].label);
    zone.append(label);
  });

  zone.addEventListener('change', () => {
    const regimes = [...zone.querySelectorAll('input:checked')].map(i => i.value);
    STORE.ecrire('profil', { regimes });
    statut.textContent = 'Préférences enregistrées.';
  });
}

/* ---------- Démarrage ---------- */

document.addEventListener('DOMContentLoaded', () => {
  injecterIcones();
  const pages = {
    accueil: initAccueil,
    recherche: initRecherche,
    recette: initRecette,
    profil: initProfil
  };
  const init = pages[document.body.dataset.page];
  if (init) init();
  retourDepuisHistorique();
});
