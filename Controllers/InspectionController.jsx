import { Alert } from "react-native";
import InspectionService from "../services/InspectionService";

export const ValidateUserCard = async (cardNumber, spotId) => {
    const gateway = new InspectionService();
    const response = await gateway.ValidateUserCard(cardNumber, spotId);
    if (response.status === 200) {
      return response.data;
    } else if (response.status === 404 || response.status === 400) {
        Alert.alert(
            "Błąd pobierania danych",
            "Wystąpił problem podczas pobierania danych o karcie.",
            [{ text: "OK" }]
          );
          return null;
    }
  };
  export const ReleaseFishAsInspector = async (fishId, id) => {
    const gateway = new InspectionService();
    const response = await gateway.ReleaseFishAsInspector(fishId, id);
    if (response.status === 200) {
      Alert.alert(
        "Usunięcie ryby powiodło się.",
        "Poprawnie usunięto rybę z rejestru.",
        [{ text: "OK" }]
      );
      return response.data;
    } else if (response.status === 404 || response.status === 400) {
        Alert.alert(
            "Błąd usuwania ryby",
            "Wystąpił problem podczas usuwania ryby z rejestru.",
            [{ text: "OK" }]
          );
          return null;
    }
  };export const PostInspection = async (data) => {
    const gateway = new InspectionService();
    const response = await gateway.PostInspection(data);
    if (response.status === 200) {
      Alert.alert(
        "Dodanie kontroli powiodło się.",
        "Poprawnie dodano kontrolę do systemu.",
        [{ text: "OK" }]
      );
      return response.data;
    } else if (response.status === 404 || response.status === 400) {
        Alert.alert(
            "Błąd dodania kontroli",
            "Wystąpił problem podczas dodawania kontroli do systemu.",
            [{ text: "OK" }]
          );
          return null;
    }
  };