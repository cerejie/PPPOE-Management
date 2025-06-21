import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

/**
 * User interface representing the core user data
 */
export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  photoURL?: string;
}

/**
 * Theme options for the app
 */
export type ThemeType = 'light' | 'dark';

/**
 * Language options for the app
 */
export type LanguageCode = 'en' | 'es' | 'fr' | 'id';

/**
 * Subscription tiers available
 */
export type SubscriptionTier = 'free' | 'basic' | 'premium' | 'enterprise';

/**
 * Subscription details
 */
export interface Subscription {
  tier: SubscriptionTier;
  expiresAt: string; // ISO date string
  autoRenew: boolean;
  features: string[];
}

/**
 * User state interface for Zustand store
 */
interface UserState {
  // User data
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  
  // App preferences
  theme: ThemeType;
  language: LanguageCode;
  subscription: Subscription | null;
  
  // Actions for user management
  setUser: (user: User | null) => void;
  updateUserProfile: (updates: Partial<User>) => void;
  setAuthenticated: (status: boolean) => void;
  setLoading: (status: boolean) => void;
  logout: () => void;
  
  // Actions for app preferences
  setTheme: (theme: ThemeType) => void;
  toggleTheme: () => void;
  setLanguage: (language: LanguageCode) => void;
  setSubscription: (subscription: Subscription | null) => void;
}

/**
 * Mock subscription data for different tiers
 */
const mockSubscriptionData: Record<SubscriptionTier, Omit<Subscription, 'tier'>> = {
  free: {
    expiresAt: 'Never',
    autoRenew: false,
    features: ['Basic PPPoE monitoring', 'Up to 5 routers', 'Standard notifications']
  },
  basic: {
    expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(), // 30 days from now
    autoRenew: true,
    features: ['Everything in Free', 'Up to 15 routers', 'Client payment tracking']
  },
  premium: {
    expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
    autoRenew: true,
    features: ['Everything in Basic', 'Unlimited routers', 'Advanced analytics', 'Priority notifications']
  },
  enterprise: {
    expiresAt: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString(), // 1 year from now
    autoRenew: true,
    features: ['Everything in Premium', 'Custom reports', 'White-label option', '24/7 support']
  }
};

/**
 * Define the Zustand store for user state and preferences
 */
export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      // Initial state
      user: null,
      isAuthenticated: false,
      isLoading: false,
      theme: 'light' as ThemeType,
      language: 'en' as LanguageCode,
      subscription: null,
      
      // User management actions
      setUser: (user) => set({ user }),
      updateUserProfile: (updates) => set((state) => ({
        user: state.user ? { ...state.user, ...updates } : null
      })),
      setAuthenticated: (status) => set({ isAuthenticated: status }),
      setLoading: (status) => set({ isLoading: status }),
      logout: () => set({ 
        user: null, 
        isAuthenticated: false, 
        // Preserve theme and language preferences on logout
      }),
      
      // App preference actions
      setTheme: (theme) => set({ theme }),
      toggleTheme: () => set((state) => ({
        theme: state.theme === 'light' ? 'dark' : 'light'
      })),
      setLanguage: (language) => set({ language }),
      setSubscription: (subscription) => set({ subscription }),
    }),
    {
      name: 'user-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
);

// For development: uncomment to initialize store with mock data
/*
// Initialize with mock user and subscription for development
const initStore = () => {
  const { user, setUser, setAuthenticated, setSubscription } = useUserStore.getState();
  
  if (!user) {
    setUser({
      id: 'user-1',
      name: 'John Doe',
      email: 'john.doe@example.com',
      phone: '+1234567890',
      photoURL: 'https://i.pravatar.cc/300'
    });
    setAuthenticated(true);
    setSubscription({
      ...mockSubscriptionData.premium,
      tier: 'premium'
    });
  }
};

initStore();
*/
