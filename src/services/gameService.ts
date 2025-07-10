
import { StoryData, ShopItems, UserProfile, DailyWinner } from '@/types/game';

// Données par défaut (simulant les fichiers JSON)
const defaultStoryData: StoryData = {
  "title": "Ubuntara – La Conquête du Jour",
  "description": "Chaque décision façonnera ton destin dans cette journée décisive. Un seul trônera ce soir.",
  "start": "1",
  "nodes": {
    "1": {
      "title": "Étape 1 : Le serment mystique",
      "text": "Chaque parole peut construire un royaume ou le faire chuter.",
      "choices": [
        { "text": "Prêter serment avec honneur", "next": "2" },
        { "text": "Négocier les termes", "next": "2" },
        { "text": "Accepter avec réserve", "next": "2" },
        { "text": "Demander conseil aux anciens", "next": "2" },
        { "text": "Refuser poliment", "next": "2" },
        { "text": "Proposer une alternative", "next": "2" },
        { "text": "Garder le silence", "next": "2" }
      ]
    },
    "2": {
      "title": "Étape 2 : L'arène du destin",
      "text": "Le choix t'appelle. Une seule décision te rapprochera du trône.",
      "choices": [
        { "text": "Affronter le défi", "next": "3" },
        { "text": "Chercher des alliés", "next": "3" },
        { "text": "Étudier l'adversaire", "next": "3" },
        { "text": "Utiliser la ruse", "next": "3" },
        { "text": "Faire preuve de diplomatie", "next": "3" },
        { "text": "Attendre le bon moment", "next": "3" },
        { "text": "Abandonner l'arène", "next": "3" }
      ]
    },
    "3": {
      "title": "Étape 3 : Le serment mystique",
      "text": "Le pouvoir n'attend que les audacieux.",
      "choices": [
        { "text": "Saisir l'opportunité", "next": "end_roi_suprême" },
        { "text": "Partager le pouvoir", "next": "end_héros_martyr" },
        { "text": "Contrôler dans l'ombre", "next": "end_marchand_d_influence" },
        { "text": "Conquérir par la force", "next": "end_chef_de_guerre" },
        { "text": "Servir le peuple", "next": "end_guérisseur_éternel" },
        { "text": "Trahir pour gagner", "next": "end_traître_banni" },
        { "text": "Refuser le pouvoir", "next": "end_voyageur_sans_fin" }
      ]
    },
    "end_roi_suprême": {
      "title": "Fin : Roi suprême",
      "text": "Aujourd'hui, tu as tout conquis. Ubuntara est à tes pieds. Tu es le roi du jour.",
      "choices": []
    },
    "end_héros_martyr": {
      "title": "Fin : Héros martyr",
      "text": "Tu es tombé pour ta cause. Ton nom résonnera à travers les âges.",
      "choices": []
    },
    "end_marchand_d_influence": {
      "title": "Fin : Marchand d'influence",
      "text": "Sans couronne mais tout puissant, tu as contrôlé l'économie de l'ombre.",
      "choices": []
    },
    "end_chef_de_guerre": {
      "title": "Fin : Chef de guerre",
      "text": "Par ta lame et ton courage, tu as soumis tes rivaux.",
      "choices": []
    },
    "end_guérisseur_éternel": {
      "title": "Fin : Guérisseur éternel",
      "text": "Tu as sauvé des âmes, même sans trône, tu restes vénéré.",
      "choices": []
    },
    "end_traître_banni": {
      "title": "Fin : Traître banni",
      "text": "Ta soif de pouvoir t'a exclu. Tu vis dans l'ombre de ta trahison.",
      "choices": []
    },
    "end_voyageur_sans_fin": {
      "title": "Fin : Voyageur sans fin",
      "text": "Tu refuses le pouvoir, mais ton voyage continue dans les légendes.",
      "choices": []
    }
  }
};

const defaultShopItems: ShopItems = {
  "formations": [
    { "id": "form_1", "name": "Méditation ancestrale", "attribute": "esprit", "bonus": 5, "price_nz": 100 },
    { "id": "form_2", "name": "Camp d'élite", "attribute": "force", "bonus": 5, "price_nz": 120 },
    { "id": "form_3", "name": "Académie royale", "attribute": "savoir", "bonus": 5, "price_nz": 150 },
    { "id": "form_4", "name": "École diplomatique", "attribute": "charisme", "bonus": 5, "price_nz": 130 },
    { "id": "form_5", "name": "Trésor caché", "attribute": "fortune", "bonus": 5, "price_nz": 200 }
  ],
  "artefacts": [
    { "id": "art_1", "name": "Lame d'Onyoka", "effect": "force +10", "price_nz": 300 },
    { "id": "art_2", "name": "Sceau du pacte", "effect": "influence +10", "price_nz": 350 },
    { "id": "art_3", "name": "Amulette des ancêtres", "effect": "immunité à une mauvaise décision", "price_nz": 500 },
    { "id": "art_4", "name": "Tambour du réveil", "effect": "revenir à un choix précédent", "price_nz": 400 },
    { "id": "art_5", "name": "Coffre d'initiation", "effect": "1 artefact aléatoire", "price_nz": 250 }
  ],
  "territoires": [
    { "id": "ter_1", "name": "Village Wola", "type": "Terre agricole", "income_per_week": 50, "price_nz": 600 },
    { "id": "ter_2", "name": "Marché de Kabila", "type": "Commerce", "income_per_week": 100, "price_nz": 1200 },
    { "id": "ter_3", "name": "Forteresse de Nzaka", "type": "Militaire", "income_per_week": 75, "price_nz": 1000 },
    { "id": "ter_4", "name": "Tour spirituelle", "type": "Énergie mystique", "income_per_week": 90, "price_nz": 1100 }
  ]
};

const defaultUserProfile: UserProfile = {
  "user_id": "player_001",
  "username": "Joueur",
  "created_at": new Date().toISOString(),
  "stats": {
    "savoir": 10,
    "force": 10,
    "charisme": 10,
    "esprit": 10,
    "fortune": 10
  },
  "nzimbu_balance": 500,
  "inventory": {
    "artefacts": [],
    "formations_suivies": [],
    "territoires_possedes": []
  },
  "daily_progress": {
    "current_node": "1",
    "choices_made": []
  },
  "achievements": [],
  "has_played_today": false
};

const defaultDailyWinner: DailyWinner = {
  "date": new Date().toISOString().split('T')[0],
  "user_id": "king_ubunta001",
  "username": "RoiNtemba",
  "title": "Roi Suprême du Jour",
  "stats": {
    "savoir": 42,
    "force": 38,
    "charisme": 46,
    "esprit": 51,
    "fortune": 35
  },
  "final_path": ["1", "2", "3", "end_roi_suprême"],
  "nzimbu_reward": 100000,
  "usd_equivalent": 1000,
  "portrait_url": ""
};

export class GameService {
  private static STORAGE_KEYS = {
    STORY_DATA: 'ubuntara_story_data',
    SHOP_ITEMS: 'ubuntara_shop_items',
    USER_PROFILE: 'ubuntara_user_profile',
    DAILY_WINNER: 'ubuntara_daily_winner'
  };

  static getStoryData(): StoryData {
    const stored = localStorage.getItem(this.STORAGE_KEYS.STORY_DATA);
    return stored ? JSON.parse(stored) : defaultStoryData;
  }

  static getShopItems(): ShopItems {
    const stored = localStorage.getItem(this.STORAGE_KEYS.SHOP_ITEMS);
    return stored ? JSON.parse(stored) : defaultShopItems;
  }

  static getUserProfile(): UserProfile {
    const stored = localStorage.getItem(this.STORAGE_KEYS.USER_PROFILE);
    return stored ? JSON.parse(stored) : defaultUserProfile;
  }

  static saveUserProfile(profile: UserProfile): void {
    localStorage.setItem(this.STORAGE_KEYS.USER_PROFILE, JSON.stringify(profile));
  }

  static getDailyWinner(): DailyWinner {
    const stored = localStorage.getItem(this.STORAGE_KEYS.DAILY_WINNER);
    return stored ? JSON.parse(stored) : defaultDailyWinner;
  }

  static updateUserStats(statChanges: Partial<UserProfile['stats']>): void {
    const profile = this.getUserProfile();
    profile.stats = { ...profile.stats, ...statChanges };
    this.saveUserProfile(profile);
  }

  static updateNzimbuBalance(amount: number): boolean {
    const profile = this.getUserProfile();
    if (profile.nzimbu_balance + amount < 0) return false;
    
    profile.nzimbu_balance += amount;
    this.saveUserProfile(profile);
    return true;
  }

  static updateDailyProgress(nodeId: string, choice: string): void {
    const profile = this.getUserProfile();
    profile.daily_progress.current_node = nodeId;
    profile.daily_progress.choices_made.push(choice);
    this.saveUserProfile(profile);
  }

  static purchaseItem(itemId: string, itemType: 'formations' | 'artefacts' | 'territoires', price: number): boolean {
    const profile = this.getUserProfile();
    
    if (profile.nzimbu_balance < price) return false;
    
    profile.nzimbu_balance -= price;
    
    if (itemType === 'formations') {
      profile.inventory.formations_suivies.push(itemId);
    } else if (itemType === 'artefacts') {
      profile.inventory.artefacts.push(itemId);
    } else if (itemType === 'territoires') {
      profile.inventory.territoires_possedes.push(itemId);
    }
    
    this.saveUserProfile(profile);
    return true;
  }
}
