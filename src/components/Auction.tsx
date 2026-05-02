import React, { useState } from 'react';
import { useAuction } from '../context/useAuction';
import '../styles/Auction.css';

export const Auction: React.FC = () => {
  const { state, soldPlayer } = useAuction();
  const [currentBid, setCurrentBid] = useState<number | null>(null);
  const [selectedTeamId, setSelectedTeamId] = useState<string | null>(null);
  const [currentPlayerIdx, setCurrentPlayerIdx] = useState(0);

  const availablePlayers = state.players.filter((p) => p.status === 'available');
  const currentPlayer = availablePlayers[currentPlayerIdx];

  const handlePlaceBid = () => {
    if (!currentBid || !selectedTeamId || !currentPlayer) return;

    const team = state.teams.find((t) => t.id === selectedTeamId);
    if (team && team.remainingBudget >= currentBid) {
      soldPlayer(currentPlayer.id, selectedTeamId, currentBid);
      setCurrentBid(null);
      setSelectedTeamId(null);

      if (currentPlayerIdx < availablePlayers.length - 1) {
        setCurrentPlayerIdx(currentPlayerIdx + 1);
      } else {
        alert('Auction completed!');
      }
    } else {
      alert('Team does not have enough budget!');
    }
  };

  const handleUnsold = () => {
    if (currentPlayer) {
      // Mark as unsold
      const team = state.teams.find((t) => t.id === selectedTeamId);
      if (team && currentPlayer.assignedTeamId === null) {
        // Player remains unsold
        if (currentPlayerIdx < availablePlayers.length - 1) {
          setCurrentPlayerIdx(currentPlayerIdx + 1);
          setCurrentBid(null);
          setSelectedTeamId(null);
        } else {
          alert('Auction completed!');
        }
      }
    }
  };

  if (!currentPlayer) {
    return (
      <div className="auction-complete">
        <h2>🎉 Auction Completed!</h2>
        <p>All players have been auctioned.</p>
      </div>
    );
  }

  const teamsWithBudget = state.teams.filter((t) => t.remainingBudget > 0);

  return (
    <div className="auction-container">
      <div className="auction-header">
        <h2>Live Auction</h2>
        <div className="auction-stats">
          <span>{currentPlayerIdx + 1} of {availablePlayers.length} players</span>
        </div>
      </div>

      <div className="auction-main">
        <div className="player-on-auction">
          <div className="player-card-large">
            <div className="player-name">{currentPlayer.name}</div>
            <div className="player-details">
              <span className="role">{currentPlayer.role}</span>
              <span className="performance">Performance: {currentPlayer.performanceRating.toFixed(1)}/100</span>
            </div>

            <div className="price-info">
              <div className="base-info">
                <label>Base Price</label>
                <span>₹{(currentPlayer.basePrice / 100000).toFixed(1)}L</span>
              </div>
              <div className="current-info">
                <label>Current Asking Price</label>
                <span className="current-price">
                  ₹{(currentPlayer.currentPrice / 100000).toFixed(1)}L
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="bidding-section">
          <h3>Teams Ready to Bid</h3>

          <div className="team-selection">
            {teamsWithBudget.map((team) => (
              <button
                key={team.id}
                className={`team-btn ${selectedTeamId === team.id ? 'selected' : ''}`}
                style={{
                  borderColor: team.colorCode,
                  backgroundColor:
                    selectedTeamId === team.id
                      ? `${team.colorCode}40`
                      : 'transparent',
                }}
                onClick={() => setSelectedTeamId(team.id)}
              >
                <div className="team-name">{team.name}</div>
                <div className="team-budget">
                  Budget: ₹{(team.remainingBudget / 10000000).toFixed(1)}Cr
                </div>
                <div className="team-players">
                  Players: {team.players.length}
                </div>
              </button>
            ))}
          </div>

          <div className="bid-input-section">
            <label>Your Bid (₹)</label>
            <div className="bid-input-wrapper">
              <input
                type="number"
                value={currentBid || ''}
                onChange={(e) => setCurrentBid(e.target.value ? parseInt(e.target.value) : null)}
                min={currentPlayer.currentPrice}
                placeholder={`Minimum: ₹${(currentPlayer.currentPrice / 100000).toFixed(1)}L`}
              />
              <span className="bid-in-lakhs">
                {currentBid ? `(₹${(currentBid / 100000).toFixed(1)}L)` : ''}
              </span>
            </div>
          </div>

          <div className="bidding-actions">
            <button
              className="btn-secondary"
              onClick={handleUnsold}
            >
              Player Unsold
            </button>
            <button
              className="btn-primary btn-bid"
              onClick={handlePlaceBid}
              disabled={!currentBid || !selectedTeamId}
            >
              🔨 Place Bid
            </button>
          </div>

          {selectedTeamId && currentBid && (
            <div className="bid-summary">
              <p>
                <strong>{state.teams.find((t) => t.id === selectedTeamId)?.name}</strong> will
                bid <strong>₹{(currentBid / 100000).toFixed(1)}L</strong> for{' '}
                <strong>{currentPlayer.name}</strong>
              </p>
            </div>
          )}
        </div>
      </div>

      <div className="auction-sidebar">
        <h3>Teams Overview</h3>
        <div className="teams-overview">
          {state.teams.map((team) => (
            <div key={team.id} className="team-overview-item">
              <div
                className="team-color-bar"
                style={{ backgroundColor: team.colorCode }}
              />
              <div className="team-info">
                <strong>{team.name}</strong>
                <span>₹{(team.remainingBudget / 10000000).toFixed(1)}Cr left</span>
                <span>{team.players.length} players</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Auction;
