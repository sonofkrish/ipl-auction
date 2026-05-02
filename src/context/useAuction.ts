import { useContext } from 'react';
import { AuctionContext } from './AuctionContextTypes';
import type { AuctionContextType } from './AuctionContextTypes';

export const useAuction = (): AuctionContextType => {
  const context = useContext(AuctionContext);
  if (context === undefined) {
    throw new Error('useAuction must be used within AuctionProvider');
  }
  return context;
};
