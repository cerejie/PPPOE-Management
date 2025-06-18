import { create } from 'zustand';

interface Notification {
  id: string;
  title: string;
  message: string;
  isRead: boolean;
  createdAt: string;
  type: 'expiration' | 'payment' | 'system' | 'connection';
  relatedClientId?: string;
  relatedRouterId?: string;
}

interface NotificationState {
  notifications: Notification[];
  unreadCount: number;
  isLoading: boolean;
  error: string | null;
  
  // Actions
  setNotifications: (notifications: Notification[]) => void;
  addNotification: (notification: Notification) => void;
  markAsRead: (id: string) => void;
  markAllAsRead: () => void;
  deleteNotification: (id: string) => void;
  setLoading: (status: boolean) => void;
  setError: (error: string | null) => void;
}

export const useNotificationStore = create<NotificationState>()((set, get) => ({
  notifications: [],
  unreadCount: 0,
  isLoading: false,
  error: null,
  
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
  
  deleteNotification: (id) => set((state) => {
    const updatedNotifications = state.notifications.filter(
      notification => notification.id !== id
    );
    return { 
      notifications: updatedNotifications,
      unreadCount: updatedNotifications.filter(n => !n.isRead).length
    };
  }),
  
  setLoading: (status) => set({ isLoading: status }),
  
  setError: (error) => set({ error })
}));
