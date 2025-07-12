
import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { useGame } from '@/contexts/GameContext';
import StoryPage from '@/components/StoryPage';
import GameMenu from '@/components/GameMenu';
import { Button } from '@/components/ui/button';
import { Volume2, VolumeX } from 'lucide-react';

const Index = () => {
  const [currentPage, setCurrentPage] = useState<'home' | 'story' | 'menu'>('home');
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);
  const { userProfile } = useGame();
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = 0.3;
      audioRef.current.loop = true;
      
      // Démarrer automatiquement la musique
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
  }, []);

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

  const startAdventure = () => {
    console.log('Démarrage de l\'aventure');
    setCurrentPage('story');
  };

  const openMenu = () => {
    setCurrentPage('menu');
  };

  if (currentPage === 'story') {
    return <StoryPage onBack={() => setCurrentPage('home')} onMenu={openMenu} />;
  }

  if (currentPage === 'menu') {
    return <GameMenu onBack={() => setCurrentPage('story')} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background/95 to-background relative overflow-hidden">
      {/* Background audio */}
      <audio
        ref={audioRef}
        src="https://cdn.pixabay.com/audio/2024/10/23/audio_b7c56b5ff4.mp3"
        preload="auto"
      />

      {/* Music control button */}
      <motion.button
        onClick={toggleMusic}
        className="fixed top-6 right-6 z-50 gaming-card bg-gradient-to-r from-purple-500/20 to-blue-500/20 backdrop-blur p-3 rounded-full border border-purple-400/30 hover:scale-110 transition-transform"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        {isMusicPlaying ? (
          <Volume2 className="h-6 w-6 text-purple-300" />
        ) : (
          <VolumeX className="h-6 w-6 text-gray-400" />
        )}
      </motion.button>

      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-32 h-32 gaming-gradient-purple rounded-full opacity-20 floating-animation" />
        <div className="absolute top-40 right-20 w-24 h-24 gaming-gradient-blue rounded-full opacity-20 floating-animation" style={{ animationDelay: '1s' }} />
        <div className="absolute bottom-40 left-20 w-20 h-20 gaming-gradient-green rounded-full opacity-20 floating-animation" style={{ animationDelay: '2s' }} />
        <div className="absolute bottom-20 right-40 w-28 h-28 gaming-gradient-orange rounded-full opacity-20 floating-animation" style={{ animationDelay: '0.5s' }} />
      </div>

      <div className="relative z-10 flex items-center justify-center min-h-screen px-4">
        <div className="text-center max-w-md mx-auto">
          {/* Game Cover */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="mb-12"
          >
            <img 
              src="/lovable-uploads/3d7c18a7-6e61-4af8-a6c9-b76cdbcd37e9.png" 
              alt="Ubuntara - Le Trône du Destin"
              className="w-full h-auto rounded-3xl shadow-2xl neon-glow floating-animation max-w-sm mx-auto"
            />
          </motion.div>
          
          {/* Start Adventure Button */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
          >
            <Button
              onClick={startAdventure}
              className="gaming-btn gaming-gradient-purple text-white text-xl font-bold py-6 px-12 rounded-2xl border-2 border-purple-400/50 hover:border-purple-300 transition-all duration-300 hover:scale-105 neon-glow"
            >
              {userProfile.has_played_today 
                ? "🔥 Reprendre l'Aventure" 
                : "✨ Commencer l'Aventure"}
            </Button>
          </motion.div>

          {/* Subtle game title */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 0.8 }}
            className="mt-8"
          >
            <p className="text-muted-foreground/60 text-sm">
              Appuyez pour découvrir votre destin
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Index;
