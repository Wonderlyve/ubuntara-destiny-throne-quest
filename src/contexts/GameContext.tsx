
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { StoryData, ShopItems, UserProfile, DailyWinner, GameResult } from '@/types/game';
import { GameService } from '@/services/gameService';
import { RewardService } from '@/services/rewardService';

interface GameContextType {
  storyData: StoryData;
  shopItems: ShopItems;
  userProfile: UserProfile;
  dailyWinner: DailyWinner;
  currentNode: string;
  updateUserProfile: (profile: UserProfile) => void;
  updateCurrentNode: (nodeId: string) => void;
  purchaseItem: (itemId: string, itemType: 'formations' | 'artefacts' | 'territoires', price: number) => boolean;
  refreshData: () => void;
  calculateGameResult: (nodeId: string) => GameResult;
}

const GameContext = createContext<GameContextType | undefined>(undefined);

export const useGame = () => {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error('useGame must be used within a GameProvider');
  }
  return context;
};

interface GameProviderProps {
  children: ReactNode;
}

export const GameProvider: React.FC<GameProviderProps> = ({ children }) => {
  // Initialize with default values to prevent undefined errors
  const [storyData, setStoryData] = useState<StoryData>(() => {
    try {
      return GameService.getStoryData();
    } catch (error) {
      console.error('Error loading story data:', error);
      return {
        start: "1",
        nodes: {
          "1": {
            title: "Début de l'aventure",
            text: "Votre histoire commence...",
            choices: []
          }
        }
      };
    }
  });

  const [shopItems, setShopItems] = useState<ShopItems>(() => {
    try {
      return GameService.getShopItems();
    } catch (error) {
      console.error('Error loading shop items:', error);
      return {
        formations: [],
        artefacts: [],
        territoires: []
      };
    }
  });

  const [userProfile, setUserProfile] = useState<UserProfile>(() => {
    try {
      return GameService.getUserProfile();
    } catch (error) {
      console.error('Error loading user profile:', error);
      return {
        username: "Joueur",
        nzimbu_balance: 100,
        stats: {
          savoir: 10,
          force: 10,
          charisme: 10,
          esprit: 10,
          fortune: 10
        },
        inventory: {
          formations_suivies: [],
          artefacts: [],
          territoires_possedes: []
        },
        daily_progress: {
          current_node: "1",
          choices_made: []
        },
        has_played_today: false
      };
    }
  });

  const [dailyWinner, setDailyWinner] = useState<DailyWinner>(() => {
    try {
      return GameService.getDailyWinner();
    } catch (error) {
      console.error('Error loading daily winner:', error);
      return {
        username: "Personne",
        title: "Aucun roi aujourd'hui",
        nzimbu_reward: 0,
        usd_equivalent: 0,
        date: new Date().toISOString(),
        stats: {
          savoir: 0,
          force: 0,
          charisme: 0,
          esprit: 0,
          fortune: 0
        }
      };
    }
  });

  const [currentNode, setCurrentNode] = useState<string>(() => {
    try {
      return GameService.getUserProfile().daily_progress.current_node;
    } catch (error) {
      console.error('Error loading current node:', error);
      return "1";
    }
  });

  const updateUserProfile = (profile: UserProfile) => {
    try {
      setUserProfile(profile);
      GameService.saveUserProfile(profile);
    } catch (error) {
      console.error('Error updating user profile:', error);
    }
  };

  const updateCurrentNode = (nodeId: string) => {
    try {
      setCurrentNode(nodeId);
      const updatedProfile = { ...userProfile };
      updatedProfile.daily_progress.current_node = nodeId;
      updateUserProfile(updatedProfile);
    } catch (error) {
      console.error('Error updating current node:', error);
    }
  };

  const purchaseItem = (itemId: string, itemType: 'formations' | 'artefacts' | 'territoires', price: number): boolean => {
    try {
      const success = GameService.purchaseItem(itemId, itemType, price);
      if (success) {
        setUserProfile(GameService.getUserProfile());
      }
      return success;
    } catch (error) {
      console.error('Error purchasing item:', error);
      return false;
    }
  };

  const refreshData = () => {
    try {
      setStoryData(GameService.getStoryData());
      setShopItems(GameService.getShopItems());
      setUserProfile(GameService.getUserProfile());
      setDailyWinner(GameService.getDailyWinner());
      setCurrentNode(GameService.getUserProfile().daily_progress.current_node);
    } catch (error) {
      console.error('Error refreshing data:', error);
    }
  };

  const calculateGameResult = (nodeId: string): GameResult => {
    try {
      return RewardService.calculateGameResult(nodeId, userProfile);
    } catch (error) {
      console.error('Error calculating game result:', error);
      return {
        isWinner: false,
        nzimbu_reward: 0,
        usd_equivalent: 0,
        destiny_title: "Erreur",
        ending_description: "Une erreur s'est produite"
      };
    }
  };

  return (
    <GameContext.Provider
      value={{
        storyData,
        shopItems,
        userProfile,
        dailyWinner,
        currentNode,
        updateUserProfile,
        updateCurrentNode,
        purchaseItem,
        refreshData,
        calculateGameResult,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};
