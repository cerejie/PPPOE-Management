import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Button from '../components/Button';
import { useThemeStore } from '../store/useThemeStore';

const HomeScreen = () => {
  const { secondaryColor } = useThemeStore();

  return (
    <View style={styles.container}>
      <Text style={[styles.title, { color: secondaryColor }]}>PPPoE Management System</Text>
      <Text style={styles.subtitle}>Monitor and manage your PPPoE clients</Text>
      
      <View style={styles.statsContainer}>
        <View style={[styles.statCard, { borderColor: secondaryColor }]}>
          <Text style={styles.statNumber}>0</Text>
          <Text style={styles.statLabel}>Total Clients</Text>
        </View>
        
        <View style={[styles.statCard, { borderColor: secondaryColor }]}>
          <Text style={styles.statNumber}>0</Text>
          <Text style={styles.statLabel}>Connected</Text>
        </View>
        
        <View style={[styles.statCard, { borderColor: secondaryColor }]}>
          <Text style={styles.statNumber}>0</Text>
          <Text style={styles.statLabel}>Expiring Soon</Text>
        </View>
      </View>
      
      <Button 
        title="View Details" 
        onPress={() => {}} 
        variant="primary"
        size="medium" 
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    alignItems: 'center', 
    justifyContent: 'center', 
    backgroundColor: '#FFFFFF',
    padding: 20,
  },
  title: {
    fontSize: 24, 
    fontWeight: 'bold', 
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 32,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 32,
  },
  statCard: {
    width: '30%',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    borderWidth: 1,
    backgroundColor: '#FFFFFF',
  },
  statNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#666',
  },
});

export default HomeScreen;
