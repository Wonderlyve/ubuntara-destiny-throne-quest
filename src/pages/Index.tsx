
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useGame } from '@/contexts/GameContext';
import StoryPage from '@/components/StoryPage';
import ShopPage from '@/components/ShopPage';
import CharacterPage from '@/components/CharacterPage';
import KingPage from '@/components/KingPage';
import RulesPage from '@/components/RulesPage';
import SettingsPage from '@/components/SettingsPage';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Crown, User, ShoppingBag, BookOpen, Trophy, Settings, HelpCircle, Coins, Sparkles, Zap } from 'lucide-react';

const Index = () => {
  const [currentPage, setCurrentPage] = useState<'menu' | 'story' | 'shop' | 'character' | 'king' | 'rules' | 'settings'>('menu');
  const { userProfile, dailyWinner } = useGame();

  const navigateToPage = (page: typeof currentPage) => {
    console.log(`Navigation vers: ${page}`);
    setCurrentPage(page);
  };

  if (currentPage === 'story') {
    return <StoryPage onBack={() => setCurrentPage('menu')} />;
  }

  if (currentPage === 'shop') {
    return <ShopPage onBack={() => setCurrentPage('menu')} />;
  }

  if (currentPage === 'character') {
    return <CharacterPage onBack={() => setCurrentPage('menu')} />;
  }

  if (currentPage === 'king') {
    return <KingPage onBack={() => setCurrentPage('menu')} />;
  }

  if (currentPage === 'rules') {
    return <RulesPage onBack={() => setCurrentPage('menu')} />;
  }

  if (currentPage === 'settings') {
    return <SettingsPage onBack={() => setCurrentPage('menu')} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background/95 to-background relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-32 h-32 gaming-gradient-purple rounded-full opacity-20 floating-animation" />
        <div className="absolute top-40 right-20 w-24 h-24 gaming-gradient-blue rounded-full opacity-20 floating-animation" style={{ animationDelay: '1s' }} />
        <div className="absolute bottom-40 left-20 w-20 h-20 gaming-gradient-green rounded-full opacity-20 floating-animation" style={{ animationDelay: '2s' }} />
        <div className="absolute bottom-20 right-40 w-28 h-28 gaming-gradient-orange rounded-full opacity-20 floating-animation" style={{ animationDelay: '0.5s' }} />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 py-8">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="relative max-w-md mx-auto mb-8">
            <img 
              src="/lovable-uploads/3d7c18a7-6e61-4af8-a6c9-b76cdbcd37e9.png" 
              alt="Ubuntara - Le Trône du Destin"
              className="w-full h-auto rounded-3xl shadow-2xl neon-glow floating-animation"
            />
          </div>
          
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="space-y-4"
          >
            <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
              UBUNTARA
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground font-medium">
              Le Trône du Destin t'attend
            </p>
            
            <div className="flex items-center justify-center space-x-8 mt-6">
              <motion.div 
                className="flex items-center space-x-2 bg-card/80 backdrop-blur px-4 py-2 rounded-full border border-border/50"
                whileHover={{ scale: 1.05 }}
              >
                <User className="h-5 w-5 text-primary" />
                <span className="text-foreground font-medium">{userProfile.username}</span>
              </motion.div>
              <motion.div 
                className="flex items-center space-x-2 bg-gradient-to-r from-yellow-400/20 to-orange-400/20 backdrop-blur px-4 py-2 rounded-full border border-yellow-400/30"
                whileHover={{ scale: 1.05 }}
              >
                <Coins className="h-5 w-5 text-yellow-400" />
                <span className="text-yellow-400 font-bold">{userProfile.nzimbu_balance} Nz</span>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>

        {/* Roi du jour */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4 }}
          className="mb-12"
        >
          <Card className="gaming-card gaming-gradient-yellow border-yellow-400/30">
            <CardHeader className="text-center pb-4">
              <CardTitle className="flex items-center justify-center text-2xl font-bold text-white">
                <Crown className="h-8 w-8 mr-3 text-yellow-300 pulse-glow" />
                ROI DU JOUR
                <Sparkles className="h-6 w-6 ml-3 text-yellow-300" />
              </CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              {dailyWinner.username === "Personne" ? (
                <div>
                  <p className="text-white/90 text-lg mb-2 font-medium">
                    👑 Le trône attend son souverain...
                  </p>
                  <p className="text-white/70">
                    Personne n'a encore réclamé le trône aujourd'hui. Tente ta chance !
                  </p>
                </div>
              ) : (
                <div>
                  <p className="text-white text-xl mb-2 font-bold">
                    🏆 Félicitations à <span className="text-yellow-300">{dailyWinner.username}</span> !
                  </p>
                  <p className="text-white/80">
                    Récompense royale : <span className="font-bold text-yellow-300">{dailyWinner.nzimbu_reward} Nz</span>
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>

        {/* Menu principal */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5 }}
          >
            <Card 
              className="gaming-card gaming-gradient-purple cursor-pointer h-full group"
              onClick={() => navigateToPage('story')}
            >
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center text-white text-xl group-hover:text-yellow-300 transition-colors">
                  <BookOpen className="h-6 w-6 mr-3 flex-shrink-0" />
                  <span>Commencer l'Aventure</span>
                  <Zap className="h-5 w-5 ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-white/80 leading-relaxed">
                  {userProfile.has_played_today 
                    ? "🔥 Reprendre ton parcours épique vers la royauté !"
                    : "✨ Débute ton voyage vers le trône et découvre ton destin !"}
                </p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.6 }}
          >
            <Card 
              className="gaming-card gaming-gradient-green cursor-pointer h-full group"
              onClick={() => navigateToPage('shop')}
            >
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center text-white text-xl group-hover:text-yellow-300 transition-colors">
                  <ShoppingBag className="h-6 w-6 mr-3 flex-shrink-0" />
                  <span>Boutique Royale</span>
                  <Sparkles className="h-5 w-5 ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-white/80 leading-relaxed">
                  💎 Améliore tes stats et prépare-toi pour les défis qui t'attendent !
                </p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.7 }}
          >
            <Card 
              className="gaming-card gaming-gradient-blue cursor-pointer h-full group"
              onClick={() => navigateToPage('character')}
            >
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center text-white text-xl group-hover:text-yellow-300 transition-colors">
                  <User className="h-6 w-6 mr-3 flex-shrink-0" />
                  <span>Mon Personnage</span>
                  <Crown className="h-5 w-5 ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-white/80 leading-relaxed">
                  📊 Consulte tes statistiques et ton inventaire de héros !
                </p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.8 }}
          >
            <Card 
              className="gaming-card gaming-gradient-orange cursor-pointer h-full group"
              onClick={() => navigateToPage('king')}
            >
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center text-white text-xl group-hover:text-yellow-300 transition-colors">
                  <Trophy className="h-6 w-6 mr-3 flex-shrink-0" />
                  <span>Hall des Légendes</span>
                  <Sparkles className="h-5 w-5 ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-white/80 leading-relaxed">
                  🏆 Découvre les légendes qui ont régné avant toi !
                </p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.9 }}
          >
            <Card 
              className="gaming-card gaming-gradient-pink cursor-pointer h-full group"
              onClick={() => navigateToPage('rules')}
            >
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center text-white text-xl group-hover:text-yellow-300 transition-colors">
                  <HelpCircle className="h-6 w-6 mr-3 flex-shrink-0" />
                  <span>Règles & Récompenses</span>
                  <Crown className="h-5 w-5 ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-white/80 leading-relaxed">
                  📜 Découvre comment jouer et les trésors qui t'attendent !
                </p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1.0 }}
          >
            <Card 
              className="gaming-card bg-gradient-to-br from-gray-700/50 to-gray-800/50 cursor-pointer h-full group border-gray-600/30"
              onClick={() => navigateToPage('settings')}
            >
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center text-white text-xl group-hover:text-blue-300 transition-colors">
                  <Settings className="h-6 w-6 mr-3 flex-shrink-0" />
                  <span>Paramètres</span>
                  <Zap className="h-5 w-5 ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-white/80 leading-relaxed">
                  ⚙️ Personnalise ton expérience de jeu selon tes préférences !
                </p>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2 }}
          className="text-center mt-16"
        >
          <div className="bg-gradient-to-r from-purple-400/20 via-pink-400/20 to-blue-400/20 backdrop-blur rounded-2xl p-6 border border-purple-400/30">
            <p className="text-xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
              ✨ UBUNTARA - L'aventure de ta vie ✨
            </p>
            <p className="text-muted-foreground mt-2">
              Deviens le roi de ton destin et écris ta légende !
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Index;
