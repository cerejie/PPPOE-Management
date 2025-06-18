import React from 'react';
import { Modal, View, Text } from 'react-native';

interface SampleModalProps {
  visible: boolean;
  onClose: () => void;
}

const SampleModal: React.FC<SampleModalProps> = ({ visible, onClose }) => (
  <Modal visible={visible} transparent animationType="slide">
    <View className="flex-1 items-center justify-center bg-black/50">
      <View className="bg-white p-6 rounded">
        <Text className="text-lg font-bold mb-2">This is a modal!</Text>
        <Text onPress={onClose} className="text-blue-500 mt-4">Close</Text>
      </View>
    </View>
  </Modal>
);

export default SampleModal;
