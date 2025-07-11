
import { GameResult } from '@/types/game';
import { LotteryService } from './lotteryService';

export class EndingsService {
  private static readonly ENDINGS: Record<string, { 
    title: string; 
    text: string; 
    nz: number; 
    usd: number; 
    isWinner: boolean;
    isTragic: boolean;
  }> = {
    // LE GRAND GAGNANT (1000$ = 100000 Nz)
    'end_roi_suprême': { 
      title: 'Roi Suprême d\'Ubuntara', 
      text: 'Tu as suivi le chemin parfait ! Ton règne s\'achève dans la gloire éternelle. Tu es le Roi Suprême d\'Ubuntara !',
      nz: 100000, usd: 1000, isWinner: true, isTragic: false 
    },

    // FINS AVEC PETITS GAINS (1-10$)
    'end_noble_guerrier': { 
      title: 'Noble Guerrier', 
      text: 'Tu as combattu avec honneur. Tes exploits militaires te valent une pension royale.',
      nz: 1000, usd: 10, isWinner: true, isTragic: false 
    },
    'end_sage_conseiller': { 
      title: 'Sage Conseiller', 
      text: 'Ta sagesse a guidé le royaume. Une rente modeste récompense tes bons conseils.',
      nz: 900, usd: 9, isWinner: true, isTragic: false 
    },
    'end_marchand_prospère': { 
      title: 'Marchand Prospère', 
      text: 'Tes talents commerciaux t\'ont enrichi. Tu conserves une partie de ta fortune.',
      nz: 800, usd: 8, isWinner: true, isTragic: false 
    },
    'end_diplomate_habile': { 
      title: 'Diplomate Habile', 
      text: 'Tes négociations ont évité bien des conflits. Une gratification t\'est accordée.',
      nz: 700, usd: 7, isWinner: true, isTragic: false 
    },
    'end_chef_village': { 
      title: 'Chef de Village Respecté', 
      text: 'Tu gouvernes un petit territoire avec sagesse. Tes sujets t\'offrent un tribut.',
      nz: 600, usd: 6, isWinner: true, isTragic: false 
    },
    'end_guérisseur_renommé': { 
      title: 'Guérisseur Renommé', 
      text: 'Tes remèdes ont sauvé des vies. Les familles te remercient modestement.',
      nz: 500, usd: 5, isWinner: true, isTragic: false 
    },
    'end_artisan_talentueux': { 
      title: 'Artisan Talentueux', 
      text: 'Tes créations sont admirées. Tu vis de ton art avec dignité.',
      nz: 400, usd: 4, isWinner: true, isTragic: false 
    },
    'end_érudit_estimé': { 
      title: 'Érudit Estimé', 
      text: 'Ton savoir éclaire les jeunes générations. L\'école te verse une allocation.',
      nz: 300, usd: 3, isWinner: true, isTragic: false 
    },
    'end_gardien_tradition': { 
      title: 'Gardien des Traditions', 
      text: 'Tu préserves la culture ancestrale. Les anciens t\'honorent d\'une offrande.',
      nz: 200, usd: 2, isWinner: true, isTragic: false 
    },
    'end_conteur_aimé': { 
      title: 'Conteur Aimé', 
      text: 'Tes histoires enchantent les foules. Quelques pièces tombent dans ton chapeau.',
      nz: 100, usd: 1, isWinner: true, isTragic: false 
    },

    // FINS TRAGIQUES (0$)
    'end_traître_banni': { 
      title: 'Traître Banni', 
      text: 'Tes trahisons t\'ont valu l\'exil définitif. Tu erres, honni de tous.',
      nz: 0, usd: 0, isWinner: false, isTragic: true 
    },
    'end_fou_du_roi': { 
      title: 'Fou du Roi Déchu', 
      text: 'L\'ambition t\'a rendu fou. Tu délires dans les cachots du palais.',
      nz: 0, usd: 0, isWinner: false, isTragic: true 
    },
    'end_assassin_raté': { 
      title: 'Assassin Raté', 
      text: 'Ton complot a échoué. Tu péris sous les lames de tes ennemis.',
      nz: 0, usd: 0, isWinner: false, isTragic: true 
    },
    'end_lâche_fuyant': { 
      title: 'Lâche Fuyant', 
      text: 'Tu as fui face au danger. Ta couardise te poursuit jusqu\'à la mort.',
      nz: 0, usd: 0, isWinner: false, isTragic: true 
    },
    'end_maudit_sorcier': { 
      title: 'Maudit par les Sorciers', 
      text: 'Ta quête de pouvoir magique t\'a consumé. Les esprits te tourmentent.',
      nz: 0, usd: 0, isWinner: false, isTragic: true 
    },
    'end_esclave_dette': { 
      title: 'Esclave de ses Dettes', 
      text: 'Tes emprunts t\'ont ruiné. Tu finis tes jours dans les mines.',
      nz: 0, usd: 0, isWinner: false, isTragic: true 
    },
    'end_pestifère_rejeté': { 
      title: 'Pestifère Rejeté', 
      text: 'Une maladie t\'a défiguré. Tu mendies aux portes de la ville.',
      nz: 0, usd: 0, isWinner: false, isTragic: true 
    },
    'end_prisonnier_guerre': { 
      title: 'Prisonnier de Guerre', 
      text: 'Capturé par l\'ennemi, tu croupis dans un cachot humide.',
      nz: 0, usd: 0, isWinner: false, isTragic: true 
    },
    'end_mendiant_déchu': { 
      title: 'Mendiant Déchu', 
      text: 'De noble devenu gueux, tu supplies dans les rues poussiéreuses.',
      nz: 0, usd: 0, isWinner: false, isTragic: true 
    },
    'end_ermite_fou': { 
      title: 'Ermite Fou', 
      text: 'Retiré du monde, tu parles aux arbres et aux pierres.',
      nz: 0, usd: 0, isWinner: false, isTragic: true 
    },

    // AUTRES FINS NEUTRES/PETITS GAINS
    'end_fermier_paisible': { 
      title: 'Fermier Paisible', 
      text: 'Tu as choisi la simplicité. Ta récolte nourrit ta famille.',
      nz: 150, usd: 1.5, isWinner: true, isTragic: false 
    },
    'end_pêcheur_rivière': { 
      title: 'Pêcheur de la Rivière', 
      text: 'Les poissons nourrissent ton village. Une vie simple mais digne.',
      nz: 120, usd: 1.2, isWinner: true, isTragic: false 
    },
    'end_berger_collines': { 
      title: 'Berger des Collines', 
      text: 'Tes troupeaux paissent en paix. La laine te rapporte quelques sous.',
      nz: 180, usd: 1.8, isWinner: true, isTragic: false 
    },
    'end_chasseur_forêt': { 
      title: 'Chasseur de la Forêt', 
      text: 'Le gibier nourrit les tiens. Tu vis libre dans les bois.',
      nz: 160, usd: 1.6, isWinner: true, isTragic: false 
    },
    'end_forgeron_village': { 
      title: 'Forgeron du Village', 
      text: 'Tes outils équipent les paysans. Un métier honorable.',
      nz: 250, usd: 2.5, isWinner: true, isTragic: false 
    },
    'end_tisserand_habile': { 
      title: 'Tisserand Habile', 
      text: 'Tes étoffes parent les nobles. Un art profitable.',
      nz: 220, usd: 2.2, isWinner: true, isTragic: false 
    },
    'end_brasseur_taverne': { 
      title: 'Brasseur de Taverne', 
      text: 'Ta bière réjouit les cœurs. Les clients payent volontiers.',
      nz: 200, usd: 2, isWinner: true, isTragic: false 
    },
    'end_musicien_cour': { 
      title: 'Musicien de Cour', 
      text: 'Tes mélodies charment la noblesse. Quelques pièces d\'or tombent.',
      nz: 350, usd: 3.5, isWinner: true, isTragic: false 
    },
    'end_scribe_lettré': { 
      title: 'Scribe Lettré', 
      text: 'Tu écris les contrats et lettres. L\'écriture nourrit son homme.',
      nz: 280, usd: 2.8, isWinner: true, isTragic: false 
    },
    'end_garde_royal': { 
      title: 'Garde Royal', 
      text: 'Tu protèges le palais avec fidélité. Une solde modeste mais régulière.',
      nz: 320, usd: 3.2, isWinner: true, isTragic: false 
    },

    // FINS TRAGIQUES SUPPLÉMENTAIRES
    'end_empoisonné_rival': { 
      title: 'Empoisonné par un Rival', 
      text: 'Ton succès a attisé la jalousie. Le poison coule dans tes veines.',
      nz: 0, usd: 0, isWinner: false, isTragic: true 
    },
    'end_noyé_rivière': { 
      title: 'Noyé dans la Rivière', 
      text: 'En fuyant tes ennemis, tu péris dans les eaux troubles.',
      nz: 0, usd: 0, isWinner: false, isTragic: true 
    },
    'end_dévoré_bêtes': { 
      title: 'Dévoré par les Bêtes', 
      text: 'Perdu dans la jungle, tu deviens la proie des fauves.',
      nz: 0, usd: 0, isWinner: false, isTragic: true 
    },
    'end_écrasé_foule': { 
      title: 'Écrasé par la Foule', 
      text: 'Ton discours a provoqué une émeute. Tu péris piétiné.',
      nz: 0, usd: 0, isWinner: false, isTragic: true 
    },
    'end_brûlé_sorcier': { 
      title: 'Brûlé comme Sorcier', 
      text: 'Accusé de magie noire, tu péris sur le bûcher.',
      nz: 0, usd: 0, isWinner: false, isTragic: true 
    },
    'end_pendu_voleur': { 
      title: 'Pendu comme Voleur', 
      text: 'Pris la main dans le sac, tu balances au bout d\'une corde.',
      nz: 0, usd: 0, isWinner: false, isTragic: true 
    },
    'end_lapidé_blasphème': { 
      title: 'Lapidé pour Blasphème', 
      text: 'Tes paroles contre les dieux t\'ont valu la mort par lapidation.',
      nz: 0, usd: 0, isWinner: false, isTragic: true 
    },
    'end_gelé_montagne': { 
      title: 'Gelé sur la Montagne', 
      text: 'En quête de pouvoir mystique, tu péris dans les neiges éternelles.',
      nz: 0, usd: 0, isWinner: false, isTragic: true 
    },
    'end_fou_solitude': { 
      title: 'Fou de Solitude', 
      text: 'L\'isolement a brisé ton esprit. Tu parles aux ombres.',
      nz: 0, usd: 0, isWinner: false, isTragic: true 
    },
    'end_maudit_ancêtres': { 
      title: 'Maudit par les Ancêtres', 
      text: 'Tes crimes ont réveillé la colère des morts. Ils te hantent.',
      nz: 0, usd: 0, isWinner: false, isTragic: true 
    },

    // FINS MOYENNES SUPPLÉMENTAIRES
    'end_chef_caravane': { 
      title: 'Chef de Caravane', 
      text: 'Tu guides les marchands sur les routes. Les dangers payent bien.',
      nz: 450, usd: 4.5, isWinner: true, isTragic: false 
    },
    'end_maître_école': { 
      title: 'Maître d\'École', 
      text: 'Tu enseignes aux enfants du royaume. Le savoir a sa récompense.',
      nz: 380, usd: 3.8, isWinner: true, isTragic: false 
    },
    'end_juge_village': { 
      title: 'Juge de Village', 
      text: 'Tu rends la justice avec équité. Les plaideurs te rémunèrent.',
      nz: 420, usd: 4.2, isWinner: true, isTragic: false 
    },
    'end_capitaine_garde': { 
      title: 'Capitaine de la Garde', 
      text: 'Tu commandes les soldats avec bravoure. Un grade qui paie.',
      nz: 480, usd: 4.8, isWinner: true, isTragic: false 
    },
    'end_négociant_soies': { 
      title: 'Négociant en Soies', 
      text: 'Tes tissus précieux enrichissent ta bourse modestement.',
      nz: 360, usd: 3.6, isWinner: true, isTragic: false 
    },
    'end_maître_forges': { 
      title: 'Maître des Forges', 
      text: 'Tes armes équipent l\'armée royale. Le métal vaut de l\'or.',
      nz: 520, usd: 5.2, isWinner: true, isTragic: false 
    },
    'end_herboriste_royal': { 
      title: 'Herboriste Royal', 
      text: 'Tes potions soignent la cour. Un art bien rémunéré.',
      nz: 340, usd: 3.4, isWinner: true, isTragic: false 
    },
    'end_architecte_temple': { 
      title: 'Architecte du Temple', 
      text: 'Tes plans glorifient les dieux. Une œuvre qui paie.',
      nz: 580, usd: 5.8, isWinner: true, isTragic: false 
    },
    'end_ambassadeur_paix': { 
      title: 'Ambassadeur de Paix', 
      text: 'Tes négociations évitent la guerre. La diplomatie rapporte.',
      nz: 650, usd: 6.5, isWinner: true, isTragic: false 
    },
    'end_chronicler_royal': { 
      title: 'Chroniqueur Royal', 
      text: 'Tu écris l\'histoire du royaume. La postérité a un prix.',
      nz: 390, usd: 3.9, isWinner: true, isTragic: false 
    }
  };

  // Calcule le total des gains possibles (doit être < 2000$)
  static getTotalPossibleWinnings(): number {
    return Object.values(this.ENDINGS)
      .filter(ending => ending.isWinner)
      .reduce((total, ending) => total + ending.usd, 0);
  }

  // Obtient une fin aléatoire (en excluant le roi suprême)
  static getRandomEnding(excludeSupreme: boolean = true): string {
    const availableEndings = Object.keys(this.ENDINGS);
    if (excludeSupreme) {
      return availableEndings.filter(key => key !== 'end_roi_suprême')[
        Math.floor(Math.random() * (availableEndings.length - 1))
      ];
    }
    return availableEndings[Math.floor(Math.random() * availableEndings.length)];
  }

  // Détermine la fin selon le parcours du joueur
  static determineEnding(playerChoices: number[]): string {
    // Vérifier d'abord si c'est le parcours gagnant ET qu'il n'y a pas déjà de gagnant
    if (LotteryService.checkWinningPath(playerChoices) && !LotteryService.hasWinnerToday()) {
      return 'end_roi_suprême';
    }

    // Sinon, attribuer une fin basée sur les stats et un peu d'aléatoire
    // Pour la démo, on utilise une distribution pondérée
    const random = Math.random();
    
    if (random < 0.3) {
      // 30% de chance de fin tragique
      const tragicEndings = Object.keys(this.ENDINGS).filter(key => 
        this.ENDINGS[key].isTragic && key !== 'end_roi_suprême'
      );
      return tragicEndings[Math.floor(Math.random() * tragicEndings.length)];
    } else {
      // 70% de chance de fin avec petit gain
      const winningEndings = Object.keys(this.ENDINGS).filter(key => 
        this.ENDINGS[key].isWinner && key !== 'end_roi_suprême'
      );
      return winningEndings[Math.floor(Math.random() * winningEndings.length)];
    }
  }

  // Obtient les détails d'une fin
  static getEndingDetails(endingKey: string): { 
    title: string; 
    text: string; 
    nz: number; 
    usd: number; 
    isWinner: boolean;
    isTragic: boolean;
  } {
    return this.ENDINGS[endingKey] || {
      title: 'Destin Inconnu',
      text: 'Ton parcours reste un mystère...',
      nz: 0,
      usd: 0,
      isWinner: false,
      isTragic: false
    };
  }

  // Obtient toutes les fins possibles
  static getAllEndings(): typeof EndingsService.ENDINGS {
    return this.ENDINGS;
  }

  // Statistiques du système
  static getSystemStats(): {
    totalEndings: number;
    winningEndings: number;
    tragicEndings: number;
    totalWinnings: number;
    maxSingleWin: number;
  } {
    const endings = Object.values(this.ENDINGS);
    return {
      totalEndings: endings.length,
      winningEndings: endings.filter(e => e.isWinner).length,
      tragicEndings: endings.filter(e => e.isTragic).length,
      totalWinnings: endings.reduce((sum, e) => sum + e.usd, 0),
      maxSingleWin: Math.max(...endings.map(e => e.usd))
    };
  }
}
