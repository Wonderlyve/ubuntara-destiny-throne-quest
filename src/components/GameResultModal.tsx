
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
      return <Skull className="h-16 w-16 text-red-500" />;
    }
  };

  const getResultColor = () => {
    if (gameResult.usd_equivalent >= 1000) return 'from-yellow-400 to-orange-500';
    if (gameResult.isWinner) return 'from-green-400 to-emerald-500'; 
    return 'from-red-400 to-rose-500';
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
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-center text-2xl">
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
                {getResultIcon()}
              </motion.div>

              {/* Titre du destin */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className={`text-center p-6 rounded-lg bg-gradient-to-r ${getResultColor()} text-white`}
              >
                <h2 className="text-3xl font-bold mb-2">{gameResult.destiny_title}</h2>
                {gameResult.usd_equivalent >= 1000 && (
                  <motion.div
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ repeat: Infinity, duration: 2 }}
                    className="text-lg font-semibold"
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
                className="bg-amber-50 p-4 rounded-lg border border-amber-200"
              >
                <div className="flex items-center justify-center space-x-4">
                  <Coins className="h-6 w-6 text-amber-600" />
                  <div className="text-center">
                    <div className="text-2xl font-bold text-amber-800">
                      {gameResult.nzimbu_reward} Nz
                    </div>
                    <div className="text-sm text-amber-600">
                      ${gameResult.usd_equivalent} USD
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Analyse du parcours */}
              <motion.div
                initial={{ x: 50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.8 }}
                className="bg-blue-50 p-4 rounded-lg border border-blue-200"
              >
                <h3 className="font-semibold text-blue-800 mb-3 flex items-center">
                  <Star className="h-5 w-5 mr-2" />
                  Analyse de votre parcours
                </h3>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-blue-600">Décisions prises:</span>
                    <span className="font-semibold ml-2">{choicesSummary.totalChoices}</span>
                  </div>
                  <div>
                    <span className="text-blue-600">Choix audacieux:</span>
                    <span className="font-semibold ml-2">{choicesSummary.boldChoices}</span>
                  </div>
                  <div>
                    <span className="text-blue-600">Choix prudents:</span>
                    <span className="font-semibold ml-2">{choicesSummary.cautiousChoices}</span>
                  </div>
                  <div>
                    <span className="text-blue-600">Style moyen:</span>
                    <span className="font-semibold ml-2">
                      {parseFloat(choicesSummary.averageChoice) > 3.5 ? 'Audacieux' : 'Prudent'}
                    </span>
                  </div>
                </div>
              </motion.div>

              {/* Description détaillée */}
              <motion.div
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 1.0 }}
                className="bg-gray-50 p-4 rounded-lg border"
              >
                <p className="text-gray-700 leading-relaxed">
                  {gameResult.isWinner 
                    ? `Félicitations ! Votre parcours de ${choicesSummary.totalChoices} décisions vous a mené vers ${gameResult.destiny_title.toLowerCase()}. Vos choix ${parseFloat(choicesSummary.averageChoice) > 3.5 ? 'audacieux' : 'prudents'} ont payé.`
                    : `Votre aventure se termine tragiquement. Malgré ${choicesSummary.totalChoices} décisions courageuses, le destin en a décidé autrement. Tentez votre chance à nouveau !`
                  }
                </p>
              </motion.div>

              {/* Boutons d'action */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.2 }}
                className="flex space-x-3 pt-4"
              >
                <Button
                  onClick={onRestart}
                  className="flex-1 bg-amber-600 hover:bg-amber-700 text-white"
                >
                  <Zap className="h-4 w-4 mr-2" />
                  Recommencer
                </Button>
                <Button
                  onClick={onBackToMenu}
                  variant="outline"
                  className="flex-1 border-amber-300 text-amber-700 hover:bg-amber-100"
                >
                  Menu Principal
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
