
import { AuctionProvider } from './context/AuctionContext';
import { useAuction } from './context/useAuction';
import Configuration from './components/Configuration';
import TrialSession from './components/TrialSession';
import Auction from './components/Auction';
import Results from './components/Results';
import './App.css';

const AppContent = () => {
  const { state } = useAuction();

  return (
    <div className="app-container">
      <header className="app-header">
        <div className="header-content">
          <h1>🏏 IPL Auction Manager</h1>
          <p className="phase-indicator">
            Phase: <span className="phase-badge">{state.currentAuctionPhase.toUpperCase()}</span>
          </p>
        </div>
      </header>

      <main className="app-main">
        {state.currentAuctionPhase === 'setup' && <Configuration />}
        {state.currentAuctionPhase === 'trials' && (
          <TrialSession players={state.players} />
        )}
        {state.currentAuctionPhase === 'auction' && <Auction />}
        {state.currentAuctionPhase === 'complete' && <Results />}
      </main>

      <footer className="app-footer">
        <p>
          Teams: {state.teams.length} | Players: {state.players.length} | Phase:{' '}
          {state.currentAuctionPhase}
        </p>
      </footer>
    </div>
  );
};

function App() {
  return (
    <AuctionProvider>
      <AppContent />
    </AuctionProvider>
  );
}

export default App;
