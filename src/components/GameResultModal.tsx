
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Crown, Skull, Trophy, Coins, Star, Zap } from 'lucide-react';
import { GameResult } from '@/types/game';

interface GameResultModalProps {
  isOpen: boolean;
  onClose: () => void;
  gameResult: GameResult;
  playerChoices: number[];
  onRestart: () => void;
  onBackToMenu: () => void;
}

const GameResultModal: React.FC<GameResultModalProps> = ({
  isOpen,
  onClose,
  gameResult,
  playerChoices,
  onRestart,
  onBackToMenu
}) => {
  const getResultIcon = () => {
    if (gameResult.usd_equivalent >= 1000) {
      return <Crown className="h-20 w-20 text-yellow-500 animate-pulse" />;
    } else if (gameResult.isWinner) {
      return <Trophy className="h-16 w-16 text-amber-500" />;
    } else {
      return (
        <div className="flex justify-center mb-6">
          <img 
            src="/lovable-uploads/62df8ffd-a0c4-4cf9-909b-056bf57fcd9e.png"
            alt="Résultat du jeu"
            className="w-64 h-64 object-cover rounded-2xl shadow-2xl neon-glow"
          />
        </div>
      );
    }
  };

  const getResultColor = () => {
    if (gameResult.usd_equivalent >= 1000) return 'from-yellow-400 to-orange-500';
    if (gameResult.isWinner) return 'from-green-400 to-emerald-500'; 
    return 'from-purple-400 to-blue-500';
  };

  const getChoicesSummary = () => {
    const totalChoices = playerChoices.length;
    const averageChoice = playerChoices.reduce((sum, choice) => sum + choice, 0) / totalChoices;
    
    return {
      totalChoices,
      averageChoice: averageChoice.toFixed(1),
      boldChoices: playerChoices.filter(choice => choice >= 4).length,
      cautiousChoices: playerChoices.filter(choice => choice <= 2).length
    };
  };

  const choicesSummary = getChoicesSummary();

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto bg-gradient-to-br from-background via-background/95 to-background border-purple-400/30">
        <DialogHeader>
          <DialogTitle className="text-center text-2xl text-white">
            Résultat Final
          </DialogTitle>
        </DialogHeader>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.5 }}
              className="space-y-6"
            >
              {/* Icône principale avec animation */}
              <motion.div
                initial={{ y: -50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.6 }}
                className="flex justify-center"
              >
                {gameResult.isWinner && gameResult.usd_equivalent >= 1000 ? (
                  <Crown className="h-20 w-20 text-yellow-500 animate-pulse" />
                ) : gameResult.isWinner ? (
                  <Trophy className="h-16 w-16 text-amber-500" />
                ) : (
                  <img 
                    src="/lovable-uploads/62df8ffd-a0c4-4cf9-909b-056bf57fcd9e.png"
                    alt="Résultat du jeu"
                    className="w-48 h-48 object-cover rounded-2xl shadow-2xl"
                    style={{ boxShadow: '0 0 50px rgba(168, 85, 247, 0.3)' }}
                  />
                )}
              </motion.div>

              {/* Message de résultat */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="text-center"
              >
                <p className="text-lg text-white/90 italic font-normal leading-relaxed max-w-md mx-auto">
                  {gameResult.destiny_title}
                </p>
                {gameResult.usd_equivalent >= 1000 && (
                  <motion.div
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ repeat: Infinity, duration: 2 }}
                    className="text-lg font-semibold text-yellow-400 mt-4"
                  >
                    🏆 ROI SUPRÊME 🏆
                  </motion.div>
                )}
              </motion.div>

              {/* Récompenses */}
              <motion.div
                initial={{ x: -50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="bg-gradient-to-r from-amber-400/20 to-yellow-400/20 p-6 rounded-2xl border border-amber-400/30 backdrop-blur"
              >
                <div className="flex items-center justify-center space-x-4">
                  <Coins className="h-8 w-8 text-amber-400" />
                  <div className="text-center">
                    <div className="text-3xl font-bold text-amber-300">
                      +{gameResult.nzimbu_reward} Nz
                    </div>
                    <div className="text-sm text-amber-400 mt-1">
                      Bonus pour tes choix courageux
                    </div>
                    {gameResult.usd_equivalent > 0 && (
                      <div className="text-sm text-amber-400">
                        Équivalent: ${gameResult.usd_equivalent} USD
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>

              {/* Bouton pour recommencer */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
                className="flex justify-center pt-4"
              >
                <Button
                  onClick={onRestart}
                  className="gaming-btn gaming-gradient-purple text-white text-xl font-bold py-6 px-12 rounded-2xl border-2 border-purple-400/50 hover:border-purple-300 transition-all duration-300 hover:scale-105 neon-glow"
                >
                  <Zap className="h-5 w-5 mr-3" />
                  Recommencer l'Aventure
                </Button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </DialogContent>
    </Dialog>
  );
};

export default GameResultModal;
