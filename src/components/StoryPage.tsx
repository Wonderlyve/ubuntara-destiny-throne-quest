import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Star, Crown, Coins, Trophy, Skull, Zap, Sparkles } from 'lucide-react';
import { useGame } from '@/contexts/GameContext';
import { RewardService } from '@/services/rewardService';
import { EndingsService } from '@/services/endingsService';
import { EarlyEndingsService } from '@/services/earlyEndingsService';
import { GameResult } from '@/types/game';
import { useToast } from '@/hooks/use-toast';
import GameResultModal from './GameResultModal';

interface StoryPageProps {
  onBack: () => void;
}

const StoryPage: React.FC<StoryPageProps> = ({ onBack }) => {
  const { storyData, userProfile, currentNode, updateCurrentNode, updateUserProfile } = useGame();
  const [isGameComplete, setIsGameComplete] = useState(false);
  const [gameResult, setGameResult] = useState<GameResult | null>(null);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [playerChoices, setPlayerChoices] = useState<number[]>([]);
  const [showResultModal, setShowResultModal] = useState(false);
  const { toast } = useToast();

  // Scroll to top on component mount and node changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentNode]);

  // Vérifier si le nœud actuel existe
  const currentStoryNode = storyData.nodes[currentNode];
  
  useEffect(() => {
    // Vérifier les fins prématurées à chaque étape
    const earlyEnding = EarlyEndingsService.checkForEarlyEnding(playerChoices.length, playerChoices);
    if (earlyEnding) {
      const result: GameResult = {
        isWinner: earlyEnding.nz_reward > 0,
        nzimbu_reward: earlyEnding.nz_reward,
        usd_equivalent: earlyEnding.usd_equivalent,
        destiny_title: earlyEnding.title
      };
      setGameResult(result);
      setIsGameComplete(true);
      setShowResultModal(true);
      
      // Mettre à jour le profil
      if (result.isWinner) {
        const updatedProfile = { ...userProfile };
        updatedProfile.nzimbu_balance += result.nzimbu_reward;
        updatedProfile.has_played_today = true;
        updateUserProfile(updatedProfile);
      }
      return;
    }

    // Vérifier si le jeu est terminé (nœud sans choix ou 30 étapes)
    if ((currentStoryNode && currentStoryNode.choices.length === 0) || playerChoices.length >= 30) {
      setIsGameComplete(true);
      const result = RewardService.calculateGameResult(currentNode, userProfile, playerChoices);
      setGameResult(result);
      setShowResultModal(true);
      
      // Ajouter les récompenses au profil
      if (result.isWinner) {
        const updatedProfile = { ...userProfile };
        updatedProfile.nzimbu_balance += result.nzimbu_reward;
        updatedProfile.has_played_today = true;
        updateUserProfile(updatedProfile);
      }
    }
  }, [currentNode, currentStoryNode, playerChoices]);

  const handleChoice = async (choice: { text: string; next: string; requirements?: any }, choiceIndex: number) => {
    console.log(`Choix sélectionné: ${choice.text} (index: ${choiceIndex})`);
    
    // Vérifier les prérequis
    if (choice.requirements && !RewardService.checkChoiceRequirements(choice, userProfile.stats)) {
      toast({
        title: "Prérequis non remplis",
        description: "Tu ne remplis pas les conditions pour ce choix. Améliore tes stats dans la boutique.",
        variant: "destructive"
      });
      return;
    }
    
    setIsTransitioning(true);
    
    // Enregistrer le choix dans le parcours
    const newPlayerChoices = [...playerChoices, choiceIndex];
    setPlayerChoices(newPlayerChoices);
    
    // Attendre l'animation de transition
    setTimeout(() => {
      // Mettre à jour les stats du joueur
      const updatedProfile = { ...userProfile };
      const randomStat = ['savoir', 'force', 'charisme', 'esprit', 'fortune'][Math.floor(Math.random() * 5)] as keyof typeof userProfile.stats;
      updatedProfile.stats[randomStat] += Math.floor(Math.random() * 3) + 1;
      
      // Enregistrer le choix
      updatedProfile.daily_progress.choices_made.push(choice.text);
      
      // Si on atteint l'étape 30, déterminer le destin final
      if (newPlayerChoices.length === 30) {
        const endingKey = EndingsService.determineEnding(newPlayerChoices);
        updatedProfile.has_played_today = true;
        updateUserProfile(updatedProfile);
        updateCurrentNode(endingKey);
      } else {
        updateUserProfile(updatedProfile);
        updateCurrentNode(choice.next);
      }
      
      setIsTransitioning(false);
    }, 500);
  };

  const handleRestart = () => {
    const resetProfile = { ...userProfile };
    resetProfile.daily_progress.current_node = storyData.start;
    resetProfile.daily_progress.choices_made = [];
    resetProfile.has_played_today = false;
    updateUserProfile(resetProfile);
    updateCurrentNode(storyData.start);
    setIsGameComplete(false);
    setGameResult(null);
    setPlayerChoices([]);
    setShowResultModal(false);
    window.scrollTo(0, 0);
  };

  const getStepNumber = (nodeId: string): number => {
    if (nodeId.startsWith('end_')) return 30;
    return parseInt(nodeId) || 0;
  };

  if (!currentStoryNode) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background to-background/80 p-4 flex items-center justify-center">
        <div className="text-center gaming-card p-8">
          <p className="text-foreground mb-4 text-lg">⚠️ Histoire non trouvée</p>
          <Button onClick={onBack} className="gaming-button gaming-gradient-purple px-6 py-3">
            Retour au menu
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background/95 to-background relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-24 h-24 gaming-gradient-purple rounded-full opacity-10 floating-animation" />
        <div className="absolute top-40 right-20 w-32 h-32 gaming-gradient-blue rounded-full opacity-10 floating-animation" style={{ animationDelay: '1s' }} />
        <div className="absolute bottom-40 left-20 w-20 h-20 gaming-gradient-green rounded-full opacity-10 floating-animation" style={{ animationDelay: '2s' }} />
      </div>

      <div className="relative z-10 p-4">
        {/* Stats du joueur */}
        <motion.div
          className="max-w-lg mx-auto mb-6 gaming-card p-4"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="grid grid-cols-2 gap-4 text-sm">
            {Object.entries(userProfile.stats).map(([stat, value]) => (
              <div key={stat} className="flex justify-between items-center">
                <span className="capitalize text-foreground/80 font-medium">{stat}:</span>
                <div className="flex items-center space-x-3">
                  <div className="w-16 h-2 bg-muted rounded-full overflow-hidden">
                    <div 
                      className="h-full gaming-gradient-blue rounded-full transition-all duration-500"
                      style={{ width: `${Math.min(value, 100)}%` }}
                    />
                  </div>
                  <span className="text-primary font-bold min-w-[2rem] text-right">{value}</span>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4 flex items-center justify-between">
            <div className="flex items-center bg-gradient-to-r from-yellow-400/20 to-orange-400/20 px-3 py-1 rounded-full">
              <Coins className="h-4 w-4 text-yellow-400 mr-2" />
              <span className="text-yellow-400 font-bold">{userProfile.nzimbu_balance} Nz</span>
            </div>
            <div className="text-sm text-muted-foreground bg-muted/30 px-3 py-1 rounded-full">
              Étape: {playerChoices.length}/30
            </div>
          </div>
        </motion.div>

        {/* Header */}
        <motion.div
          className="flex items-center justify-between mb-8 max-w-lg mx-auto"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Button 
            variant="ghost" 
            size="sm" 
            className="text-muted-foreground hover:text-primary transition-colors" 
            onClick={onBack}
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Retour
          </Button>
          <div className="flex items-center space-x-2 bg-primary/20 px-4 py-2 rounded-full">
            <Star className="h-5 w-5 text-primary" />
            <span className="font-bold text-primary">
              Étape {getStepNumber(currentNode)}
            </span>
          </div>
        </motion.div>

        <AnimatePresence mode="wait">
          {!isTransitioning && (
            <motion.div
              key={currentNode}
              className="max-w-lg mx-auto gaming-card p-8"
              initial={{ opacity: 0, scale: 0.9, rotateY: -90 }}
              animate={{ opacity: 1, scale: 1, rotateY: 0 }}
              exit={{ opacity: 0, scale: 0.9, rotateY: 90 }}
              transition={{ duration: 0.8 }}
            >
              {/* Titre de l'étape */}
              <motion.h1 
                className="text-2xl md:text-3xl font-bold text-center mb-6 bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                {currentStoryNode.title}
              </motion.h1>

              {/* Contenu narratif */}
              <motion.div
                className="bg-muted/30 backdrop-blur rounded-xl p-6 mb-8 border border-border/50"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 }}
              >
                <p className="text-foreground leading-relaxed text-base whitespace-pre-line">
                  {currentStoryNode.text}
                </p>
              </motion.div>

              {/* Choix ou fin de jeu */}
              {!isGameComplete && currentStoryNode.choices.length > 0 ? (
                <motion.div
                  className="space-y-4"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.7 }}
                >
                  <h3 className="text-xl font-bold text-center mb-6 text-foreground flex items-center justify-center">
                    <Sparkles className="h-5 w-5 mr-2 text-primary" />
                    Quel est ton choix ?
                    <Zap className="h-5 w-5 ml-2 text-accent" />
                  </h3>
                  
                  {currentStoryNode.choices.map((choice, index) => {
                    const canChoose = !choice.requirements || RewardService.checkChoiceRequirements(choice, userProfile.stats);
                    
                    return (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.8 + index * 0.1 }}
                      >
                        <Button
                          variant="outline"
                          className={`w-full p-6 h-auto text-left transition-all duration-300 rounded-xl min-h-[5rem] text-wrap ${
                            canChoose 
                              ? 'gaming-card gaming-gradient-purple hover:scale-105 border-primary/30 text-white hover:border-accent/50' 
                              : 'bg-muted/50 border-muted text-muted-foreground opacity-50 cursor-not-allowed'
                          }`}
                          onClick={() => canChoose && handleChoice(choice, index)}
                          disabled={!canChoose}
                        >
                          <div className="w-full">
                            <div className={`font-medium leading-relaxed break-words whitespace-normal text-left ${canChoose ? 'text-white' : 'text-muted-foreground'}`}>
                              {choice.text}
                            </div>
                            {choice.requirements && (
                              <div className="text-xs mt-3 pt-3 border-t border-white/20">
                                <span className="text-yellow-300">Requis:</span> {Object.entries(choice.requirements).map(([stat, value]) => 
                                  `${stat}: ${value}`
                                ).join(', ')}
                              </div>
                            )}
                          </div>
                        </Button>
                      </motion.div>
                    );
                  })}
                </motion.div>
              ) : (
                <motion.div
                  className="text-center space-y-6"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.7 }}
                >
                  <div className="flex justify-center mb-6">
                    {gameResult?.isWinner ? (
                      gameResult.usd_equivalent >= 1000 ? (
                        <Trophy className="h-16 w-16 text-yellow-400 pulse-glow" />
                      ) : (
                        <Crown className="h-16 w-16 text-primary pulse-glow" />
                      )
                    ) : (
                      <Skull className="h-16 w-16 text-destructive pulse-glow" />
                    )}
                  </div>
                  <h3 className="text-2xl font-bold text-foreground mb-4">
                    {gameResult?.destiny_title || "Fin de l'aventure !"}
                  </h3>
                  <p className="text-muted-foreground text-lg mb-6">
                    {gameResult?.isWinner 
                      ? "✨ Ton destin s'achève dans la gloire !" 
                      : "💀 Ton parcours se termine tragiquement..."}
                  </p>

                  {/* Résultats des récompenses */}
                  {gameResult && (
                    <motion.div
                      className={`gaming-card p-6 mb-6 ${
                        gameResult.isWinner 
                          ? gameResult.usd_equivalent >= 1000 
                            ? 'gaming-gradient-yellow border-yellow-400/30' 
                            : 'gaming-gradient-green border-green-400/30'
                          : 'bg-gradient-to-br from-red-900/50 to-red-800/50 border-red-400/30'
                      }`}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 1 }}
                    >
                      {gameResult.isWinner ? (
                        <div className="text-center">
                          <div className={`font-bold mb-3 text-xl ${
                            gameResult.usd_equivalent >= 1000 
                              ? 'text-yellow-300' 
                              : 'text-white'
                          }`}>
                            {gameResult.usd_equivalent >= 1000 
                              ? '👑 JACKPOT ROYAL ! 👑' 
                              : '🎉 Victoire Éclatante ! 🎉'}
                          </div>
                          <div className="text-white space-y-2">
                            <div className="text-lg">Récompense: <span className="font-bold text-yellow-300">{gameResult.nzimbu_reward} Nz</span></div>
                            <div>Équivalent: <span className="font-bold text-green-300">${gameResult.usd_equivalent} USD</span></div>
                          </div>
                        </div>
                      ) : (
                        <div className="text-center">
                          <div className="text-red-300 font-bold mb-3 text-xl">💀 Destin Tragique 💀</div>
                          <div className="text-white">
                            Aucune récompense... Mais l'aventure peut recommencer !
                          </div>
                        </div>
                      )}
                    </motion.div>
                  )}

                  <div className="space-y-3">
                    <Button
                      onClick={handleRestart}
                      className="w-full gaming-button gaming-gradient-purple text-lg py-4"
                    >
                      <Sparkles className="h-5 w-5 mr-2" />
                      Recommencer l'aventure
                    </Button>
                    <Button
                      variant="outline"
                      onClick={onBack}
                      className="w-full border-border hover:bg-muted/50 py-4"
                    >
                      Retour au menu
                    </Button>
                  </div>
                </motion.div>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Animation de transition */}
        {isTransitioning && (
          <motion.div
            className="max-w-lg mx-auto flex items-center justify-center h-64"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="text-center gaming-card p-8">
              <motion.div
                className="w-20 h-20 border-4 border-primary/30 border-t-primary rounded-full mx-auto mb-6"
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              />
              <p className="text-foreground font-bold text-lg">✨ Le destin se tisse...</p>
            </div>
          </motion.div>
        )}

        {/* Modal des résultats */}
        {gameResult && (
          <GameResultModal
            isOpen={showResultModal}
            onClose={() => setShowResultModal(false)}
            gameResult={gameResult}
            playerChoices={playerChoices}
            onRestart={handleRestart}
            onBackToMenu={onBack}
          />
        )}
      </div>
    </div>
  );
};

export default StoryPage;
