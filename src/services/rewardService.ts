
import { UserProfile, GameResult } from '@/types/game';

export class RewardService {
  private static readonly DESTINY_REWARDS: Record<string, { nz: number; usd: number; isWinner: boolean }> = {
    'end_roi_suprême': { nz: 100000, usd: 1000, isWinner: true },
    'end_héros_martyr': { nz: 50000, usd: 500, isWinner: true },
    'end_marchand_d_influence': { nz: 75000, usd: 750, isWinner: true },
    'end_chef_de_guerre': { nz: 60000, usd: 600, isWinner: true },
    'end_guérisseur_éternel': { nz: 40000, usd: 400, isWinner: true },
    'end_traître_banni': { nz: 0, usd: 0, isWinner: false },
    'end_voyageur_sans_fin': { nz: 30000, usd: 300, isWinner: true }
  };

  private static readonly DESTINY_TITLES: Record<string, string> = {
    'end_roi_suprême': 'Roi Suprême d\'Ubuntara',
    'end_héros_martyr': 'Héros Martyr de la Liberté',
    'end_marchand_d_influence': 'Maître de l\'Ombre Économique',
    'end_chef_de_guerre': 'Chef de Guerre Légendaire',
    'end_guérisseur_éternel': 'Guérisseur Éternel des Âmes',
    'end_traître_banni': 'Traître Banni dans l\'Ombre',
    'end_voyageur_sans_fin': 'Voyageur Sage Sans Fin'
  };

  static calculateGameResult(currentNode: string, userProfile: UserProfile): GameResult {
    const reward = this.DESTINY_REWARDS[currentNode];
    const title = this.DESTINY_TITLES[currentNode];

    if (!reward || !title) {
      return {
        isWinner: false,
        nzimbu_reward: 0,
        usd_equivalent: 0,
        destiny_title: 'Destin Inconnu'
      };
    }

    return {
      isWinner: reward.isWinner,
      nzimbu_reward: reward.nz,
      usd_equivalent: reward.usd,
      destiny_title: title
    };
  }

  static checkChoiceRequirements(choice: any, userStats: any): boolean {
    if (!choice.requirements) return true;

    for (const [stat, required] of Object.entries(choice.requirements)) {
      if (userStats[stat] < required) {
        return false;
      }
    }
    return true;
  }
}
