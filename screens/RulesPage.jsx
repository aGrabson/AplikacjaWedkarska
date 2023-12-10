import {
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  StatusBar,
  LogBox,
  Alert,
} from "react-native";
import { useEffect, useState } from "react";
import { Button } from "../components/Button";
LogBox.ignoreAllLogs();

export const RulesPage = () => {
  const handlePress = async () => {
    Alert.alert(
      "Potwierdzenie",
      "Czy na pewno chcesz pobrać regulamin? ",
      [
        {
          text: "Tak",
          onPress: async () => {},
        },
        {
          text: "Nie",
          style: "cancel",
        },
      ],
      { cancelable: false }
    );
  };

  return (
    <View style={styles.container}>
      <StatusBar></StatusBar>
      <Button onPress={handlePress}>Kliknij tutaj aby pobrać regulamin</Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    width: "100%",
    height: "100%",
  },
  background: {
    width: "100%",
    height: "100%",
  },
  bottomContainer: {
    position: "relative",
    marginTop: "100%",
    width: "100%",
    height: "50%",
  },
  button: {
    position: "relative",
    width: "80%",
    height: "20%",
    borderRadius: 38,
    backgroundColor: "#0000FF",
    borderColor: "#0000FF",
    borderWidth: 3,
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 25,
    top: "40%",
  },
  buttonText: {
    color: "white",
    fontSize: 17,
  },
});
