import {
  StyleSheet,
  ImageBackground,
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
export const StartingPage = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
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
    </SafeAreaView>
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
    flex:1,
    justifyContent:'flex-end'
  },
  bottomContainer: {
    width: "100%",
    height: "50%",
    justifyContent:'flex-end'
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
  },
  buttonText: {
    color: "white",
    fontSize: 17,
  },
});
