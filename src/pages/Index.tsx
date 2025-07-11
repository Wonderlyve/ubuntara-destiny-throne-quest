import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useGame } from '@/contexts/GameContext';
import StoryPage from '@/components/StoryPage';
import ShopPage from '@/components/ShopPage';
import CharacterPage from '@/components/CharacterPage';
import KingPage from '@/components/KingPage';
import RulesPage from '@/components/RulesPage';
import SettingsPage from '@/components/SettingsPage';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Crown, User, ShoppingBag, BookOpen, Trophy, Settings, HelpCircle } from 'lucide-react';

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
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-orange-100 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header avec titre du jeu */}
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-6xl font-bold text-amber-800 mb-2 font-serif">
            UBUNTARA
          </h1>
          <p className="text-xl text-amber-600 italic">
            L'aventure de ton destin commence ici
          </p>
        </motion.div>

        {/* Roi du jour */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card className="bg-white/80 border-amber-200">
            <CardHeader>
              <CardTitle className="flex items-center text-amber-800">
                <Crown className="h-5 w-5 mr-2" />
                Roi du Jour
              </CardTitle>
            </CardHeader>
            <CardContent>
              {dailyWinner.username === "Personne" ? (
                <p className="text-amber-700">
                  Personne n'a encore réclamé le trône aujourd'hui. Tente ta chance !
                </p>
              ) : (
                <p className="text-amber-700">
                  Félicitations à <span className="font-semibold">{dailyWinner.username}</span>,
                  notre roi actuel !
                </p>
              )}
            </CardContent>
          </Card>
        </motion.div>

        {/* Menu principal */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4 }}
          >
            <Card 
              className="cursor-pointer hover:shadow-lg transition-all duration-300 hover:scale-105 border-amber-200 bg-gradient-to-br from-amber-100 to-orange-100"
              onClick={() => navigateToPage('story')}
            >
              <CardHeader>
                <CardTitle className="flex items-center text-amber-800">
                  <BookOpen className="h-6 w-6 mr-3" />
                  Commencer l'Aventure
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-amber-700">
                  {userProfile.has_played_today 
                    ? "Reprendre ton parcours épique vers la royauté !"
                    : "Débute ton voyage vers le trône et découvre ton destin !"
                  }
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
              className="cursor-pointer hover:shadow-lg transition-all duration-300 hover:scale-105 border-green-200 bg-gradient-to-br from-green-100 to-lime-100"
              onClick={() => navigateToPage('shop')}
            >
              <CardHeader>
                <CardTitle className="flex items-center text-green-800">
                  <ShoppingBag className="h-6 w-6 mr-3" />
                  Visiter la Boutique
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-green-700">
                  Améliore tes stats et prépare-toi pour les défis à venir !
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
              className="cursor-pointer hover:shadow-lg transition-all duration-300 hover:scale-105 border-blue-200 bg-gradient-to-br from-blue-100 to-sky-100"
              onClick={() => navigateToPage('rules')}
            >
              <CardHeader>
                <CardTitle className="flex items-center text-blue-800">
                  <HelpCircle className="h-6 w-6 mr-3" />
                  Règles & Récompenses
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-blue-700">
                  Découvre comment jouer et les récompenses qui t'attendent !
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
              className="cursor-pointer hover:shadow-lg transition-all duration-300 hover:scale-105 border-gray-200 bg-gradient-to-br from-gray-100 to-slate-100"
              onClick={() => navigateToPage('settings')}
            >
              <CardHeader>
                <CardTitle className="flex items-center text-gray-800">
                  <Settings className="h-6 w-6 mr-3" />
                  Paramètres
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700">
                  Personnalise ton expérience de jeu selon tes préférences.
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
          className="text-center mt-8 text-amber-700"
        >
          <p>
            Ubuntara - L'aventure de ta vie. Deviens le roi de ton destin !
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default Index;
