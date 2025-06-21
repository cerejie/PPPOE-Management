import { create } from 'zustand';
import { mockRouters, RouterWithHealth } from '../constants/mockRouters';

/**
 * Router interface defining router properties
 */
export interface Router {
  id: string;
  name: string;
  ipAddress: string;
  username: string;
  password: string;
  port: number;
  connectedClients?: number;
  disconnectedClients?: number;
  totalClients?: number;
}

/**
 * Interface for router groups when organized by location or other properties
 */
interface RouterGroups {
  [key: string]: RouterWithHealth[];
}

/**
 * Router state interface for Zustand store
 */
interface RouterState {
  // State
  routers: RouterWithHealth[];
  routerGroups: RouterGroups;
  expandedGroups: Record<string, boolean>;
  selectedRouter: RouterWithHealth | null;
  isLoading: boolean;
  error: string | null;
  lastSyncTime: string | null;
  
  // Basic router actions
  setRouters: (routers: RouterWithHealth[]) => void;
  addRouter: (router: RouterWithHealth) => void;
  updateRouter: (id: string, router: Partial<RouterWithHealth>) => void;
  deleteRouter: (id: string) => void;
  selectRouter: (id: string) => void;
  
  // Group management
  groupRoutersByLocation: () => void;
  toggleRouterGroup: (groupName: string) => void;
  
  // Sync and API mock actions
  syncRouters: () => void;
  updateRouterSettings: (id: string, settings: Partial<RouterWithHealth>) => void;
  
  // Status management
  setLoading: (status: boolean) => void;
  setError: (error: string | null) => void;
}

/**
 * Zustand store for router management
 * 
 * Handles router state, grouping, filtering, and mock API actions
 */
export const useRouterStore = create<RouterState>()((set, get) => ({
  // Initialize with mock data
  routers: mockRouters,
  routerGroups: {},
  expandedGroups: {},
  selectedRouter: null,
  isLoading: false,
  error: null,
  lastSyncTime: new Date().toISOString(),
  
  // Basic router management
  setRouters: (routers) => set({ routers }),
  
  addRouter: (router) => set((state) => ({ 
    routers: [...state.routers, router] 
  })),
  
  updateRouter: (id, updatedRouter) => set((state) => ({
    routers: state.routers.map((router) => 
      router.id === id ? { ...router, ...updatedRouter } : router
    ),
    selectedRouter: state.selectedRouter?.id === id 
      ? { ...state.selectedRouter, ...updatedRouter } 
      : state.selectedRouter
  })),
  
  deleteRouter: (id) => set((state) => ({
    routers: state.routers.filter((router) => router.id !== id),
    selectedRouter: state.selectedRouter?.id === id ? null : state.selectedRouter
  })),
  
  selectRouter: (id) => set((state) => ({
    selectedRouter: state.routers.find((router) => router.id === id) || null
  })),
  
  // Group management
  groupRoutersByLocation: () => {
    const { routers } = get();
    const groups: RouterGroups = {};
    
    // Group routers by location
    routers.forEach(router => {
      const location = router.location || 'Uncategorized';
      
      if (!groups[location]) {
        groups[location] = [];
      }
      
      groups[location].push(router);
    });
    
    // Initialize expanded state for any new groups
    const currentExpandedGroups = get().expandedGroups;
    const expandedGroups = { ...currentExpandedGroups };
    
    Object.keys(groups).forEach(groupName => {
      if (expandedGroups[groupName] === undefined) {
        expandedGroups[groupName] = true; // Default to expanded
      }
    });
    
    set({ routerGroups: groups, expandedGroups });
  },
  
  toggleRouterGroup: (groupName) => set((state) => ({
    expandedGroups: {
      ...state.expandedGroups,
      [groupName]: !(state.expandedGroups[groupName] ?? true)
    }
  })),
  
  // Sync routers (mock API call)
  syncRouters: () => {
    set({ isLoading: true, error: null });
    
    // Simulate API delay
    setTimeout(() => {
      try {
        // Update connected/disconnected counts randomly to simulate changes
        const updatedRouters = get().routers.map(router => {
          // Random fluctuations in connected clients
          const connectedChange = Math.floor(Math.random() * 3) - 1; // -1, 0, or 1
          let newConnected = (router.connectedClients || 0) + connectedChange;
          newConnected = Math.max(0, Math.min(newConnected, router.totalClients || 0));
          
          // Update health metrics
          const cpuChange = Math.floor(Math.random() * 10) - 5; // -5 to 5
          const memoryChange = Math.floor(Math.random() * 10) - 5; // -5 to 5
          const tempChange = Math.floor(Math.random() * 4) - 2; // -2 to 2
          
          return {
            ...router,
            connectedClients: newConnected,
            disconnectedClients: (router.totalClients || 0) - newConnected,
            health: {
              ...router.health,
              cpuUsage: Math.max(5, Math.min(95, router.health.cpuUsage + cpuChange)),
              memoryUsage: Math.max(5, Math.min(95, router.health.memoryUsage + memoryChange)),
              temperature: Math.max(30, Math.min(80, router.health.temperature + tempChange)),
              lastSeen: new Date().toISOString()
            }
          };
        });
        
        set({ 
          routers: updatedRouters, 
          isLoading: false,
          lastSyncTime: new Date().toISOString()
        });
        
        // Update groups if we're using them
        const { groupRoutersByLocation } = get();
        groupRoutersByLocation();
      } catch (err) {
        set({ 
          isLoading: false, 
          error: err instanceof Error ? err.message : 'Unknown error during sync'
        });
      }
    }, 1500); // 1.5 second delay to simulate network request
  },
  
  // Update router settings (mock API call)
  updateRouterSettings: (id, settings) => {
    set({ isLoading: true });
    
    // Simulate API delay
    setTimeout(() => {
      try {
        const { updateRouter } = get();
        updateRouter(id, settings);
        set({ isLoading: false });
      } catch (err) {
        set({ 
          isLoading: false, 
          error: err instanceof Error ? err.message : 'Failed to update router settings'
        });
      }
    }, 1000);
  },
  
  setLoading: (status) => set({ isLoading: status }),
  
  setError: (error) => set({ error })
}));

