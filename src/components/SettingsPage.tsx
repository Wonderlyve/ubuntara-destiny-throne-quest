
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Slider } from '@/components/ui/slider';
import { ArrowLeft, Settings, Volume2, VolumeX, Palette, RotateCcw, AlertTriangle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface SettingsPageProps {
  onBack: () => void;
}

interface GameSettings {
  soundEnabled: boolean;
  musicVolume: number;
  effectsVolume: number;
  animationsEnabled: boolean;
  autoSave: boolean;
  darkMode: boolean;
  fontSize: number;
}

const SettingsPage: React.FC<SettingsPageProps> = ({ onBack }) => {
  const { toast } = useToast();
  const [settings, setSettings] = useState<GameSettings>({
    soundEnabled: true,
    musicVolume: 70,
    effectsVolume: 80,
    animationsEnabled: true,
    autoSave: true,
    darkMode: false,
    fontSize: 16
  });

  // Charger les paramètres depuis localStorage
  useEffect(() => {
    const savedSettings = localStorage.getItem('ubuntara_settings');
    if (savedSettings) {
      setSettings(JSON.parse(savedSettings));
    }
  }, []);

  // Sauvegarder les paramètres
  const saveSettings = (newSettings: GameSettings) => {
    setSettings(newSettings);
    localStorage.setItem('ubuntara_settings', JSON.stringify(newSettings));
    toast({
      title: "Paramètres sauvegardés",
      description: "Vos préférences ont été enregistrées.",
    });
  };

  const handleSettingChange = (key: keyof GameSettings, value: any) => {
    const newSettings = { ...settings, [key]: value };
    saveSettings(newSettings);
  };

  const resetSettings = () => {
    const defaultSettings: GameSettings = {
      soundEnabled: true,
      musicVolume: 70,
      effectsVolume: 80,
      animationsEnabled: true,
      autoSave: true,
      darkMode: false,
      fontSize: 16
    };
    saveSettings(defaultSettings);
    toast({
      title: "Paramètres réinitialisés",
      description: "Les paramètres par défaut ont été restaurés.",
    });
  };

  const clearGameData = () => {
    if (window.confirm("Êtes-vous sûr de vouloir effacer toutes vos données de jeu ? Cette action est irréversible.")) {
      localStorage.removeItem('ubuntara_user_profile');
      localStorage.removeItem('ubuntara_daily_progress');
      localStorage.removeItem('ubuntara_lottery_path');
      localStorage.removeItem('ubuntara_lottery_winner');
      toast({
        title: "Données effacées",
        description: "Toutes vos données de jeu ont été supprimées.",
        variant: "destructive"
      });
    }
  };

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
          <h1 className="text-3xl font-bold text-amber-800">Paramètres</h1>
          <div className="w-20" />
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Audio */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card className="border-amber-200">
              <CardHeader>
                <CardTitle className="flex items-center text-amber-800">
                  <Volume2 className="h-5 w-5 mr-2" />
                  Audio
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="font-medium text-amber-700">Son activé</span>
                    <p className="text-sm text-amber-600">Activer/désactiver tous les sons</p>
                  </div>
                  <Switch
                    checked={settings.soundEnabled}
                    onCheckedChange={(checked) => handleSettingChange('soundEnabled', checked)}
                  />
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="font-medium text-amber-700">Volume musique</span>
                    <span className="text-sm text-amber-600">{settings.musicVolume}%</span>
                  </div>
                  <Slider
                    value={[settings.musicVolume]}
                    onValueChange={(value) => handleSettingChange('musicVolume', value[0])}
                    max={100}
                    step={10}
                    className="w-full"
                    disabled={!settings.soundEnabled}
                  />
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="font-medium text-amber-700">Volume effets</span>
                    <span className="text-sm text-amber-600">{settings.effectsVolume}%</span>
                  </div>
                  <Slider
                    value={[settings.effectsVolume]}
                    onValueChange={(value) => handleSettingChange('effectsVolume', value[0])}
                    max={100}
                    step={10}
                    className="w-full"
                    disabled={!settings.soundEnabled}
                  />
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Interface */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Card className="border-amber-200">
              <CardHeader>
                <CardTitle className="flex items-center text-amber-800">
                  <Palette className="h-5 w-5 mr-2" />
                  Interface
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="font-medium text-amber-700">Animations</span>
                    <p className="text-sm text-amber-600">Activer les animations visuelles</p>
                  </div>
                  <Switch
                    checked={settings.animationsEnabled}
                    onCheckedChange={(checked) => handleSettingChange('animationsEnabled', checked)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <span className="font-medium text-amber-700">Mode sombre</span>
                    <p className="text-sm text-amber-600">Interface en mode sombre</p>
                  </div>
                  <Switch
                    checked={settings.darkMode}
                    onCheckedChange={(checked) => handleSettingChange('darkMode', checked)}
                  />
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="font-medium text-amber-700">Taille du texte</span>
                    <span className="text-sm text-amber-600">{settings.fontSize}px</span>
                  </div>
                  <Slider
                    value={[settings.fontSize]}
                    onValueChange={(value) => handleSettingChange('fontSize', value[0])}
                    min={12}
                    max={24}
                    step={2}
                    className="w-full"
                  />
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Jeu */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6 }}
          >
            <Card className="border-amber-200">
              <CardHeader>
                <CardTitle className="flex items-center text-amber-800">
                  <Settings className="h-5 w-5 mr-2" />
                  Gameplay
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="font-medium text-amber-700">Sauvegarde automatique</span>
                    <p className="text-sm text-amber-600">Sauvegarder automatiquement les progrès</p>
                  </div>
                  <Switch
                    checked={settings.autoSave}
                    onCheckedChange={(checked) => handleSettingChange('autoSave', checked)}
                  />
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Actions dangereuses */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.8 }}
          >
            <Card className="border-red-200">
              <CardHeader>
                <CardTitle className="flex items-center text-red-800">
                  <AlertTriangle className="h-5 w-5 mr-2" />
                  Zone de Danger
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button
                  onClick={resetSettings}
                  variant="outline"
                  className="w-full border-amber-300 text-amber-700 hover:bg-amber-100"
                >
                  <RotateCcw className="h-4 w-4 mr-2" />
                  Réinitialiser les paramètres
                </Button>
                
                <Button
                  onClick={clearGameData}
                  variant="destructive"
                  className="w-full"
                >
                  <AlertTriangle className="h-4 w-4 mr-2" />
                  Effacer toutes les données
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Info version */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.0 }}
          className="mt-6 text-center text-sm text-amber-600"
        >
          <p>Ubuntara - Version 1.0.0</p>
          <p>Développé avec ❤️ pour l'aventure et la découverte</p>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default SettingsPage;
