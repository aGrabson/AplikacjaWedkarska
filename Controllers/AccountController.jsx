import { Alert } from "react-native";
import AccountService from "../services/AccountService.jsx";
import { saveAuthData } from "../credentials/Store.jsx";

export const Login = async (loginData, navigation, setLoginCredentials) => {
  const gateway = new AccountService();
  const response = await gateway.Login(loginData);
  if (response.status === 200) {
    await saveAuthData(
      JSON.stringify({
        accessToken: response.data.accessToken,
        refreshToken: response.data.refreshToken,
      })
    );
    navigation.popToTop();
    navigation.replace("DrawerRoot");
    setLoginCredentials({
      login: "",
      password: "",
    });
  } else if (response.status === 404) {
    Alert.alert(
      "Niepoprawne dane",
      "Dane użytkownika są niepoprawne. Wprowadź inne dane.",
      [{ text: "OK" }]
    );
  }
};

export const Register = async (registerData, navigation, setRegisterData) => {
  const gateway = new AccountService();
  const response = await gateway.Register(registerData);
  if (response.status === 200) {
    Alert.alert(
      "Rejestracja powiodła się.",
      "Poprawnie zarejestrowano użytkownika.",
      [{ text: "OK" }]
    );
    navigation.popToTop();
    navigation.replace("LoginPage");
    setRegisterData({
      firstname: "",
      surname: "",
      email: "",
      password: "",
      cardNumber: "",
      dateOfBirth: new Date(),
    });
  } else if (response.status === 400) {
    Alert.alert(
      "Rejestracja nie powiodła się.",
      "Dane użytkownika są niepoprawne. Sprawdź swoje dane.",
      [{ text: "OK" }]
    );
  } else if (response.status === 404) {
    Alert.alert(
      "Rejestracja nie powiodła się.",
      "Nie znaleziono takiego użytkownika. Sprawdź swoje dane.",
      [{ text: "OK" }]
    );
  }
};

export const Logout = async (navigation) => {
  await saveAuthData(
    JSON.stringify({
      accessToken: "",
      refreshToken: "",
      rememberMe: false,
    })
  );
  navigation.popToTop();
  navigation.replace("LoginPage");
};

export const RefreshToken = async () => {
  const gateway = new AccountService();
  const response = await gateway.RefreshToken();
  return response;
};

export const GetUserInfo = async () => {
  const gateway = new AccountService();
  const response = await gateway.GetUserInfo();
  if (response.status === 200) {
    console.log(response.data)
    return response.data;
  } else if (response.status === 404 || response.status === 400) {
    Alert.alert(
      "Błąd pobierania danych",
      "Wystąpił problem podczas pobierania danych o użytkowniku.",
      [{ text: "OK" }]
    );
    return null;
  }
};
export const UpdateUserInfo = async (profileData, setEditMode) => {
  const gateway = new AccountService();
  const response = await gateway.UpdateUserInfo(profileData);
  if (response.status === 200) {
    setEditMode(false);
    console.log(response.data)
    return response.data;
  } else if (response.status === 404 || response.status === 400) {
    Alert.alert(
      "Błąd aktualizowania danych",
      "Wystąpił problem podczas aktualizowania danych o użytkowniku.",
      [{ text: "OK" }]
    );
    setEditMode(true);
    return null;
  }
};