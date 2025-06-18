# Modular React Native App (Expo, TypeScript, Tailwind CSS, Vite)

## Structure

```
src/
  components/      # Reusable UI components
  screens/         # App screens
  modals/          # Modal components
  hooks/           # Custom hooks
  services/        # Business logic/services
  utils/           # Utility functions
  firebase/        # Firebase config
  context/         # React contexts
  navigation/      # Navigation setup
```

## Getting Started

1. Install dependencies:
   ```sh
   yarn install
   ```
2. Start the development server:
   ```sh
   yarn start
   ```
3. For web (with Vite):
   ```sh
   yarn vite
   ```

## Linting & Formatting
- Lint: `yarn lint`
- Format: `yarn prettier`

## Firebase
Add your Firebase config to environment variables (see `.env.example`).

---

This project uses Expo, TypeScript, Tailwind CSS (NativeWind), React Navigation, and Vite for a modern, modular, scalable React Native setup.
