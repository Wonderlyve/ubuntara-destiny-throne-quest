
export interface StoryChoice {
  text: string;
  next: string;
}

export interface StoryNode {
  title: string;
  text: string;
  choices: StoryChoice[];
}

export interface StoryData {
  title: string;
  description: string;
  start: string;
  nodes: Record<string, StoryNode>;
}

export interface UserStats {
  savoir: number;
  force: number;
  charisme: number;
  esprit: number;
  fortune: number;
}

export interface Formation {
  id: string;
  name: string;
  attribute: keyof UserStats;
  bonus: number;
  price_nz: number;
}

export interface Artefact {
  id: string;
  name: string;
  effect: string;
  price_nz: number;
}

export interface Territory {
  id: string;
  name: string;
  type: string;
  income_per_week: number;
  price_nz: number;
}

export interface ShopItems {
  formations: Formation[];
  artefacts: Artefact[];
  territoires: Territory[];
}

export interface UserProfile {
  user_id: string;
  username: string;
  created_at: string;
  stats: UserStats;
  nzimbu_balance: number;
  inventory: {
    artefacts: string[];
    formations_suivies: string[];
    territoires_possedes: string[];
  };
  daily_progress: {
    current_node: string;
    choices_made: string[];
  };
  achievements: string[];
  has_played_today: boolean;
}

export interface DailyWinner {
  date: string;
  user_id: string;
  username: string;
  title: string;
  stats: UserStats;
  final_path: string[];
  nzimbu_reward: number;
  usd_equivalent: number;
  portrait_url: string;
}
