
import { UserProfile, GameResult } from '@/types/game';
import { EndingsService } from './endingsService';
import { LotteryService } from './lotteryService';

export class RewardService {
  static calculateGameResult(currentNode: string, userProfile: UserProfile, playerChoices: number[] = []): GameResult {
    // Si on est sur un nœud de fin
    if (currentNode.startsWith('end_')) {
      const endingDetails = EndingsService.getEndingDetails(currentNode);
      
      return {
        isWinner: endingDetails.isWinner,
        nzimbu_reward: endingDetails.nz,
        usd_equivalent: endingDetails.usd,
        destiny_title: endingDetails.title
      };
    }

    // Si on arrive à la fin du parcours (étape 30), déterminer le destin
    if (playerChoices.length === 30) {
      const endingKey = EndingsService.determineEnding(playerChoices);
      const endingDetails = EndingsService.getEndingDetails(endingKey);
      
      // Si c'est le roi suprême, enregistrer le gagnant
      if (endingKey === 'end_roi_suprême') {
        LotteryService.registerWinner(userProfile.user_id, userProfile.username);
      }
      
      return {
        isWinner: endingDetails.isWinner,
        nzimbu_reward: endingDetails.nz,
        usd_equivalent: endingDetails.usd,
        destiny_title: endingDetails.title
      };
    }

    // Parcours en cours
    return {
      isWinner: false,
      nzimbu_reward: 0,
      usd_equivalent: 0,
      destiny_title: 'Parcours en cours...'
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

  // Obtient les infos du gagnant du jour
  static getTodaysWinner(): { userId: string; username: string; date: string } | null {
    return LotteryService.getTodaysWinner();
  }

  // Vérifie si quelqu'un a déjà gagné aujourd'hui
  static hasWinnerToday(): boolean {
    return LotteryService.hasWinnerToday();
  }

  // Obtient la signature du chemin gagnant (pour debug)
  static getWinningPathSignature(): string {
    return LotteryService.getPathSignature();
  }

  // Statistiques du système
  static getSystemStats() {
    return EndingsService.getSystemStats();
  }
}
