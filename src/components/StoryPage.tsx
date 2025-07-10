
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Star } from 'lucide-react';

interface Choice {
  id: number;
  text: string;
  consequence: string;
}

interface StoryStep {
  id: number;
  title: string;
  content: string;
  image?: string;
  choices: Choice[];
  wisdom?: string;
}

const StoryPage = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [userStats, setUserStats] = useState({
    savoir: 50,
    force: 45,
    charisme: 60,
    esprit: 55,
    fortune: 100
  });

  // Histoire d'exemple
  const storySteps: StoryStep[] = [
    {
      id: 0,
      title: "L'Appel du Destin",
      content: "Au cœur de l'Afrique mystique, dans le royaume d'Ubuntara, un appel résonne dans ton esprit. Les anciens esprits te murmurent qu'aujourd'hui, le trône du pouvoir peut être tien. Mais le chemin vers la royauté est semé d'épreuves...",
      choices: [
        { id: 1, text: "Écouter attentivement les esprits", consequence: "+10 Esprit" },
        { id: 2, text: "Se préparer physiquement au combat", consequence: "+10 Force" },
        { id: 3, text: "Consulter les sages du village", consequence: "+10 Savoir" },
        { id: 4, text: "Rassembler des alliés fidèles", consequence: "+10 Charisme" },
        { id: 5, text: "Vérifier ses ressources", consequence: "+50 Fortune" },
        { id: 6, text: "Méditer sur ses intentions", consequence: "+5 Esprit, +5 Savoir" },
        { id: 7, text: "Ignorer l'appel et continuer sa route", consequence: "Aucun bonus" }
      ],
      wisdom: "La sagesse commence par l'écoute de son cœur et de ses ancêtres."
    }
  ];

  const currentStoryStep = storySteps[currentStep];

  const handleChoice = (choice: Choice) => {
    console.log(`Choix sélectionné: ${choice.text}`);
    // Ici on appliquerait les conséquences sur les stats
    // setUserStats(prev => ({ ...prev, ... }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-orange-100 p-4">
      {/* Header avec retour */}
      <motion.div
        className="flex items-center justify-between mb-6"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <Button variant="ghost" size="sm" className="text-amber-700">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Retour
        </Button>
        <div className="flex items-center space-x-2">
          <Star className="h-5 w-5 text-amber-500" />
          <span className="text-sm font-medium text-amber-700">Étape {currentStep + 1}</span>
        </div>
      </motion.div>

      {/* Page de livre */}
      <motion.div
        className="max-w-md mx-auto bg-gradient-to-br from-amber-50 to-orange-50 rounded-xl shadow-2xl border-4 border-amber-200 p-6"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        {/* Titre de l'étape */}
        <motion.h1 
          className="text-2xl font-bold text-amber-800 mb-4 text-center font-serif"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          {currentStoryStep.title}
        </motion.h1>

        {/* Contenu narratif */}
        <motion.div
          className="bg-white/50 rounded-lg p-4 mb-6 border-l-4 border-amber-400"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
        >
          <p className="text-amber-800 leading-relaxed font-serif text-sm">
            {currentStoryStep.content}
          </p>
        </motion.div>

        {/* Choix disponibles */}
        <motion.div
          className="space-y-3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
        >
          <h3 className="text-lg font-semibold text-amber-700 mb-3 text-center">
            Quel est ton choix ?
          </h3>
          
          {currentStoryStep.choices.map((choice, index) => (
            <motion.div
              key={choice.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 + index * 0.1 }}
            >
              <Button
                variant="outline"
                className="w-full p-3 h-auto text-left bg-gradient-to-r from-amber-100 to-orange-100 hover:from-amber-200 hover:to-orange-200 border-amber-300 rounded-lg transition-all duration-300 hover:shadow-md"
                onClick={() => handleChoice(choice)}
              >
                <div className="w-full">
                  <div className="font-medium text-amber-800 text-sm mb-1">
                    {choice.text}
                  </div>
                  <div className="text-xs text-amber-600 italic">
                    → {choice.consequence}
                  </div>
                </div>
              </Button>
            </motion.div>
          ))}
        </motion.div>

        {/* Sagesse africaine */}
        {currentStoryStep.wisdom && (
          <motion.div
            className="mt-6 p-3 bg-gradient-to-r from-amber-200/50 to-orange-200/50 rounded-lg border border-amber-300"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5 }}
          >
            <p className="text-xs text-amber-700 italic text-center font-serif">
              💡 {currentStoryStep.wisdom}
            </p>
          </motion.div>
        )}
      </motion.div>

      {/* Stats du joueur en bas */}
      <motion.div
        className="max-w-md mx-auto mt-6 bg-white/80 rounded-lg p-4 border border-amber-200"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1 }}
      >
        <div className="grid grid-cols-2 gap-3 text-xs">
          {Object.entries(userStats).map(([stat, value]) => (
            <div key={stat} className="flex justify-between items-center">
              <span className="capitalize text-amber-700 font-medium">{stat}:</span>
              <div className="flex items-center space-x-2">
                <div className="w-12 h-2 bg-amber-200 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-amber-400 to-orange-400 rounded-full transition-all duration-500"
                    style={{ width: `${Math.min(value, 100)}%` }}
                  />
                </div>
                <span className="text-amber-800 font-bold">{value}</span>
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default StoryPage;
