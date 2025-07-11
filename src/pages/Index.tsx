
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
import { Crown, User, ShoppingBag, BookOpen, Trophy, Settings, HelpCircle, Coins } from 'lucide-react';

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
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-orange-100">
      <div className="max-w-6xl mx-auto px-4 py-6">
        {/* Hero Section avec l'image de couverture */}
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <div className="relative max-w-md mx-auto mb-6">
            <img 
              src="/lovable-uploads/3d7c18a7-6e61-4af8-a6c9-b76cdbcd37e9.png" 
              alt="Ubuntara - Le Trône du Destin"
              className="w-full h-auto rounded-2xl shadow-2xl border-4 border-amber-300"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-2xl"></div>
          </div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <p className="text-xl text-amber-700 italic font-serif mb-4">
              L'aventure de ton destin commence ici
            </p>
            <div className="flex items-center justify-center space-x-4 text-sm text-amber-600">
              <div className="flex items-center space-x-1">
                <User className="h-4 w-4" />
                <span>{userProfile.username}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Coins className="h-4 w-4" />
                <span>{userProfile.nzimbu_balance} Nz</span>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Roi du jour */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mb-8"
        >
          <Card className="bg-gradient-to-r from-yellow-100 to-amber-100 border-amber-300 shadow-lg">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center justify-center text-amber-800">
                <Crown className="h-6 w-6 mr-2 text-yellow-600" />
                Roi du Jour
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              {dailyWinner.username === "Personne" ? (
                <div className="text-center">
                  <p className="text-amber-700 mb-2">
                    Le trône attend son souverain...
                  </p>
                  <p className="text-sm text-amber-600">
                    Personne n'a encore réclamé le trône aujourd'hui. Tente ta chance !
                  </p>
                </div>
              ) : (
                <div className="text-center">
                  <p className="text-amber-700 mb-2">
                    🏆 Félicitations à <span className="font-bold text-yellow-700">{dailyWinner.username}</span> !
                  </p>
                  <p className="text-sm text-amber-600">
                    Notre roi actuel règne avec {dailyWinner.nzimbu_reward} Nz de récompense
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>

        {/* Menu principal - Grille responsive améliorée */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5 }}
          >
            <Card 
              className="cursor-pointer hover:shadow-xl transition-all duration-300 hover:scale-105 hover:-translate-y-1 border-amber-200 bg-gradient-to-br from-amber-100 to-orange-100 h-full"
              onClick={() => navigateToPage('story')}
            >
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center text-amber-800 text-lg">
                  <BookOpen className="h-5 w-5 mr-2 flex-shrink-0" />
                  <span className="leading-tight">Commencer l'Aventure</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <p className="text-amber-700 text-sm leading-relaxed">
                  {userProfile.has_played_today 
                    ? "Reprendre ton parcours épique vers la royauté !"
                    : "Débute ton voyage vers le trône et découvre ton destin !"
                  }
                </p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.6 }}
          >
            <Card 
              className="cursor-pointer hover:shadow-xl transition-all duration-300 hover:scale-105 hover:-translate-y-1 border-green-200 bg-gradient-to-br from-green-100 to-lime-100 h-full"
              onClick={() => navigateToPage('shop')}
            >
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center text-green-800 text-lg">
                  <ShoppingBag className="h-5 w-5 mr-2 flex-shrink-0" />
                  <span className="leading-tight">Visiter la Boutique</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <p className="text-green-700 text-sm leading-relaxed">
                  Améliore tes stats et prépare-toi pour les défis à venir !
                </p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.7 }}
          >
            <Card 
              className="cursor-pointer hover:shadow-xl transition-all duration-300 hover:scale-105 hover:-translate-y-1 border-purple-200 bg-gradient-to-br from-purple-100 to-pink-100 h-full"
              onClick={() => navigateToPage('character')}
            >
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center text-purple-800 text-lg">
                  <User className="h-5 w-5 mr-2 flex-shrink-0" />
                  <span className="leading-tight">Mon Personnage</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <p className="text-purple-700 text-sm leading-relaxed">
                  Consulte tes statistiques et ton inventaire.
                </p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.8 }}
          >
            <Card 
              className="cursor-pointer hover:shadow-xl transition-all duration-300 hover:scale-105 hover:-translate-y-1 border-yellow-200 bg-gradient-to-br from-yellow-100 to-amber-100 h-full"
              onClick={() => navigateToPage('king')}
            >
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center text-yellow-800 text-lg">
                  <Trophy className="h-5 w-5 mr-2 flex-shrink-0" />
                  <span className="leading-tight">Hall des Rois</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <p className="text-yellow-700 text-sm leading-relaxed">
                  Découvre les légendes qui ont régné avant toi.
                </p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.9 }}
          >
            <Card 
              className="cursor-pointer hover:shadow-xl transition-all duration-300 hover:scale-105 hover:-translate-y-1 border-blue-200 bg-gradient-to-br from-blue-100 to-sky-100 h-full"
              onClick={() => navigateToPage('rules')}
            >
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center text-blue-800 text-lg">
                  <HelpCircle className="h-5 w-5 mr-2 flex-shrink-0" />
                  <span className="leading-tight">Règles & Récompenses</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <p className="text-blue-700 text-sm leading-relaxed">
                  Découvre comment jouer et les récompenses qui t'attendent !
                </p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1.0 }}
          >
            <Card 
              className="cursor-pointer hover:shadow-xl transition-all duration-300 hover:scale-105 hover:-translate-y-1 border-gray-200 bg-gradient-to-br from-gray-100 to-slate-100 h-full"
              onClick={() => navigateToPage('settings')}
            >
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center text-gray-800 text-lg">
                  <Settings className="h-5 w-5 mr-2 flex-shrink-0" />
                  <span className="leading-tight">Paramètres</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <p className="text-gray-700 text-sm leading-relaxed">
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
          className="text-center mt-12 text-amber-700"
        >
          <p className="font-serif italic">
            Ubuntara - L'aventure de ta vie. Deviens le roi de ton destin !
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default Index;
