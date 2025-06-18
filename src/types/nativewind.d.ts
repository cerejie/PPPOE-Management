// Type definitions for NativeWind with React Native
import 'react-native';

declare module 'react-native' {
  interface ViewProps {
    className?: string;
  }
  
  interface TextProps {
    className?: string;
  }
  
  interface ImageProps {
    className?: string;
  }

  interface TouchableOpacityProps {
    className?: string;
  }

  interface PressableProps {
    className?: string;
  }

  interface ScrollViewProps {
    className?: string;
  }

  interface TextInputProps {
    className?: string;
  }
}

// For other components that might use className
declare namespace JSX {
  interface IntrinsicAttributes {
    className?: string;
  }
}
