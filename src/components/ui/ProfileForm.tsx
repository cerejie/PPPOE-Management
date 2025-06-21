import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { User, useUserStore } from '../../store/useUserStore';

interface ProfileFormProps {
  /**
   * Function to call when the form is submitted
   */
  onUpdate?: (updatedUser: Partial<User>) => void;
  
  /**
   * Function to call when the user wants to change their password
   */
  onChangePassword?: () => void;
}

/**
 * ProfileForm component for displaying and editing user profile information
 * 
 * Features:
 * - Edit mode for updating user information
 * - Field validation
 * - Clean and consistent styling
 */
const ProfileForm: React.FC<ProfileFormProps> = ({ onUpdate, onChangePassword }) => {
  // Get user data from store
  const { user, updateUserProfile } = useUserStore();
  
  // Local state for form fields
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || ''
  });
  
  // Update local state when user data changes
  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || '',
        email: user.email || '',
        phone: user.phone || ''
      });
    }
  }, [user]);
  
  // Handle form input changes
  const handleChange = (field: keyof typeof formData, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };
  
  // Basic validation
  const validateForm = (): boolean => {
    // Check name
    if (!formData.name.trim()) {
      Alert.alert('Error', 'Name cannot be empty');
      return false;
    }
    
    // Check email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      Alert.alert('Error', 'Please enter a valid email address');
      return false;
    }
    
    // Check phone (optional)
    if (formData.phone && !/^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/.test(formData.phone)) {
      Alert.alert('Error', 'Please enter a valid phone number');
      return false;
    }
    
    return true;
  };
  
  // Save changes
  const handleSave = () => {
    if (!validateForm()) return;
    
    // Update the user profile
    const updatedData = {
      name: formData.name,
      email: formData.email,
      phone: formData.phone
    };
    
    updateUserProfile(updatedData);
    
    if (onUpdate) {
      onUpdate(updatedData);
    }
    
    setIsEditing(false);
    Alert.alert('Success', 'Profile updated successfully');
  };
  
  // Cancel editing
  const handleCancel = () => {
    // Reset form data to user data
    if (user) {
      setFormData({
        name: user.name || '',
        email: user.email || '',
        phone: user.phone || ''
      });
    }
    
    setIsEditing(false);
  };
  
  return (
    <View className="bg-white rounded-lg overflow-hidden">
      {/* Header with edit button */}
      <View className="flex-row justify-between items-center p-4 border-b border-custom-dusty-rose border-opacity-20">
        <Text className="text-lg font-semibold text-gray-800">Personal Information</Text>
        
        {!isEditing ? (
          <TouchableOpacity 
            onPress={() => setIsEditing(true)}
            className="flex-row items-center"
          >
            <Ionicons name="create-outline" size={18} color="#99627A" />
            <Text className="ml-1 text-custom-muted-purple">Edit</Text>
          </TouchableOpacity>
        ) : (
          <View className="flex-row">
            <TouchableOpacity 
              onPress={handleCancel}
              className="flex-row items-center mr-3"
            >
              <Text className="text-gray-500">Cancel</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              onPress={handleSave}
              className="flex-row items-center"
            >
              <Ionicons name="checkmark" size={18} color="#99627A" />
              <Text className="ml-1 text-custom-muted-purple">Save</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
      
      {/* Form Fields */}
      <View className="p-4">
        {/* Name Field */}
        <View className="mb-4">
          <Text className="text-sm text-gray-500 mb-1">Full Name</Text>
          {isEditing ? (
            <TextInput
              className="p-2 border border-gray-300 rounded-md text-gray-800"
              value={formData.name}
              onChangeText={(value) => handleChange('name', value)}
              placeholder="Enter your full name"
            />
          ) : (
            <Text className="text-gray-800">{formData.name || 'Not provided'}</Text>
          )}
        </View>
        
        {/* Email Field */}
        <View className="mb-4">
          <Text className="text-sm text-gray-500 mb-1">Email Address</Text>
          {isEditing ? (
            <TextInput
              className="p-2 border border-gray-300 rounded-md text-gray-800"
              value={formData.email}
              onChangeText={(value) => handleChange('email', value)}
              keyboardType="email-address"
              autoCapitalize="none"
              placeholder="Enter your email"
            />
          ) : (
            <Text className="text-gray-800">{formData.email || 'Not provided'}</Text>
          )}
        </View>
        
        {/* Phone Field */}
        <View className="mb-4">
          <Text className="text-sm text-gray-500 mb-1">Phone Number</Text>
          {isEditing ? (
            <TextInput
              className="p-2 border border-gray-300 rounded-md text-gray-800"
              value={formData.phone}
              onChangeText={(value) => handleChange('phone', value)}
              keyboardType="phone-pad"
              placeholder="Enter your phone number"
            />
          ) : (
            <Text className="text-gray-800">{formData.phone || 'Not provided'}</Text>
          )}
        </View>
        
        {/* Password Change Option */}
        {!isEditing && (
          <TouchableOpacity 
            className="flex-row items-center mt-3 py-2"
            onPress={onChangePassword}
          >
            <Ionicons name="key-outline" size={18} color="#99627A" />
            <Text className="ml-2 text-custom-muted-purple">Change Password</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default ProfileForm;
