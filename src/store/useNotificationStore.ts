import { create } from 'zustand';
import { mockNotifications, defaultNotificationPreferences } from '../constants/mockNotifications';

export interface Notification {
  id: string;
  title: string;
  message: string;
  isRead: boolean;
  createdAt: string;
  type: 'expiration' | 'payment' | 'router' | 'system' | 'connection';
  relatedClientId?: string;
  relatedRouterId?: string;
  actionLabel?: string;
}

/**
 * Notification preferences for user settings
 */
export interface NotificationPreferences {
  enabled: boolean;
  expirationEnabled: boolean;
  expirationDays: number;
  paymentEnabled: boolean;
  paymentDays: number;
  routerEnabled: boolean;
  routerHighCpuThreshold: number;
  routerHighTempThreshold: number;
  systemEnabled: boolean;
  connectionEnabled: boolean;
}

interface NotificationState {
  notifications: Notification[];
  unreadCount: number;
  isLoading: boolean;
  error: string | null;
  preferences: NotificationPreferences;
  
  // Notification management
  setNotifications: (notifications: Notification[]) => void;
  addNotification: (notification: Notification) => void;
  markAsRead: (id: string) => void;
  markAllAsRead: () => void;
  dismissNotification: (id: string) => void;
  clearAllNotifications: () => void;
  
  // Notification preferences
  updatePreferences: (preferences: Partial<NotificationPreferences>) => void;
  resetPreferencesToDefault: () => void;
  
  // Utility functions
  getByType: (type: Notification['type']) => Notification[];
  sortByDate: (ascending?: boolean) => Notification[];
  loadMockNotifications: () => void;
  
  // State management
  setLoading: (status: boolean) => void;
  setError: (error: string | null) => void;
}

export const useNotificationStore = create<NotificationState>()((set, get) => ({
  notifications: [],
  unreadCount: 0,
  isLoading: false,
  error: null,
  preferences: { ...defaultNotificationPreferences },
  
  setNotifications: (notifications) => set({ 
    notifications,
    unreadCount: notifications.filter(n => !n.isRead).length
  }),
  
  addNotification: (notification) => set((state) => {
    const updatedNotifications = [notification, ...state.notifications];
    return { 
      notifications: updatedNotifications,
      unreadCount: updatedNotifications.filter(n => !n.isRead).length
    };
  }),
  
  markAsRead: (id) => set((state) => {
    const updatedNotifications = state.notifications.map(notification =>
      notification.id === id ? { ...notification, isRead: true } : notification
    );
    return { 
      notifications: updatedNotifications,
      unreadCount: updatedNotifications.filter(n => !n.isRead).length
    };
  }),
  
  markAllAsRead: () => set((state) => ({
    notifications: state.notifications.map(notification => ({
      ...notification,
      isRead: true
    })),
    unreadCount: 0
  })),
  
  dismissNotification: (id: string) => set((state) => {
    const updatedNotifications = state.notifications.filter(
      notification => notification.id !== id
    );
    return { 
      notifications: updatedNotifications,
      unreadCount: updatedNotifications.filter(n => !n.isRead).length
    };
  }),
  
  clearAllNotifications: () => set({
    notifications: [],
    unreadCount: 0
  }),
  
  updatePreferences: (newPreferences: Partial<NotificationPreferences>) => set((state) => ({
    preferences: {
      ...state.preferences,
      ...newPreferences
    }
  })),
  
  resetPreferencesToDefault: () => set({
    preferences: { ...defaultNotificationPreferences }
  }),
  
  getByType: (type: Notification['type']) => {
    return get().notifications.filter(notification => notification.type === type);
  },
  
  sortByDate: (ascending = false) => {
    const sorted = [...get().notifications].sort((a, b) => {
      const dateA = new Date(a.createdAt).getTime();
      const dateB = new Date(b.createdAt).getTime();
      return ascending ? dateA - dateB : dateB - dateA;
    });
    return sorted;
  },
  
  loadMockNotifications: () => {
    set({
      notifications: mockNotifications,
      unreadCount: mockNotifications.filter(n => !n.isRead).length,
      isLoading: false
    });
  },
  
  setLoading: (status: boolean) => set({ isLoading: status }),
  
  setError: (error: string | null) => set({ error })
}));
