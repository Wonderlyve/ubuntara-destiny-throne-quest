import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGame } from '@/contexts/GameContext';
import { GameService } from '@/services/gameService';
import GameResultModal from '@/components/GameResultModal';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ArrowLeft, Menu, Crown, Coins, Heart, Zap, Shield, Star, Volume2, VolumeX } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { shortenChoiceText } from '@/utils/textUtils';

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
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.4,
      type: "spring" as const,
      stiffness: 100,
    }
  },
  hover: {
    scale: 1.02,
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    transition: { duration: 0.2 },
  },
  tap: { scale: 0.98 },
};

const StoryPage = ({ onBack, onMenu }: StoryPageProps) => {
  const { userProfile } = useGame();
  const [currentNode, setCurrentNode] = useState<StoryNode>({ id: 1, story: "Chargement de l'histoire..." });
  const [loading, setLoading] = useState(false);
  const [showResultModal, setShowResultModal] = useState(false);
  const [gameResult, setGameResult] = useState<GameResult | null>(null);
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);
  const [playerChoices, setPlayerChoices] = useState<number[]>([]);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    // Reset scroll position to start of page
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;

    // Démarrer la musique d'aventure
    if (audioRef.current) {
      audioRef.current.volume = 0.3;
      audioRef.current.loop = true;
      
      const playMusic = async () => {
        try {
          await audioRef.current?.play();
          setIsMusicPlaying(true);
        } catch (error) {
          console.log('Auto-play prevented by browser');
        }
      };
      
      playMusic();
    }

    const fetchStory = async () => {
      try {
        const storyData = GameService.getStoryData();
        const currentNodeData = storyData.nodes[userProfile.daily_progress.current_node];
        if (currentNodeData) {
          setCurrentNode({
            id: parseInt(userProfile.daily_progress.current_node),
            title: currentNodeData.title,
            story: currentNodeData.text,
            choices: currentNodeData.choices?.map(choice => ({
              text: choice.text,
              next_node_id: parseInt(choice.next),
              requirements: choice.requirements ? {
                nzimbu: choice.requirements.fortune,
                energy: choice.requirements.force
              } : undefined
            }))
          });
        }
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

    // Cleanup function to stop music when component unmounts
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }
    };
  }, [userProfile.daily_progress.current_node]);

  const toggleMusic = () => {
    if (audioRef.current) {
      if (isMusicPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsMusicPlaying(!isMusicPlaying);
    }
  };

  const handleChoice = async (choice: Choice, choiceIndex: number) => {
    if (loading) return;
    setLoading(true);

    // Add choice to player choices
    setPlayerChoices(prev => [...prev, choiceIndex]);

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
      if (choice.requirements.energy && userProfile.stats.force < choice.requirements.energy) {
        toast({
          title: "Pas assez d'énergie",
          description: "Tu n'as pas assez d'énergie pour faire ce choix.",
        });
        setLoading(false);
        return;
      }
    }

    try {
      // Update daily progress
      GameService.updateDailyProgress(choice.next_node_id.toString(), choice.text);
      
      // Get the next node
      const storyData = GameService.getStoryData();
      const nextNodeData = storyData.nodes[choice.next_node_id.toString()];
      
      if (nextNodeData) {
        setCurrentNode({
          id: choice.next_node_id,
          title: nextNodeData.title,
          story: nextNodeData.text,
          choices: nextNodeData.choices?.map(nextChoice => ({
            text: nextChoice.text,
            next_node_id: parseInt(nextChoice.next),
            requirements: nextChoice.requirements ? {
              nzimbu: nextChoice.requirements.fortune,
              energy: nextChoice.requirements.force
            } : undefined
          }))
        });
      }

      // Check if game is over (no more choices or reached an ending)
      if (!nextNodeData?.choices?.length || choice.next_node_id.toString().startsWith('end_')) {
        // Calculate rewards based on choices made
        const baseReward = Math.max(10, playerChoices.length * 5); // Minimum 10 Nz, 5 per choice
        const totalReward = baseReward + (choice.success_rewards?.nzimbu || 0);
        
        setGameResult({
          success: choice.next_node_id.toString().includes('roi_supreme') || choice.next_node_id.toString().includes('winner'),
          message: choice.success_result || nextNodeData?.title || "Fin de l'aventure",
          rewards: {
            nzimbu: totalReward,
            ...choice.success_rewards
          }
        });
        setShowResultModal(true);
      }

      // Show result if needed
      if (choice.success_result || choice.failure_result) {
        const baseReward = Math.max(10, playerChoices.length * 5);
        setGameResult({
          success: choice.success_result ? true : false,
          message: choice.success_result || choice.failure_result || "Choix effectué!",
          rewards: {
            nzimbu: baseReward + (choice.success_rewards?.nzimbu || 0),
            ...choice.success_rewards,
          },
        });
        if (!nextNodeData?.choices?.length) {
          setShowResultModal(true);
        }
      }
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

  const handleBackToHome = () => {
    // Stop the adventure music immediately
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
    onBack();
  };

  const handleRestart = () => {
    setShowResultModal(false);
    setPlayerChoices([]);
    // Reset to initial state
    const storyData = GameService.getStoryData();
    const initialNodeData = storyData.nodes["1"];
    if (initialNodeData) {
      setCurrentNode({
        id: 1,
        title: initialNodeData.title,
        story: initialNodeData.text,
        choices: initialNodeData.choices?.map(choice => ({
          text: choice.text,
          next_node_id: parseInt(choice.next),
          requirements: choice.requirements ? {
            nzimbu: choice.requirements.fortune,
            energy: choice.requirements.force
          } : undefined
        }))
      });
    }
    // Scroll to top immediately
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background/95 to-background relative overflow-hidden">
      {/* Background audio - Utilisation du fichier local pour l'aventure */}
      <audio
        ref={audioRef}
        src="/music/congoville-3-247729.mp3"
        preload="auto"
      />

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
            onClick={handleBackToHome}
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

        <div className="flex items-center space-x-3">
          {/* Music control button */}
          <motion.button
            onClick={toggleMusic}
            className="gaming-card bg-gradient-to-r from-purple-500/20 to-blue-500/20 backdrop-blur p-2 rounded-full border border-purple-400/30 hover:scale-110 transition-transform"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            {isMusicPlaying ? (
              <Volume2 className="h-4 w-4 text-purple-300" />
            ) : (
              <VolumeX className="h-4 w-4 text-gray-400" />
            )}
          </motion.button>

          {/* Player stats */}
          <div className="flex items-center space-x-2 bg-gradient-to-r from-yellow-400/20 to-orange-400/20 backdrop-blur px-3 py-1 rounded-full border border-yellow-400/30">
            <Coins className="h-4 w-4 text-yellow-400" />
            <span className="text-yellow-400 font-bold text-sm">{userProfile.nzimbu_balance} Nz</span>
          </div>
          
          <div className="flex items-center space-x-2 bg-gradient-to-r from-red-400/20 to-pink-400/20 backdrop-blur px-3 py-1 rounded-full border border-red-400/30">
            <Heart className="h-4 w-4 text-red-400" />
            <span className="text-red-400 font-bold text-sm">{userProfile.stats.force}</span>
          </div>
          
          <div className="flex items-center space-x-2 bg-gradient-to-r from-blue-400/20 to-cyan-400/20 backdrop-blur px-3 py-1 rounded-full border border-blue-400/30">
            <Zap className="h-4 w-4 text-blue-400" />
            <span className="text-blue-400 font-bold text-sm">{userProfile.stats.esprit}</span>
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
            {/* Story content card with purple glow */}
            <Card className="gaming-card gaming-gradient-dark border-purple-400/30 mb-8 p-8 shadow-[0_0_50px_rgba(168,85,247,0.3)]">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                <h2 className="text-3xl font-bold text-white mb-6 text-center">
                  {currentNode.title || "Chapitre " + currentNode.id}
                </h2>
                
                <div className="prose prose-lg max-w-none text-white/90 leading-relaxed">
                  <p className="text-lg whitespace-pre-line text-shadow-lg" style={{ textShadow: '0 0 20px rgba(168, 85, 247, 0.5)' }}>
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

            {/* Choices avec textes raccourcis */}
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
                      whileHover="hover"
                      whileTap="tap"
                      transition={{ delay: 0.1 * index }}
                    >
                      <Button
                        onClick={() => handleChoice(choice, index)}
                        disabled={loading}
                        className="w-full p-4 text-left gaming-btn gaming-gradient-purple text-white text-sm font-bold py-4 px-6 rounded-2xl border-2 border-purple-400/50 hover:border-purple-300 transition-all duration-300 hover:scale-105 neon-glow min-h-[3.5rem]"
                      >
                        <div className="flex items-start space-x-3">
                          <span className="flex-shrink-0 w-6 h-6 bg-purple-400/30 rounded-full flex items-center justify-center text-xs font-bold mt-0.5">
                            {String.fromCharCode(65 + index)}
                          </span>
                          <span className="flex-1 break-words">
                            {shortenChoiceText(choice.text, 30)}
                          </span>
                          {choice.requirements && (
                            <div className="flex-shrink-0 flex space-x-1 mt-0.5">
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
      {showResultModal && gameResult && (
        <GameResultModal
          isOpen={showResultModal}
          onClose={() => setShowResultModal(false)}
          gameResult={{
            isWinner: gameResult.success,
            nzimbu_reward: gameResult.rewards?.nzimbu || 0,
            usd_equivalent: gameResult.success ? 1000 : 0,
            destiny_title: gameResult.message
          }}
          playerChoices={playerChoices}
          onRestart={handleRestart}
          onBackToMenu={handleBackToHome}
        />
      )}
    </div>
  );
};

export default StoryPage;
