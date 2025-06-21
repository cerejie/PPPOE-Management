import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  SafeAreaView,
  StatusBar,
  Alert,
  ActivityIndicator,
  useColorScheme,
  Platform
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

// Components
import ProfileForm from '../components/ui/ProfileForm';
import SettingItem from '../components/ui/SettingItem';
import ThemeToggle from '../components/ui/ThemeToggle';
import ChangePasswordModal from '../components/modals/ChangePasswordModal';

// Store & Constants
import { 
  useUserStore, 
  User, 
  ThemeType, 
  LanguageCode,
  Subscription,
  SubscriptionTier 
} from '../store/useUserStore';
import { LANGUAGES, getLanguageByCode } from '../constants/languages';

/**
 * ProfileScreen Component
 * 
 * Comprehensive user profile management screen with:
 * - User profile information (name, email, phone)
 * - App settings (theme, language)
 * - Subscription management
 * - Password change functionality
 */
export default function ProfileScreen() {
  // Get user data and actions from store
  const { 
    user, 
    theme, 
    language, 
    subscription,
    updateUserProfile,
    setTheme,
    toggleTheme,
    setLanguage,
    setSubscription
  } = useUserStore();
  
  // Local state
  const [isLoading, setIsLoading] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState<LanguageCode>(language);
  
  // Mock data for subscription tiers
  const subscriptionTiers: SubscriptionTier[] = ['free', 'basic', 'premium', 'enterprise'];
  
  // Handle profile update
  const handleProfileUpdate = (updatedUser: Partial<User>) => {
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      updateUserProfile(updatedUser);
      setIsLoading(false);
    }, 800);
  };
  
  // Handle password change
  const handlePasswordChange = (oldPassword: string, newPassword: string) => {
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      console.log('Password changed from', oldPassword, 'to', newPassword);
      setIsLoading(false);
      Alert.alert('Success', 'Password updated successfully');
    }, 1000);
  };
  
  // Handle language change
  const handleLanguageChange = () => {
    // Show language options
    const options = LANGUAGES.map(lang => ({
      text: `${lang.flag} ${lang.nativeName}`,
      onPress: () => {
        setLanguage(lang.code as LanguageCode);
        setSelectedLanguage(lang.code as LanguageCode);
      }
    }));
    
    Alert.alert(
      'Select Language',
      'Choose your preferred language',
      [...options, { text: 'Cancel', style: 'cancel' }]
    );
  };
  
  // Handle subscription upgrade
  const handleSubscriptionChange = () => {
    // Show subscription options
    const currentTierIndex = subscription 
      ? subscriptionTiers.findIndex(tier => tier === subscription.tier)
      : -1;
    
    const options = subscriptionTiers
      .filter((_, index) => index > currentTierIndex) // Only show upgrades
      .map(tier => ({
        text: `Upgrade to ${tier.charAt(0).toUpperCase() + tier.slice(1)}`,
        onPress: () => {
          // In a real app, this would navigate to a payment screen
          Alert.alert(
            'Subscription Upgrade',
            `You would now be directed to payment for ${tier} subscription.`
          );
        }
      }));
    
    if (options.length === 0) {
      Alert.alert(
        'Subscription',
        'You already have the highest tier subscription available.'
      );
      return;
    }
    
    Alert.alert(
      'Upgrade Subscription',
      'Select a plan to upgrade to:',
      [...options, { text: 'Cancel', style: 'cancel' }]
    );
  };
  
  // Current language display
  const currentLanguage = getLanguageByCode(language);
  
  return (
    <SafeAreaView className="flex-1 bg-white">
      <StatusBar 
        barStyle={theme === 'dark' ? 'light-content' : 'dark-content'}
        backgroundColor="#FFFFFF"
      />
      
      <ScrollView 
        className="flex-1"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 40 }}
      >
        {/* Header */}
        <View className="px-4 py-6 bg-white" style={{
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.1,
          shadowRadius: 3,
          elevation: 3
        }}>
          <Text className="text-2xl font-bold text-custom-deep-burgundy">Profile</Text>
          <Text className="text-gray-500">Manage your account settings</Text>
        </View>
        
        {/* User Avatar Section */}
        <View className="items-center py-6 border-t border-b border-opacity-20 bg-custom-light-pink/20 border-custom-dusty-rose">
          <View className="relative">
            <Image
              source={user?.photoURL ? { uri: user.photoURL } : require('../../assets/default-avatar.png')}
              className="w-24 h-24 rounded-full"
              defaultSource={require('../../assets/default-avatar.png')}
            />
            <TouchableOpacity 
              className="flex absolute right-0 bottom-0 justify-center items-center w-8 h-8 rounded-full border-2 border-white border-solid bg-custom-muted-purple"
              onPress={() => Alert.alert('Coming Soon', 'Photo upload will be available in a future update')}
            >
              <Ionicons name="camera" size={16} color="#fff" />
            </TouchableOpacity>
          </View>
          
          <Text className="mt-3 text-xl font-semibold text-gray-800">
            {user?.name || 'Ejieeee'}
          </Text>
          <Text className="text-gray-500">
            {user?.email || 'user@example.com'}
          </Text>
        </View>
        
        {/* Profile Form Section */}
        <View className="p-4">
          <ProfileForm 
            onUpdate={handleProfileUpdate} 
            onChangePassword={() => setShowPasswordModal(true)} 
          />
        </View>
        
        {/* Settings Section */}
        <View className="p-4 mt-2">
          <Text className="mb-2 text-lg font-semibold text-gray-800">App Settings</Text>
          
          <View className="overflow-hidden bg-white rounded-lg border border-opacity-20 border-custom-dusty-rose">
            {/* Theme Setting */}
            <View className="flex flex-row justify-between items-center px-2 py-4 border-b border-gray-100 border-solid">
              <View className="flex flex-row items-center">
                <Ionicons name="moon-outline" size={20} color="#99627A" />
                <Text className="ml-3 text-gray-800">Dark Mode</Text>
              </View>
              <ThemeToggle 
                size="md" 
                onToggle={(newTheme) => {
                  // Theme toggle is handled by the component itself
                  console.log('Theme changed to', newTheme);
                }}
              />
            </View>
            
            {/* Language Setting */}
            <SettingItem
              title="Language"
              subtitle={`${currentLanguage.flag} ${currentLanguage.name}`}
              iconName="language-outline"
              iconColor="#99627A"
              iconBgColor="#F3F4F6"
              onPress={handleLanguageChange}
            />
            
            {/* Notifications Setting */}
            <SettingItem
              title="Notifications"
              subtitle="Manage alert preferences"
              iconName="notifications-outline"
              iconColor="#99627A"
              iconBgColor="#F3F4F6"
              onPress={() => Alert.alert('Coming Soon', 'This feature will be available soon')}
            />
          </View>
        </View>
        
        {/* Subscription Section */}
        <View className="p-4 mt-2">
          <Text className="mb-2 text-lg font-semibold text-gray-800">Subscription</Text>
          
          <View className="overflow-hidden bg-white rounded-lg border border-opacity-20 border-custom-dusty-rose">
            {/* Current Plan */}
            <View className="p-4 border-b border-gray-100 border-solid">
              <View className="flex flex-row justify-between items-center">
                <Text className="font-medium text-gray-800">Current Plan</Text>
                <View className="px-3 py-1 rounded-full bg-custom-muted-purple/20">
                  <Text className="font-medium text-custom-muted-purple">
                    {subscription?.tier ? 
                      `${subscription.tier.charAt(0).toUpperCase()}${subscription.tier.slice(1)}` 
                      : 'Free'}
                  </Text>
                </View>
              </View>
              
              {/* Plan Features */}
              {subscription && (
                <View className="mt-3">
                  {subscription.features.map((feature, index) => (
                    <View key={index} className="flex flex-row items-center mt-2">
                      <Ionicons name="checkmark-circle" size={16} color="#99627A" />
                      <Text className="ml-2 text-gray-600">{feature}</Text>
                    </View>
                  ))}
                </View>
              )}
            </View>
            
            {/* Upgrade Option */}
            <SettingItem
              title="Upgrade Plan"
              subtitle="Get access to more features"
              iconName="arrow-up-circle-outline"
              iconColor="#99627A"
              iconBgColor="#F3F4F6"
              onPress={handleSubscriptionChange}
            />
          </View>
        </View>
        
        {/* What's New Section */}
        <View className="p-4 mt-4">
          <View className="p-4 bg-gray-50 rounded-lg border border-opacity-20 border-custom-dusty-rose">
            <Text className="mb-1 text-lg font-semibold text-gray-800">What's New</Text>
            <Text className="mb-2 text-sm text-custom-muted-purple">
              Latest updates in version 1.2.0:
            </Text>
            <View className="ml-2">
              <Text className="mb-1 text-sm text-gray-600">• Enhanced PPPoE connection monitoring</Text>
              <Text className="mb-1 text-sm text-gray-600">• Improved router health analytics</Text>
              <Text className="mb-1 text-sm text-gray-600">• New client expiration notification system</Text>
              <Text className="text-sm text-gray-600">• Bug fixes and performance improvements</Text>
            </View>
          </View>
        </View>
        
        {/* App Info */}
        <View className="items-center mt-6">
          <Text className="text-sm text-gray-400">PPPoE Management v1.2.0</Text>
          <Text className="mt-1 text-xs text-gray-400">© 2025 EJIE SYSTEM BUSINESS</Text>
        </View>
      </ScrollView>
      
      {/* Change Password Modal */}
      <ChangePasswordModal 
        visible={showPasswordModal}
        onClose={() => setShowPasswordModal(false)}
        onPasswordChange={handlePasswordChange}
      />
      
      {/* Loading Overlay */}
      {isLoading && (
        <View className="flex absolute inset-0 justify-center items-center bg-black/20">
          <View className="p-4 bg-white rounded-lg">
            <ActivityIndicator color="#99627A" size="large" />
            <Text className="mt-2 text-gray-600">Processing...</Text>
          </View>
        </View>
      )}
    </SafeAreaView>
  );
}
