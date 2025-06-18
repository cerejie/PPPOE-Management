import { create } from 'zustand';

interface Router {
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

interface RouterState {
  routers: Router[];
  selectedRouter: Router | null;
  isLoading: boolean;
  error: string | null;
  
  // Actions
  setRouters: (routers: Router[]) => void;
  addRouter: (router: Router) => void;
  updateRouter: (id: string, router: Partial<Router>) => void;
  deleteRouter: (id: string) => void;
  selectRouter: (id: string) => void;
  setLoading: (status: boolean) => void;
  setError: (error: string | null) => void;
}

export const useRouterStore = create<RouterState>()((set, get) => ({
  routers: [],
  selectedRouter: null,
  isLoading: false,
  error: null,
  
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
  
  setLoading: (status) => set({ isLoading: status }),
  
  setError: (error) => set({ error })
}));
