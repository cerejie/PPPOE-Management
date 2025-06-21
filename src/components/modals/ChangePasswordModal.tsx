import React, { useState } from 'react';
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
  Platform
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface ChangePasswordModalProps {
  /**
   * Controls the visibility of the modal
   */
  visible: boolean;

  /**
   * Function to call when the modal is closed
   */
  onClose: () => void;

  /**
   * Function to call when the password is successfully changed
   */
  onPasswordChange?: (oldPassword: string, newPassword: string) => void;
}

/**
 * Modal component for changing user password
 * 
 * Features:
 * - Password validation (min length, matching confirmation)
 * - Toggle to show/hide password
 * - Clean consistent styling
 */
const ChangePasswordModal: React.FC<ChangePasswordModalProps> = ({
  visible,
  onClose,
  onPasswordChange
}) => {
  // State for form fields
  const [formData, setFormData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  
  // State for password visibility
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  
  // Handle input changes
  const handleChange = (field: keyof typeof formData, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };
  
  // Validate form before submission
  const validateForm = (): boolean => {
    // Check if current password is provided
    if (!formData.currentPassword) {
      Alert.alert('Error', 'Please enter your current password');
      return false;
    }
    
    // Check if new password meets requirements
    if (formData.newPassword.length < 8) {
      Alert.alert('Error', 'New password must be at least 8 characters');
      return false;
    }
    
    // Check if passwords match
    if (formData.newPassword !== formData.confirmPassword) {
      Alert.alert('Error', 'New passwords do not match');
      return false;
    }
    
    return true;
  };
  
  // Handle form submission
  const handleSubmit = () => {
    if (!validateForm()) return;
    
    // This would normally connect to an API
    // For now, just simulate a successful change
    if (onPasswordChange) {
      onPasswordChange(formData.currentPassword, formData.newPassword);
    }
    
    // Reset form and close modal
    setFormData({
      currentPassword: '',
      newPassword: '',
      confirmPassword: ''
    });
    
    Alert.alert('Success', 'Password updated successfully');
    onClose();
  };
  
  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View className="flex-1 bg-black/30 justify-center items-center">
          <View className="bg-white w-[90%] rounded-xl p-5 shadow-lg">
            {/* Header */}
            <View className="flex-row justify-between items-center mb-4">
              <Text className="text-xl font-semibold text-gray-800">Change Password</Text>
              <TouchableOpacity onPress={onClose}>
                <Ionicons name="close" size={24} color="#666" />
              </TouchableOpacity>
            </View>
            
            {/* Current Password Field */}
            <View className="mb-4">
              <Text className="text-sm text-gray-600 mb-1">Current Password</Text>
              <View className="flex-row items-center border border-gray-300 rounded-md">
                <TextInput
                  className="flex-1 p-2.5 text-gray-800"
                  value={formData.currentPassword}
                  onChangeText={(value) => handleChange('currentPassword', value)}
                  secureTextEntry={!showCurrentPassword}
                  placeholder="Enter current password"
                />
                <TouchableOpacity 
                  className="px-3"
                  onPress={() => setShowCurrentPassword(!showCurrentPassword)}
                >
                  <Ionicons 
                    name={showCurrentPassword ? "eye-off-outline" : "eye-outline"} 
                    size={20} 
                    color="#99627A" 
                  />
                </TouchableOpacity>
              </View>
            </View>
            
            {/* New Password Field */}
            <View className="mb-4">
              <Text className="text-sm text-gray-600 mb-1">New Password</Text>
              <View className="flex-row items-center border border-gray-300 rounded-md">
                <TextInput
                  className="flex-1 p-2.5 text-gray-800"
                  value={formData.newPassword}
                  onChangeText={(value) => handleChange('newPassword', value)}
                  secureTextEntry={!showNewPassword}
                  placeholder="Enter new password"
                />
                <TouchableOpacity 
                  className="px-3"
                  onPress={() => setShowNewPassword(!showNewPassword)}
                >
                  <Ionicons 
                    name={showNewPassword ? "eye-off-outline" : "eye-outline"} 
                    size={20} 
                    color="#99627A" 
                  />
                </TouchableOpacity>
              </View>
              <Text className="text-xs text-gray-500 mt-1">
                Password must be at least 8 characters
              </Text>
            </View>
            
            {/* Confirm Password Field */}
            <View className="mb-6">
              <Text className="text-sm text-gray-600 mb-1">Confirm Password</Text>
              <View className="flex-row items-center border border-gray-300 rounded-md">
                <TextInput
                  className="flex-1 p-2.5 text-gray-800"
                  value={formData.confirmPassword}
                  onChangeText={(value) => handleChange('confirmPassword', value)}
                  secureTextEntry={!showConfirmPassword}
                  placeholder="Confirm new password"
                />
                <TouchableOpacity 
                  className="px-3"
                  onPress={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  <Ionicons 
                    name={showConfirmPassword ? "eye-off-outline" : "eye-outline"} 
                    size={20} 
                    color="#99627A" 
                  />
                </TouchableOpacity>
              </View>
            </View>
            
            {/* Action Buttons */}
            <View className="flex-row justify-end space-x-3">
              <TouchableOpacity 
                className="px-4 py-2.5 rounded-md bg-gray-200"
                onPress={onClose}
              >
                <Text className="text-gray-800">Cancel</Text>
              </TouchableOpacity>
              
              <TouchableOpacity 
                className="px-5 py-2.5 rounded-md bg-custom-muted-purple"
                onPress={handleSubmit}
              >
                <Text className="text-white font-medium">Update</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

export default ChangePasswordModal;
