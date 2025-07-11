
export class LotteryService {
  private static readonly STORAGE_KEY = 'ubuntara_lottery_path';
  private static readonly WINNER_STORAGE_KEY = 'ubuntara_lottery_winner';
  
  // Génère une combinaison gagnante aléatoire (30 étapes, chacune avec un choix de 0-6)
  private static generateWinningPath(): number[] {
    const path: number[] = [];
    for (let i = 0; i < 30; i++) {
      path.push(Math.floor(Math.random() * 7)); // 7 choix par étape (0-6)
    }
    return path;
  }

  // Récupère ou génère la combinaison gagnante actuelle
  static getCurrentWinningPath(): number[] {
    const stored = localStorage.getItem(this.STORAGE_KEY);
    if (stored) {
      return JSON.parse(stored);
    }
    
    // Génère une nouvelle combinaison si aucune n'existe
    const newPath = this.generateWinningPath();
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(newPath));
    return newPath;
  }

  // Vérifie si le parcours du joueur correspond à la combinaison gagnante
  static checkWinningPath(playerPath: number[]): boolean {
    if (playerPath.length !== 30) return false;
    
    const winningPath = this.getCurrentWinningPath();
    return playerPath.every((choice, index) => choice === winningPath[index]);
  }

  // Vérifie si quelqu'un a déjà gagné aujourd'hui
  static hasWinnerToday(): boolean {
    const winner = localStorage.getItem(this.WINNER_STORAGE_KEY);
    if (!winner) return false;
    
    const winnerData = JSON.parse(winner);
    const today = new Date().toISOString().split('T')[0];
    return winnerData.date === today;
  }

  // Enregistre un gagnant et génère une nouvelle combinaison
  static registerWinner(userId: string, username: string): void {
    const today = new Date().toISOString().split('T')[0];
    const winnerData = {
      userId,
      username,
      date: today,
      timestamp: new Date().toISOString()
    };
    
    localStorage.setItem(this.WINNER_STORAGE_KEY, JSON.stringify(winnerData));
    
    // Génère une nouvelle combinaison gagnante
    const newPath = this.generateWinningPath();
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(newPath));
  }

  // Récupère les informations du gagnant du jour
  static getTodaysWinner(): { userId: string; username: string; date: string } | null {
    const winner = localStorage.getItem(this.WINNER_STORAGE_KEY);
    if (!winner) return null;
    
    const winnerData = JSON.parse(winner);
    const today = new Date().toISOString().split('T')[0];
    
    if (winnerData.date === today) {
      return winnerData;
    }
    return null;
  }

  // Réinitialise le système (pour les tests)
  static reset(): void {
    localStorage.removeItem(this.STORAGE_KEY);
    localStorage.removeItem(this.WINNER_STORAGE_KEY);
  }

  // Obtient le numéro de la combinaison actuelle (pour debug)
  static getPathSignature(): string {
    const path = this.getCurrentWinningPath();
    return path.join('-');
  }
}
