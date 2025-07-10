
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Crown, ShoppingBag, User, Scroll, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import StoryPage from '@/components/StoryPage';
import KingPage from '@/components/KingPage';
import ShopPage from '@/components/ShopPage';
import CharacterPage from '@/components/CharacterPage';

type CurrentPage = 'home' | 'story' | 'king' | 'shop' | 'character' | 'rules' | 'settings';

const Index = () => {
  const [bookOpened, setBookOpened] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [currentPage, setCurrentPage] = useState<CurrentPage>('home');

  useEffect(() => {
    if (currentPage === 'home') {
      // Animation d'ouverture automatique après 2 secondes
      const timer = setTimeout(() => {
        setBookOpened(true);
        setTimeout(() => setShowMenu(true), 1000);
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [currentPage]);

  const handleNavigation = (page: CurrentPage) => {
    setCurrentPage(page);
    console.log(`Navigation vers: ${page}`);
  };

  const handleBackToHome = () => {
    setCurrentPage('home');
    setBookOpened(false);
    setShowMenu(false);
    // Relancer l'animation d'ouverture
    setTimeout(() => {
      setBookOpened(true);
      setTimeout(() => setShowMenu(true), 1000);
    }, 100);
  };

  // Render des pages spécifiques
  if (currentPage === 'story') {
    return <StoryPage onBack={handleBackToHome} />;
  }
  
  if (currentPage === 'king') {
    return <KingPage onBack={handleBackToHome} />;
  }
  
  if (currentPage === 'shop') {
    return <ShopPage onBack={handleBackToHome} />;
  }
  
  if (currentPage === 'character') {
    return <CharacterPage onBack={handleBackToHome} />;
  }

  // Page temporaire pour les sections non implémentées
  if (currentPage === 'rules' || currentPage === 'settings') {
    return (
      <div className="min-h-screen bg-gradient-to-b from-amber-50 to-orange-100 p-4 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-amber-800 mb-4">
            {currentPage === 'rules' ? 'Règles & Récompenses' : 'Paramètres'}
          </h1>
          <p className="text-amber-600 mb-6">Cette section sera bientôt disponible.</p>
          <Button onClick={handleBackToHome} className="bg-amber-600 hover:bg-amber-700">
            Retour au menu principal
          </Button>
        </div>
      </div>
    );
  }

  const menuItems = [
    { icon: BookOpen, title: "Jouer ta destinée", subtitle: "Découvre l'histoire du jour", page: 'story' as CurrentPage },
    { icon: Crown, title: "Roi du jour", subtitle: "Vois qui règne aujourd'hui", page: 'king' as CurrentPage },
    { icon: ShoppingBag, title: "Formation & Boutique", subtitle: "Améliore tes compétences", page: 'shop' as CurrentPage },
    { icon: User, title: "Mon personnage", subtitle: "Stats et progression", page: 'character' as CurrentPage },
    { icon: Scroll, title: "Règles & Récompenses", subtitle: "Comment devenir roi", page: 'rules' as CurrentPage },
    { icon: Settings, title: "Paramètres", subtitle: "Configuration", page: 'settings' as CurrentPage }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-orange-100 flex flex-col items-center justify-center p-4">
      {/* Animation d'ouverture du livre */}
      <motion.div
        className="relative"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.5 }}
      >
        {/* Couverture du livre */}
        <motion.div
          className="relative w-80 h-96 bg-gradient-to-br from-amber-800 to-amber-900 rounded-lg shadow-2xl border-4 border-amber-700"
          animate={{
            rotateY: bookOpened ? -20 : 0,
            transformStyle: "preserve-3d"
          }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
        >
          {/* Titre sur la couverture */}
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6">
            <motion.h1 
              className="text-3xl font-bold text-amber-100 mb-4 font-serif"
              initial={{ opacity: 0 }}
              animate={{ opacity: bookOpened ? 0 : 1 }}
              transition={{ duration: 0.5 }}
            >
              Ubuntara
            </motion.h1>
            <motion.h2 
              className="text-lg text-amber-200 font-serif"
              initial={{ opacity: 0 }}
              animate={{ opacity: bookOpened ? 0 : 1 }}
              transition={{ duration: 0.5 }}
            >
              Le Trône du Destin
            </motion.h2>
            
            {/* Décoration africaine */}
            <motion.div 
              className="absolute top-4 left-4 w-8 h-8 border-2 border-amber-300 rounded-full"
              initial={{ opacity: 0 }}
              animate={{ opacity: bookOpened ? 0 : 1 }}
            />
            <motion.div 
              className="absolute bottom-4 right-4 w-6 h-6 border-2 border-amber-300 rotate-45"
              initial={{ opacity: 0 }}
              animate={{ opacity: bookOpened ? 0 : 1 }}
            />
          </div>
        </motion.div>

        {/* Page intérieure avec le menu */}
        <motion.div
          className="absolute top-0 left-0 w-80 h-96 bg-gradient-to-br from-amber-50 to-orange-50 rounded-lg shadow-xl"
          initial={{ opacity: 0, rotateY: 0 }}
          animate={{ 
            opacity: bookOpened ? 1 : 0,
            rotateY: bookOpened ? 20 : 0 
          }}
          transition={{ duration: 1.5, delay: 0.5 }}
        >
          {showMenu && (
            <motion.div
              className="p-6 h-full overflow-y-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-2xl font-bold text-amber-800 mb-6 text-center font-serif">
                Ton Destin t'Attend
              </h2>
              
              <div className="space-y-3">
                {menuItems.map((item, index) => (
                  <motion.div
                    key={item.title}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <Button
                      variant="ghost"
                      className="w-full h-auto p-3 bg-gradient-to-r from-amber-100 to-orange-100 hover:from-amber-200 hover:to-orange-200 border border-amber-300 rounded-lg text-left transition-all duration-300 hover:shadow-md"
                      onClick={() => handleNavigation(item.page)}
                    >
                      <div className="flex items-center space-x-3 w-full">
                        <item.icon className="h-6 w-6 text-amber-700 flex-shrink-0" />
                        <div className="flex-1 min-w-0">
                          <div className="font-semibold text-amber-800 text-sm">
                            {item.title}
                          </div>
                          <div className="text-xs text-amber-600 truncate">
                            {item.subtitle}
                          </div>
                        </div>
                      </div>
                    </Button>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </motion.div>
      </motion.div>

      {/* Citation inspirante en bas */}
      {showMenu && (
        <motion.div
          className="mt-8 text-center max-w-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.5 }}
        >
          <p className="text-sm text-amber-700 italic font-serif">
            "Ubuntu signifie qu'une personne est une personne à travers d'autres personnes."
          </p>
          <p className="text-xs text-amber-600 mt-1">- Proverbe africain</p>
        </motion.div>
      )}
    </div>
  );
};

export default Index;
