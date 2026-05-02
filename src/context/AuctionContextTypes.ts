import { createContext } from 'react';
import type { AuctionState, AuctionConfig, Player } from '../types';

export interface AuctionContextType {
  state: AuctionState;
  initializeTeams: () => void;
  addPlayer: (player: Omit<Player, 'id'>) => void;
  addTrialScore: (playerId: string, score: number, notes: string) => void;
  updatePlayerPrice: (playerId: string, newPrice: number) => void;
  soldPlayer: (playerId: string, teamId: string, soldPrice: number) => void;
  updateConfig: (config: Partial<AuctionConfig>) => void;
  setAuctionPhase: (phase: AuctionState['currentAuctionPhase']) => void;
  resetAuction: () => void;
}

export const AuctionContext = createContext<AuctionContextType | undefined>(undefined);
