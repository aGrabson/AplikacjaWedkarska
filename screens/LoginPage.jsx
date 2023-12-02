import React, { useState } from "react";
import {
  StyleSheet,
  SafeAreaView,
  Text,
  ImageBackground,
  View,
  TouchableOpacity,
  ScrollView,
  TextInput,
  KeyboardAvoidingView,
  Alert,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { StatusBar } from "expo-status-bar";
import { Login } from "../Controllers/AccountController";
import { LoadingModal } from "../components/LoadingModal.jsx";

export const LoginPage = ({ navigation }) => {
  const [loginCredentials, setLoginCredentials] = useState({
    email: "agraba@cos.nie",
    password: "admin",
  });
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(true);

  const handleLogin = async () => {
    if (loginCredentials.email === "" || loginCredentials.password === "") {
      Alert.alert(
        "Uzupełnij formularz",
        "Pola w formularzu są puste. \nWprowadź dane do formularza.",
        [{ text: "OK" }]
      );
    } else {
      setLoading(true);
      await Login(loginCredentials, navigation, setLoginCredentials);
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior="height">
      <SafeAreaView style={{ flex: 1 }}>
        <StatusBar></StatusBar>
        <View style={styles.container}>
          <ImageBackground
            style={styles.background}
            source={require("../src/tlobazowe.png")}
          >
            <View style={styles.bottomContainer}>
              <ScrollView style={styles.scrollView}>
                <Text style={styles.text}>Witaj użytkowniku</Text>
                <View style={styles.loginContainer}>
                  <TextInput
                    style={styles.loginInput}
                    placeholder={"Email"}
                    value={loginCredentials.email}
                    onChangeText={(text) =>
                      setLoginCredentials((prev) => ({ ...prev, email: text }))
                    }
                  />
                </View>
                <View style={styles.passwordContainer}>
                  <TextInput
                    style={styles.passwordInput}
                    secureTextEntry={!showPassword}
                    placeholder={"Hasło"}
                    value={loginCredentials.password}
                    onChangeText={(text) =>
                      setLoginCredentials((prev) => ({
                        ...prev,
                        password: text,
                      }))
                    }
                  />
                  <TouchableOpacity
                    onPress={() => setShowPassword(!showPassword)}
                    style={styles.eyeIcon}
                  >
                    <Icon
                      name={showPassword ? "eye-slash" : "eye"}
                      type="font-awesome"
                      size={24}
                      color="#0F4C8A"
                    />
                  </TouchableOpacity>
                </View>
                <TouchableOpacity
                  onPress={() => navigation.navigate("RegisterPage")}
                >
                  <Text style={styles.passRememberText}>
                    Pierwszy raz u nas? Zarejestruj się!
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={handleLogin} style={styles.button}>
                  <Text style={styles.buttonText}>Zaloguj</Text>
                </TouchableOpacity>
              </ScrollView>
            </View>
          </ImageBackground>
        </View>
        <LoadingModal visible={loading} text={"Logowanie..."} />
      </SafeAreaView>
    </KeyboardAvoidingView>
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
    flex: 1,
  },
  bottomContainer: {
    top: "45%",
    width: "100%",
    height: "55%",
    minHeight: 200,
    backgroundColor: "#DADADA",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
  },
  button: {
    position: "relative",
    width: "80%",
    height: 60,
    borderRadius: 38,
    backgroundColor: "#0000FF",
    borderColor: "#0000FF",
    borderWidth: 3,
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: "12%",
    bottom: 0,
  },
  buttonText: {
    color: "white",
    fontSize: 17,
  },
  text: {
    alignSelf: "center",
    color: "#0F4C8A",
    padding: "5%",
    fontSize: 32,
    fontWeight: "bold",
  },
  scrollView: {
    minHeight: 200,
    height: "100%",
    maxHeight: "100%",
    marginHorizontal: 10,
  },
  passRememberText: {
    fontSize: 12,
    padding: "3%",
    fontWeight: "bold",
  },
  passwordContainer: {
    width: "85%",
    height: 85,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#EBEBEB",
    borderWidth: 2,
    borderColor: "#DADADA",
    borderRadius: 38,
    marginBottom: 16,
    fontSize: 20,
    alignSelf: "center",
  },
  loginContainer: {
    width: "85%",
    height: 85,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#EBEBEB",
    borderWidth: 2,
    borderColor: "#DADADA",
    borderRadius: 38,
    marginBottom: 16,
    fontSize: 20,
    alignSelf: "center",
  },
  passwordInput: {
    position: "relative",
    width: "80%",
    height: "100%",
    borderRadius: 38,
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#EBEBEB",
    paddingLeft: 20,
    paddingRight: 20,
    fontSize: 20,
  },
  loginInput: {
    position: "relative",
    width: "100%",
    height: "100%",
    borderRadius: 38,
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#EBEBEB",
    paddingLeft: 20,
    paddingRight: 20,
    fontSize: 20,
  },
  eyeIcon: {
    position: "relative",
    right: "20%",
  },
});
