
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Star, Crown, Coins } from 'lucide-react';
import { useGame } from '@/contexts/GameContext';
import { RewardService } from '@/services/rewardService';
import { GameResult } from '@/types/game';
import { useToast } from '@/hooks/use-toast';

interface StoryPageProps {
  onBack: () => void;
}

const StoryPage: React.FC<StoryPageProps> = ({ onBack }) => {
  const { storyData, userProfile, currentNode, updateCurrentNode, updateUserProfile } = useGame();
  const [isGameComplete, setIsGameComplete] = useState(false);
  const [gameResult, setGameResult] = useState<GameResult | null>(null);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const { toast } = useToast();

  // Scroll to top on component mount and node changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentNode]);

  // Vérifier si le nœud actuel existe
  const currentStoryNode = storyData.nodes[currentNode];
  
  useEffect(() => {
    // Vérifier si le jeu est terminé (nœud sans choix)
    if (currentStoryNode && currentStoryNode.choices.length === 0) {
      setIsGameComplete(true);
      const result = RewardService.calculateGameResult(currentNode, userProfile);
      setGameResult(result);
      
      // Ajouter les récompenses au profil
      if (result.isWinner) {
        const updatedProfile = { ...userProfile };
        updatedProfile.nzimbu_balance += result.nzimbu_reward;
        updatedProfile.has_played_today = true;
        updateUserProfile(updatedProfile);
        
        toast({
          title: "Félicitations !",
          description: `Vous avez gagné ${result.nzimbu_reward} Nz (${result.usd_equivalent} USD) !`
        });
      }
    }
  }, [currentNode, currentStoryNode]);

  const handleChoice = async (choice: { text: string; next: string; requirements?: any }) => {
    console.log(`Choix sélectionné: ${choice.text}`);
    
    // Vérifier les prérequis
    if (choice.requirements && !RewardService.checkChoiceRequirements(choice, userProfile.stats)) {
      toast({
        title: "Prérequis non remplis",
        description: "Vous ne remplissez pas les conditions pour ce choix. Améliorer vos stats dans la boutique.",
        variant: "destructive"
      });
      return;
    }
    
    setIsTransitioning(true);
    
    // Attendre l'animation de transition
    setTimeout(() => {
      // Mettre à jour les stats du joueur
      const updatedProfile = { ...userProfile };
      const randomStat = ['savoir', 'force', 'charisme', 'esprit', 'fortune'][Math.floor(Math.random() * 5)] as keyof typeof userProfile.stats;
      updatedProfile.stats[randomStat] += Math.floor(Math.random() * 3) + 1;
      
      // Enregistrer le choix
      updatedProfile.daily_progress.choices_made.push(choice.text);
      
      // Marquer comme ayant joué aujourd'hui si on arrive à la fin
      if (choice.next.startsWith('end_')) {
        updatedProfile.has_played_today = true;
      }
      
      updateUserProfile(updatedProfile);
      updateCurrentNode(choice.next);
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
    window.scrollTo(0, 0);
  };

  const getStepNumber = (nodeId: string): number => {
    if (nodeId.startsWith('end_')) return 30;
    return parseInt(nodeId) || 0;
  };

  if (!currentStoryNode) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-amber-50 to-orange-100 p-4 flex items-center justify-center">
        <div className="text-center">
          <p className="text-amber-800 mb-4">Erreur: Histoire non trouvée</p>
          <Button onClick={onBack} className="bg-amber-600 hover:bg-amber-700">
            Retour au menu
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-orange-100 p-4">
      {/* Stats du joueur - En haut comme demandé */}
      <motion.div
        className="max-w-md mx-auto mb-4 bg-white/80 rounded-lg p-4 border border-amber-200"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="grid grid-cols-2 gap-3 text-xs">
          {Object.entries(userProfile.stats).map(([stat, value]) => (
            <div key={stat} className="flex justify-between items-center">
              <span className="capitalize text-amber-700 font-medium">{stat}:</span>
              <div className="flex items-center space-x-2">
                <div className="w-12 h-2 bg-amber-200 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-amber-400 to-orange-400 rounded-full transition-all duration-500"
                    style={{ width: `${Math.min(value, 100)}%` }}
                  />
                </div>
                <span className="text-amber-800 font-bold">{value}</span>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-2 text-center">
          <div className="flex items-center justify-center">
            <Coins className="h-4 w-4 text-amber-600 mr-1" />
            <span className="text-amber-700 font-semibold">{userProfile.nzimbu_balance} Nz</span>
          </div>
        </div>
      </motion.div>

      {/* Header */}
      <motion.div
        className="flex items-center justify-between mb-6"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <Button variant="ghost" size="sm" className="text-amber-700" onClick={onBack}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Retour
        </Button>
        <div className="flex items-center space-x-2">
          <Star className="h-5 w-5 text-amber-500" />
          <span className="text-sm font-medium text-amber-700">
            Étape {getStepNumber(currentNode)}
          </span>
        </div>
      </motion.div>

      <AnimatePresence mode="wait">
        {!isTransitioning && (
          <motion.div
            key={currentNode}
            className="max-w-md mx-auto bg-gradient-to-br from-amber-50 to-orange-50 rounded-xl shadow-2xl border-4 border-amber-200 p-6"
            initial={{ opacity: 0, scale: 0.9, rotateY: -90 }}
            animate={{ opacity: 1, scale: 1, rotateY: 0 }}
            exit={{ opacity: 0, scale: 0.9, rotateY: 90 }}
            transition={{ duration: 0.8 }}
          >
            {/* Titre de l'étape */}
            <motion.h1 
              className="text-2xl font-bold text-amber-800 mb-4 text-center font-serif"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              {currentStoryNode.title}
            </motion.h1>

            {/* Contenu narratif */}
            <motion.div
              className="bg-white/50 rounded-lg p-4 mb-6 border-l-4 border-amber-400"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
            >
              <p className="text-amber-800 leading-relaxed font-serif text-sm">
                {currentStoryNode.text}
              </p>
            </motion.div>

            {/* Choix ou fin de jeu */}
            {!isGameComplete && currentStoryNode.choices.length > 0 ? (
              <motion.div
                className="space-y-3"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7 }}
              >
                <h3 className="text-lg font-semibold text-amber-700 mb-3 text-center">
                  Quel est ton choix ?
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
                        className={`w-full p-3 h-auto text-left transition-all duration-300 hover:shadow-md rounded-lg ${
                          canChoose 
                            ? 'bg-gradient-to-r from-amber-100 to-orange-100 hover:from-amber-200 hover:to-orange-200 border-amber-300' 
                            : 'bg-gray-200 border-gray-300 opacity-50 cursor-not-allowed'
                        }`}
                        onClick={() => canChoose && handleChoice(choice)}
                        disabled={!canChoose}
                      >
                        <div className="w-full">
                          <div className="font-medium text-amber-800 text-sm">
                            {choice.text}
                          </div>
                          {choice.requirements && (
                            <div className="text-xs text-amber-600 mt-1">
                              Requis: {Object.entries(choice.requirements).map(([stat, value]) => 
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
              // Fin du jeu avec résultats
              <motion.div
                className="text-center space-y-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7 }}
              >
                <div className="flex justify-center mb-4">
                  <Crown className="h-12 w-12 text-amber-500" />
                </div>
                <h3 className="text-lg font-semibold text-amber-700 mb-3">
                  {gameResult?.destiny_title || "Fin de l'aventure !"}
                </h3>
                <p className="text-amber-600 text-sm mb-4">
                  Ton destin a été scellé. L'histoire d'aujourd'hui est terminée.
                </p>

                {/* Résultats des récompenses */}
                {gameResult && (
                  <motion.div
                    className="bg-white/70 rounded-lg p-4 mb-4 border border-amber-300"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 1 }}
                  >
                    {gameResult.isWinner ? (
                      <div className="text-center">
                        <div className="text-green-600 font-bold mb-2">🎉 Victoire ! 🎉</div>
                        <div className="text-amber-800">
                          <div>Récompense: <span className="font-bold">{gameResult.nzimbu_reward} Nz</span></div>
                          <div>Équivalent: <span className="font-bold">${gameResult.usd_equivalent} USD</span></div>
                        </div>
                      </div>
                    ) : (
                      <div className="text-center">
                        <div className="text-red-600 font-bold mb-2">Aucune récompense</div>
                        <div className="text-amber-700 text-sm">
                          Ton parcours ne t'a pas mené vers la gloire...
                        </div>
                      </div>
                    )}
                  </motion.div>
                )}

                <div className="space-y-2">
                  <Button
                    onClick={handleRestart}
                    className="w-full bg-amber-600 hover:bg-amber-700 text-white"
                  >
                    Recommencer l'aventure
                  </Button>
                  <Button
                    variant="outline"
                    onClick={onBack}
                    className="w-full border-amber-300 text-amber-700 hover:bg-amber-100"
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
          className="max-w-md mx-auto flex items-center justify-center h-64"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div className="text-center">
            <motion.div
              className="w-16 h-16 border-4 border-amber-300 border-t-amber-600 rounded-full mx-auto mb-4"
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            />
            <p className="text-amber-700 font-serif">Le destin se tisse...</p>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default StoryPage;
