import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGame } from '@/contexts/GameContext';
import { gameService } from '@/services/gameService';
import GameResultModal from '@/components/GameResultModal';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ArrowLeft, Menu, Crown, Coins, Heart, Zap, Shield, Star } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

interface StoryPageProps {
  onBack: () => void;
  onMenu: () => void;
}

interface StoryNode {
  id: number;
  title?: string;
  story: string;
  choices?: Choice[];
  rewards?: {
    nzimbu?: number;
    health?: number;
    energy?: number;
  };
}

interface Choice {
  text: string;
  next_node_id: number;
  requirements?: {
    nzimbu?: number;
    energy?: number;
  };
  success_result?: string;
  failure_result?: string;
  success_rewards?: {
    nzimbu?: number;
    health?: number;
    energy?: number;
  };
  failure_rewards?: {
    nzimbu?: number;
    health?: number;
    energy?: number;
  };
}

interface GameResult {
  success: boolean;
  message: string;
  rewards?: {
    nzimbu?: number;
    health?: number;
    energy?: number;
  };
}

const choiceVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (index: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: 0.1 * index,
      duration: 0.4,
      type: "spring",
      stiffness: 100,
    },
  }),
  hover: {
    scale: 1.02,
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    transition: { duration: 0.2 },
  },
  tap: { scale: 0.98 },
};

const StoryPage = ({ onBack, onMenu }: StoryPageProps) => {
  const { userProfile, setUserProfile } = useGame();
  const [currentNode, setCurrentNode] = useState<StoryNode>({ id: 1, story: "Chargement de l'histoire..." });
  const [loading, setLoading] = useState(false);
  const [showResultModal, setShowResultModal] = useState(false);
  const [gameResult, setGameResult] = useState<GameResult | null>(null);

  useEffect(() => {
    const fetchStory = async () => {
      try {
        const storyData = await gameService.getStory(userProfile.id);
        setCurrentNode(storyData.current_node);
        setUserProfile(storyData.user_profile);
      } catch (error) {
        console.error("Erreur lors du chargement de l'histoire:", error);
        toast({
          title: "Erreur de chargement",
          description: "Impossible de charger l'histoire. Veuillez réessayer.",
          variant: "destructive",
        });
      }
    };

    fetchStory();
  }, [setUserProfile, userProfile.id]);

  const handleChoice = async (choice: Choice) => {
    if (loading) return;
    setLoading(true);

    // Vérifiez si l'utilisateur a les ressources nécessaires
    if (choice.requirements) {
      if (choice.requirements.nzimbu && userProfile.nzimbu_balance < choice.requirements.nzimbu) {
        toast({
          title: "Pas assez de Nzimbu",
          description: "Tu n'as pas assez de Nzimbu pour faire ce choix.",
        });
        setLoading(false);
        return;
      }
      if (choice.requirements.energy && userProfile.energy < choice.requirements.energy) {
        toast({
          title: "Pas assez d'énergie",
          description: "Tu n'as pas assez d'énergie pour faire ce choix.",
        });
        setLoading(false);
        return;
      }
    }

    try {
      const result = await gameService.makeChoice(userProfile.id, choice.next_node_id);
      
      // Mise à jour de l'état du jeu avec les résultats
      setUserProfile(prevProfile => ({
        ...prevProfile,
        ...result.user_profile,
      }));
      
      // Afficher les récompenses ou les conséquences du choix
      if (choice.success_result || choice.failure_result) {
        setGameResult({
          success: result.success,
          message: result.success ? choice.success_result || "Succès!" : choice.failure_result || "Échec!",
          rewards: result.success ? choice.success_rewards : choice.failure_rewards,
        });
        setShowResultModal(true);
      }

      // Passage au nœud suivant
      setCurrentNode(result.current_node);
    } catch (error: any) {
      console.error("Erreur lors du choix:", error);
      toast({
        title: "Erreur",
        description: error?.message || "Une erreur s'est produite lors du traitement de votre choix.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background/95 to-background relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-32 h-32 gaming-gradient-purple rounded-full opacity-10 floating-animation" />
        <div className="absolute top-40 right-20 w-24 h-24 gaming-gradient-blue rounded-full opacity-10 floating-animation" style={{ animationDelay: '1s' }} />
        <div className="absolute bottom-40 left-20 w-20 h-20 gaming-gradient-green rounded-full opacity-10 floating-animation" style={{ animationDelay: '2s' }} />
        <div className="absolute bottom-20 right-40 w-28 h-28 gaming-gradient-orange rounded-full opacity-10 floating-animation" style={{ animationDelay: '0.5s' }} />
      </div>

      {/* Header with navigation and stats */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative z-10 flex items-center justify-between p-4 bg-card/20 backdrop-blur border-b border-border/30"
      >
        <div className="flex items-center space-x-3">
          <Button
            onClick={onBack}
            variant="ghost"
            size="sm"
            className="gaming-btn gaming-gradient-gray text-white hover:scale-105 transition-transform"
          >
            <ArrowLeft className="h-4 w-4 mr-1" />
            Accueil
          </Button>
          
          <Button
            onClick={onMenu}
            variant="ghost"
            size="sm"
            className="gaming-btn gaming-gradient-purple text-white hover:scale-105 transition-transform"
          >
            <Menu className="h-4 w-4 mr-1" />
            Menu
          </Button>
        </div>

        {/* Player stats */}
        <div className="flex items-center space-x-3">
          <div className="flex items-center space-x-2 bg-gradient-to-r from-yellow-400/20 to-orange-400/20 backdrop-blur px-3 py-1 rounded-full border border-yellow-400/30">
            <Coins className="h-4 w-4 text-yellow-400" />
            <span className="text-yellow-400 font-bold text-sm">{userProfile.nzimbu_balance} Nz</span>
          </div>
          
          <div className="flex items-center space-x-2 bg-gradient-to-r from-red-400/20 to-pink-400/20 backdrop-blur px-3 py-1 rounded-full border border-red-400/30">
            <Heart className="h-4 w-4 text-red-400" />
            <span className="text-red-400 font-bold text-sm">{userProfile.health}</span>
          </div>
          
          <div className="flex items-center space-x-2 bg-gradient-to-r from-blue-400/20 to-cyan-400/20 backdrop-blur px-3 py-1 rounded-full border border-blue-400/30">
            <Zap className="h-4 w-4 text-blue-400" />
            <span className="text-blue-400 font-bold text-sm">{userProfile.energy}</span>
          </div>
        </div>
      </motion.div>

      {/* Main content */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 py-8">
        
        
        <AnimatePresence mode="wait">
          <motion.div
            key={currentNode.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
          >
            {/* Story content card */}
            <Card className="gaming-card gaming-gradient-dark border-purple-400/30 mb-8 p-8">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                <h2 className="text-3xl font-bold text-white mb-6 text-center">
                  {currentNode.title || "Chapitre " + currentNode.id}
                </h2>
                
                <div className="prose prose-lg max-w-none text-white/90 leading-relaxed">
                  <p className="text-lg whitespace-pre-line">
                    {currentNode.story}
                  </p>
                </div>
                
                {currentNode.rewards && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.4 }}
                    className="mt-6 p-4 bg-gradient-to-r from-green-400/20 to-emerald-400/20 rounded-xl border border-green-400/30"
                  >
                    <div className="flex items-center justify-center space-x-4 text-green-300">
                      <Star className="h-5 w-5" />
                      <span className="font-medium">Récompenses obtenues !</span>
                      <Star className="h-5 w-5" />
                    </div>
                    <div className="flex justify-center space-x-6 mt-2 text-sm">
                      {currentNode.rewards.nzimbu && (
                        <span className="flex items-center space-x-1">
                          <Coins className="h-4 w-4 text-yellow-400" />
                          <span>+{currentNode.rewards.nzimbu} Nz</span>
                        </span>
                      )}
                      {currentNode.rewards.health && (
                        <span className="flex items-center space-x-1">
                          <Heart className="h-4 w-4 text-red-400" />
                          <span>+{currentNode.rewards.health} Santé</span>
                        </span>
                      )}
                      {currentNode.rewards.energy && (
                        <span className="flex items-center space-x-1">
                          <Zap className="h-4 w-4 text-blue-400" />
                          <span>+{currentNode.rewards.energy} Énergie</span>
                        </span>
                      )}
                    </div>
                  </motion.div>
                )}
              </motion.div>
            </Card>

            {/* Choices */}
            {currentNode.choices && currentNode.choices.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="space-y-4"
              >
                <h3 className="text-xl font-bold text-center text-white mb-6">
                  🎯 Que choisis-tu ?
                </h3>
                
                <div className="grid gap-4">
                  {currentNode.choices.map((choice, index) => (
                    <motion.div
                      key={index}
                      variants={choiceVariants}
                      initial="hidden"
                      animate="visible"
                      custom={index}
                      whileHover="hover"
                      whileTap="tap"
                    >
                      <Button
                        onClick={() => handleChoice(choice)}
                        disabled={loading}
                        className={`
                          w-full p-6 text-left gaming-btn gaming-gradient-purple 
                          text-white font-medium border-2 border-purple-400/50 
                          hover:border-purple-300 transition-all duration-300 
                          hover:scale-102 neon-glow min-h-[4rem] text-wrap
                        `}
                      >
                        <div className="flex items-start space-x-3">
                          <span className="flex-shrink-0 w-8 h-8 bg-purple-400/30 rounded-full flex items-center justify-center text-sm font-bold mt-1">
                            {String.fromCharCode(65 + index)}
                          </span>
                          <span className="flex-1 leading-relaxed break-words">
                            {choice.text}
                          </span>
                          {choice.requirements && (
                            <div className="flex-shrink-0 flex space-x-1 mt-1">
                              {choice.requirements.nzimbu && (
                                <span className="flex items-center space-x-1 text-xs bg-yellow-400/20 px-2 py-1 rounded">
                                  <Coins className="h-3 w-3" />
                                  <span>{choice.requirements.nzimbu}</span>
                                </span>
                              )}
                              {choice.requirements.energy && (
                                <span className="flex items-center space-x-1 text-xs bg-blue-400/20 px-2 py-1 rounded">
                                  <Zap className="h-3 w-3" />
                                  <span>{choice.requirements.energy}</span>
                                </span>
                              )}
                            </div>
                          )}
                        </div>
                      </Button>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Game Result Modal */}
      <GameResultModal
        isOpen={showResultModal}
        onClose={() => {
          setShowResultModal(false);
          onBack();
        }}
        result={gameResult}
      />
    </div>
  );
};

export default StoryPage;
