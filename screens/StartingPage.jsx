import {
  StyleSheet,
  ImageBackground,
  View,
  Text,
  TouchableOpacity,
} from "react-native";
export const StartingPage = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <ImageBackground
        style={styles.background}
        source={require("../src/tlobazowe.png")}
      >
        <View style={styles.bottomContainer}>
          <TouchableOpacity
            onPress={() => navigation.navigate("LoginPage")}
            style={styles.button}
          >
            <Text style={styles.buttonText}>Logowanie</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate("RegisterPage")}
            style={styles.button}
          >
            <Text style={styles.buttonText}>Rejestracja</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
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
    marginTop: "100%",
    width: "100%",
    height: "50%",
  },
  button: {
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
