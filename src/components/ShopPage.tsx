
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Coins, ShoppingCart, Star, Zap, MapPin } from 'lucide-react';
import { useGame } from '@/contexts/GameContext';
import { Formation, Artefact, Territory } from '@/types/game';

interface ShopPageProps {
  onBack: () => void;
}

const ShopPage: React.FC<ShopPageProps> = ({ onBack }) => {
  const { shopItems, userProfile, purchaseItem } = useGame();
  const [activeTab, setActiveTab] = useState<'formations' | 'artefacts' | 'territoires'>('formations');

  const handlePurchase = (itemId: string, itemType: 'formations' | 'artefacts' | 'territoires', price: number) => {
    const success = purchaseItem(itemId, itemType, price);
    if (success) {
      console.log(`Achat réussi: ${itemId}`);
    } else {
      console.log('Solde insuffisant');
    }
  };

  const isItemOwned = (itemId: string, itemType: 'formations' | 'artefacts' | 'territoires'): boolean => {
    if (itemType === 'formations') {
      return userProfile.inventory.formations_suivies.includes(itemId);
    } else if (itemType === 'artefacts') {
      return userProfile.inventory.artefacts.includes(itemId);
    } else if (itemType === 'territoires') {
      return userProfile.inventory.territoires_possedes.includes(itemId);
    }
    return false;
  };

  const renderFormationCard = (formation: Formation) => (
    <motion.div
      key={formation.id}
      className="bg-gradient-to-br from-amber-100 to-orange-100 rounded-lg p-4 border-2 border-amber-300 shadow-lg"
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.2 }}
    >
      <div className="flex items-center mb-2">
        <Star className="h-5 w-5 text-amber-600 mr-2" />
        <h3 className="font-bold text-amber-800">{formation.name}</h3>
      </div>
      <p className="text-sm text-amber-700 mb-3">
        +{formation.bonus} {formation.attribute}
      </p>
      <div className="flex justify-between items-center">
        <div className="flex items-center">
          <Coins className="h-4 w-4 text-amber-600 mr-1" />
          <span className="text-sm font-semibold text-amber-800">{formation.price_nz} Nz</span>
        </div>
        <Button
          size="sm"
          disabled={isItemOwned(formation.id, 'formations') || userProfile.nzimbu_balance < formation.price_nz}
          onClick={() => handlePurchase(formation.id, 'formations', formation.price_nz)}
          className="bg-amber-600 hover:bg-amber-700 text-white"
        >
          {isItemOwned(formation.id, 'formations') ? 'Acquise' : 'Acheter'}
        </Button>
      </div>
    </motion.div>
  );

  const renderArtefactCard = (artefact: Artefact) => (
    <motion.div
      key={artefact.id}
      className="bg-gradient-to-br from-purple-100 to-pink-100 rounded-lg p-4 border-2 border-purple-300 shadow-lg"
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.2 }}
    >
      <div className="flex items-center mb-2">
        <Zap className="h-5 w-5 text-purple-600 mr-2" />
        <h3 className="font-bold text-purple-800">{artefact.name}</h3>
      </div>
      <p className="text-sm text-purple-700 mb-3">{artefact.effect}</p>
      <div className="flex justify-between items-center">
        <div className="flex items-center">
          <Coins className="h-4 w-4 text-purple-600 mr-1" />
          <span className="text-sm font-semibold text-purple-800">{artefact.price_nz} Nz</span>
        </div>
        <Button
          size="sm"
          disabled={isItemOwned(artefact.id, 'artefacts') || userProfile.nzimbu_balance < artefact.price_nz}
          onClick={() => handlePurchase(artefact.id, 'artefacts', artefact.price_nz)}
          className="bg-purple-600 hover:bg-purple-700 text-white"
        >
          {isItemOwned(artefact.id, 'artefacts') ? 'Possédé' : 'Acheter'}
        </Button>
      </div>
    </motion.div>
  );

  const renderTerritoryCard = (territory: Territory) => (
    <motion.div
      key={territory.id}
      className="bg-gradient-to-br from-green-100 to-emerald-100 rounded-lg p-4 border-2 border-green-300 shadow-lg"
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.2 }}
    >
      <div className="flex items-center mb-2">
        <MapPin className="h-5 w-5 text-green-600 mr-2" />
        <h3 className="font-bold text-green-800">{territory.name}</h3>
      </div>
      <p className="text-xs text-green-700 mb-1">{territory.type}</p>
      <p className="text-sm text-green-700 mb-3">+{territory.income_per_week} Nz/semaine</p>
      <div className="flex justify-between items-center">
        <div className="flex items-center">
          <Coins className="h-4 w-4 text-green-600 mr-1" />
          <span className="text-sm font-semibold text-green-800">{territory.price_nz} Nz</span>
        </div>
        <Button
          size="sm"
          disabled={isItemOwned(territory.id, 'territoires') || userProfile.nzimbu_balance < territory.price_nz}
          onClick={() => handlePurchase(territory.id, 'territoires', territory.price_nz)}
          className="bg-green-600 hover:bg-green-700 text-white"
        >
          {isItemOwned(territory.id, 'territoires') ? 'Possédé' : 'Acheter'}
        </Button>
      </div>
    </motion.div>
  );

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
          <Coins className="h-5 w-5 text-amber-600" />
          <span className="font-bold text-amber-800">{userProfile.nzimbu_balance} Nz</span>
        </div>
      </motion.div>

      {/* Titre */}
      <motion.h1
        className="text-2xl font-bold text-amber-800 mb-6 text-center font-serif"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        Formation & Boutique
      </motion.h1>

      {/* Tabs */}
      <motion.div
        className="flex mb-6 bg-white/50 rounded-lg p-1 border border-amber-200"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        {(['formations', 'artefacts', 'territoires'] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all ${
              activeTab === tab
                ? 'bg-amber-200 text-amber-800 shadow-sm'
                : 'text-amber-600 hover:bg-amber-100'
            }`}
          >
            {tab === 'formations' && 'Formations'}
            {tab === 'artefacts' && 'Artefacts'}
            {tab === 'territoires' && 'Territoires'}
          </button>
        ))}
      </motion.div>

      {/* Contenu */}
      <motion.div
        className="grid grid-cols-1 gap-4 max-w-md mx-auto"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        {activeTab === 'formations' && shopItems.formations.map(renderFormationCard)}
        {activeTab === 'artefacts' && shopItems.artefacts.map(renderArtefactCard)}
        {activeTab === 'territoires' && shopItems.territoires.map(renderTerritoryCard)}
      </motion.div>
    </div>
  );
};

export default ShopPage;
