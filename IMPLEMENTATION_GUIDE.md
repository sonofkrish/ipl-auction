# 🏏 IPL Auction Manager

A web-based cricket auction management application built with React, TypeScript, and Vite. This application allows you to manage cricket player auctions with configurable teams, trial sessions, and live bidding.

## Features

### 🎯 Core Functionality

1. **Configurable Auction Setup**
   - Set number of teams (2-10)
   - Configure initial team budgets
   - Set base player prices
   - Adjust performance multiplier range

2. **Player Management**
   - Add players with different roles (Batsman, Bowler, All-rounder, Wicket-keeper)
   - All players start with equal base price
   - Track player performance history

3. **Trial Sessions**
   - Rate player performance on a 0-100 scale
   - Performance ratings determine price multipliers
   - Historical trial scores stored per player
   - Real-time price recalculation

4. **Live Auction**
   - Competitive bidding between teams
   - Budget validation to prevent overspending
   - Automatic team budget deduction on player purchase
   - Player assignment to teams

5. **Results & Analytics**
   - Final team rosters
   - Budget utilization tracking
   - Unsold players list
   - Auction statistics

## Technology Stack

- **Frontend**: React 19 with TypeScript
- **Build Tool**: Vite
- **Styling**: CSS Grid & Flexbox
- **State Management**: React Context API

## Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm build

# Run linter
npm run lint

# Preview production build
npm run preview
```

## Usage Workflow

### Step 1: Configuration
1. Open the app at `http://localhost:5174/`
2. Configure auction parameters:
   - Number of teams
   - Team budget (in Crores)
   - Base player price (in Lakhs)
   - Max performance multiplier
3. Click "Save Configuration & Start Trials"

### Step 2: Add Players
1. Click "Add New Player"
2. Enter player name and select role
3. All players automatically get the base price you configured
4. Continue adding players

### Step 3: Trial Sessions
1. For each player, enter their performance score (0-100)
2. Optional: Add performance notes
3. Player price adjusts based on:
   - Formula: `BasePrice × (1 + (PerformanceScore/100) × (MaxMultiplier - 1))`
4. Move to next player or skip

### Step 4: Live Auction
1. Players appear one at a time
2. Select a team to bid
3. Enter bid amount (minimum = current asking price)
4. Confirm bid - team budget automatically deducted
5. Continue until all players are auctioned

### Step 5: View Results
1. See team rosters with player assignments
2. Check budget utilization per team
3. View unsold players
4. Start a new auction

## Project Structure

```
src/
├── components/
│   ├── Auction.tsx              # Live bidding interface
│   ├── Configuration.tsx        # Initial setup
│   ├── PlayerManagement.tsx     # Add/manage players
│   ├── PlayerProfile.tsx        # Player details display
│   ├── Results.tsx              # Final statistics
│   └── TrialSession.tsx         # Performance rating
├── context/
│   └── AuctionContext.tsx       # Global state management
├── styles/
│   ├── Auction.css
│   ├── Configuration.css
│   ├── PlayerManagement.css
│   ├── PlayerProfile.css
│   ├── Results.css
│   └── TrialSession.css
├── App.tsx                       # Main app component
├── App.css                       # Global styles
├── main.tsx                      # Entry point
├── types.ts                      # TypeScript interfaces
└── index.css                     # Base styles
```

## Data Flow

```
Configuration
    ↓
Initialize Teams → Add Players → Trial Sessions → Auction → Results
    ↓                                                           ↓
  Config                         Team Budget Tracking    Final Rosters
                                 Price Recalculation
```

## Key Interfaces

### Player
```typescript
{
  id: string;
  name: string;
  role: 'Batsman' | 'Bowler' | 'All-rounder' | 'Wicket-keeper';
  basePrice: number;
  currentPrice: number;
  performanceRating: number;
  trialScores: number[];
  status: 'available' | 'sold' | 'unsold';
  assignedTeamId: string | null;
  soldPrice: number | null;
}
```

### Team
```typescript
{
  id: string;
  name: string;
  totalBudget: number;
  remainingBudget: number;
  players: Player[];
  colorCode: string;
}
```

## Auction Logic

### Price Calculation
- **Base Price**: Set during configuration
- **Performance Multiplier**: Based on trial session scores
  - 0-50 score: 1.0x - 1.5x
  - 50-75 score: 1.5x - 2.5x
  - 75-100 score: 2.5x - 3.0x (configurable up to 5x)

### Budget Management
- Each team starts with equal budget
- Bidding must not exceed remaining budget
- Automatic deduction on successful bid
- Prevents over-spending

### Player Status
- **Available**: Not yet auctioned
- **Sold**: Successfully auctioned and assigned to team
- **Unsold**: No bids received

## Future Enhancements

- [ ] Player history/statistics
- [ ] Multi-round auctions
- [ ] Retention/reserve players
- [ ] Export auction results (PDF/Excel)
- [ ] Auction history tracking
- [ ] Team strategy analytics
- [ ] Live auction timer
- [ ] Undo/Redo functionality
- [ ] Dark mode
- [ ] Mobile app version

## License

This project is open source and available under the MIT License.

## Contributing

Feel free to fork this project and submit pull requests for improvements!

---

Made with ❤️ for cricket enthusiasts
