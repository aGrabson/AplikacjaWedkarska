import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  ImageBackground,
  View,
  TouchableOpacity,
  ScrollView,
  TextInput,
  KeyboardAvoidingView,
  SafeAreaView,
  Alert,
} from "react-native";
import {
  Datepicker as RNKDatepicker,
  Icon as RNKIcon,
} from "@ui-kitten/components";
import { StatusBar } from "expo-status-bar";
import { Register } from "../Controllers/AccountController.jsx";
import { LoadingModal } from "../components/LoadingModal.jsx";

export const RegisterPage = ({ navigation }) => {
  const [registerData, setRegisterData] = useState({
    firstname: "",
    surname: "",
    email: "",
    password: "",
    cardNumber: "",
    dateOfBirth: new Date(),
  });
  const [errors, setErrors] = useState({
    firstname: "",
    surname: "",
    email: "",
    password: "",
    cardNumber: "",
  });
  const [loading, setLoading] = useState(false);

  const currentDate = registerData.dateOfBirth;
  const day =
    currentDate.getDate() < 10
      ? "0" + currentDate.getDate()
      : currentDate.getDate();
  const month =
    currentDate.getMonth() < 9
      ? "0" + (currentDate.getMonth() + 1)
      : currentDate.getMonth() + 1;
  const year = currentDate.getFullYear();
  const formattedDate = `${day}.${month}.${year}`;

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const minDate = new Date(1900, 0, 1);

  const handleRegister = async () => {
    if (
      !registerData.firstname ||
      !registerData.surname ||
      !registerData.email ||
      !registerData.password ||
      !registerData.cardNumber
    ) {
      setErrors({
        firstname: !registerData.firstname ? "Pole wymagane" : "",
        surname: !registerData.surname ? "Pole wymagane" : "",
        email: !registerData.email ? "Pole wymagane" : "",
        password: !registerData.password ? "Pole wymagane" : "",
        cardNumber: !registerData.cardNumber ? "Pole wymagane" : "",
      });
      return;
    } else {
      setLoading(true);
      await Register(registerData, navigation, setRegisterData);
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
                <Text style={styles.text}>Dołącz do nas</Text>
                <TextInput
                  style={styles.loginInput}
                  placeholder={"Imię"}
                  value={registerData.firstname}
                  onChangeText={(text) => {
                    setRegisterData({ ...registerData, firstname: text });
                    setErrors((prev) => ({ ...prev, firstname: "" }));
                  }}
                />
                <Text style={styles.errorText}>{errors.firstname}</Text>
                <TextInput
                  style={styles.loginInput}
                  placeholder={"Nazwisko"}
                  value={registerData.surname}
                  onChangeText={(text) => {
                    setRegisterData({ ...registerData, surname: text });
                    setErrors((prev) => ({ ...prev, surname: "" }));
                  }}
                />
                <Text style={styles.errorText}>{errors.surname}</Text>
                <TextInput
                  style={styles.loginInput}
                  placeholder={"Email"}
                  value={registerData.email}
                  onChangeText={(text) => {
                    setRegisterData({ ...registerData, email: text });
                    setErrors((prev) => ({ ...prev, email: "" }));
                  }}
                />
                <Text style={styles.errorText}>{errors.email}</Text>
                <TextInput
                  style={styles.loginInput}
                  secureTextEntry={true}
                  placeholder={"Hasło"}
                  value={registerData.password}
                  onChangeText={(text) => {
                    setRegisterData({ ...registerData, password: text });
                    setErrors((prev) => ({ ...prev, password: "" }));
                  }}
                />
                <Text style={styles.errorText}>{errors.password}</Text>
                <TextInput
                  style={styles.loginInput}
                  placeholder={"Numer karty"}
                  value={registerData.cardNumber}
                  onChangeText={(text) => {
                    setRegisterData({ ...registerData, cardNumber: text });
                    setErrors((prev) => ({ ...prev, cardNumber: "" }));
                  }}
                />
                <Text style={styles.errorText}>{errors.cardNumber}</Text>
                <View style={styles.datepickerContainer}>
                  <View style={styles.labelContainer}>
                    <Text style={styles.datepickerLabel}>Data urodzenia</Text>
                  </View>
                  <RNKDatepicker
                    style={styles.datepicker}
                    accessoryRight={
                      <RNKIcon name="calendar-outline" pack="material" />
                    }
                    date={registerData.dateOfBirth}
                    onSelect={(selectedDate) =>
                      setRegisterData({
                        ...registerData,
                        dateOfBirth: selectedDate,
                      })
                    }
                    controlStyle={styles.datePickerValue}
                    max={today}
                    min={minDate}
                  />
                </View>
                <TouchableOpacity
                  onPress={() => navigation.navigate("LoginPage")}
                >
                  <Text style={styles.alreadyUserText}>
                    Masz już konto? Zaloguj się
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={handleRegister}
                  style={styles.button}
                >
                  <Text style={styles.buttonText}>Zarejestruj</Text>
                </TouchableOpacity>
              </ScrollView>
            </View>
          </ImageBackground>
        </View>
        <LoadingModal visible={loading} text={"Rejestracja..."} />
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
    position: "relative",
    top: "15%",
    width: "100%",
    height: "85%",
    minHeight: 200,
    backgroundColor: "#DADADA",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
  },
  button: {
    width: "80%",
    height: 50,
    borderRadius: 38,
    backgroundColor: "#0000FF",
    borderColor: "#0000FF",
    borderWidth: 3,
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: "10%",
  },
  buttonText: {
    color: "white",
    fontSize: 18,
  },
  text: {
    alignSelf: "center",
    color: "#0F4C8A",
    padding: "5%",
    fontSize: 32,
    fontWeight: "bold",
  },
  loginInput: {
    width: "90%",
    height: 50,
    borderRadius: 38,
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#EBEBEB",
    borderWidth: 2,
    borderColor: "#DADADA",
    paddingLeft: 20,
    marginBottom: 4,
    fontSize: 18,
  },
  scrollView: {
    minHeight: 200,
    height: "100%",
    maxHeight: "100%",
    marginHorizontal: 10,
  },
  alreadyUserText: {
    fontSize: 12,
    padding: "3%",
    fontWeight: "bold",
  },
  datepickerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 10,
    marginHorizontal: "8%",
  },
  labelContainer: {
    marginRight: 10,
  },
  datepickerLabel: {
    fontSize: 18,
    fontWeight: "bold",
  },
  datepicker: {
    flex: 1,
  },
  datePickerValue: {
    fontSize: 18,
  },
  errorText: {
    color: "red",
    fontSize: 12,
    marginHorizontal: 25,
    marginVertical: 4,
  },
});
