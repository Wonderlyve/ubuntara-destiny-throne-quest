
import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, Crown, Trophy, Skull, Coins, Star, Zap, AlertTriangle } from 'lucide-react';

interface RulesPageProps {
  onBack: () => void;
}

const RulesPage: React.FC<RulesPageProps> = ({ onBack }) => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-orange-100 p-4">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-4xl mx-auto"
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <Button variant="ghost" size="sm" className="text-amber-700" onClick={onBack}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Retour
          </Button>
          <h1 className="text-3xl font-bold text-amber-800">Règles & Récompenses</h1>
          <div className="w-20" />
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Règles du Jeu */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card className="border-amber-200">
              <CardHeader>
                <CardTitle className="flex items-center text-amber-800">
                  <Star className="h-5 w-5 mr-2" />
                  Règles du Jeu
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="font-semibold text-amber-700 mb-2">Comment Jouer</h3>
                  <ul className="text-sm space-y-1 text-amber-600">
                    <li>• Parcourez 30 étapes de décision</li>
                    <li>• Chaque étape offre 7 choix possibles</li>
                    <li>• Vos stats influencent vos options</li>
                    <li>• Une seule partie par jour</li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="font-semibold text-amber-700 mb-2">Statistiques</h3>
                  <ul className="text-sm space-y-1 text-amber-600">
                    <li>• <strong>Savoir:</strong> Débloquer des choix érudits</li>
                    <li>• <strong>Force:</strong> Actions courageuses</li>
                    <li>• <strong>Charisme:</strong> Influence sociale</li>
                    <li>• <strong>Esprit:</strong> Sagesse et intuition</li>
                    <li>• <strong>Fortune:</strong> Ressources matérielles</li>
                  </ul>
                </div>

                <div className="bg-red-50 p-3 rounded-lg border border-red-200">
                  <h3 className="font-semibold text-red-700 mb-2 flex items-center">
                    <AlertTriangle className="h-4 w-4 mr-2" />
                    Fins Prématurées
                  </h3>
                  <p className="text-sm text-red-600">
                    Certaines combinaisons de choix peuvent mener à une fin prématurée : 
                    mort, emprisonnement, exil ou folie.
                  </p>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Système de Récompenses */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Card className="border-amber-200">
              <CardHeader>
                <CardTitle className="flex items-center text-amber-800">
                  <Coins className="h-5 w-5 mr-2" />
                  Récompenses
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="bg-yellow-50 p-3 rounded-lg border border-yellow-200">
                  <div className="flex items-center mb-2">
                    <Crown className="h-5 w-5 text-yellow-600 mr-2" />
                    <h3 className="font-semibold text-yellow-700">Roi Suprême</h3>
                  </div>
                  <p className="text-sm text-yellow-600 mb-1">
                    <strong>1000$ USD</strong> - Une seule combinaison gagnante par jour
                  </p>
                  <p className="text-xs text-yellow-500">
                    La combinaison change après chaque victoire
                  </p>
                </div>

                <div className="bg-green-50 p-3 rounded-lg border border-green-200">
                  <div className="flex items-center mb-2">
                    <Trophy className="h-5 w-5 text-green-600 mr-2" />
                    <h3 className="font-semibold text-green-700">Fins Victorieuses</h3>
                  </div>
                  <p className="text-sm text-green-600">
                    <strong>1$ - 10$ USD</strong> - 39 fins possibles avec petites récompenses
                  </p>
                </div>

                <div className="bg-red-50 p-3 rounded-lg border border-red-200">
                  <div className="flex items-center mb-2">
                    <Skull className="h-5 w-5 text-red-600 mr-2" />
                    <h3 className="font-semibold text-red-700">Fins Tragiques</h3>
                  </div>
                  <p className="text-sm text-red-600">
                    <strong>0$ USD</strong> - 10 fins sans récompense
                  </p>
                </div>

                <div className="bg-blue-50 p-3 rounded-lg border border-blue-200">
                  <h3 className="font-semibold text-blue-700 mb-2">Boutique</h3>
                  <p className="text-sm text-blue-600">
                    Améliorez vos stats avec vos Nzimbu pour débloquer plus d'options.
                  </p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Stratégie */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mt-6"
        >
          <Card className="border-amber-200">
            <CardHeader>
              <CardTitle className="flex items-center text-amber-800">
                <Zap className="h-5 w-5 mr-2" />
                Conseils Stratégiques
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-4 text-sm">
                <div>
                  <h4 className="font-semibold text-amber-700 mb-2">Équilibrage</h4>
                  <p className="text-amber-600">
                    Développez toutes vos statistiques de manière équilibrée pour maximiser vos options.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-amber-700 mb-2">Exploration</h4>
                  <p className="text-amber-600">
                    Essayez différentes combinaisons de choix pour découvrir toutes les fins possibles.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-amber-700 mb-2">Patience</h4>
                  <p className="text-amber-600">
                    La combinaison gagnante change quotidiennement - persévérez pour devenir roi !
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default RulesPage;
