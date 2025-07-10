
import React from 'react';
import { motion } from 'framer-motion';
import { Crown, Star, Trophy, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';

const KingPage = () => {
  // Données du roi du jour (simulées)
  const dailyKing = {
    name: "Kwame Asante",
    avatar: "👑",
    quote: "La vraie royauté vient du service aux autres, pas du pouvoir sur eux.",
    stats: {
      savoir: 95,
      force: 88,
      charisme: 92,
      esprit: 90,
      fortune: 1500
    },
    achievements: [
      "Maître des Sages",
      "Protecteur du Peuple",
      "Gardien des Traditions"
    ],
    reignDay: "Jour 47 de règne",
    totalVictories: 12
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-orange-100 p-4">
      {/* Header */}
      <motion.div
        className="flex items-center justify-between mb-6"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <Button variant="ghost" size="sm" className="text-amber-700">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Retour
        </Button>
        <h1 className="text-xl font-bold text-amber-800 font-serif">Roi du Jour</h1>
        <div></div>
      </motion.div>

      {/* Carte du roi */}
      <motion.div
        className="max-w-md mx-auto bg-gradient-to-br from-amber-100 to-orange-100 rounded-xl shadow-2xl border-4 border-amber-300 overflow-hidden"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        {/* Couronne animée */}
        <motion.div
          className="bg-gradient-to-r from-yellow-400 to-amber-500 p-6 text-center relative overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-yellow-300/50 to-amber-400/50"
            animate={{ 
              backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
            }}
            transition={{ 
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          
          <motion.div
            className="relative"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ 
              delay: 0.5,
              type: "spring",
              stiffness: 200
            }}
          >
            <Crown className="h-16 w-16 text-amber-800 mx-auto mb-2" />
            <h2 className="text-2xl font-bold text-amber-900 font-serif">
              {dailyKing.name}
            </h2>
            <p className="text-amber-800 text-sm mt-1">
              {dailyKing.reignDay}
            </p>
          </motion.div>

          {/* Étoiles décoratives */}
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute"
              style={{
                left: `${20 + i * 15}%`,
                top: `${30 + Math.sin(i) * 20}%`
              }}
              animate={{
                scale: [1, 1.2, 1],
                rotate: [0, 180, 360]
              }}
              transition={{
                duration: 2 + i * 0.5,
                repeat: Infinity,
                delay: i * 0.2
              }}
            >
              <Star className="h-3 w-3 text-amber-200" />
            </motion.div>
          ))}
        </motion.div>

        {/* Avatar et citation */}
        <motion.div
          className="p-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
        >
          <div className="text-center mb-6">
            <div className="text-6xl mb-3">{dailyKing.avatar}</div>
            <blockquote className="text-amber-800 italic font-serif text-sm leading-relaxed bg-white/50 p-4 rounded-lg border-l-4 border-amber-400">
              "{dailyKing.quote}"
            </blockquote>
          </div>

          {/* Statistiques */}
          <div className="space-y-3 mb-6">
            <h3 className="text-lg font-semibold text-amber-800 text-center mb-4">
              Statistiques Royales
            </h3>
            {Object.entries(dailyKing.stats).map(([stat, value]) => (
              <motion.div
                key={stat}
                className="flex justify-between items-center"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.9 + Object.keys(dailyKing.stats).indexOf(stat) * 0.1 }}
              >
                <span className="capitalize text-amber-700 font-medium text-sm">
                  {stat}:
                </span>
                <div className="flex items-center space-x-3">
                  <div className="w-20 h-3 bg-amber-200 rounded-full overflow-hidden">
                    <motion.div 
                      className="h-full bg-gradient-to-r from-amber-500 to-orange-500 rounded-full"
                      initial={{ width: 0 }}
                      animate={{ width: `${Math.min(value, 100)}%` }}
                      transition={{ delay: 1 + Object.keys(dailyKing.stats).indexOf(stat) * 0.1, duration: 0.8 }}
                    />
                  </div>
                  <span className="text-amber-800 font-bold text-sm min-w-[3rem] text-right">
                    {value}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Accomplissements */}
          <motion.div
            className="space-y-3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5 }}
          >
            <h3 className="text-lg font-semibold text-amber-800 text-center mb-4 flex items-center justify-center">
              <Trophy className="h-5 w-5 mr-2" />
              Accomplissements
            </h3>
            <div className="grid gap-2">
              {dailyKing.achievements.map((achievement, index) => (
                <motion.div
                  key={achievement}
                  className="bg-gradient-to-r from-amber-200/50 to-orange-200/50 p-3 rounded-lg border border-amber-300 text-center"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 1.7 + index * 0.2 }}
                >
                  <span className="text-amber-800 font-medium text-sm">
                    {achievement}
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Victoires totales */}
          <motion.div
            className="mt-6 text-center bg-gradient-to-r from-yellow-100 to-amber-100 p-4 rounded-lg border-2 border-amber-300"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2 }}
          >
            <div className="text-2xl font-bold text-amber-800 mb-1">
              {dailyKing.totalVictories}
            </div>
            <div className="text-sm text-amber-700">
              Victoires Totales
            </div>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Message inspirant */}
      <motion.div
        className="max-w-md mx-auto mt-6 text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5 }}
      >
        <p className="text-sm text-amber-700 italic font-serif">
          "Un roi ne naît pas, il se forge dans la sagesse et l'humilité."
        </p>
      </motion.div>
    </div>
  );
};

export default KingPage;
