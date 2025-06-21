import { create } from 'zustand';
import { mockClients } from '../constants/mockClients';

export interface Client {
  id: string;
  routerId: string;
  username: string;
  password: string; // Secret for PPPoE
  name: string;
  location: string; // Room number or location
  plan: string;
  paymentDate: string;
  expirationDate: string;
  isConnected: boolean;
  notes?: string;
}

interface ClientFilterState {
  searchTerm: string;
  routerFilter: string | null;
  statusFilter: 'all' | 'connected' | 'disconnected';
  expirationFilter: 'all' | 'expiring-soon' | 'expired';
}

interface ClientState {
  clients: Record<string, Client[]>; // Organized by router ID
  allClients: Client[]; // Flattened list for easier access
  isLoading: boolean;
  error: string | null;
  
  // Filter state
  filters: ClientFilterState;
  
  // Actions
  setClients: (routerId: string, clients: Client[]) => void;
  addClient: (client: Client) => void;
  updateClient: (id: string, client: Partial<Client>) => void;
  deleteClient: (id: string, routerId: string) => void;
  setClientConnection: (id: string, routerId: string, isConnected: boolean) => void;
  getExpiringClients: (days: number) => Client[];
  setLoading: (status: boolean) => void;
  setError: (error: string | null) => void;
  
  // Filter actions
  setSearchTerm: (term: string) => void;
  setRouterFilter: (routerId: string | null) => void;
  setStatusFilter: (status: 'all' | 'connected' | 'disconnected') => void;
  setExpirationFilter: (filter: 'all' | 'expiring-soon' | 'expired') => void;
  resetFilters: () => void;
  
  // Getters
  getFilteredClients: () => Client[];
  getClientById: (id: string) => Client | null;
}

// Initialize with mock data to organize by router ID
const initializeClientStore = () => {
  const clientsByRouter: Record<string, Client[]> = {};
  
  mockClients.forEach(client => {
    if (!clientsByRouter[client.routerId]) {
      clientsByRouter[client.routerId] = [];
    }
    clientsByRouter[client.routerId].push(client);
  });
  
  return clientsByRouter;
};

export const useClientStore = create<ClientState>()((set, get) => ({
  clients: initializeClientStore(),
  allClients: mockClients, // Initialize with mock data
  isLoading: false,
  error: null,
  
  // Default filter state
  filters: {
    searchTerm: '',
    routerFilter: null,
    statusFilter: 'all',
    expirationFilter: 'all',
  },
  
  setClients: (routerId, clients) => set((state) => ({
    clients: {
      ...state.clients,
      [routerId]: clients
    }
  })),
  
  addClient: (client) => set((state) => {
    const routerClients = state.clients[client.routerId] || [];
    return {
      clients: {
        ...state.clients,
        [client.routerId]: [...routerClients, client]
      }
    };
  }),
  
  updateClient: (id, updatedClient) => set((state) => {
    const routerId = updatedClient.routerId || 
      Object.keys(state.clients).find(routerId => 
        state.clients[routerId].some(client => client.id === id)
      );
      
    if (!routerId) return state;
    
    return {
      clients: {
        ...state.clients,
        [routerId]: state.clients[routerId].map(client => 
          client.id === id ? { ...client, ...updatedClient } : client
        )
      }
    };
  }),
  
  deleteClient: (id, routerId) => set((state) => ({
    clients: {
      ...state.clients,
      [routerId]: state.clients[routerId].filter(client => client.id !== id)
    }
  })),
  
  setClientConnection: (id, routerId, isConnected) => set((state) => ({
    clients: {
      ...state.clients,
      [routerId]: state.clients[routerId].map(client => 
        client.id === id ? { ...client, isConnected } : client
      )
    }
  })),
  
  getExpiringClients: (days) => {
    const state = get();
    const now = new Date();
    const expirationThreshold = new Date();
    expirationThreshold.setDate(now.getDate() + days);
    
    const expiringClients: Client[] = [];
    
    Object.values(state.clients).forEach(routerClients => {
      routerClients.forEach(client => {
        const expirationDate = new Date(client.expirationDate);
        if (expirationDate <= expirationThreshold && expirationDate >= now) {
          expiringClients.push(client);
        }
      });
    });
    
    return expiringClients;
  },
  
  setLoading: (status) => set({ isLoading: status }),
  
  setError: (error) => set({ error }),
  // Filter actions
  setSearchTerm: (term) => set(state => ({
    filters: { ...state.filters, searchTerm: term }
  })),
  
  setRouterFilter: (routerId) => set(state => ({
    filters: { ...state.filters, routerFilter: routerId }
  })),
  
  setStatusFilter: (status) => set(state => ({
    filters: { ...state.filters, statusFilter: status }
  })),
  
  setExpirationFilter: (filter) => set(state => ({
    filters: { ...state.filters, expirationFilter: filter }
  })),
  
  resetFilters: () => set(state => ({
    filters: {
      searchTerm: '',
      routerFilter: null,
      statusFilter: 'all',
      expirationFilter: 'all'
    }
  })),
  
  // Getters for filtered data
  getFilteredClients: () => {
    const state = get();
    const { searchTerm, routerFilter, statusFilter, expirationFilter } = state.filters;
    
    // Start with all clients flattened
    let filteredClients: Client[] = [];
    Object.values(state.clients).forEach(routerClients => {
      filteredClients.push(...routerClients);
    });
    
    // Filter by search term
    if (searchTerm && searchTerm.trim() !== '') {
      const term = searchTerm.toLowerCase();
      filteredClients = filteredClients.filter(client => 
        client.name.toLowerCase().includes(term) ||
        client.id.toLowerCase().includes(term) ||
        client.username.toLowerCase().includes(term)
      );
    }
    
    // Filter by router
    if (routerFilter) {
      filteredClients = filteredClients.filter(client => 
        client.routerId === routerFilter
      );
    }
    
    // Filter by connection status
    if (statusFilter !== 'all') {
      filteredClients = filteredClients.filter(client => 
        (statusFilter === 'connected') === client.isConnected
      );
    }
    
    // Filter by expiration
    if (expirationFilter !== 'all') {
      const now = new Date();
      
      if (expirationFilter === 'expired') {
        filteredClients = filteredClients.filter(client => 
          new Date(client.expirationDate) < now
        );
      } else if (expirationFilter === 'expiring-soon') {
        const sevenDaysLater = new Date(now);
        sevenDaysLater.setDate(now.getDate() + 7);
        
        filteredClients = filteredClients.filter(client => {
          const expDate = new Date(client.expirationDate);
          return expDate >= now && expDate <= sevenDaysLater;
        });
      }
    }
    
    return filteredClients;
  },
  
  getClientById: (id) => {
    const state = get();
    
    for (const routerClients of Object.values(state.clients)) {
      const client = routerClients.find(c => c.id === id);
      if (client) return client;
    }
    
    return null;
  }
}));
