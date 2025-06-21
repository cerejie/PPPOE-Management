import { Client } from '../store/useClientStore';

/**
 * Mock client data for development and testing
 * Each client object includes all necessary fields for the Client interface
 */

export const mockClients: Client[] = [
  {
    id: '1',
    routerId: 'router-01',
    username: 'Bayot',
    password: 'secret123',
    name: 'Bayot',
    location: 'Phase 1 (hex)- Room 101',
    plan: 'Premium 50Mbps',
    paymentDate: '2025-05-15',
    expirationDate: '2025-07-15',
    isConnected: true,
    notes: 'Regular customer'
  },
  {
    id: '2',
    routerId: 'router-01',
    username: 'Shukla',
    password: 'pass456',
    name: 'Shukla',
    location: 'Phase 2 (CCR)- Room 205',
    plan: 'Basic 25Mbps',
    paymentDate: '2025-06-01',
    expirationDate: '2025-06-25',
    isConnected: true,
    notes: 'New customer'
  },
  {
    id: '3',
    routerId: 'router-02',
    username: 'mike_johnson',
    password: 'mike789',
    name: 'Mike Johnson',
    location: 'Room 310',
    plan: 'Premium 50Mbps',
    paymentDate: '2025-05-20',
    expirationDate: '2025-06-20',
    isConnected: false,
    notes: 'Often pays late'
  },
  {
    id: '4',
    routerId: 'router-02',
    username: 'sarah_lee',
    password: 'sarah321',
    name: 'Sarah Lee',
    location: 'Room 422',
    plan: 'Premium Plus 100Mbps',
    paymentDate: '2025-05-30',
    expirationDate: '2025-06-30',
    isConnected: true,
    notes: ''
  },
  {
    id: '5',
    routerId: 'router-03',
    username: 'david_wilson',
    password: 'david555',
    name: 'David Wilson',
    location: 'Room 115',
    plan: 'Basic 25Mbps',
    paymentDate: '2025-06-05',
    expirationDate: '2025-06-23', // Expiring soon
    isConnected: true,
    notes: 'Student package'
  },
  {
    id: '6',
    routerId: 'router-03',
    username: 'emma_brown',
    password: 'emma777',
    name: 'Emma Brown',
    location: 'Room 250',
    plan: 'Premium 50Mbps',
    paymentDate: '2025-05-25',
    expirationDate: '2025-07-25',
    isConnected: false,
    notes: 'Business customer'
  },
  {
    id: '7',
    routerId: 'router-01',
    username: 'alex_martin',
    password: 'alex999',
    name: 'Alex Martin',
    location: 'Room 301',
    plan: 'Basic 25Mbps',
    paymentDate: '2025-06-10',
    expirationDate: '2025-08-10',
    isConnected: true,
    notes: ''
  },
  {
    id: '8',
    routerId: 'router-04',
    username: 'lisa_taylor',
    password: 'lisa333',
    name: 'Lisa Taylor',
    location: 'Room 190',
    plan: 'Premium Plus 100Mbps',
    paymentDate: '2025-05-28',
    expirationDate: '2025-06-22', // Expiring soon
    isConnected: true,
    notes: 'Needs technical support frequently'
  },
];

/**
 * Mock router data for filtering options
 */

export const mockRouters = [
  { id: 'router-01', name: 'Phase 1 (Hex)' },
  { id: 'router-02', name: 'Phase 2 (CCR)' },
  { id: 'router-03', name: 'Phase 3 (Rb4011)' },
  { id: 'router-04', name: 'Phase 4 (Rb4011)' },
];
