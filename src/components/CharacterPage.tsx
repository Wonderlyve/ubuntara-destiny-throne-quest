
import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowLeft, User, Star, Coins, Trophy, MapPin, Zap } from 'lucide-react';
import { useGame } from '@/contexts/GameContext';

interface CharacterPageProps {
  onBack: () => void;
}

const CharacterPage: React.FC<CharacterPageProps> = ({ onBack }) => {
  const { userProfile, shopItems } = useGame();

  const getFormationName = (formationId: string) => {
    const formation = shopItems.formations.find(f => f.id === formationId);
    return formation ? formation.name : 'Formation inconnue';
  };

  const getArtefactName = (artefactId: string) => {
    const artefact = shopItems.artefacts.find(a => a.id === artefactId);
    return artefact ? artefact.name : 'Artefact inconnu';
  };

  const getTerritoryName = (territoryId: string) => {
    const territory = shopItems.territoires.find(t => t.id === territoryId);
    return territory ? territory.name : 'Territoire inconnu';
  };

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
          <User className="h-5 w-5 text-amber-600" />
          <span className="font-bold text-amber-800">{userProfile.username}</span>
        </div>
      </motion.div>

      <div className="max-w-md mx-auto space-y-6">
        {/* Profil */}
        <motion.div
          className="bg-gradient-to-br from-amber-100 to-orange-100 rounded-xl p-6 border-2 border-amber-300 shadow-lg"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
        >
          <div className="text-center mb-4">
            <div className="w-16 h-16 bg-amber-300 rounded-full mx-auto mb-3 flex items-center justify-center">
              <User className="h-8 w-8 text-amber-800" />
            </div>
            <h2 className="text-xl font-bold text-amber-800 font-serif">{userProfile.username}</h2>
            <div className="flex items-center justify-center mt-2">
              <Coins className="h-4 w-4 text-amber-600 mr-1" />
              <span className="font-semibold text-amber-700">{userProfile.nzimbu_balance} Nzimbu</span>
            </div>
          </div>
        </motion.div>

        {/* Stats */}
        <motion.div
          className="bg-white/80 rounded-lg p-4 border border-amber-200 shadow-md"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <h3 className="text-lg font-bold text-amber-800 mb-4 text-center">Statistiques</h3>
          <div className="space-y-3">
            {Object.entries(userProfile.stats).map(([stat, value]) => (
              <div key={stat} className="flex justify-between items-center">
                <span className="capitalize text-amber-700 font-medium">{stat}:</span>
                <div className="flex items-center space-x-2">
                  <div className="w-16 h-2 bg-amber-200 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-amber-400 to-orange-400 rounded-full transition-all duration-500"
                      style={{ width: `${Math.min((value / 100) * 100, 100)}%` }}
                    />
                  </div>
                  <span className="text-amber-800 font-bold text-sm w-8">{value}</span>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Inventaire */}
        <motion.div
          className="bg-white/80 rounded-lg p-4 border border-amber-200 shadow-md"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <h3 className="text-lg font-bold text-amber-800 mb-4 text-center">Inventaire</h3>
          
          {/* Formations */}
          {userProfile.inventory.formations_suivies.length > 0 && (
            <div className="mb-4">
              <div className="flex items-center mb-2">
                <Star className="h-4 w-4 text-amber-600 mr-1" />
                <span className="text-sm font-semibold text-amber-700">Formations</span>
              </div>
              <div className="space-y-1">
                {userProfile.inventory.formations_suivies.map((formationId) => (
                  <div key={formationId} className="text-xs text-amber-600 bg-amber-50 rounded px-2 py-1">
                    {getFormationName(formationId)}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Artefacts */}
          {userProfile.inventory.artefacts.length > 0 && (
            <div className="mb-4">
              <div className="flex items-center mb-2">
                <Zap className="h-4 w-4 text-purple-600 mr-1" />
                <span className="text-sm font-semibold text-purple-700">Artefacts</span>
              </div>
              <div className="space-y-1">
                {userProfile.inventory.artefacts.map((artefactId) => (
                  <div key={artefactId} className="text-xs text-purple-600 bg-purple-50 rounded px-2 py-1">
                    {getArtefactName(artefactId)}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Territoires */}
          {userProfile.inventory.territoires_possedes.length > 0 && (
            <div className="mb-4">
              <div className="flex items-center mb-2">
                <MapPin className="h-4 w-4 text-green-600 mr-1" />
                <span className="text-sm font-semibold text-green-700">Territoires</span>
              </div>
              <div className="space-y-1">
                {userProfile.inventory.territoires_possedes.map((territoryId) => (
                  <div key={territoryId} className="text-xs text-green-600 bg-green-50 rounded px-2 py-1">
                    {getTerritoryName(territoryId)}
                  </div>
                ))}
              </div>
            </div>
          )}

          {userProfile.inventory.formations_suivies.length === 0 && 
           userProfile.inventory.artefacts.length === 0 && 
           userProfile.inventory.territoires_possedes.length === 0 && (
            <p className="text-center text-amber-600 text-sm italic">Aucun objet dans l'inventaire</p>
          )}
        </motion.div>

        {/* Progression */}
        <motion.div
          className="bg-white/80 rounded-lg p-4 border border-amber-200 shadow-md"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <h3 className="text-lg font-bold text-amber-800 mb-4 text-center">Progression du Jour</h3>
          <div className="text-center">
            <div className="flex items-center justify-center mb-2">
              <Trophy className="h-5 w-5 text-amber-600 mr-2" />
              <span className="text-amber-700">Étape actuelle: {userProfile.daily_progress.current_node}</span>
            </div>
            <p className="text-xs text-amber-600">
              {userProfile.daily_progress.choices_made.length} choix effectués
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default CharacterPage;
