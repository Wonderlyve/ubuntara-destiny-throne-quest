
const textReplacements: Record<string, string> = {
  // Common words
  'et': '&',
  'avec': 'w/',
  'sans': 'w/o',
  'pour': 'pr',
  'dans': 'ds',
  'sur': 'sr',
  'par': 'pr',
  'plus': '+',
  'très': 'très',
  'tout': 'tt',
  'tous': 'ts',
  'toute': 'tte',
  'toutes': 'ttes',
  'quelque': 'qlq',
  'quelques': 'qlqs',
  'beaucoup': 'bcp',
  'plusieurs': 'plsr',
  'maintenant': 'mnt',
  'aujourd\'hui': 'auj',
  'demain': 'dem',
  'hier': 'hier',
  'jamais': 'jms',
  'toujours': 'tjrs',
  'peut-être': 'p-ê',
  'c\'est': 'c\'est',
  'il faut': 'faut',
  'je vais': 'j\'vais',
  'tu vas': 'tu vas',
  'nous allons': 'on va',
  'vous allez': 'vs allez',
  'ils vont': 'ils vont',
  
  // Actions
  'attaquer': 'attaq',
  'défendre': 'déf',
  'négocier': 'négo',
  'explorer': 'explor',
  'chercher': 'cherch',
  'trouver': 'trouv',
  'prendre': 'prendr',
  'donner': 'donn',
  'acheter': 'achet',
  'vendre': 'vendr',
  'construire': 'constr',
  'détruire': 'détr',
  'protéger': 'protég',
  'abandonner': 'abandon',
  'continuer': 'continu',
  'arrêter': 'arrêt',
  'commencer': 'commenc',
  'finir': 'finir',
  'réussir': 'réuss',
  'échouer': 'échec',
  
  // Objects and places
  'royaume': 'roy',
  'village': 'vill',
  'forêt': 'forêt',
  'montagne': 'mont',
  'rivière': 'riv',
  'château': 'chât',
  'maison': 'mais',
  'temple': 'templ',
  'marché': 'march',
  'route': 'route',
  'chemin': 'chem',
  'porte': 'porte',
  'fenêtre': 'fenêtr',
  'trésor': 'trés',
  'argent': 'arg',
  'pierre': 'pierr',
  'bois': 'bois',
  'eau': 'eau',
  'feu': 'feu',
  'terre': 'terr',
  'air': 'air',
  
  // People and relationships
  'roi': 'roi',
  'reine': 'rein',
  'prince': 'princ',
  'princesse': 'princ',
  'seigneur': 'seign',
  'dame': 'dame',
  'guerrier': 'guerr',
  'soldat': 'sold',
  'garde': 'gard',
  'marchand': 'march',
  'paysan': 'pays',
  'enfant': 'enf',
  'famille': 'fam',
  'ami': 'ami',
  'ennemi': 'enn',
  'allié': 'allié',
  
  // Emotions and states
  'heureux': 'heur',
  'triste': 'trist',
  'en colère': 'fâché',
  'surpris': 'surpr',
  'effrayé': 'effr',
  'confiant': 'conf',
  'inquiet': 'inq',
  'fatigué': 'fatig',
  'reposé': 'repos',
  'malade': 'malad',
  'en bonne santé': 'en forme',
  'fort': 'fort',
  'faible': 'faibl',
  'intelligent': 'intel',
  'stupide': 'stup',
  'sage': 'sage',
  'fou': 'fou',
  'brave': 'brav',
  'lâche': 'lâche'
};

export function shortenChoiceText(text: string, maxLength: number = 30): string {
  if (text.length <= maxLength) {
    return text;
  }

  // First, try replacing common words
  let shortened = text;
  for (const [long, short] of Object.entries(textReplacements)) {
    if (shortened.includes(long)) {
      shortened = shortened.replace(new RegExp(long, 'gi'), short);
      if (shortened.length <= maxLength) {
        return shortened;
      }
    }
  }

  // If still too long, truncate intelligently
  if (shortened.length > maxLength) {
    // Try to cut at word boundaries
    const words = shortened.split(' ');
    let result = '';
    
    for (const word of words) {
      if ((result + ' ' + word).trim().length <= maxLength - 3) {
        result += (result ? ' ' : '') + word;
      } else {
        break;
      }
    }
    
    if (result.length > 0) {
      return result + '...';
    }
    
    // Last resort: hard truncate
    return shortened.substring(0, maxLength - 3) + '...';
  }

  return shortened;
}
