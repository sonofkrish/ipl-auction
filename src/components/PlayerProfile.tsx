import React, { useState } from 'react';
import type { Player, TrialSession } from '../types';
import '../styles/PlayerProfile.css';

interface PlayerProfileProps {
  player: Player;
  trialSessions: TrialSession[];
}

export const PlayerProfile: React.FC<PlayerProfileProps> = ({ player, trialSessions }) => {
  const [showTrials, setShowTrials] = useState(false);

  const playerTrials = trialSessions.filter((t) => t.playerId === player.id);

  const roleColors: Record<string, string> = {
    'Batsman': '#FF6B6B',
    'Bowler': '#4ECDC4',
    'All-rounder': '#45B7D1',
    'Wicket-keeper': '#FFA07A',
  };

  const statusBadges: Record<string, string> = {
    'available': 'badge-available',
    'sold': 'badge-sold',
    'unsold': 'badge-unsold',
  };

  const getRatingColor = (rating: number) => {
    if (rating >= 80) return '#27ae60'; // Green
    if (rating >= 60) return '#f39c12'; // Orange
    return '#e74c3c'; // Red
  };

  return (
    <div className="player-profile">
      <div className="profile-header">
        <div className="player-info">
          <h3>{player.name}</h3>
          <span
            className="role-badge"
            style={{ backgroundColor: roleColors[player.role] }}
          >
            {player.role}
          </span>
          <span className={`status-badge ${statusBadges[player.status]}`}>
            {player.status.toUpperCase()}
          </span>
        </div>

        <div className="performance-rating">
          <div className="rating-circle" style={{ backgroundColor: getRatingColor(player.performanceRating) }}>
            <span className="rating-value">{player.performanceRating.toFixed(1)}</span>
          </div>
          <p className="rating-label">Performance</p>
        </div>
      </div>

      <div className="profile-body">
        <div className="price-section">
          <div className="price-item">
            <label>Base Price</label>
            <span className="price">₹{(player.basePrice / 100000).toFixed(1)}L</span>
          </div>
          <div className="price-item">
            <label>Current Price</label>
            <span className="price highlight">₹{(player.currentPrice / 100000).toFixed(1)}L</span>
          </div>
          {player.soldPrice && (
            <div className="price-item">
              <label>Sold Price</label>
              <span className="price sold">₹{(player.soldPrice / 100000).toFixed(1)}L</span>
            </div>
          )}
        </div>

        {playerTrials.length > 0 && (
          <div className="trials-section">
            <button
              className="btn-expand"
              onClick={() => setShowTrials(!showTrials)}
            >
              Trial Sessions ({playerTrials.length}) {showTrials ? '▼' : '▶'}
            </button>

            {showTrials && (
              <div className="trials-list">
                {playerTrials.map((trial) => (
                  <div key={trial.id} className="trial-item">
                    <div className="trial-header">
                      <span className="trial-score">{trial.score}/100</span>
                      <span className="trial-date">
                        {new Date(trial.date).toLocaleDateString()}
                      </span>
                    </div>
                    {trial.notes && <p className="trial-notes">{trial.notes}</p>}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default PlayerProfile;
