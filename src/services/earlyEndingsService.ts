
export interface EarlyEnding {
  id: string;
  title: string;
  description: string;
  trigger_step: number; // À quelle étape cela peut se déclencher
  required_path: number[]; // Séquence de choix nécessaire
  is_death: boolean;
  nz_reward: number;
  usd_equivalent: number;
}

export class EarlyEndingsService {
  private static earlyEndings: EarlyEnding[] = [
    {
      id: "early_death_1",
      title: "Mort Tragique",
      description: "Votre témérité vous a coûté la vie. L'aventure se termine brutalement dans les ténèbres.",
      trigger_step: 5,
      required_path: [0, 1, 0, 2, 1],
      is_death: true,
      nz_reward: 0,
      usd_equivalent: 0
    },
    {
      id: "early_prison_1", 
      title: "Emprisonnement",
      description: "Vos actions vous ont mené en prison. Vous passez des années à regretter vos choix.",
      trigger_step: 8,
      required_path: [1, 2, 1, 0, 2, 1, 0, 3],
      is_death: false,
      nz_reward: 0,
      usd_equivalent: 0
    },
    {
      id: "early_exile_1",
      title: "Exil Forcé",
      description: "Banni de votre terre natale, vous errez sans but vers un avenir incertain.",
      trigger_step: 12,
      required_path: [2, 0, 3, 1, 2, 0, 1, 2, 3, 0, 1, 2],
      is_death: false,
      nz_reward: 5,
      usd_equivalent: 0.1
    },
    {
      id: "early_madness_1",
      title: "Folie",
      description: "L'esprit brisé par les épreuves, vous sombrez dans la démence.",
      trigger_step: 15,
      required_path: [3, 3, 3, 2, 2, 1, 0, 4, 3, 2, 1, 0, 4, 3, 2],
      is_death: false,
      nz_reward: 0,
      usd_equivalent: 0
    },
    {
      id: "early_betrayal_1",
      title: "Trahison Fatale",
      description: "Trahi par vos plus proches alliés, vous chutez de votre piédestal.",
      trigger_step: 20,
      required_path: [1, 3, 2, 4, 0, 2, 1, 3, 4, 2, 0, 1, 3, 2, 4, 1, 0, 2, 3, 1],
      is_death: false,
      nz_reward: 10,
      usd_equivalent: 0.2
    }
  ];

  static checkForEarlyEnding(currentStep: number, playerPath: number[]): EarlyEnding | null {
    for (const ending of this.earlyEndings) {
      if (ending.trigger_step === currentStep && 
          playerPath.length >= ending.required_path.length) {
        
        // Vérifier si le chemin correspond
        const pathMatches = ending.required_path.every((choice, index) => 
          playerPath[index] === choice
        );
        
        if (pathMatches) {
          return ending;
        }
      }
    }
    return null;
  }

  static getAllEarlyEndings(): EarlyEnding[] {
    return this.earlyEndings;
  }
}
