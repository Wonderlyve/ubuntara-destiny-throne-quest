
import React, { useState, useEffect } from 'react';
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

interface EncouragementMessage {
  id: number;
  message: string;
}

const GameResultModal: React.FC<GameResultModalProps> = ({
  isOpen,
  onClose,
  gameResult,
  playerChoices,
  onRestart,
  onBackToMenu
}) => {
  const [encouragementMessage, setEncouragementMessage] = useState<string>('');

  useEffect(() => {
    const fetchRandomEncouragement = async () => {
      try {
        const response = await fetch('/data/non_crowned_encouragements.json');
        const messages: EncouragementMessage[] = await response.json();
        const randomMessage = messages[Math.floor(Math.random() * messages.length)];
        setEncouragementMessage(randomMessage.message);
      } catch (error) {
        console.error('Erreur lors du chargement des messages d\'encouragement:', error);
        setEncouragementMessage('Ton parcours courageux mérite respect et admiration.');
      }
    };

    if (isOpen && !gameResult.isWinner) {
      fetchRandomEncouragement();
    }
  }, [isOpen, gameResult.isWinner]);

  const getTextSizeClass = (text: string) => {
    if (text.length > 120) return 'text-xs sm:text-sm';
    if (text.length > 80) return 'text-sm sm:text-base';
    return 'text-base sm:text-lg';
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-[95vw] sm:max-w-2xl max-h-[95vh] overflow-y-auto bg-gradient-to-br from-background via-background/95 to-background border-purple-400/30 p-4 sm:p-6">
        <DialogHeader>
          <DialogTitle className="text-center text-xl sm:text-2xl text-white">
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
              className="space-y-4 sm:space-y-6"
            >
              {/* Icon with responsive sizing */}
              <motion.div
                initial={{ y: -50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.6 }}
                className="flex justify-center"
              >
                {gameResult.isWinner && gameResult.usd_equivalent >= 1000 ? (
                  <Crown className="h-16 w-16 sm:h-20 sm:w-20 text-yellow-500 animate-pulse" />
                ) : gameResult.isWinner ? (
                  <Trophy className="h-12 w-12 sm:h-16 sm:w-16 text-amber-500" />
                ) : (
                  <img 
                    src="/lovable-uploads/62df8ffd-a0c4-4cf9-909b-056bf57fcd9e.png"
                    alt="Résultat du jeu"
                    className="w-32 h-32 sm:w-48 sm:h-48 object-cover rounded-2xl shadow-2xl"
                    style={{ boxShadow: '0 0 50px rgba(168, 85, 247, 0.3)' }}
                  />
                )}
              </motion.div>

              {/* Message with responsive text sizing */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="text-center px-2 sm:px-4"
              >
                <p className={`${getTextSizeClass(gameResult.isWinner ? gameResult.destiny_title : encouragementMessage)} text-white/90 italic font-normal leading-relaxed max-w-full mx-auto break-words`}>
                  {gameResult.isWinner ? gameResult.destiny_title : encouragementMessage}
                </p>
                {gameResult.usd_equivalent >= 1000 && (
                  <motion.div
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ repeat: Infinity, duration: 2 }}
                    className="text-base sm:text-lg font-semibold text-yellow-400 mt-4"
                  >
                    🏆 ROI SUPRÊME 🏆
                  </motion.div>
                )}
              </motion.div>

              {/* Rewards with responsive design */}
              <motion.div
                initial={{ x: -50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="bg-gradient-to-r from-amber-400/20 to-yellow-400/20 p-4 sm:p-6 rounded-2xl border border-amber-400/30 backdrop-blur"
              >
                <div className="flex items-center justify-center space-x-2 sm:space-x-4">
                  <Coins className="h-6 w-6 sm:h-8 sm:w-8 text-amber-400" />
                  <div className="text-center">
                    <div className="text-2xl sm:text-3xl font-bold text-amber-300">
                      +{gameResult.nzimbu_reward} Nz
                    </div>
                    <div className="text-xs sm:text-sm text-amber-400 mt-1">
                      Bonus pour tes choix courageux
                    </div>
                    {gameResult.usd_equivalent > 0 && (
                      <div className="text-xs sm:text-sm text-amber-400">
                        Équivalent: ${gameResult.usd_equivalent} USD
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>

              {/* Responsive restart button */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
                className="flex justify-center pt-2 sm:pt-4"
              >
                <Button
                  onClick={onRestart}
                  className="gaming-btn gaming-gradient-purple text-white text-base sm:text-xl font-bold py-4 sm:py-6 px-8 sm:px-12 rounded-2xl border-2 border-purple-400/50 hover:border-purple-300 transition-all duration-300 hover:scale-105 neon-glow"
                >
                  <Zap className="h-4 w-4 sm:h-5 sm:w-5 mr-2 sm:mr-3" />
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
