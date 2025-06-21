import React, { useRef, useEffect } from 'react';
import { View, Text, TouchableOpacity, Animated } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Notification } from '../../store/useNotificationStore';

/**
 * NotificationCard Component
 * 
 * Displays a single notification with type-based styling,
 * time information, and an optional action button
 * 
 * @param notification - The notification object to display
 * @param onDismiss - Callback when user dismisses the notification
 * @param onAction - Callback when user taps the action button
 * @param showActions - Whether to show the dismiss/action buttons
 */
interface NotificationCardProps {
  notification: Notification;
  onDismiss: (id: string) => void;
  onAction?: (notification: Notification) => void;
  showActions?: boolean;
}

const NotificationCard: React.FC<NotificationCardProps> = ({
  notification,
  onDismiss,
  onAction,
  showActions = true
}) => {
  // Animation for dismissing notifications
  const fadeAnim = useRef(new Animated.Value(1)).current;
  const translateX = useRef(new Animated.Value(0)).current;
  
  // Handle dismissing with animation
  const handleDismiss = () => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(translateX, {
        toValue: -100,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start(() => {
      onDismiss(notification.id);
    });
  };
  
  // Format the time display
  const getTimeDisplay = () => {
    try {
      const now = new Date();
      const notificationDate = new Date(notification.createdAt);
      
      // Calculate time difference in milliseconds
      const diffMs = now.getTime() - notificationDate.getTime();
      
      // Convert to minutes, hours, days
      const diffMins = Math.floor(diffMs / 60000);
      const diffHours = Math.floor(diffMs / (60000 * 60));
      const diffDays = Math.floor(diffMs / (60000 * 60 * 24));
      
      if (diffMins < 1) return 'Just now';
      if (diffMins < 60) return `${diffMins}m ago`;
      if (diffHours < 24) return `${diffHours}h ago`;
      if (diffDays < 30) return `${diffDays}d ago`;
      
      // Fallback to date format for older notifications
      return notificationDate.toLocaleDateString();
    } catch (e) {
      return 'Unknown time';
    }
  };

  // Get icon based on notification type
  const getNotificationIcon = () => {
    switch (notification.type) {
      case 'expiration':
        return {
          name: 'calendar',
          color: '#643843',
          background: '#E7CBCB'
        };
      case 'payment':
        return {
          name: 'cash',
          color: '#643843',
          background: '#E7CBCB'
        };
      case 'router':
        return {
          name: 'hardware-chip',
          color: '#643843',
          background: '#E7CBCB'
        };
      case 'connection':
        return {
          name: 'wifi',
          color: '#643843',
          background: '#E7CBCB'
        };
      case 'system':
      default:
        return {
          name: 'information-circle',
          color: '#643843',
          background: '#E7CBCB'
        };
    }
  };
  
  const icon = getNotificationIcon();

  return (
    <Animated.View 
      style={{
        opacity: fadeAnim,
        transform: [{ translateX: translateX }],
      }}
      className="mb-3"
    >
      <View className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
        <View className="flex-row">
          {/* Icon section */}
          <View 
            className="p-4 justify-center items-center" 
            style={{ backgroundColor: icon.background }}
          >
            <Ionicons name={icon.name} size={24} color={icon.color} />
          </View>
          
          {/* Content section */}
          <View className="flex-1 p-3">
            <View className="flex-row justify-between items-start">
              <Text className="font-bold text-gray-800">{notification.title}</Text>
              <Text className="text-xs text-gray-400 ml-2">{getTimeDisplay()}</Text>
            </View>
            
            <Text className="text-sm text-gray-600 mt-1">{notification.message}</Text>
            
            {/* Action buttons */}
            {showActions && (
              <View className="flex-row justify-between mt-3">
                {notification.actionLabel && onAction && (
                  <TouchableOpacity 
                    onPress={() => onAction(notification)}
                    className="bg-custom-muted-purple py-1 px-3 rounded-md"
                  >
                    <Text className="text-white text-xs font-medium">
                      {notification.actionLabel}
                    </Text>
                  </TouchableOpacity>
                )}
                
                <TouchableOpacity 
                  onPress={handleDismiss}
                  className="py-1 px-3"
                  style={{ marginLeft: 'auto' }}
                >
                  <Text className="text-gray-500 text-xs">Dismiss</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        </View>
        
        {/* Unread indicator */}
        {!notification.isRead && (
          <View className="absolute top-0 right-0 w-2 h-2 rounded-full bg-custom-deep-burgundy m-2" />
        )}
      </View>
    </Animated.View>
  );
};

export default NotificationCard;
