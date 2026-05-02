import React, { useState } from 'react';
import { useAuction } from '../context/useAuction';
import '../styles/Configuration.css';

export const Configuration: React.FC = () => {
  const { state, updateConfig, initializeTeams, setAuctionPhase } = useAuction();
  const [localConfig, setLocalConfig] = useState(state.config);

  const handleConfigChange = (
    key: keyof typeof state.config,
    value: number
  ) => {
    setLocalConfig((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleSaveAndStart = () => {
    updateConfig(localConfig);
    initializeTeams();
    setAuctionPhase('trials');
  };

  return (
    <div className="configuration-container">
      <div className="config-card">
        <h2>Auction Configuration</h2>

        <div className="config-group">
          <label>Number of Teams</label>
          <input
            type="number"
            min="2"
            max="10"
            value={localConfig.numberOfTeams}
            onChange={(e) =>
              handleConfigChange('numberOfTeams', parseInt(e.target.value))
            }
          />
          <span className="hint">Teams that will participate in the auction</span>
        </div>

        <div className="config-group">
          <label>Initial Team Budget (in Crores)</label>
          <input
            type="number"
            min="1000000"
            step="1000000"
            value={localConfig.initialTeamBudget}
          />
          <span className="hint">Budget allocated to each team</span>
        </div>

        <div className="config-group">
          <label>Base Player Price (in Lakhs)</label>
          <input
            type="number"
            min="100000"
            step="100000"
            value={localConfig.basePlayerPrice}
            onChange={(e) =>
              handleConfigChange('basePlayerPrice', parseInt(e.target.value))
            }
          />
          <span className="hint">Starting price for each player</span>
        </div>

        <div className="config-group">
          <label>Max Performance Multiplier</label>
          <input
            type="number"
            min="1"
            max="5"
            step="0.5"
            value={localConfig.maxPerformanceMultiplier}
            onChange={(e) =>
              handleConfigChange('maxPerformanceMultiplier', parseFloat(e.target.value))
            }
          />
          <span className="hint">Maximum price multiplier based on trial performance</span>
        </div>

        <button className="btn-primary" onClick={handleSaveAndStart}>
          Save Configuration & Start Trials
        </button>
      </div>

      <div className="summary-card">
        <h3>Configuration Summary</h3>
        <ul>
          <li>
            <strong>Teams:</strong> {localConfig.numberOfTeams}
          </li>
          <li>
            <strong>Budget/Team:</strong> ₹{(localConfig.initialTeamBudget / 10000000).toFixed(1)} Cr
          </li>
          <li>
            <strong>Base Price:</strong> ₹{(localConfig.basePlayerPrice / 100000).toFixed(1)} L
          </li>
          <li>
            <strong>Price Range:</strong> ₹{(localConfig.basePlayerPrice / 100000).toFixed(1)} L - ₹
            {((localConfig.basePlayerPrice * localConfig.maxPerformanceMultiplier) / 100000).toFixed(1)} L
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Configuration;
