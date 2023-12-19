import { getAuthData } from "../credentials/Store.jsx";
import { backendLocalHostname } from "./Hostname.jsx";
import axios from "axios";

export default class AccountService {
  async Login(loginData) {
    const authUrl = backendLocalHostname + "Account/login";
    try {
      const response = await axios.post(authUrl, loginData);
      return response;
    } catch (error) {
      return error.response;
    }
  }

  async Register(registerData) {
    const authUrl = backendLocalHostname + "Account/register";
    try {
      const response = await axios.post(authUrl, {
        name: registerData.firstname,
        surname: registerData.surname,
        email: registerData.email,
        password: registerData.password,
        cardNumber: registerData.cardNumber,
        dateOfBirth: registerData.dateOfBirth,
      });
      return response;
    } catch (error) {
      return error.response;
    }
  }

  async GetUserInfo() {
    const authUrl = backendLocalHostname + "Account/getInfoAboutUser";
    const authData = await getAuthData();
    const config = {
      headers: {
        Authorization: "Bearer " + authData.accessToken,
      },
    };
    try {
      const response = await axios.get(authUrl, config);
      return response;
    } catch (error) {
      return error.response;
    }
  }
  async UpdateUserInfo(profileData) {
    const authUrl = backendLocalHostname + "Account/updateInfoAboutUser";
    const authData = await getAuthData();
    const config = {
      headers: {
        Authorization: "Bearer " + authData.accessToken,
      },
    };
    try {
      const response = await axios.put(
        authUrl,
        {
          name: profileData.name,
          surname: profileData.surname,
          email: profileData.email,
        },
        config
      );
      return response;
    } catch (error) {
      return error.response;
    }
  }
  
}
