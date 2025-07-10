
import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Crown, Star, Trophy, Coins } from 'lucide-react';
import { useGame } from '@/contexts/GameContext';

interface KingPageProps {
  onBack: () => void;
}

const KingPage: React.FC<KingPageProps> = ({ onBack }) => {
  const { dailyWinner } = useGame();

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-orange-100 p-4">
      {/* Header */}
      <motion.div
        className="flex items-center justify-between mb-6"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <Button variant="ghost" size="sm" className="text-amber-700" onClick={onBack}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Retour
        </Button>
        <div className="flex items-center space-x-2">
          <Crown className="h-5 w-5 text-amber-500" />
          <span className="text-sm font-medium text-amber-700">Roi du Jour</span>
        </div>
      </motion.div>

      <div className="max-w-md mx-auto">
        {/* Couronne animée */}
        <motion.div
          className="text-center mb-8"
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          <motion.div
            animate={{ 
              rotate: [0, 5, -5, 0],
              scale: [1, 1.1, 1]
            }}
            transition={{ 
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <Crown className="h-20 w-20 text-amber-500 mx-auto mb-4" />
          </motion.div>
          <h1 className="text-3xl font-bold text-amber-800 font-serif mb-2">
            Roi d'Ubuntara
          </h1>
          <p className="text-amber-600 text-sm">
            {new Date(dailyWinner.date).toLocaleDateString('fr-FR', {
              weekday: 'long',
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}
          </p>
        </motion.div>

        {/* Carte du roi */}
        <motion.div
          className="bg-gradient-to-br from-amber-100 to-orange-100 rounded-xl shadow-2xl border-4 border-amber-300 p-6 mb-6"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          {/* Avatar */}
          <div className="text-center mb-6">
            <motion.div
              className="w-24 h-24 bg-gradient-to-br from-amber-300 to-orange-300 rounded-full mx-auto mb-4 flex items-center justify-center border-4 border-amber-400"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            >
              <Crown className="h-12 w-12 text-amber-800" />
            </motion.div>
            
            <h2 className="text-2xl font-bold text-amber-800 font-serif mb-1">
              {dailyWinner.username}
            </h2>
            <div className="flex items-center justify-center mb-2">
              <Trophy className="h-4 w-4 text-amber-600 mr-1" />
              <span className="text-amber-700 font-medium text-sm">
                {dailyWinner.title}
              </span>
            </div>
          </div>

          {/* Récompense */}
          <motion.div
            className="bg-gradient-to-r from-yellow-200 to-amber-200 rounded-lg p-4 mb-4 border-2 border-yellow-400"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            <div className="text-center">
              <div className="flex items-center justify-center mb-2">
                <Coins className="h-6 w-6 text-amber-700 mr-2" />
                <span className="text-lg font-bold text-amber-800">
                  {dailyWinner.nzimbu_reward.toLocaleString()} Nzimbu
                </span>
              </div>
              <p className="text-sm text-amber-700">
                Équivalent: {dailyWinner.usd_equivalent}$ USD
              </p>
            </div>
          </motion.div>

          {/* Stats du roi */}
          <motion.div
            className="bg-white/50 rounded-lg p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
          >
            <h3 className="text-lg font-semibold text-amber-800 mb-3 text-center">
              Statistiques Royales
            </h3>
            <div className="space-y-2">
              {Object.entries(dailyWinner.stats).map(([stat, value]) => (
                <div key={stat} className="flex justify-between items-center">
                  <span className="capitalize text-amber-700 font-medium text-sm">
                    {stat}:
                  </span>
                  <div className="flex items-center space-x-2">
                    <div className="w-16 h-2 bg-amber-200 rounded-full overflow-hidden">
                      <motion.div 
                        className="h-full bg-gradient-to-r from-amber-400 to-orange-400 rounded-full"
                        initial={{ width: 0 }}
                        animate={{ width: `${Math.min(value, 100)}%` }}
                        transition={{ delay: 1.2, duration: 0.8 }}
                      />
                    </div>
                    <span className="text-amber-800 font-bold text-sm w-8">
                      {value}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </motion.div>

        {/* Citation inspirante */}
        <motion.div
          className="bg-white/80 rounded-lg p-4 border border-amber-200 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.3 }}
        >
          <div className="flex items-center justify-center mb-2">
            <Star className="h-4 w-4 text-amber-500 mr-1" />
            <Star className="h-5 w-5 text-amber-500 mx-1" />
            <Star className="h-4 w-4 text-amber-500 ml-1" />
          </div>
          <p className="text-sm text-amber-700 italic font-serif mb-2">
            "Un roi véritable règne d'abord sur son propre cœur."
          </p>
          <p className="text-xs text-amber-600">
            - Sagesse d'Ubuntara
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default KingPage;
