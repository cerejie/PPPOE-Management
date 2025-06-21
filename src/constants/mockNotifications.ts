import { Notification, NotificationPreferences } from '../store/useNotificationStore';

/**
 * Mock notification data for development and testing
 * Each notification includes type, title, message, and related metadata
 */

export const mockNotifications: Notification[] = [
  {
    id: '1',
    title: 'Subscription Expiring',
    message: 'Client "Bayot" subscription will expire in 3 days.',
    isRead: false,
    createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(), // 2 hours ago
    type: 'expiration',
    relatedClientId: '1',
    actionLabel: 'Notify Client'
  },
  {
    id: '2',
    title: 'Payment Due',
    message: 'Payment for client "Shukla" is due tomorrow.',
    isRead: false,
    createdAt: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(), // 5 hours ago
    type: 'payment',
    relatedClientId: '2',
    actionLabel: 'Send Reminder'
  },
  {
    id: '3',
    title: 'Router CPU Alert',
    message: 'Phase 2 (CCR) router has high CPU usage (85%).',
    isRead: false,
    createdAt: new Date(Date.now() - 12 * 60 * 60 * 1000).toISOString(), // 12 hours ago
    type: 'router',
    relatedRouterId: 'router-02',
    actionLabel: 'View Router'
  },
  {
    id: '4',
    title: 'Connection Lost',
    message: 'Client "Michael Chen" has been disconnected.',
    isRead: true,
    createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(), // 1 day ago
    type: 'connection',
    relatedClientId: '5',
    actionLabel: 'Check Status'
  },
  {
    id: '5',
    title: 'Router Temperature Warning',
    message: 'Staff Housing router temperature is above 60°C.',
    isRead: true,
    createdAt: new Date(Date.now() - 36 * 60 * 60 * 1000).toISOString(), // 36 hours ago
    type: 'router',
    relatedRouterId: 'router-06'
  },
  {
    id: '6',
    title: 'Multiple Subscriptions Expiring',
    message: '3 client subscriptions will expire this week.',
    isRead: true,
    createdAt: new Date(Date.now() - 48 * 60 * 60 * 1000).toISOString(), // 2 days ago
    type: 'expiration',
    actionLabel: 'View Clients'
  },
  {
    id: '7',
    title: 'System Update',
    message: 'PPPoE Management system has been updated to version 1.2.0.',
    isRead: true,
    createdAt: new Date(Date.now() - 72 * 60 * 60 * 1000).toISOString(), // 3 days ago
    type: 'system'
  },
  {
    id: '8',
    title: 'New Client Added',
    message: 'Client "Sarah Johnson" was successfully added to Phase 3.',
    isRead: true,
    createdAt: new Date(Date.now() - 96 * 60 * 60 * 1000).toISOString(), // 4 days ago
    type: 'system',
    relatedClientId: '12'
  }
];

/**
 * Default notification preferences for the app
 */
export const defaultNotificationPreferences: NotificationPreferences = {
  enabled: true,
  expirationEnabled: true,
  expirationDays: 7, // Notify X days before expiration
  paymentEnabled: true,
  paymentDays: 3, // Notify X days before payment due
  routerEnabled: true,
  routerHighCpuThreshold: 80, // Percentage
  routerHighTempThreshold: 60, // Celsius
  systemEnabled: true,
  connectionEnabled: true
};
