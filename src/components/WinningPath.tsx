
import React from 'react';
import { Card } from '@/components/ui/card';
import { Crown, ArrowRight, Star } from 'lucide-react';

const WinningPath = () => {
  const winningSteps = [
    { step: 1, choice: "Accepter la quête du roi", requirement: "Aucun" },
    { step: 2, choice: "Choisir l'épée enchantée", requirement: "Force: 5" },
    { step: 3, choice: "Traverser la forêt dangereuse", requirement: "Sagesse: 3" },
    { step: 4, choice: "Négocier avec les bandits", requirement: "Richesse: 10" },
    { step: 5, choice: "Libérer le dragon", requirement: "Force: 15, Sagesse: 10" },
    { step: 6, choice: "Unir les tribus", requirement: "Charisme: 20" },
    { step: 7, choice: "Affronter le roi déchu", requirement: "Force: 25, Sagesse: 15" },
    { step: 8, choice: "Choisir la voie de la justice", requirement: "Sagesse: 20" },
    { step: 9, choice: "Accepter la couronne suprême", requirement: "Tous stats > 20" }
  ];

  return (
    <Card className="gaming-card gaming-gradient-dark border-purple-400/30 p-6 max-w-4xl mx-auto">
      <div className="text-center mb-6">
        <Crown className="h-12 w-12 text-yellow-500 mx-auto mb-4 animate-pulse" />
        <h2 className="text-2xl font-bold text-white mb-2">Parcours pour Devenir Roi Suprême</h2>
        <p className="text-white/70">Voici le chemin optimal pour atteindre la victoire ultime</p>
      </div>

      <div className="space-y-4">
        {winningSteps.map((step, index) => (
          <div key={step.step} className="flex items-center space-x-4 p-4 bg-gradient-to-r from-purple-500/10 to-blue-500/10 rounded-lg border border-purple-400/20">
            <div className="flex-shrink-0 w-8 h-8 bg-purple-500/30 rounded-full flex items-center justify-center">
              <span className="text-purple-300 font-bold text-sm">{step.step}</span>
            </div>
            
            <div className="flex-1">
              <h3 className="text-white font-semibold text-sm">{step.choice}</h3>
              <p className="text-purple-300 text-xs mt-1">Prérequis: {step.requirement}</p>
            </div>

            {index < winningSteps.length - 1 && (
              <ArrowRight className="h-4 w-4 text-purple-400" />
            )}
            
            {index === winningSteps.length - 1 && (
              <Star className="h-5 w-5 text-yellow-400 animate-pulse" />
            )}
          </div>
        ))}
      </div>

      <div className="mt-6 p-4 bg-gradient-to-r from-yellow-500/20 to-orange-500/20 rounded-lg border border-yellow-400/30">
        <div className="text-center">
          <Crown className="h-6 w-6 text-yellow-400 mx-auto mb-2" />
          <h3 className="text-yellow-300 font-bold mb-1">Récompense Finale</h3>
          <p className="text-yellow-200 text-sm">Titre de Roi Suprême + 1000 Nz + $1000 USD équivalent</p>
        </div>
      </div>

      <div className="mt-4 text-center text-white/60 text-xs">
        <p>💡 Astuce: Accumule tes ressources progressivement en faisant des choix stratégiques</p>
      </div>
    </Card>
  );
};

export default WinningPath;
