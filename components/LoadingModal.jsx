import React from "react";
import { View, Modal, ActivityIndicator, Text } from "react-native";

export const LoadingModal = ({ visible, text }) => {
  return (
    <Modal transparent={true} animationType="none" visible={visible}>
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "rgba(0, 0, 0, 0.5)",
        }}
      >
        <View
          style={{
            width: 150,
            height: 150,
            backgroundColor: "#fff",
            borderRadius: 10,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <ActivityIndicator size="large" color="#0000ff" />
          <Text>{text}</Text>
        </View>
      </View>
    </Modal>
  );
};