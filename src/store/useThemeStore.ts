import { create } from 'zustand';

interface ThemeState {
  primaryColor: string;
  secondaryColor: string;
  setPrimaryColor: (color: string) => void;
  setSecondaryColor: (color: string) => void;
}

export const useThemeStore = create<ThemeState>((set) => ({
  primaryColor: '#FFFFFF',  // White as base color
  secondaryColor: '#643843', // Secondary color as specified
  setPrimaryColor: (color: string) => set({ primaryColor: color }),
  setSecondaryColor: (color: string) => set({ secondaryColor: color }),
}));
