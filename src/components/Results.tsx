import React from 'react';
import { useAuction } from '../context/useAuction';
import '../styles/Results.css';

export const Results: React.FC = () => {
  const { state, resetAuction, setAuctionPhase } = useAuction();

  const handleNewAuction = () => {
    resetAuction();
    setAuctionPhase('setup');
  };

  const totalSpent = state.teams.reduce(
    (sum, team) => sum + (team.totalBudget - team.remainingBudget),
    0
  );

  const unsoldPlayers = state.players.filter((p) => p.status === 'unsold');

  return (
    <div className="results-container">
      <div className="results-header">
        <h2>🎉 Auction Results</h2>
        <p>Final Squad Compositions and Team Statistics</p>
      </div>

      <div className="results-summary">
        <div className="summary-card">
          <span className="stat-label">Total Players Sold</span>
          <span className="stat-value">
            {state.players.filter((p) => p.status === 'sold').length}
          </span>
        </div>
        <div className="summary-card">
          <span className="stat-label">Unsold Players</span>
          <span className="stat-value">{unsoldPlayers.length}</span>
        </div>
        <div className="summary-card">
          <span className="stat-label">Total Amount Spent</span>
          <span className="stat-value">₹{(totalSpent / 10000000).toFixed(1)}Cr</span>
        </div>
      </div>

      <div className="teams-rosters">
        <h3>Team Rosters</h3>
        <div className="rosters-grid">
          {state.teams.map((team) => (
            <div key={team.id} className="roster-card">
              <div
                className="roster-header"
                style={{ backgroundColor: team.colorCode }}
              >
                <h4>{team.name}</h4>
              </div>

              <div className="roster-body">
                <div className="roster-info">
                  <p>
                    <strong>Players:</strong> {team.players.length}
                  </p>
                  <p>
                    <strong>Budget Used:</strong> ₹
                    {((team.totalBudget - team.remainingBudget) / 10000000).toFixed(1)}Cr
                  </p>
                  <p>
                    <strong>Budget Remaining:</strong> ₹
                    {(team.remainingBudget / 10000000).toFixed(1)}Cr
                  </p>
                </div>

                {team.players.length > 0 ? (
                  <div className="roster-players">
                    <h5>Squad:</h5>
                    {team.players.map((player) => (
                      <div key={player.id} className="roster-player">
                        <span className="player-name">{player.name}</span>
                        <span className="player-role">{player.role}</span>
                        <span className="player-price">
                          ₹{(player.soldPrice! / 100000).toFixed(1)}L
                        </span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="no-players">
                    <p>No players assigned</p>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {unsoldPlayers.length > 0 && (
        <div className="unsold-section">
          <h3>Unsold Players</h3>
          <div className="unsold-list">
            {unsoldPlayers.map((player) => (
              <div key={player.id} className="unsold-player">
                <span className="name">{player.name}</span>
                <span className="role">{player.role}</span>
                <span className="performance">
                  Performance: {player.performanceRating.toFixed(1)}/100
                </span>
                <span className="price">
                  ₹{(player.currentPrice / 100000).toFixed(1)}L
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="results-actions">
        <button className="btn-primary" onClick={handleNewAuction}>
          Start New Auction
        </button>
      </div>
    </div>
  );
};

export default Results;
