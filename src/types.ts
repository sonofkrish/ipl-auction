/**
 * Cricket Auction Application Types
 */

export interface Player {
  id: string;
  name: string;
  role: 'Batsman' | 'Bowler' | 'All-rounder' | 'Wicket-keeper';
  basePrice: number;
  currentPrice: number;
  performanceRating: number; // 0-100
  trialScores: number[]; // Historical trial session scores
  status: 'available' | 'sold' | 'unsold';
  assignedTeamId: string | null;
  soldPrice: number | null;
}

export interface Team {
  id: string;
  name: string;
  totalBudget: number;
  remainingBudget: number;
  players: Player[];
  colorCode: string; // For UI representation
}

export interface TrialSession {
  id: string;
  playerId: string;
  score: number; // Out of 100
  date: string;
  notes: string;
}

export interface AuctionConfig {
  numberOfTeams: number;
  initialTeamBudget: number;
  basePlayerPrice: number;
  maxPerformanceMultiplier: number;
}

export interface AuctionState {
  config: AuctionConfig;
  players: Player[];
  teams: Team[];
  trialSessions: TrialSession[];
  currentAuctionPhase: 'setup' | 'trials' | 'auction' | 'complete';
  currentPlayerIndex: number;
}
