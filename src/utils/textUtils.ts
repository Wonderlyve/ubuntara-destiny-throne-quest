
// Dictionnaire de remplacement pour raccourcir les textes
const wordReplacements: { [key: string]: string } = {
  'commander': 'mener',
  'commande': 'mène',
  'commandant': 'chef',
  'commandement': 'ordre',
  'territoire': 'terre',
  'territoires': 'terres',
  'population': 'peuple',
  'populations': 'peuples',
  'situation': 'état',
  'situations': 'états',
  'décision': 'choix',
  'décisions': 'choix',
  'immédiatement': 'vite',
  'rapidement': 'vite',
  'lentement': 'doucement',
  'doucement': 'lent',
  'puissant': 'fort',
  'puissante': 'forte',
  'puissance': 'force',
  'faiblesse': 'faille',
  'faiblesses': 'failles',
  'intelligent': 'malin',
  'intelligente': 'maline',
  'intelligence': 'ruse',
  'stupide': 'bête',
  'stupidité': 'bêtise',
  'courage': 'bravoure',
  'courageux': 'brave',
  'courageuse': 'brave',
  'peureux': 'craintif',
  'peureuse': 'craintive',
  'magnifique': 'beau',
  'magnifiques': 'beaux',
  'horrible': 'laid',
  'horribles': 'laids',
  'extraordinaire': 'génial',
  'extraordinaires': 'géniaux',
  'formidable': 'super',
  'formidables': 'supers',
  'dangereux': 'risqué',
  'dangereuse': 'risquée',
  'sécurité': 'sûreté',
  'sécurisé': 'sûr',
  'sécurisée': 'sûre',
  'protection': 'garde',
  'protéger': 'garder',
  'protège': 'garde',
  'attaque': 'assaut',
  'attaquer': 'assaillir',
  'attaques': 'assauts',
  'défense': 'garde',
  'défendre': 'garder',
  'défenses': 'gardes',
  'bataille': 'combat',
  'batailles': 'combats',
  'guerre': 'conflit',
  'guerres': 'conflits',
  'guerrier': 'soldat',
  'guerriers': 'soldats',
  'armée': 'troupe',
  'armées': 'troupes',
  'général': 'chef',
  'généraux': 'chefs',
  'capitaine': 'chef',
  'capitaines': 'chefs',
  'lieutenant': 'aide',
  'lieutenants': 'aides',
  'sergent': 'garde',
  'sergents': 'gardes',
  'soldat': 'homme',
  'soldats': 'hommes',
  'espion': 'agent',
  'espions': 'agents',
  'espionnage': 'ruse',
  'information': 'info',
  'informations': 'infos',
  'renseignement': 'info',
  'renseignements': 'infos',
  'message': 'mot',
  'messages': 'mots',
  'nouvelle': 'info',
  'nouvelles': 'infos',
  'rumeur': 'bruit',
  'rumeurs': 'bruits',
  'secret': 'caché',
  'secrets': 'cachés',
  'mystère': 'énigme',
  'mystères': 'énigmes',
  'énigmatique': 'obscur',
  'mystérieux': 'obscur',
  'mystérieuse': 'obscure',
  'étrange': 'bizarre',
  'étranges': 'bizarres',
  'normal': 'simple',
  'normale': 'simple',
  'normaux': 'simples',
  'normales': 'simples',
  'habituel': 'usuel',
  'habituelle': 'usuelle',
  'habituels': 'usuels',
  'habituelles': 'usuelles',
  'inhabituel': 'rare',
  'inhabituelle': 'rare',
  'inhabituels': 'rares',
  'inhabituelles': 'rares',
  'rare': 'peu',
  'rares': 'peu',
  'commun': 'banal',
  'commune': 'banale',
  'communs': 'banals',
  'communes': 'banales',
  'ordinaire': 'banal',
  'ordinaires': 'banals',
  'spécial': 'unique',
  'spéciale': 'unique',
  'spéciaux': 'uniques',
  'spéciales': 'uniques',
  'particulier': 'unique',
  'particulière': 'unique',
  'particuliers': 'uniques',
  'particulières': 'uniques',
  'général': 'global',
  'générale': 'globale',
  'généraux': 'globaux',
  'générales': 'globales',
  'personnel': 'privé',
  'personnelle': 'privée',
  'personnels': 'privés',
  'personnelles': 'privées',
  'public': 'ouvert',
  'publique': 'ouverte',
  'publics': 'ouverts',
  'publiques': 'ouvertes',
  'privé': 'fermé',
  'privée': 'fermée',
  'privés': 'fermés',
  'privées': 'fermées',
  'ouvert': 'libre',
  'ouverte': 'libre',
  'ouverts': 'libres',
  'ouvertes': 'libres',
  'fermé': 'clos',
  'fermée': 'close',
  'fermés': 'clos',
  'fermées': 'closes',
  'libre': 'dispo',
  'libres': 'dispos',
  'occupé': 'pris',
  'occupée': 'prise',
  'occupés': 'pris',
  'occupées': 'prises',
  'disponible': 'libre',
  'disponibles': 'libres',
  'indisponible': 'pris',
  'indisponibles': 'pris'
};

export const shortenChoiceText = (text: string, maxLength: number = 30): string => {
  // Supprimer les espaces multiples et nettoyer
  let cleanText = text.trim().replace(/\s+/g, ' ');
  
  // Si le texte est déjà assez court, le retourner tel quel
  if (cleanText.length <= maxLength) {
    return cleanText;
  }
  
  // Appliquer les remplacements de mots
  Object.entries(wordReplacements).forEach(([long, short]) => {
    const regex = new RegExp(`\\b${long}\\b`, 'gi');
    cleanText = cleanText.replace(regex, short);
  });
  
  // Si c'est encore trop long, couper intelligemment
  if (cleanText.length > maxLength) {
    // Essayer de couper à un espace pour garder les mots entiers
    const words = cleanText.split(' ');
    let result = '';
    
    for (const word of words) {
      if ((result + ' ' + word).trim().length <= maxLength) {
        result = (result + ' ' + word).trim();
      } else {
        break;
      }
    }
    
    // Si on n'a pu garder aucun mot, couper brutalement
    if (result.length === 0) {
      result = cleanText.substring(0, maxLength - 3) + '...';
    }
    
    return result;
  }
  
  return cleanText;
};
