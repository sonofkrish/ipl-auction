import React, { useState } from 'react';
import type { Player } from '../types';
import { useAuction } from '../context/useAuction';
import '../styles/TrialSession.css';

interface TrialSessionProps {
  players: Player[];
}

export const TrialSession: React.FC<TrialSessionProps> = ({ players }) => {
  const { addTrialScore, setAuctionPhase } = useAuction();
  const [currentPlayerIndex, setCurrentPlayerIndex] = useState(0);
  const [score, setScore] = useState(50);
  const [notes, setNotes] = useState('');

  const currentPlayer = players[currentPlayerIndex];

  const handleSubmitScore = () => {
    if (currentPlayer) {
      addTrialScore(currentPlayer.id, score, notes);
      setScore(50);
      setNotes('');

      if (currentPlayerIndex < players.length - 1) {
        setCurrentPlayerIndex(currentPlayerIndex + 1);
      } else {
        alert('All trial sessions completed! Moving to auction phase...');
        setAuctionPhase('auction');
      }
    }
  };

  const handleSkip = () => {
    if (currentPlayerIndex < players.length - 1) {
      setCurrentPlayerIndex(currentPlayerIndex + 1);
      setScore(50);
      setNotes('');
    } else {
      setAuctionPhase('auction');
    }
  };

  const getPerformanceLevel = (score: number) => {
    if (score >= 80) return '⭐⭐⭐⭐⭐ Excellent';
    if (score >= 70) return '⭐⭐⭐⭐ Very Good';
    if (score >= 60) return '⭐⭐⭐ Good';
    if (score >= 50) return '⭐⭐ Average';
    return '⭐ Poor';
  };

  if (!currentPlayer) {
    return <div className="trial-loading">No players available</div>;
  }

  return (
    <div className="trial-session-container">
      <div className="trial-header">
        <h2>Trial Sessions</h2>
        <div className="progress">
          <span>{currentPlayerIndex + 1} of {players.length}</span>
          <div className="progress-bar">
            <div
              className="progress-fill"
              style={{ width: `${((currentPlayerIndex + 1) / players.length) * 100}%` }}
            />
          </div>
        </div>
      </div>

      <div className="trial-card">
        <div className="current-player">
          <h3>{currentPlayer.name}</h3>
          <span className="player-role">{currentPlayer.role}</span>
          <span className="base-price">
            Base Price: ₹{(currentPlayer.basePrice / 100000).toFixed(1)}L
          </span>
        </div>

        <div className="scoring-section">
          <label className="score-label">Performance Score</label>

          <div className="score-display">
            <div className="score-number">{score}</div>
            <div className="score-out-of">/100</div>
          </div>

          <div className="slider-container">
            <input
              type="range"
              min="0"
              max="100"
              value={score}
              onChange={(e) => setScore(parseInt(e.target.value))}
              className="score-slider"
            />
            <div className="score-labels">
              <span>Poor (0)</span>
              <span>Excellent (100)</span>
            </div>
          </div>

          <div className="performance-level">
            <p>{getPerformanceLevel(score)}</p>
            <p className="price-increase">
              Estimated Price: ₹{((currentPlayer.basePrice * (1 + score / 100)) / 100000).toFixed(1)}L (approx.)
            </p>
          </div>

          <div className="notes-section">
            <label htmlFor="trial-notes">Performance Notes (Optional)</label>
            <textarea
              id="trial-notes"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Add observations about the player's performance..."
              rows={4}
            />
          </div>
        </div>

        <div className="trial-actions">
          <button className="btn-secondary" onClick={handleSkip}>
            Skip Player
          </button>
          <button className="btn-primary" onClick={handleSubmitScore}>
            Submit Score & Next Player
          </button>
        </div>
      </div>
    </div>
  );
};

export default TrialSession;
