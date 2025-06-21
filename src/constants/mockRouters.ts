import { Router } from '../store/useRouterStore';


/**
 * Mock router data for development and testing
 * Each router has associated metrics and client information
 */


export interface RouterHealth {
  cpuUsage: number; // percentage
  memoryUsage: number; // percentage
  uptime: string; // formatted string like '5d 12h 30m'
  temperature: number; // celsius
  lastSeen: string; // ISO date string
}


export interface RouterWithHealth extends Router {
  health: RouterHealth;
  location: string; // For grouping
  model: string; // Router model info
}


export const mockRouters: RouterWithHealth[] = [


  {
    id: 'router-01',
    name: 'Phase 1 (Hex)',
    ipAddress: '192.168.1.1',
    username: 'admin',
    password: 'admin123',
    port: 8728,
    connectedClients: 15,
    disconnectedClients: 3,
    totalClients: 18,
    location: 'HEX Building',
    model: 'Mikrotik hEX S (RB760iGS)',
    health: {
      cpuUsage: 35,
      memoryUsage: 42,
      uptime: '45d 12h 33m',
      temperature: 48,
      lastSeen: new Date().toISOString()
    }
  },


  {
    id: 'router-02',
    name: 'Phase 2 (CCR)',
    ipAddress: '192.168.2.1',
    username: 'admin',
    password: 'secure456',
    port: 8728,
    connectedClients: 28,
    disconnectedClients: 4,
    totalClients: 32,
    location: 'CCR Building',
    model: 'Mikrotik CCR1009-7G-1C-PC',
    health: {
      cpuUsage: 62,
      memoryUsage: 58,
      uptime: '15d 7h 22m',
      temperature: 55,
      lastSeen: new Date().toISOString()
    }
  },


  {
    id: 'router-03',
    name: 'Phase 3 (Rb4011)',
    ipAddress: '192.168.3.1',
    username: 'admin',
    password: 'password789',
    port: 8728,
    connectedClients: 20,
    disconnectedClients: 2,
    totalClients: 22,
    location: 'Main Building',
    model: 'Mikrotik RB4011iGS+5HacQ2HnD',
    health: {
      cpuUsage: 28,
      memoryUsage: 32,
      uptime: '30d 5h 47m',
      temperature: 42,
      lastSeen: new Date().toISOString()
    }
  },


  {
    id: 'router-04',
    name: 'Phase 4 (Rb4011)',
    ipAddress: '192.168.4.1',
    username: 'admin',
    password: 'adminpass',
    port: 8728,
    connectedClients: 12,
    disconnectedClients: 6,
    totalClients: 18,
    location: 'Main Building',
    model: 'Mikrotik RB4011iGS+5HacQ2HnD',
    health: {
      cpuUsage: 45,
      memoryUsage: 38,
      uptime: '25d 9h 12m',
      temperature: 44,
      lastSeen: new Date().toISOString()
    }
  },


  {
    id: 'router-05',
    name: 'VIP Section',
    ipAddress: '192.168.5.1',
    username: 'admin',
    password: 'vipsecure',
    port: 8728,
    connectedClients: 5,
    disconnectedClients: 0,
    totalClients: 5,
    location: 'VIP Building',
    model: 'Mikrotik RB5009UG+S+IN',
    health: {
      cpuUsage: 15,
      memoryUsage: 22,
      uptime: '60d 2h 15m',
      temperature: 38,
      lastSeen: new Date().toISOString()
    }
  },


  {
    id: 'router-06',
    name: 'Staff Housing',
    ipAddress: '192.168.6.1',
    username: 'admin',
    password: 'staffpass',
    port: 8728,
    connectedClients: 7,
    disconnectedClients: 1,
    totalClients: 8,
    location: 'Staff Building',
    model: 'Mikrotik hAP ac²',
    health: {
      cpuUsage: 72,
      memoryUsage: 68,
      uptime: '5d 3h 45m',
      temperature: 62, // High temperature indicates potential issues
      lastSeen: new Date().toISOString()
    }
  }


];
