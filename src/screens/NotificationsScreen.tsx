import React, { useState, useEffect, useCallback } from 'react';
import { 
  View, Text, ScrollView, TouchableOpacity, 
  RefreshControl, ActivityIndicator, SafeAreaView, 
  StatusBar, FlatList, Alert 
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useFocusEffect } from '@react-navigation/native';

// Components
import NotificationCard from '../components/ui/NotificationCard';
import NotificationSettingsModal from '../components/modals/NotificationSettingsModal';
import TabBadge from '../components/ui/TabBadge';

// Store & Types
import { useNotificationStore, Notification, NotificationPreferences } from '../store/useNotificationStore';

/**
 * NotificationsScreen Component
 * 
 * Main screen for managing user notifications
 * Displays notification list with type-based styling
 * Includes a settings modal for configuring notifications
 * Provides actions to mark all as read or dismiss notifications
 */
export default function NotificationsScreen() {
  // Local state
  const [refreshing, setRefreshing] = useState(false);
  const [settingsModalVisible, setSettingsModalVisible] = useState(false);
  const [activeTab, setActiveTab] = useState('all');

  // Get store state and actions
  const { 
    notifications, 
    unreadCount, 
    isLoading, 
    error,
    preferences,
    dismissNotification, 
    markAsRead,
    markAllAsRead,
    clearAllNotifications,
    getByType,
    sortByDate,
    loadMockNotifications,
    updatePreferences
  } = useNotificationStore();

  // Load mock notifications on first render
  useEffect(() => {
    if (notifications.length === 0 && !isLoading) {
      loadMockNotifications();
    }
  }, []);

  // Refresh notifications when tab comes into focus
  useFocusEffect(
    useCallback(() => {
      // This would typically be an API call in a real app
      // For mock data, we'll just ensure it's loaded
      if (notifications.length === 0) {
        loadMockNotifications();
      }
    }, [notifications.length, loadMockNotifications])
  );

  // Handle pull-to-refresh
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    // Simulate loading delay
    setTimeout(() => {
      loadMockNotifications();
      setRefreshing(false);
    }, 1000);
  }, [loadMockNotifications]);

  // Handle notification action button press
  const handleNotificationAction = (notification: Notification) => {
    // Mark as read when acted upon
    markAsRead(notification.id);
    
    // Handle different types of notifications differently
    switch (notification.type) {
      case 'router':
        Alert.alert('Router Action', `Navigating to router settings for ${notification.relatedRouterId}`);
        break;
      case 'expiration':
        Alert.alert('Expiration Action', `Sending notification to client ${notification.relatedClientId}`);
        break;
      case 'payment':
        Alert.alert('Payment Action', `Processing payment reminder for client ${notification.relatedClientId}`);
        break;
      default:
        Alert.alert('Action', 'Processing your request');
    }
  };
  
  // Save notification preferences
  const handleSavePreferences = (newPreferences: NotificationPreferences) => {
    updatePreferences(newPreferences);
  };

  // Filter notifications based on active tab
  const getFilteredNotifications = () => {
    if (activeTab === 'all') {
      return sortByDate();
    }
    return getByType(activeTab as Notification['type']);
  };

  const filteredNotifications = getFilteredNotifications();

  // Tab selection component
  const NotificationTabs = () => (
    <View className="h-14 border-b border-gray-100 border-solid">
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false} 
        className="h-full"
        contentContainerStyle={{ alignItems: 'center' }}
      >
        <View className="flex flex-row px-4">
          <TouchableOpacity 
            className={`px-4 py-2 mx-1.5 rounded-md ${activeTab === 'all' ? 'bg-custom-muted-purple' : 'bg-gray-100'}`}
            onPress={() => setActiveTab('all')}
          >
            <Text className={`font-medium ${activeTab === 'all' ? 'text-white' : 'text-gray-700'}`}>All</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            className={`px-4 py-2 mx-1.5 rounded-md ${activeTab === 'expiration' ? 'bg-custom-muted-purple' : 'bg-gray-100'}`}
            onPress={() => setActiveTab('expiration')}
          >
            <Text className={`font-medium ${activeTab === 'expiration' ? 'text-white' : 'text-gray-700'}`}>Expirations</Text>
            {getByType('expiration').some(n => !n.isRead) && (
              <TabBadge count={getByType('expiration').filter(n => !n.isRead).length} small position="top-right" />
            )}
          </TouchableOpacity>
          
          <TouchableOpacity 
            className={`px-4 py-2 mx-1.5 rounded-md ${activeTab === 'payment' ? 'bg-custom-muted-purple' : 'bg-gray-100'}`}
            onPress={() => setActiveTab('payment')}
          >
            <Text className={`font-medium ${activeTab === 'payment' ? 'text-white' : 'text-gray-700'}`}>Payments</Text>
            {getByType('payment').some(n => !n.isRead) && (
              <TabBadge count={getByType('payment').filter(n => !n.isRead).length} small position="top-right" />
            )}
          </TouchableOpacity>
          
          <TouchableOpacity 
            className={`px-4 py-2 mx-1.5 rounded-md ${activeTab === 'router' ? 'bg-custom-muted-purple' : 'bg-gray-100'}`}
            onPress={() => setActiveTab('router')}
          >
            <Text className={`font-medium ${activeTab === 'router' ? 'text-white' : 'text-gray-700'}`}>Router Alerts</Text>
            {getByType('router').some(n => !n.isRead) && (
              <TabBadge count={getByType('router').filter(n => !n.isRead).length} small position="top-right" />
            )}
          </TouchableOpacity>
          
          <TouchableOpacity 
            className={`px-4 py-2 mx-1.5 rounded-md ${activeTab === 'system' ? 'bg-custom-muted-purple' : 'bg-gray-100'}`}
            onPress={() => setActiveTab('system')}
          >
            <Text className={`font-medium ${activeTab === 'system' ? 'text-white' : 'text-gray-700'}`}>System</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
  
  return (
    <SafeAreaView className="flex-1 bg-white">
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
      
      {/* Header */}
      <View className="flex flex-row justify-between items-center px-4 pt-4 pb-2">
        <View>
          <Text className="text-2xl font-bold text-gray-800">Notifications</Text>
          <View className="flex flex-row items-center mt-1">
            <Text className="text-gray-500">Stay informed about important updates</Text>
          </View>
        </View>
        
        <TouchableOpacity 
          className="flex justify-center items-center p-1 w-10 h-10 bg-gray-100 rounded-full"
          onPress={() => setSettingsModalVisible(true)}
        >
          <Ionicons name="settings-outline" size={22} color="#99627A" />
        </TouchableOpacity>
      </View>

      {/* Notification Tabs */}
      <NotificationTabs />
      
      {/* Action buttons */}
      <View className="flex flex-row justify-end px-4 my-2">
        {unreadCount > 0 && (
          <TouchableOpacity 
            onPress={() => markAllAsRead()}
            className="px-3 py-1 mr-2"
          >
            <Text className="text-sm text-custom-muted-purple">Mark all as read</Text>
          </TouchableOpacity>
        )}
        
        {notifications.length > 0 && (
          <TouchableOpacity 
            onPress={() => {
              Alert.alert(
                'Clear All Notifications',
                'Are you sure you want to clear all notifications? This cannot be undone.',
                [
                  { text: 'Cancel', style: 'cancel' },
                  { text: 'Clear All', style: 'destructive', onPress: () => clearAllNotifications() },
                ]
              );
            }}
            className="px-3 py-1"
          >
            <Text className="text-sm text-red-500">Clear all</Text>
          </TouchableOpacity>
        )}
      </View>
      
      {/* Notification List */}
      <FlatList
        data={filteredNotifications}
        renderItem={({ item }) => (
          <View className="px-4">
            <NotificationCard
              notification={item}
              onDismiss={dismissNotification}
              onAction={handleNotificationAction}
            />
          </View>
        )}
        keyExtractor={item => item.id}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        ListEmptyComponent={
          <View className="flex flex-1 justify-center items-center py-20">
            <Ionicons name="notifications-off" size={48} color="#CCCCCC" />
            <Text className="mt-4 text-center text-gray-400">No notifications</Text>
            <Text className="text-center text-gray-400">Pull down to refresh</Text>
          </View>
        }
        contentContainerStyle={{
          flexGrow: 1,
          paddingTop: 5,
          paddingBottom: 20
        }}
      />
      
      {/* Loading indicator */}
      {isLoading && !refreshing && (
        <View className="flex absolute inset-0 justify-center items-center bg-white/70">
          <ActivityIndicator color="#99627A" size="large" />
          <Text className="mt-2 text-gray-500">Loading notifications...</Text>
        </View>
      )}
      
      {/* Settings Modal */}
      <NotificationSettingsModal
        visible={settingsModalVisible}
        preferences={preferences}
        onClose={() => setSettingsModalVisible(false)}
        onSave={handleSavePreferences}
      />
      
      {/* Unread badge for tab navigation */}
      {unreadCount > 0 && <TabBadge count={unreadCount} position="top-right" />}
    </SafeAreaView>
  );
}
