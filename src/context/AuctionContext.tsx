import React, { useState } from 'react';
import type { ReactNode } from 'react';
import type { AuctionState, AuctionConfig, Player, Team, TrialSession } from '../types';
import { AuctionContext } from './AuctionContextTypes';

const DEFAULT_CONFIG: AuctionConfig = {
  numberOfTeams: 4,
  initialTeamBudget: 10000000, // 10 Crores
  basePlayerPrice: 500000, // 5 Lakhs
  maxPerformanceMultiplier: 3,
};

const TEAM_COLORS = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#FFA07A'];
const TEAM_NAMES = ['Phoenix', 'Tigers', 'Eagles', 'Lions'];

const initialState: AuctionState = {
  config: DEFAULT_CONFIG,
  players: [],
  teams: [],
  trialSessions: [],
  currentAuctionPhase: 'setup',
  currentPlayerIndex: 0,
};

export const AuctionProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, setState] = useState<AuctionState>(initialState);

  const initializeTeams = () => {
    const newTeams: Team[] = Array.from({ length: state.config.numberOfTeams }, (_, i) => ({
      id: `team-${i + 1}`,
      name: TEAM_NAMES[i] || `Team ${i + 1}`,
      totalBudget: state.config.initialTeamBudget,
      remainingBudget: state.config.initialTeamBudget,
      players: [],
      colorCode: TEAM_COLORS[i] || '#999999',
    }));

    setState((prev) => ({
      ...prev,
      teams: newTeams,
      currentAuctionPhase: 'trials',
    }));
  };

  const addPlayer = (playerData: Omit<Player, 'id'>) => {
    const newPlayer: Player = {
      ...playerData,
      id: `player-${Date.now()}`,
      currentPrice: playerData.basePrice,
    };

    setState((prev) => ({
      ...prev,
      players: [...prev.players, newPlayer],
    }));
  };

  const addTrialScore = (playerId: string, score: number, notes: string) => {
    const newTrialSession: TrialSession = {
      id: `trial-${Date.now()}`,
      playerId,
      score,
      date: new Date().toISOString(),
      notes,
    };

    setState((prev) => {
      const updatedPlayers = prev.players.map((p) => {
        if (p.id === playerId) {
          // Update performance rating based on trial scores
          const allScores = [...p.trialScores, score];
          const avgScore = allScores.reduce((a, b) => a + b, 0) / allScores.length;

          // Calculate price multiplier based on performance
          const multiplier = Math.min(
            1 + (avgScore / 100) * (prev.config.maxPerformanceMultiplier - 1),
            prev.config.maxPerformanceMultiplier
          );

          return {
            ...p,
            performanceRating: avgScore,
            trialScores: allScores,
            currentPrice: Math.ceil(p.basePrice * multiplier),
          };
        }
        return p;
      });

      return {
        ...prev,
        players: updatedPlayers,
        trialSessions: [...prev.trialSessions, newTrialSession],
      };
    });
  };

  const updatePlayerPrice = (playerId: string, newPrice: number) => {
    setState((prev) => ({
      ...prev,
      players: prev.players.map((p) =>
        p.id === playerId ? { ...p, currentPrice: newPrice } : p
      ),
    }));
  };

  const soldPlayer = (playerId: string, teamId: string, soldPrice: number) => {
    setState((prev) => {
      const updatedPlayers = prev.players.map((p) =>
        p.id === playerId
          ? {
              ...p,
              status: 'sold' as const,
              assignedTeamId: teamId,
              soldPrice,
            }
          : p
      );

      const soldPlayer = updatedPlayers.find((p) => p.id === playerId);

      const updatedTeams = prev.teams.map((t) => {
        if (t.id === teamId && soldPlayer) {
          return {
            ...t,
            remainingBudget: t.remainingBudget - soldPrice,
            players: [...t.players, soldPlayer],
          };
        }
        return t;
      });

      return {
        ...prev,
        players: updatedPlayers,
        teams: updatedTeams,
      };
    });
  };

  const updateConfig = (config: Partial<AuctionConfig>) => {
    setState((prev) => ({
      ...prev,
      config: { ...prev.config, ...config },
    }));
  };

  const setAuctionPhase = (phase: AuctionState['currentAuctionPhase']) => {
    setState((prev) => ({
      ...prev,
      currentAuctionPhase: phase,
    }));
  };

  const resetAuction = () => {
    setState(initialState);
  };

  return (
    <AuctionContext.Provider
      value={{
        state,
        initializeTeams,
        addPlayer,
        addTrialScore,
        updatePlayerPrice,
        soldPlayer,
        updateConfig,
        setAuctionPhase,
        resetAuction,
      }}
    >
      {children}
    </AuctionContext.Provider>
  );
};
