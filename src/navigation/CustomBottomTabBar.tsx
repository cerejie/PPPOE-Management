import React, { useState } from 'react';
import { View, SafeAreaView } from 'react-native';
import BottomTabItem from './BottomTabItem';

// Tab configuration type
interface TabConfig {
  key: string;
  label: string;
  iconActive: string;
  iconInactive: string;
  screen?: React.FC;
}

interface CustomBottomTabBarProps {
  activeTab: string;
  onTabPress: (tabKey: string) => void;
  tabs: TabConfig[];
  activeColor?: string;
  inactiveColor?: string;
  backgroundColor?: string;
}

/**
 * CustomBottomTabBar - A responsive bottom tab navigation bar
 * 
 * Features:
 * - Dynamic tab width that adjusts based on active state
 * - Automatically handles spacing between tabs
 * - Active tab shows both icon and label with background
 * - Inactive tabs show only icon to save space
 * - Fully customizable colors and icons
 */
const CustomBottomTabBar: React.FC<CustomBottomTabBarProps> = ({
  activeTab,
  onTabPress,
  tabs,
  activeColor = '#3b82f6',
  inactiveColor = '#6b7280',
  backgroundColor = '#ffffff'
}) => {
  return (
    <SafeAreaView className="bg-white">
      <View 
        className="flex flex-row justify-between items-center px-2 border-t border-gray-200 border-solid"
        style={{ backgroundColor }}
      >
        {tabs.map((tab) => (
          <BottomTabItem
            key={tab.key}
            label={tab.label}
            iconName={activeTab === tab.key ? tab.iconActive : tab.iconInactive}
            isActive={activeTab === tab.key}
            onPress={() => onTabPress(tab.key)}
            activeColor={activeColor}
            inactiveColor={inactiveColor}
          />
        ))}
      </View>
    </SafeAreaView>
  );
};

export default CustomBottomTabBar;
