import * as SecureStore from "expo-secure-store";

export const saveAuthData = async (value) => {
  await SecureStore.setItemAsync("authData", value);
};

export const getAuthData = async () => {
  const authData = await SecureStore.getItemAsync("authData");
  return authData
    ? JSON.parse(authData)
    : { accessToken: "", refreshToken: ""};
};
