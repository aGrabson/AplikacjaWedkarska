import React, { useEffect } from "react";
import {
  StyleSheet,
  View,
  LogBox,
  Alert,
  TouchableOpacity,
  Text,
} from "react-native";
import { Button } from "../components/Button";
import { backendLocalHostname } from "../services/Hostname";
import axios from "axios";
import * as FileSystem from "expo-file-system";
import * as IntentLauncher from "expo-intent-launcher";
import BarsIcon from "react-native-vector-icons/FontAwesome";

LogBox.ignoreAllLogs();

export const RulesPage = ({ navigation }) => {
  const handlePress = async () => {
    Alert.alert(
      "Potwierdzenie",
      "Czy na pewno chcesz pobrać regulamin? ",
      [
        {
          text: "Tak",
          onPress: async () => {
            await downloadPdf();
          },
        },
        {
          text: "Nie",
          style: "cancel",
        },
      ],
      { cancelable: false }
    );
  };

  const downloadPdf = async () => {
    try {
      const response = await axios.get(
        backendLocalHostname + "File/getRulesPdf",
        { data: {}, body: "" }
      );
      const base64 = response.data.pdfContentBase64;
      const pdfUri = `${FileSystem.cacheDirectory}regulamin.pdf`;
      await FileSystem.writeAsStringAsync(pdfUri, base64, {
        encoding: FileSystem.EncodingType.Base64,
      });

      FileSystem.getContentUriAsync(pdfUri).then((cUri) => {
        IntentLauncher.startActivityAsync("android.intent.action.VIEW", {
          data: cUri,
          flags: 1,
        });
      });
    } catch (error) {
      console.error("Błąd podczas pobierania pliku PDF:", error);
      Alert.alert("Błąd", "Wystąpił błąd podczas pobierania pliku PDF.");
    }
  };

  useEffect(() => {
    navigation.setOptions({
      header: () => (
        <View
          style={{
            flexDirection: "row",
            backgroundColor: "#DADADA",
            height: 90,
            borderBottomLeftRadius: 25,
            borderBottomRightRadius: 25,
            alignItems: "flex-end",
            width: "100%",
          }}
        >
          <TouchableOpacity
            onPress={() => navigation.openDrawer()}
            style={{ marginLeft: 15, marginBottom: 8 }}
          >
            <BarsIcon
              size={20}
              name="bars"
              style={{
                marginRight: 35,
              }}
            />
          </TouchableOpacity>
          <View>
            <Text style={{ fontSize: 28, color: "#0F4C8A" }}>Regulamin</Text>
          </View>
        </View>
      ),
    });
  }, []);
  return (
    <View style={styles.container}>
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
