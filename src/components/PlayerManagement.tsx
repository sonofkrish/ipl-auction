import React, { useState } from 'react';
import { useAuction } from '../context/useAuction';
import '../styles/PlayerManagement.css';

export const PlayerManagement: React.FC = () => {
  const { state, addPlayer, setAuctionPhase } = useAuction();
  const roles = ['Batsman', 'Bowler', 'All-rounder', 'Wicket-keeper'] as const;
  
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState<{
    name: string;
    role: (typeof roles)[number];
  }>({
    name: '',
    role: 'Batsman',
  });

  const handleAddPlayer = () => {
    if (!formData.name.trim()) {
      alert('Please enter player name');
      return;
    }

    addPlayer({
      name: formData.name,
      role: formData.role,
      basePrice: state.config.basePlayerPrice,
      currentPrice: state.config.basePlayerPrice,
      performanceRating: 0,
      trialScores: [],
      status: 'available',
      assignedTeamId: null,
      soldPrice: null,
    });

    setFormData({ name: '', role: 'Batsman' });
    setShowForm(false);
  };

  const handleStartTrials = () => {
    if (state.players.length === 0) {
      alert('Please add at least one player');
      return;
    }
    setAuctionPhase('trials');
  };



  return (
    <div className="player-management-container">
      <div className="management-header">
        <h2>Player Management</h2>
        <span className="player-count">
          {state.players.length} Player{state.players.length !== 1 ? 's' : ''}
        </span>
      </div>

      <div className="add-player-section">
        {!showForm ? (
          <button className="btn-add-player" onClick={() => setShowForm(true)}>
            ➕ Add New Player
          </button>
        ) : (
          <div className="add-player-form">
            <input
              type="text"
              placeholder="Player Name"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              autoFocus
            />
            <select
              value={formData.role}
              onChange={(e) =>
                setFormData({ ...formData, role: e.target.value as (typeof roles)[number] })
              }
            >
              {roles.map((role) => (
                <option key={role} value={role}>
                  {role}
                </option>
              ))}
            </select>
            <button className="btn-save" onClick={handleAddPlayer}>
              Save Player
            </button>
            <button
              className="btn-cancel"
              onClick={() => setShowForm(false)}
            >
              Cancel
            </button>
          </div>
        )}
      </div>

      <div className="players-list">
        {state.players.length === 0 ? (
          <div className="empty-state">
            <p>No players added yet. Click "Add New Player" to get started!</p>
          </div>
        ) : (
          <div className="players-grid">
            {state.players.map((player) => (
              <div key={player.id} className="player-item">
                <div className="player-item-header">
                  <h4>{player.name}</h4>
                  <span className="player-role-badge">{player.role}</span>
                </div>
                <div className="player-item-body">
                  <span>Base Price: ₹{(player.basePrice / 100000).toFixed(1)}L</span>
                  <span>Status: {player.status}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="management-actions">
        <button
          className="btn-secondary"
          onClick={() => setAuctionPhase('setup')}
        >
          ← Back to Configuration
        </button>
        <button
          className="btn-primary"
          onClick={handleStartTrials}
          disabled={state.players.length === 0}
        >
          Start Trial Sessions →
        </button>
      </div>
    </div>
  );
};

export default PlayerManagement;
