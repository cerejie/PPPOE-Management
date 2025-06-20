/**
 * Mock data for the Dashboard screen
 * Contains data for summary cards, client status, and payment status
 */

export const summaryData = {  
  totalRouters: 5,  
  totalClients: 120,  
  connectedClients: 98,  
  expiringSoon: 8,  
};  

export const clientStatusData = [  
  { label: "Connected", value: 60 },  
  { label: "Up", value: 20 },  
  { label: "Down", value: 10 },  
  { label: "Disconnected", value: 10 },  
];  

export const paymentStatusData = [  
  { label: "Paid", value: 90 },  
  { label: "Unpaid", value: 30 },  
];
