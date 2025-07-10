import { StoryData, ShopItems, UserProfile, DailyWinner } from '@/types/game';

// Données par défaut (simulant les fichiers JSON)
const defaultStoryData: StoryData = {
  "title": "Ubuntara – La Conquête du Jour",
  "description": "De ta naissance à ton destin final, chaque décision façonnera l'histoire de ta vie dans le royaume d'Ubuntara.",
  "start": "1",
  "nodes": {
    "1": {
      "title": "Étape 1 : Ta Naissance - Les Présages",
      "text": "Tu viens de naître dans le royaume d'Ubuntara. Les sages lisent les étoiles et voient des présages contradictoires. Quelle sera la première influence de ta vie ?",
      "choices": [
        { "text": "Naître dans une famille de guerriers", "next": "2" },
        { "text": "Naître chez les marchands prospères", "next": "2" },
        { "text": "Naître parmi les guérisseurs mystiques", "next": "2" },
        { "text": "Naître dans une famille de paysans", "next": "2" },
        { "text": "Être adopté par les prêtres", "next": "2" },
        { "text": "Grandir dans la rue comme orphelin", "next": "2" },
        { "text": "Naître dans la famille royale déchue", "next": "2" }
      ]
    },
    "2": {
      "title": "Étape 2 : L'Enfance - Premier Apprentissage",
      "text": "À 7 ans, tu dois choisir ton premier apprentissage. Cette décision marquera tes premières compétences et ta vision du monde.",
      "choices": [
        { "text": "Apprendre l'art de la guerre", "next": "3" },
        { "text": "Étudier les langues et l'écriture", "next": "3" },
        { "text": "Maîtriser le commerce et les chiffres", "next": "3" },
        { "text": "Découvrir les plantes et la médecine", "next": "3" },
        { "text": "Comprendre les rituels ancestraux", "next": "3" },
        { "text": "Apprendre la diplomatie et l'éloquence", "next": "3" },
        { "text": "Survivre par tes propres moyens", "next": "3" }
      ]
    },
    "3": {
      "title": "Étape 3 : L'Adolescence - Le Premier Défi",
      "text": "À 14 ans, un conflit éclate dans ton village. C'est ton premier vrai test face à l'adversité. Comment réagis-tu ?",
      "choices": [
        { "text": "Prendre les armes pour défendre les tiens", "next": "4" },
        { "text": "Négocier une trêve entre les factions", "next": "4" },
        { "text": "Organiser l'évacuation des civils", "next": "4" },
        { "text": "Chercher des alliés dans les villages voisins", "next": "4" },
        { "text": "Utiliser la ruse pour diviser l'ennemi", "next": "4" },
        { "text": "Fuir pour préserver ta vie", "next": "4" },
        { "text": "Défier le chef ennemi en duel", "next": "4" }
      ]
    },
    "4": {
      "title": "Étape 4 : L'Âge Adulte - L'Appel du Destin",
      "text": "Tu as maintenant 21 ans. Le roi d'Ubuntara meurt sans héritier direct. Le royaume sombre dans le chaos. Quelle voie choisis-tu ?",
      "choices": [
        { "text": "Revendiquer le trône par le droit du sang", "next": "5" },
        { "text": "Rassembler une armée de libération", "next": "5" },
        { "text": "Créer une alliance marchande puissante", "next": "5" },
        { "text": "Établir un conseil de sages pour gouverner", "next": "5" },
        { "text": "Partir en quête d'un héritier légitime", "next": "5" },
        { "text": "Profiter du chaos pour t'enrichir", "next": "5" },
        { "text": "Te retirer dans la contemplation spirituelle", "next": "5" }
      ]
    },
    "5": {
      "title": "Étape 5 : La Première Conquête",
      "text": "Tes actions ont attiré l'attention. Tu contrôles maintenant une petite région. Comment consolides-tu ton pouvoir naissant ?",
      "choices": [
        { "text": "Construire des fortifications imprenables", "next": "6" },
        { "text": "Établir des routes commerciales prospères", "next": "6" },
        { "text": "Former une garde d'élite loyale", "next": "6" },
        { "text": "Créer des écoles pour éduquer le peuple", "next": "6" },
        { "text": "Bâtir des temples pour unir les croyances", "next": "6" },
        { "text": "Corrompre tes rivaux avec de l'or", "next": "6" },
        { "text": "Épouser dans une famille puissante", "next": "6" }
      ]
    },
    "6": {
      "title": "Étape 6 : L'Épreuve de la Trahison",
      "text": "Ton plus proche conseiller te trahit et s'allie à tes ennemis. Cette crise majeure teste ta capacité de leadership. Comment réagis-tu ?",
      "choices": [
        { "text": "Exécuter le traître publiquement", "next": "7" },
        { "text": "Lui pardonner pour montrer ta magnanimité", "next": "7" },
        { "text": "Le bannir mais épargner sa famille", "next": "7" },
        { "text": "Retourner sa trahison contre tes ennemis", "next": "7" },
        { "text": "Examiner tes propres erreurs de jugement", "next": "7" },
        { "text": "Purger tous les suspects de ton entourage", "next": "7" },
        { "text": "Feindre l'ignorance et préparer ta vengeance", "next": "7" }
      ]
    },
    "7": {
      "title": "Étape 7 : La Grande Alliance",
      "text": "Trois royaumes voisins proposent une alliance contre l'ennemi commun. Chacun veut être le leader de cette coalition. Quelle stratégie adoptes-tu ?",
      "choices": [
        { "text": "Revendiquer le commandement par la force", "next": "8" },
        { "text": "Proposer un partage équitable du pouvoir", "next": "8" },
        { "text": "Accepter un rôle de conseiller influent", "next": "8" },
        { "text": "Semer la discorde entre tes 'alliés'", "next": "8" },
        { "text": "Négocier secrètement avec l'ennemi", "next": "8" },
        { "text": "Refuser l'alliance et rester indépendant", "next": "8" },
        { "text": "Proposer ton mariage pour sceller l'union", "next": "8" }
      ]
    },
    "8": {
      "title": "Étape 8 : La Bataille Décisive",
      "text": "L'heure de la grande bataille a sonné. Ton armée fait face à l'ennemi dans la plaine de Bakongo. Le sort d'Ubuntara se joue maintenant.",
      "choices": [
        { "text": "Mener la charge depuis le front", "next": "9" },
        { "text": "Diriger stratégiquement depuis l'arrière", "next": "9" },
        { "text": "Utiliser une tactique de guerrilla", "next": "9" },
        { "text": "Défier le chef ennemi en combat singulier", "next": "9" },
        { "text": "Tenter une négociation de dernière minute", "next": "9" },
        { "text": "Employer des mercenaires et des assassins", "next": "9" },
        { "text": "Invoquer les ancêtres pour obtenir leur aide", "next": "9" }
      ]
    },
    "9": {
      "title": "Étape 9 : L'Après-Guerre",
      "text": "La guerre est finie, mais Ubuntara est en ruines. Tu as la possibilité de façonner l'avenir du royaume. Quelle sera ta priorité ?",
      "choices": [
        { "text": "Reconstruire l'armée pour de futures conquêtes", "next": "10" },
        { "text": "Investir dans l'économie et le commerce", "next": "10" },
        { "text": "Guérir les blessures par la réconciliation", "next": "10" },
        { "text": "Établir des lois justes et durables", "next": "10" },
        { "text": "Développer les arts et la culture", "next": "10" },
        { "text": "Éliminer tous les opposants potentiels", "next": "10" },
        { "text": "Préparer ta succession pour l'avenir", "next": "10" }
      ]
    },
    "10": {
      "title": "Étape 10 : L'Âge de la Maturité",
      "text": "Dix années ont passé sous ton règne. Tu es maintenant un leader expérimenté face à une nouvelle crise : une terrible sécheresse menace ton peuple.",
      "choices": [
        { "text": "Organiser des expéditions vers des terres fertiles", "next": "11" },
        { "text": "Rationner les ressources équitablement", "next": "11" },
        { "text": "Conquérir les territoires voisins pour leurs réserves", "next": "11" },
        { "text": "Investir dans des projets d'irrigation massifs", "next": "11" },
        { "text": "Organiser des rituels pour implorer la pluie", "next": "11" },
        { "text": "Vendre une partie du territoire pour acheter des vivres", "next": "11" },
        { "text": "Demander l'aide humanitaire des royaumes alliés", "next": "11" }
      ]
    },
    "11": {
      "title": "Étape 11 : L'Héritage en Question",
      "text": "Tes enfants atteignent l'âge adulte et revendiquent leur part d'héritage. Leurs ambitions rivales menacent l'unité de ton royaume.",
      "choices": [
        { "text": "Diviser le royaume entre tes héritiers", "next": "12" },
        { "text": "Désigner un seul successeur par mérite", "next": "12" },
        { "text": "Organiser un tournoi pour départager tes enfants", "next": "12" },
        { "text": "Régner encore 10 ans pour les former", "next": "12" },
        { "text": "Abdiquer en faveur du peuple souverain", "next": "12" },
        { "text": "Bannir les plus ambitieux pour préserver la paix", "next": "12" },
        { "text": "Marier tes enfants à des dynasties étrangères", "next": "12" }
      ]
    },
    "12": {
      "title": "Étape 12 : La Rébellion Intérieure",
      "text": "Une faction de nobles se soulève contre ton autorité, accusant ton règne d'être devenu tyrannique. Le royaume se divise. Quelle est ta réponse ?",
      "choices": [
        { "text": "Écraser la rébellion sans pitié", "next": "13" },
        { "text": "Négocier des réformes avec les rebelles", "next": "13" },
        { "text": "Abdiquer pour éviter la guerre civile", "next": "13" },
        { "text": "Rallier le peuple contre les nobles", "next": "13" },
        { "text": "Fuir en exil avec tes fidèles", "next": "13" },
        { "text": "Proposer un duel avec le chef rebelle", "next": "13" },
        { "text": "Feindre la mort pour observer tes ennemis", "next": "13" }
      ]
    },
    "13": {
      "title": "Étape 13 : L'Épreuve du Temps",
      "text": "Les années ont passé et tu ressens le poids de l'âge. Une nouvelle génération de dirigeants émerge. Comment veux-tu être perçu par l'histoire ?",
      "choices": [
        { "text": "Comme un conquérant qui a unifié les terres", "next": "14" },
        { "text": "Comme un sage qui a apporté la prospérité", "next": "14" },
        { "text": "Comme un libérateur qui a affranchi le peuple", "next": "14" },
        { "text": "Comme un bâtisseur qui a créé des merveilles", "next": "14" },
        { "text": "Comme un tyran redoutable mais efficace", "next": "14" },
        { "text": "Comme un mystique qui a communié avec les ancêtres", "next": "14" },
        { "text": "Peu importe, seuls les résultats comptent", "next": "14" }
      ]
    },
    "14": {
      "title": "Étape 14 : L'Ultime Défi",
      "text": "Un empire étranger menace d'envahir Ubuntara. C'est peut-être ton dernier grand défi en tant que dirigeant. Comment affrontes-tu cette menace existentielle ?",
      "choices": [
        { "text": "Mobiliser toutes tes forces pour la bataille finale", "next": "15" },
        { "text": "Chercher une solution diplomatique honorable", "next": "15" },
        { "text": "Organiser une résistance de guérilla", "next": "15" },
        { "text": "Sacrifier ta vie pour inspirer ton peuple", "next": "15" },
        { "text": "Négocier secrètement ta reddition", "next": "15" },
        { "text": "Evacuer ton peuple vers des terres sûres", "next": "15" },
        { "text": "Utiliser des armes interdites par désespoir", "next": "15" }
      ]
    },
    "15": {
      "title": "Étape 15 : La Sagesse des Anciens",
      "text": "Dans cette heure sombre, tu consultes les ancêtres à travers les rituels sacrés. Leur message résonne dans ton cœur vieillissant.",
      "choices": [
        { "text": "\"La force réside dans l'unité du peuple\"", "next": "16" },
        { "text": "\"La vraie victoire est celle de l'esprit\"", "next": "16" },
        { "text": "\"Parfois, il faut savoir plier pour ne pas rompre\"", "next": "16" },
        { "text": "\"L'héritage vaut plus que la vie d'un homme\"", "next": "16" },
        { "text": "\"La vengeance nourrit la vengeance\"", "next": "16" },
        { "text": "\"Chaque fin est un nouveau commencement\"", "next": "16" },
        { "text": "\"Les dieux décident, les hommes exécutent\"", "next": "16" }
      ]
    },
    "16": {
      "title": "Étape 16 : Le Choix du Crépuscule",
      "text": "L'invasion est proche. Tes conseillers se disputent sur la stratégie. En tant que dirigeant vieillissant, ton dernier grand choix approche.",
      "choices": [
        { "text": "Passer le commandement à la jeune génération", "next": "17" },
        { "text": "Mener personnellement une dernière charge", "next": "17" },
        { "text": "Utiliser ta fortune pour corrompre l'ennemi", "next": "17" },
        { "text": "Révéler un secret d'État qui peut tout changer", "next": "17" },
        { "text": "Organiser ton propre assassinat pour devenir martyr", "next": "17" },
        { "text": "Partir seul négocier avec le chef ennemi", "next": "17" },
        { "text": "Détruire tout plutôt que de le laisser à l'ennemi", "next": "17" }
      ]
    },
    "17": {
      "title": "Étape 17 : L'Heure de Vérité",
      "text": "Le moment décisif est arrivé. Tous tes choix passés, tes investissements, tes alliances et tes ennemis convergent vers cet instant unique.",
      "choices": [
        { "text": "Révéler ta véritable identité secrète", "next": "18" },
        { "text": "Utiliser l'artefact légendaire caché", "next": "18" },
        { "text": "Invoquer un pacte ancien avec les esprits", "next": "18" },
        { "text": "Déclencher le plan secret préparé depuis des années", "next": "18" },
        { "text": "Accepter ton destin avec dignité", "next": "18" },
        { "text": "Tout miser sur un coup de bluff ultime", "next": "18" },
        { "text": "Laisser le hasard décider par un duel", "next": "18" }
      ]
    },
    "18": {
      "title": "Étape 18 : Les Conséquences",
      "text": "Tes actions résonnent à travers Ubuntara. Le royaume tremble sous le poids de tes décisions. L'histoire se souviendra-t-elle de toi ?",
      "choices": [
        { "text": "Comme d'un héros qui a sauvé son peuple", "next": "19" },
        { "text": "Comme d'un leader qui a unifié les tribus", "next": "19" },
        { "text": "Comme d'un tyran qui a imposé l'ordre", "next": "19" },
        { "text": "Comme d'un sage qui a préservé la paix", "next": "19" },
        { "text": "Comme d'un fou qui a détruit l'ancien monde", "next": "19" },
        { "text": "Comme d'un lâche qui a fui ses responsabilités", "next": "19" },
        { "text": "Comme d'une légende dont on murmure le nom", "next": "19" }
      ]
    },
    "19": {
      "title": "Étape 19 : Le Jugement Final",
      "text": "Au seuil de ton destin ultime, tu regardes le chemin parcouru. De l'enfant que tu étais au dirigeant que tu es devenu, chaque choix t'a mené ici.",
      "choices": [
        { "text": "\"Je regrette mes erreurs mais assume mes choix\"", "next": "20" },
        { "text": "\"J'ai fait ce qui était nécessaire pour mon peuple\"", "next": "20" },
        { "text": "\"Le pouvoir m'a corrompu mais m'a aussi révélé\"", "next": "20" },
        { "text": "\"J'aurais dû écouter davantage les sages conseils\"", "next": "20" },
        { "text": "\"La guerre était inévitable, j'ai fait de mon mieux\"", "next": "20" },
        { "text": "\"Mes ennemis avaient parfois raison de me craindre\"", "next": "20" },
        { "text": "\"L'histoire jugera, pas moi\"", "next": "20" }
      ]
    },
    "20": {
      "title": "Étape 20 : L'Ultime Destinée",
      "text": "Le moment est venu. Ton parcours de vie touche à sa fin, mais ton héritage façonnera l'avenir d'Ubuntara. Quel sera ton destin final ?",
      "choices": [
        { "text": "Régner éternellement comme Roi Suprême", "next": "end_roi_suprême" },
        { "text": "Mourir en héros pour sauver ton royaume", "next": "end_héros_martyr" },
        { "text": "Devenir le maître secret de l'économie", "next": "end_marchand_d_influence" },
        { "text": "Être couronné Chef de Guerre légendaire", "next": "end_chef_de_guerre" },
        { "text": "Transcender comme Guérisseur Éternel", "next": "end_guérisseur_éternel" },
        { "text": "Être banni pour tes crimes et trahisons", "next": "end_traître_banni" },
        { "text": "Partir en Voyageur sans fin, libre et sage", "next": "end_voyageur_sans_fin" }
      ]
    },
    "end_roi_suprême": {
      "title": "Destin Final : Roi Suprême d'Ubuntara",
      "text": "Ton règne s'achève dans la gloire éternelle. Tu as unifié Ubuntara sous ta couronne et ton nom résonnera à travers les âges comme celui du plus grand roi que le royaume ait connu. Tes statues orneront les places publiques et tes lois guideront les générations futures. Tu es devenu une légende vivante, le Roi Suprême d'Ubuntara pour l'éternité.",
      "choices": []
    },
    "end_héros_martyr": {
      "title": "Destin Final : Héros Martyr de la Liberté",
      "text": "Tu t'es sacrifié pour ton peuple dans un geste d'héroïsme ultime. Ta mort héroïque a inspiré une résistance qui a libéré Ubuntara de ses oppresseurs. Ton nom est chanté dans toutes les chaumières et ton sacrifice a donné naissance à une nouvelle ère de liberté. Les enfants apprennent ton histoire et les poètes composent des épopées sur ton courage légendaire.",
      "choices": []
    },
    "end_marchand_d_influence": {
      "title": "Destin Final : Maître de l'Ombre Économique",
      "text": "Sans couronne ni titre officiel, tu contrôles secrètement l'économie d'Ubuntara et des royaumes voisins. Tes réseaux commerciaux s'étendent sur tout le continent et les rois eux-mêmes dépendent de tes décisions financières. Tu es devenu l'homme le plus puissant d'Afrique, tirant les ficelles depuis l'ombre avec une fortune qui dépasse celle des empires.",
      "choices": []
    },
    "end_chef_de_guerre": {
      "title": "Destin Final : Chef de Guerre Légendaire",
      "text": "Tes victoires militaires ont forgé ta légende à travers tout le continent. Aucune armée n'ose te défier et ton nom seul suffit à faire trembler tes ennemis. Tu as conquis des territoires vastes comme des océans et établi un empire militaire qui perdurera des siècles. Les académies militaires enseignent tes stratégies et les généraux invoquent ton nom avant chaque bataille.",
      "choices": []
    },
    "end_guérisseur_éternel": {
      "title": "Destin Final : Guérisseur Éternel des Âmes",
      "text": "Tu as transcendé les ambitions terrestres pour devenir un guérisseur légendaire des corps et des âmes. Ton savoir mystique a sauvé des milliers de vies et apaisé les conflits les plus anciens. Même sans trône, tu es vénéré comme un sage divin. Ton temple est devenu un lieu de pèlerinage où les affligés trouvent la paix et les dirigeants cherchent la sagesse.",
      "choices": []
    },
    "end_traître_banni": {
      "title": "Destin Final : Traître Banni dans l'Ombre",
      "text": "Tes trahisons et ta soif aveugle de pouvoir t'ont valu l'exil définitif. Chassé d'Ubuntara, tu erres de royaume en royaume, fuyant ta réputation sulfureuse. Tes anciens sujets ont effacé ton nom des chroniques officielles et tes descendants ont changé d'identité pour échapper à ta honte. Tu es devenu l'exemple même de ce qu'un dirigeant ne doit jamais devenir.",
      "choices": []
    },
    "end_voyageur_sans_fin": {
      "title": "Destin Final : Voyageur Sage Sans Fin",
      "text": "Tu as refusé le pouvoir ultime pour embrasser la liberté absolue. Devenu un voyageur sage, tu parcours les routes d'Afrique, partageant ta sagesse et tes histoires. Ton renoncement au trône t'a libéré des chaînes du pouvoir et tu es devenu une légende vivante de la sagesse. Les jeunes dirigeants cherchent tes conseils et ton nom est synonyme de liberté spirituelle.",
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
