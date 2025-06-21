import { Client } from '../store/useClientStore';

interface FilterOptions {
  searchTerm?: string;
  routerId?: string | null;
  connectionStatus?: 'all' | 'connected' | 'disconnected';
  expirationFilter?: 'all' | 'expiring-soon' | 'expired';
}

/**
 * Filter clients based on search term and filter options
 * 
 * @param clients - Array of client objects to filter
 * @param options - Filter options including search term, router ID, connection status, and expiration filter
 * @returns Filtered array of client objects
 */
export const filterClients = (
  clients: Client[],
  options: FilterOptions
): Client[] => {
  const { searchTerm, routerId, connectionStatus, expirationFilter } = options;
  
  return clients.filter(client => {
    // Filter by search term (name or ID)
    if (searchTerm && searchTerm.trim() !== '') {
      const term = searchTerm.toLowerCase();
      const matchesName = client.name.toLowerCase().includes(term);
      const matchesId = client.id.toLowerCase().includes(term);
      const matchesUsername = client.username.toLowerCase().includes(term);
      
      if (!matchesName && !matchesId && !matchesUsername) {
        return false;
      }
    }
    
    // Filter by router ID
    if (routerId && routerId !== 'all') {
      if (client.routerId !== routerId) {
        return false;
      }
    }
    
    // Filter by connection status
    if (connectionStatus && connectionStatus !== 'all') {
      if (
        (connectionStatus === 'connected' && !client.isConnected) ||
        (connectionStatus === 'disconnected' && client.isConnected)
      ) {
        return false;
      }
    }
    
    // Filter by expiration
    if (expirationFilter && expirationFilter !== 'all') {
      const now = new Date();
      const expirationDate = new Date(client.expirationDate);
      
      if (expirationFilter === 'expired' && expirationDate >= now) {
        return false;
      }
      
      if (expirationFilter === 'expiring-soon') {
        const sevenDaysFromNow = new Date(now);
        sevenDaysFromNow.setDate(now.getDate() + 7);
        
        if (
          expirationDate <= now || 
          expirationDate > sevenDaysFromNow
        ) {
          return false;
        }
      }
    }
    
    // Client passed all filters
    return true;
  });
};
