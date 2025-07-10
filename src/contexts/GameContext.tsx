
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
  const [storyData, setStoryData] = useState<StoryData>(() => GameService.getStoryData());
  const [shopItems, setShopItems] = useState<ShopItems>(() => GameService.getShopItems());
  const [userProfile, setUserProfile] = useState<UserProfile>(() => GameService.getUserProfile());
  const [dailyWinner, setDailyWinner] = useState<DailyWinner>(() => GameService.getDailyWinner());
  const [currentNode, setCurrentNode] = useState<string>(() => GameService.getUserProfile().daily_progress.current_node);

  const updateUserProfile = (profile: UserProfile) => {
    setUserProfile(profile);
    GameService.saveUserProfile(profile);
  };

  const updateCurrentNode = (nodeId: string) => {
    setCurrentNode(nodeId);
    const updatedProfile = { ...userProfile };
    updatedProfile.daily_progress.current_node = nodeId;
    updateUserProfile(updatedProfile);
  };

  const purchaseItem = (itemId: string, itemType: 'formations' | 'artefacts' | 'territoires', price: number): boolean => {
    const success = GameService.purchaseItem(itemId, itemType, price);
    if (success) {
      setUserProfile(GameService.getUserProfile());
    }
    return success;
  };

  const refreshData = () => {
    setStoryData(GameService.getStoryData());
    setShopItems(GameService.getShopItems());
    setUserProfile(GameService.getUserProfile());
    setDailyWinner(GameService.getDailyWinner());
    setCurrentNode(GameService.getUserProfile().daily_progress.current_node);
  };

  const calculateGameResult = (nodeId: string): GameResult => {
    return RewardService.calculateGameResult(nodeId, userProfile);
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
