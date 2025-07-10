import { StoryData, ShopItems, UserProfile, DailyWinner } from '@/types/game';

// Histoire étendue avec 30 étapes et textes enrichis
const defaultStoryData: StoryData = {
  "title": "Ubuntara – La Conquête du Jour",
  "description": "De ta naissance à ton destin final, chaque décision façonnera l'histoire de ta vie dans le royaume d'Ubuntara.",
  "start": "1",
  "nodes": {
    "1": {
      "title": "Étape 1 : Ta Naissance - Les Présages",
      "text": "Tu viens de naître dans le royaume d'Ubuntara. Les sages lisent les étoiles et voient des présages contradictoires. Dans la case de terre battue où tu pousses tes premiers cris, les anciens murmurent des prophéties. Certains parlent d'un futur roi, d'autres d'un grand guérisseur. Quelle sera la première influence de ta vie, celle qui marquera à jamais ton destin ?",
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
      "text": "À 7 ans, tu dois choisir ton premier apprentissage. Dans la cour de terre rouge d'Ubuntara, les maîtres se disputent pour t'enseigner leurs arts. Ton père t'observe avec fierté tandis que ta mère prie les ancêtres. Cette décision marquera tes premières compétences et ta vision du monde. Les tambours résonnent au loin, comme pour souligner l'importance de ce moment.",
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
      "text": "À 14 ans, un conflit éclate dans ton village. Les huttes brûlent, les femmes pleurent, les hommes brandissent leurs lances. C'est ton premier vrai test face à l'adversité. Tes mains tremblent mais ton cœur bat fort. Tu sens le poids des regards sur toi - certains espèrent, d'autres doutent. Comment vas-tu prouver ta valeur dans cette épreuve de feu ?",
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
      "text": "Tu as maintenant 21 ans. Le roi d'Ubuntara meurt sans héritier direct. Les tambours de deuil résonnent pendant des jours entiers. Le royaume sombre dans le chaos - les nobles se disputent, les marchés ferment, la peur règne. Dans cette confusion générale, tu sens que ton heure approche. Quelle voie choisis-tu pour saisir ta destinée ?",
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
      "text": "Tes actions ont attiré l'attention. Tu contrôles maintenant une petite région - trois villages et un marché. Les habitants te regardent avec espoir et crainte. Certains voient en toi un libérateur, d'autres un opportuniste. Tu tiens entre tes mains l'avenir de milliers de personnes. Comment vas-tu consolider ce pouvoir naissant et prouver que tu mérites leur confiance ?",
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
      "text": "Ton plus proche conseiller, celui qui partageait tes repas et connaissait tes secrets, te trahit. Il s'allie à tes ennemis en échange d'or et de promesses. La nouvelle te frappe comme un coup de massue. Tes autres conseillers te regardent, guettant ta réaction. Cette crise majeure teste ta capacité de leadership et ta sagesse. Comment réagis-tu face à cette trahison qui ébranle les fondements de ton pouvoir ?",
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
      "text": "Trois royaumes voisins proposent une alliance contre l'ennemi commun qui menace tous vos territoires. Les ambassadeurs arrivent avec leurs cortèges, leurs présents et leurs calculs. Chacun des trois rois veut être le leader de cette coalition. Les négociations se déroulent dans ta grande case, autour du feu sacré. Quelle stratégie adoptes-tu dans cette délicate partie d'échecs politique ?",
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
      "text": "L'heure de la grande bataille a sonné. Ton armée fait face à l'ennemi dans la plaine de Bakongo, là où les ancêtres ont jadis combattu. Le soleil se lève rouge comme le sang qui va bientôt couler. Tes guerriers scandent ton nom, leurs boucliers brillent, leurs lances pointent vers le ciel. Le sort d'Ubuntara se joue maintenant. Comment mènes-tu tes troupes vers la victoire ou vers la gloire ?",
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
      "text": "La guerre est finie, mais Ubuntara ressemble à un champ de bataille. Les villages sont en ruines, les greniers vides, les familles brisées. Cependant, tu as maintenant la possibilité de façonner l'avenir du royaume selon ta vision. Les survivants te regardent avec des yeux pleins d'espoir et d'épuisement. Quelle sera ta priorité pour reconstruire ce royaume meurtri ?",
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
      "text": "Dix années ont passé sous ton règne. Tu es maintenant un leader expérimenté, tes tempes grisonnent et ton regard s'est endurci. Une terrible sécheresse menace ton peuple - les rivières tarissent, les récoltes brûlent sous le soleil implacable. Les mères pleurent, les enfants maigrissent. C'est l'épreuve ultime de ton leadership. Comment sauves-tu ton peuple de cette catastrophe naturelle ?",
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
      "text": "Tes enfants atteignent l'âge adulte et revendiquent leur part d'héritage. Chacun a développé sa personnalité, ses ambitions, ses talents. L'aîné rêve de conquêtes, le cadet préfère le commerce, ta fille unique maîtrise la diplomatie. Leurs ambitions rivales menacent l'unité de ton royaume. Les conseillers se divisent, prenant parti pour l'un ou l'autre. Comment gères-tu cette crise familiale qui pourrait détruire tout ce que tu as bâti ?",
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
      "text": "Une faction de nobles se soulève contre ton autorité. Ils t'accusent d'être devenu tyrannique avec l'âge, de ne plus écouter le peuple. Leurs bannières claquent au vent, leurs guerriers campent aux portes de ta capitale. Le royaume se divise - certains villages rejoignent la rébellion, d'autres te restent fidèles. Cette guerre civile menace de détruire Ubuntara. Quelle est ta réponse face à cette remise en question de ton règne ?",
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
      "text": "Les années ont passé et tu ressens le poids de l'âge. Tes articulations craquent, ta vue baisse, mais ton esprit reste vif. Une nouvelle génération de dirigeants émerge partout en Afrique. Ils utilisent de nouvelles méthodes, parlent de nouvelles idées. Tu te demandes quelle trace tu laisseras dans l'histoire. Comment veux-tu être perçu par les générations futures ?",
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
      "text": "Un empire étranger aux technologies avancées menace d'envahir Ubuntara. Leurs navires apparaissent à l'horizon, leurs armes crachent le feu et la mort. C'est peut-être ton dernier grand défi en tant que dirigeant. Tous tes choix passés, toute ton expérience convergent vers ce moment crucial. Comment affrontes-tu cette menace existentielle qui pourrait effacer ton royaume de la carte ?",
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
      "text": "Dans cette heure sombre, tu consultes les ancêtres à travers les rituels sacrés. Les tambours battent toute la nuit, l'encens monte vers les étoiles. Dans tes visions, les esprits de tes aïeux apparaissent, chacun portant les marques de leurs propres batailles. Leur message résonne dans ton cœur vieillissant, te rappelant les valeurs éternelles qui transcendent les époques.",
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
      "text": "L'invasion est proche. Tes conseillers se disputent sur la stratégie, les généraux préparent leurs armes, les prêtres prient sans relâche. En tant que dirigeant vieillissant, tu sens que ton dernier grand choix approche. Tes mains tremblent légèrement, mais ton regard reste ferme. L'histoire d'Ubuntara attend ta décision finale.",
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
      "text": "Le moment décisif est arrivé. Tous tes choix passés, tes investissements, tes alliances et tes ennemis convergent vers cet instant unique. Le destin d'Ubuntara et le tien ne font plus qu'un. Les tambours de guerre résonnent, les cornes sonnent, le sort en est jeté. C'est l'heure où les légendes naissent ou meurent.",
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
      "text": "Tes actions résonnent à travers Ubuntara comme le tonnerre après l'éclair. Le royaume tremble sous le poids de tes décisions. Certains villages célèbrent, d'autres pleurent. Les marchés se vident ou débordent selon les régions. L'histoire se souviendra-t-elle de toi ? Et si oui, comment ? Le temps seul le dira, mais déjà les premiers récits se propagent de bouche à oreille.",
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
      "title": "Étape 19 : Le Jugement des Pairs",
      "text": "Les autres dirigeants d'Afrique se réunissent pour juger tes actions. Assis en cercle sous le grand baobab sacré, ils débattent de ton héritage. Certains te défendent, d'autres t'accusent. Leurs voix s'élèvent dans la nuit chaude. Ton nom traverse les frontières, porté par les griots et les marchands. Que disent-ils de toi autour des feux de camp ?",
      "choices": [
        { "text": "\"Il était un visionnaire incompris\"", "next": "20" },
        { "text": "\"Sa méthode était brutale mais efficace\"", "next": "20" },
        { "text": "\"Il a sacrifié sa vie pour son peuple\"", "next": "20" },
        { "text": "\"Son règne apportait prospérité et ordre\"", "next": "20" },
        { "text": "\"Il a préservé nos traditions ancestrales\"", "next": "20" },
        { "text": "\"Son ambition a détruit plus qu'elle n'a construit\"", "next": "20" },
        { "text": "\"Il était à la hauteur des défis de son époque\"", "next": "20" }
      ]
    },
    "20": {
      "title": "Étape 20 : Le Jugement Final",
      "text": "Au seuil de ton destin ultime, tu regardes le chemin parcouru. De l'enfant que tu étais au dirigeant que tu es devenu, chaque choix t'a mené ici. Les étoiles brillent au-dessus d'Ubuntara comme elles brillaient le jour de ta naissance. Le cercle se referme. Il est temps de sceller ton destin pour l'éternité.",
      "choices": [
        { "text": "\"Je regrette mes erreurs mais assume mes choix\"", "next": "21" },
        { "text": "\"J'ai fait ce qui était nécessaire pour mon peuple\"", "next": "21" },
        { "text": "\"Le pouvoir m'a corrompu mais m'a aussi révélé\"", "next": "21" },
        { "text": "\"J'aurais dû écouter davantage les sages conseils\"", "next": "21" },
        { "text": "\"La guerre était inévitable, j'ai fait de mon mieux\"", "next": "21" },
        { "text": "\"Mes ennemis avaient parfois raison de me craindre\"", "next": "21" },
        { "text": "\"L'histoire jugera, pas moi\"", "next": "21" }
      ]
    },
    "21": {
      "title": "Étape 21 : La Révélation Mystique",
      "text": "Dans tes derniers instants de lucidité, une vision s'impose à toi. Les ancêtres d'Ubuntara se dressent en cercle autour de toi, leurs visages graves mais bienveillants. Ils murmurent des secrets oubliés, des vérités que seuls les mourants peuvent entendre. Cette révélation transforme ta compréhension de tout ce qui s'est passé.",
      "choices": [
        { "text": "Accepter la sagesse des ancêtres", "next": "22" },
        { "text": "Questionner leurs enseignements", "next": "22" },
        { "text": "Demander le pardon pour tes fautes", "next": "22" },
        { "text": "Revendiquer tes accomplissements", "next": "22" },
        { "text": "Transmettre un dernier message", "next": "22" },
        { "text": "Garder le silence et méditer", "next": "22" },
        { "text": "Défier le jugement divin", "next": "22" }
      ]
    },
    "22": {
      "title": "Étape 22 : L'Héritage Éternel",
      "text": "Tes dernières paroles résonnent encore quand ton souffle s'arrête. Mais ta mort n'est que le début d'une nouvelle existence. Ton esprit se détache de ton corps usé et observe le royaume que tu laisses derrière toi. Que vois-tu ? Qu'as-tu réellement accompli ? L'éternité t'attend, mais sous quelle forme ?",
      "choices": [
        { "text": "Un royaume unifié et prospère", "next": "23" },
        { "text": "Un peuple libre et éduqué", "next": "23" },
        { "text": "Des traditions préservées et transmises", "next": "23" },
        { "text": "Une économie florissante", "next": "23" },
        { "text": "Des alliances durables avec les voisins", "next": "23" },
        { "text": "Un système de lois justes", "next": "23" },
        { "text": "Un chaos qu'il faudra réparer", "next": "23" }
      ]
    },
    "23": {
      "title": "Étape 23 : Le Tribunal des Esprits",
      "text": "Dans l'au-delà, tu comparais devant le tribunal des esprits ancestraux. Chacun de tes actes est pesé, chaque décision analysée. Les grands rois du passé siègent en jury. Ils examinent non seulement tes réussites, mais aussi tes intentions, tes sacrifices, tes moments de faiblesse et de grandeur.",
      "choices": [
        { "text": "Plaider pour tes bonnes intentions", "next": "24" },
        { "text": "Assumer pleinement tes échecs", "next": "24" },
        { "text": "Mettre en avant tes réalisations", "next": "24" },
        { "text": "Demander une seconde chance", "next": "24" },
        { "text": "Accepter le verdict sans broncher", "next": "24" },
        { "text": "Contester la légitimité du tribunal", "next": "24" },
        { "text": "Offrir de réparer tes erreurs", "next": "24" }
      ]
    },
    "24": {
      "title": "Étape 24 : La Métamorphose Spirituelle",
      "text": "Le verdict tombe. Selon tes actions et tes choix de vie, ton esprit subit une transformation. Tu sens ton essence se modifier, prendre une nouvelle forme adaptée à ce que tu es vraiment devenu au fil de ton existence. Cette métamorphose déterminera ton rôle dans l'éternité.",
      "choices": [
        { "text": "Devenir un esprit protecteur du royaume", "next": "25" },
        { "text": "Se réincarner en sage conseiller", "next": "25" },
        { "text": "Rejoindre les ancêtres glorieux", "next": "25" },
        { "text": "Errer en tant qu'âme tourmentée", "next": "25" },
        { "text": "Fusionner avec l'esprit de la terre", "next": "25" },
        { "text": "Devenir gardien des secrets mystiques", "next": "25" },
        { "text": "Être condamné à observer sans agir", "next": "25" }
      ]
    },
    "25": {
      "title": "Étape 25 : L'Influence Posthume",
      "text": "Même mort, ton influence continue de se faire sentir. Tes successeurs s'inspirent de tes méthodes ou les rejettent violemment. Les générations suivantes se réfèrent à ton règne comme à un âge d'or ou à une période sombre. Ton nom devient synonyme de certaines valeurs, positives ou négatives.",
      "choices": [
        { "text": "Inspirer de futurs leaders vertueux", "next": "26" },
        { "text": "Servir d'exemple de ce qu'il ne faut pas faire", "next": "26" },
        { "text": "Devenir une figure légendaire ambiguë", "next": "26" },
        { "text": "Être oublié par l'histoire officielle", "next": "26" },
        { "text": "Créer un mouvement posthume en ton honneur", "next": "26" },
        { "text": "Voir tes œuvres détruites par tes ennemis", "next": "26" },
        { "text": "Influencer secrètement les événements", "next": "26" }
      ]
    },
    "26": {
      "title": "Étape 26 : La Légende Vivante",
      "text": "Cent ans après ta mort, ton histoire se raconte encore. Mais comme toutes les légendes, elle s'est transformée, embellie ou noircie selon les narrateurs. Les griots chantent tes exploits, les mères racontent tes histoires à leurs enfants. Es-tu devenu un héros mythique ou un cautionnaire tale ?",
      "choices": [
        { "text": "Un héros invincible aux exploits magnifiés", "next": "27" },
        { "text": "Un roi sage dont on cite les maximes", "next": "27" },
        { "text": "Un tyran cruel qui fait peur aux enfants", "next": "27" },
        { "text": "Un personnage complexe et fascinant", "next": "27" },
        { "text": "Une figure romantique idéalisée", "next": "27" },
        { "text": "Un symbole politique utilisé par tous", "next": "27" },
        { "text": "Un mystère historique aux versions contradictoires", "next": "27" }
      ]
    },
    "27": {
      "title": "Étape 27 : L'Écho Éternel",
      "text": "Ton nom résonne encore dans l'Ubuntara moderne. Des statues s'érigent en ton honneur ou sont abattues par tes détracteurs. Des rues portent ton nom, des livres content ton histoire. Tu es devenu partie intégrante de l'identité culturelle du royaume. Mais quelle partie de toi a vraiment survécu au temps ?",
      "choices": [
        { "text": "Tes idéaux et tes valeurs", "next": "28" },
        { "text": "Tes innovations et réformes", "next": "28" },
        { "text": "Tes erreurs comme leçons", "next": "28" },
        { "text": "Ta détermination et ton courage", "next": "28" },
        { "text": "Tes mystères et tes secrets", "next": "28" },
        { "text": "Ta capacité à rassembler", "next": "28" },
        { "text": "Ton refus des compromis", "next": "28" }
      ]
    },
    "28": {
      "title": "Étape 28 : La Rédemption Ultime",
      "text": "Au seuil de l'éternité absolue, une dernière opportunité se présente. Tu peux racheter tes fautes passées, corriger une injustice, ou au contraire aggraver ton cas par orgueil. C'est ton dernier choix conscient avant de rejoindre le grand mystère. Que choisis-tu pour clore définitivement ton histoire ?",
      "choices": [
        { "text": "Demander pardon à ceux que j'ai blessés", "next": "29" },
        { "text": "Bénir ceux qui continuent mon œuvre", "next": "29" },
        { "text": "Révéler la vérité sur mes motivations", "next": "29" },
        { "text": "Transmettre ma sagesse aux vivants", "next": "29" },
        { "text": "Accepter mes fautes sans excuses", "next": "29" },
        { "text": "Revendiquer mes accomplissements", "next": "29" },
        { "text": "Me fondre dans l'éternité en silence", "next": "29" }
      ]
    },
    "29": {
      "title": "Étape 29 : La Transformation Finale",
      "text": "Ton essence se prépare à sa métamorphose ultime. Toute ta vie, tous tes choix convergent vers cet instant de vérité absolue. Tu sens ton être se purifier ou se corrompre définitivement selon le chemin que tu as tracé. C'est le moment de la transformation finale qui déterminera ton destin éternel.",
      "choices": [
        { "text": "Ascension vers la lumière divine", "next": "30" },
        { "text": "Retour à la terre comme esprit protecteur", "next": "30" },
        { "text": "Errance éternelle entre les mondes", "next": "30" },
        { "text": "Fusion avec l'âme collective d'Ubuntara", "next": "30" },
        { "text": "Réincarnation immédiate en nouveau dirigeant", "next": "30" },
        { "text": "Bannissement dans les ténèbres éternelles", "next": "30" },
        { "text": "Dissolution dans le néant absolu", "next": "30" }
      ]
    },
    "30": {
      "title": "Étape 30 : L'Ultime Destinée",
      "text": "Le moment est venu. Ton parcours de vie touche à sa fin, mais ton héritage façonnera l'avenir d'Ubuntara pour l'éternité. Devant toi s'ouvrent les portes de ton destin final. Chaque choix que tu as fait, chaque bataille que tu as menée, chaque âme que tu as touchée t'a mené à cet instant suprême. Quel sera ton destin final ?",
      "choices": [
        { "text": "Régner éternellement comme Roi Suprême", "next": "end_roi_suprême", "requirements": { "savoir": 40, "force": 35, "charisme": 45, "esprit": 40, "fortune": 30 } },
        { "text": "Mourir en héros pour sauver ton royaume", "next": "end_héros_martyr", "requirements": { "force": 30, "charisme": 25, "esprit": 35 } },
        { "text": "Devenir le maître secret de l'économie", "next": "end_marchand_d_influence", "requirements": { "savoir": 35, "charisme": 30, "fortune": 40 } },
        { "text": "Être couronné Chef de Guerre légendaire", "next": "end_chef_de_guerre", "requirements": { "force": 45, "charisme": 30, "savoir": 25 } },
        { "text": "Transcender comme Guérisseur Éternel", "next": "end_guérisseur_éternel", "requirements": { "esprit": 45, "savoir": 30, "charisme": 25 } },
        { "text": "Être banni pour tes crimes et trahisons", "next": "end_traître_banni" },
        { "text": "Partir en Voyageur sans fin, libre et sage", "next": "end_voyageur_sans_fin", "requirements": { "esprit": 35, "savoir": 30 } }
      ]
    },
    "end_roi_suprême": {
      "title": "Destin Final : Roi Suprême d'Ubuntara",
      "text": "Ton règne s'achève dans la gloire éternelle. Tu as unifié Ubuntara sous ta couronne et ton nom résonnera à travers les âges comme celui du plus grand roi que le royaume ait connu. Tes statues orneront les places publiques et tes lois guideront les générations futures. Tu es devenu una légende vivante, le Roi Suprême d'Ubuntara pour l'éternité.",
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
      "text": "Tu as refusé le pouvoir ultime pour embrasser la liberté absolue. Devanu un voyageur sage, tu parcours les routes d'Afrique, partageant ta sagesse et tes histoires. Ton renoncement au trône t'a libéré des chaînes du pouvoir et tu es devenu une légende vivante de la sagesse. Les jeunes dirigeants cherchent tes conseils et ton nom est synonyme de liberté spirituelle.",
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
