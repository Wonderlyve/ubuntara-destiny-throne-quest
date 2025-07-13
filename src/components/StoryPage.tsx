import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGame } from '@/contexts/GameContext';
import { GameService } from '@/services/gameService';
import GameResultModal from '@/components/GameResultModal';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ArrowLeft, Menu, Crown, Coins, Heart, Zap, Shield, Star, Volume2, VolumeX, Sparkles } from 'lucide-react';
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
    force?: number;
    sagesse?: number;
    richesse?: number;
  };
}

interface Choice {
  text: string;
  next_node_id: number;
  requirements?: {
    nzimbu?: number;
    energy?: number;
    force?: number;
    sagesse?: number;
    richesse?: number;
  };
  success_result?: string;
  failure_result?: string;
  success_rewards?: {
    nzimbu?: number;
    health?: number;
    energy?: number;
    force?: number;
    sagesse?: number;
    richesse?: number;
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
    force?: number;
    sagesse?: number;
    richesse?: number;
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
  const { userProfile, updateUserProfile } = useGame();
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
                energy: choice.requirements.force,
                force: choice.requirements.force,
                sagesse: choice.requirements.savoir,
                richesse: choice.requirements.fortune
              } : undefined,
              success_rewards: {
                force: Math.floor(Math.random() * 3) + 1,
                sagesse: Math.floor(Math.random() * 3) + 1,
                richesse: Math.floor(Math.random() * 5) + 2,
                nzimbu: Math.floor(Math.random() * 10) + 5
              }
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

  const canAffordChoice = (choice: Choice): boolean => {
    if (!choice.requirements) return true;
    
    return (
      (!choice.requirements.force || userProfile.stats.force >= choice.requirements.force) &&
      (!choice.requirements.sagesse || userProfile.stats.savoir >= choice.requirements.sagesse) &&
      (!choice.requirements.richesse || userProfile.stats.fortune >= choice.requirements.richesse) &&
      (!choice.requirements.nzimbu || userProfile.nzimbu_balance >= choice.requirements.nzimbu)
    );
  };

  const handleChoice = async (choice: Choice, choiceIndex: number) => {
    if (loading) return;
    setLoading(true);

    setPlayerChoices(prev => [...prev, choiceIndex]);

    if (!canAffordChoice(choice)) {
      toast({
        title: "Prérequis non remplis",
        description: "Tu n'as pas les ressources nécessaires pour ce choix.",
        variant: "destructive",
      });
      setLoading(false);
      return;
    }

    try {
      const updatedProfile = { ...userProfile };
      if (choice.requirements) {
        if (choice.requirements.force) updatedProfile.stats.force -= choice.requirements.force;
        if (choice.requirements.sagesse) updatedProfile.stats.savoir -= choice.requirements.sagesse;
        if (choice.requirements.richesse) updatedProfile.stats.fortune -= choice.requirements.richesse;
        if (choice.requirements.nzimbu) updatedProfile.nzimbu_balance -= choice.requirements.nzimbu;
      }

      if (choice.success_rewards) {
        if (choice.success_rewards.force) updatedProfile.stats.force += choice.success_rewards.force;
        if (choice.success_rewards.sagesse) updatedProfile.stats.savoir += choice.success_rewards.sagesse;
        if (choice.success_rewards.richesse) updatedProfile.stats.fortune += choice.success_rewards.richesse;
        if (choice.success_rewards.nzimbu) updatedProfile.nzimbu_balance += choice.success_rewards.nzimbu;
      }

      updateUserProfile(updatedProfile);

      if (choice.success_rewards) {
        const rewardMessages = [];
        if (choice.success_rewards.force) rewardMessages.push(`+${choice.success_rewards.force} Force`);
        if (choice.success_rewards.sagesse) rewardMessages.push(`+${choice.success_rewards.sagesse} Sagesse`);
        if (choice.success_rewards.richesse) rewardMessages.push(`+${choice.success_rewards.richesse} Richesse`);
        if (choice.success_rewards.nzimbu) rewardMessages.push(`+${choice.success_rewards.nzimbu} Nz`);
        
        toast({
          title: "Récompenses gagnées!",
          description: rewardMessages.join(', '),
        });
      }

      GameService.updateDailyProgress(choice.next_node_id.toString(), choice.text);
      
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
              energy: nextChoice.requirements.force,
              force: nextChoice.requirements.force,
              sagesse: nextChoice.requirements.savoir,
              richesse: nextChoice.requirements.fortune
            } : undefined,
            success_rewards: {
              force: Math.floor(Math.random() * 3) + 1,
              sagesse: Math.floor(Math.random() * 3) + 1,
              richesse: Math.floor(Math.random() * 5) + 2,
              nzimbu: Math.floor(Math.random() * 10) + 5
            }
          }))
        });
      }

      if (!nextNodeData?.choices?.length || choice.next_node_id.toString().startsWith('end_')) {
        const baseReward = Math.max(10, playerChoices.length * 5);
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
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
    onBack();
  };

  const handleRestart = () => {
    setShowResultModal(false);
    setPlayerChoices([]);
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
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  };

  const getChoiceTextSize = (text: string) => {
    const shortText = shortenChoiceText(text, 30);
    if (shortText.length > 25) return 'text-xs';
    if (shortText.length > 20) return 'text-sm';
    return 'text-sm';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background/95 to-background relative overflow-hidden">
      <audio
        ref={audioRef}
        src="/music/congoville-3-247729.mp3"
        preload="auto"
      />

      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-32 h-32 gaming-gradient-purple rounded-full opacity-10 floating-animation" />
        <div className="absolute top-40 right-20 w-24 h-24 gaming-gradient-blue rounded-full opacity-10 floating-animation" style={{ animationDelay: '1s' }} />
        <div className="absolute bottom-40 left-20 w-20 h-20 gaming-gradient-green rounded-full opacity-10 floating-animation" style={{ animationDelay: '2s' }} />
        <div className="absolute bottom-20 right-40 w-28 h-28 gaming-gradient-orange rounded-full opacity-10 floating-animation" style={{ animationDelay: '0.5s' }} />
        
        <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-purple-500/10 rounded-full blur-xl animate-pulse" />
        <div className="absolute top-1/3 right-1/3 w-20 h-20 bg-blue-500/10 rounded-full blur-xl animate-pulse" style={{ animationDelay: '1.5s' }} />
      </div>

      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between p-2 sm:p-4 bg-card/20 backdrop-blur border-b border-border/30"
      >
        <div className="flex items-center space-x-2 sm:space-x-3 mb-2 sm:mb-0">
          <Button
            onClick={handleBackToHome}
            variant="ghost"
            size="sm"
            className="gaming-btn gaming-gradient-gray text-white hover:scale-105 transition-transform text-xs sm:text-sm px-2 sm:px-3"
          >
            <ArrowLeft className="h-3 w-3 sm:h-4 sm:w-4 mr-1" />
            Accueil
          </Button>
          
          <Button
            onClick={onMenu}
            variant="ghost"
            size="sm"
            className="gaming-btn gaming-gradient-purple text-white hover:scale-105 transition-transform text-xs sm:text-sm px-2 sm:px-3"
          >
            <Menu className="h-3 w-3 sm:h-4 sm:w-4 mr-1" />
            Menu
          </Button>
        </div>

        <div className="flex flex-wrap items-center gap-1 sm:gap-2">
          <motion.button
            onClick={toggleMusic}
            className="gaming-card bg-gradient-to-r from-purple-500/20 to-blue-500/20 backdrop-blur p-1.5 sm:p-2 rounded-full border border-purple-400/30 hover:scale-110 transition-transform"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            {isMusicPlaying ? (
              <Volume2 className="h-3 w-3 sm:h-4 sm:w-4 text-purple-300" />
            ) : (
              <VolumeX className="h-3 w-3 sm:h-4 sm:w-4 text-gray-400" />
            )}
          </motion.button>

          <div className="flex items-center space-x-1 bg-gradient-to-r from-yellow-400/20 to-orange-400/20 backdrop-blur px-2 py-1 rounded-full border border-yellow-400/30 shadow-lg shadow-yellow-400/20">
            <Coins className="h-3 w-3 sm:h-4 sm:w-4 text-yellow-400" />
            <span className="text-yellow-400 font-bold text-xs sm:text-sm">{userProfile.nzimbu_balance}</span>
          </div>
          
          <div className="flex items-center space-x-1 bg-gradient-to-r from-red-400/20 to-pink-400/20 backdrop-blur px-2 py-1 rounded-full border border-red-400/30 shadow-lg shadow-red-400/20">
            <Heart className="h-3 w-3 sm:h-4 sm:w-4 text-red-400" />
            <span className="text-red-400 font-bold text-xs sm:text-sm">{userProfile.stats.force}</span>
          </div>
          
          <div className="flex items-center space-x-1 bg-gradient-to-r from-blue-400/20 to-cyan-400/20 backdrop-blur px-2 py-1 rounded-full border border-blue-400/30 shadow-lg shadow-blue-400/20">
            <Zap className="h-3 w-3 sm:h-4 sm:w-4 text-blue-400" />
            <span className="text-blue-400 font-bold text-xs sm:text-sm">{userProfile.stats.savoir}</span>
          </div>

          <div className="flex items-center space-x-1 bg-gradient-to-r from-green-400/20 to-emerald-400/20 backdrop-blur px-2 py-1 rounded-full border border-green-400/30 shadow-lg shadow-green-400/20">
            <Star className="h-3 w-3 sm:h-4 sm:w-4 text-green-400" />
            <span className="text-green-400 font-bold text-xs sm:text-sm">{userProfile.stats.fortune}</span>
          </div>
        </div>
      </motion.div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 py-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentNode.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
          >
            <Card className="gaming-card gaming-gradient-dark border-purple-400/30 mb-8 p-6 sm:p-8 relative overflow-hidden"
                  style={{ 
                    boxShadow: `
                      0 0 50px rgba(168, 85, 247, 0.4),
                      inset 0 0 50px rgba(168, 85, 247, 0.1),
                      0 0 100px rgba(59, 130, 246, 0.2),
                      inset 0 0 30px rgba(59, 130, 246, 0.05)
                    `
                  }}>
              
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 via-transparent to-blue-500/5 rounded-lg" />
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-500/5 to-transparent rounded-lg" />
              
              <div className="absolute top-4 right-4 opacity-30">
                <Sparkles className="h-6 w-6 text-purple-300 animate-pulse" />
              </div>
              <div className="absolute bottom-4 left-4 opacity-20">
                <Sparkles className="h-4 w-4 text-blue-300 animate-pulse" style={{ animationDelay: '1s' }} />
              </div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="relative z-10"
              >
                <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6 text-center"
                    style={{ 
                      textShadow: `
                        0 0 20px rgba(168, 85, 247, 0.8),
                        0 0 40px rgba(168, 85, 247, 0.4),
                        0 0 60px rgba(59, 130, 246, 0.3)
                      `
                    }}>
                  {currentNode.title || "Chapitre " + currentNode.id}
                </h2>
                
                <div className="prose prose-lg max-w-none text-white/90 leading-relaxed">
                  <p className="text-base sm:text-lg whitespace-pre-line" 
                     style={{ 
                       textShadow: `
                         0 0 15px rgba(168, 85, 247, 0.6),
                         0 0 30px rgba(168, 85, 247, 0.3),
                         0 0 45px rgba(59, 130, 246, 0.2)
                       `
                     }}>
                    {currentNode.story}
                  </p>
                </div>
                
                {currentNode.rewards && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.4 }}
                    className="mt-6 p-4 bg-gradient-to-r from-green-400/20 to-emerald-400/20 rounded-xl border border-green-400/30"
                    style={{ boxShadow: '0 0 20px rgba(34, 197, 94, 0.3)' }}
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

            {currentNode.choices && currentNode.choices.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="space-y-4"
              >
                <h3 className="text-lg sm:text-xl font-bold text-center text-white mb-6">
                  🎯 Que choisis-tu ?
                </h3>
                
                <div className="grid gap-4">
                  {currentNode.choices.map((choice, index) => {
                    const canAfford = canAffordChoice(choice);
                    const shortText = shortenChoiceText(choice.text, 30);
                    
                    return (
                      <motion.div
                        key={index}
                        variants={choiceVariants}
                        initial="hidden"
                        animate="visible"
                        whileHover={canAfford ? "hover" : undefined}
                        whileTap={canAfford ? "tap" : undefined}
                        transition={{ delay: 0.1 * index }}
                      >
                        <Button
                          onClick={() => handleChoice(choice, index)}
                          disabled={loading || !canAfford}
                          className={`w-full p-3 sm:p-4 text-left gaming-btn ${
                            canAfford 
                              ? 'gaming-gradient-purple text-white border-purple-400/50 hover:border-purple-300 hover:scale-105 neon-glow' 
                              : 'bg-gray-600/30 text-gray-400 border-gray-600/30 cursor-not-allowed'
                          } ${getChoiceTextSize(choice.text)} font-bold py-3 sm:py-4 px-4 sm:px-6 rounded-2xl border-2 transition-all duration-300 min-h-[3rem] sm:min-h-[3.5rem]`}
                        >
                          <div className="flex items-start space-x-2 sm:space-x-3">
                            <span className="flex-shrink-0 w-5 h-5 sm:w-6 sm:h-6 bg-purple-400/30 rounded-full flex items-center justify-center text-xs font-bold mt-0.5">
                              {String.fromCharCode(65 + index)}
                            </span>
                            <span className="flex-1 break-words leading-tight">
                              {shortText}
                            </span>
                            {choice.requirements && (
                              <div className="flex-shrink-0 flex flex-wrap gap-1 mt-0.5">
                                {choice.requirements.force && (
                                  <span className={`flex items-center space-x-1 text-xs px-2 py-1 rounded ${
                                    userProfile.stats.force >= choice.requirements.force 
                                      ? 'bg-red-400/20 text-red-300' 
                                      : 'bg-red-600/40 text-red-500'
                                  }`}>
                                    <Heart className="h-3 w-3" />
                                    <span>{choice.requirements.force}</span>
                                  </span>
                                )}
                                {choice.requirements.sagesse && (
                                  <span className={`flex items-center space-x-1 text-xs px-2 py-1 rounded ${
                                    userProfile.stats.savoir >= choice.requirements.sagesse 
                                      ? 'bg-blue-400/20 text-blue-300' 
                                      : 'bg-blue-600/40 text-blue-500'
                                  }`}>
                                    <Zap className="h-3 w-3" />
                                    <span>{choice.requirements.sagesse}</span>
                                  </span>
                                )}
                                {choice.requirements.richesse && (
                                  <span className={`flex items-center space-x-1 text-xs px-2 py-1 rounded ${
                                    userProfile.stats.fortune >= choice.requirements.richesse 
                                      ? 'bg-green-400/20 text-green-300' 
                                      : 'bg-green-600/40 text-green-500'
                                  }`}>
                                    <Star className="h-3 w-3" />
                                    <span>{choice.requirements.richesse}</span>
                                  </span>
                                )}
                                {choice.requirements.nzimbu && (
                                  <span className={`flex items-center space-x-1 text-xs px-2 py-1 rounded ${
                                    userProfile.nzimbu_balance >= choice.requirements.nzimbu 
                                      ? 'bg-yellow-400/20 text-yellow-300' 
                                      : 'bg-yellow-600/40 text-yellow-500'
                                  }`}>
                                    <Coins className="h-3 w-3" />
                                    <span>{choice.requirements.nzimbu}</span>
                                  </span>
                                )}
                              </div>
                            )}
                          </div>
                        </Button>
                      </motion.div>
                    );
                  })}
                </div>
              </motion.div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

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
