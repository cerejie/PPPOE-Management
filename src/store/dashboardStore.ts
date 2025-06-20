import { create } from 'zustand';
import { 
  summaryData, 
  clientStatusData, 
  paymentStatusData 
} from '../constants/mockDashboardData';

/**
 * Dashboard Store
 * 
 * Global state management for dashboard data using Zustand
 * In a real application, this would fetch data from an API
 */
interface DashboardState {
  // Summary data
  summary: {
    totalRouters: number;
    totalClients: number;
    connectedClients: number;
    expiringSoon: number;
  };
  
  // Chart data
  clientStatus: Array<{ label: string; value: number }>;
  paymentStatus: Array<{ label: string; value: number }>;
  
  // Actions
  refreshData: () => void;
  addRouter: () => void;
  addClient: () => void;
}

export const useDashboardStore = create<DashboardState>((set) => ({
  // Initial state from mock data
  summary: { ...summaryData },
  clientStatus: [...clientStatusData],
  paymentStatus: [...paymentStatusData],
  
  // Mock actions
  refreshData: () => {
    // In a real app, this would fetch fresh data from API
    set({
      summary: { ...summaryData },
      clientStatus: [...clientStatusData],
      paymentStatus: [...paymentStatusData],
    });
  },
  
  addRouter: () => {
    // Mock implementation of adding a router
    set((state) => ({
      summary: {
        ...state.summary,
        totalRouters: state.summary.totalRouters + 1
      }
    }));
  },
  
  addClient: () => {
    // Mock implementation of adding a client
    set((state) => ({
      summary: {
        ...state.summary,
        totalClients: state.summary.totalClients + 1
      }
    }));
  }
}));
