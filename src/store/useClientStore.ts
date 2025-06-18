import { create } from 'zustand';

interface Client {
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

interface ClientState {
  clients: Record<string, Client[]>; // Organized by router ID
  isLoading: boolean;
  error: string | null;
  
  // Actions
  setClients: (routerId: string, clients: Client[]) => void;
  addClient: (client: Client) => void;
  updateClient: (id: string, client: Partial<Client>) => void;
  deleteClient: (id: string, routerId: string) => void;
  setClientConnection: (id: string, routerId: string, isConnected: boolean) => void;
  getExpiringClients: (days: number) => Client[];
  setLoading: (status: boolean) => void;
  setError: (error: string | null) => void;
}

export const useClientStore = create<ClientState>()((set, get) => ({
  clients: {},
  isLoading: false,
  error: null,
  
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
  
  setError: (error) => set({ error })
}));
