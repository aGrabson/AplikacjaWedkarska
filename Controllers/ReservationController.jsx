import { Alert } from "react-native";
import ReservationService from "../services/ReservationService.jsx";

export const GetUserReservations = async () => {
  const gateway = new ReservationService();
  const response = await gateway.GetUserReservations();
  if (response.status === 200) {
    return response.data;
  } else if (response.status === 404 || response.status === 400) {
    Alert.alert(
      "Błąd pobierania danych",
      "Wystąpił problem podczas pobierania danych o rezerwacjach.",
      [{ text: "OK" }]
    );
    return null;
  }
};
export const GetReservationDetails = async (reservationId) => {
  const gateway = new ReservationService();
  const response = await gateway.GetReservationDetails(reservationId);
  if (response.status === 200) {
    return response.data;
  } else if (response.status === 404 || response.status === 400) {
    Alert.alert(
      "Błąd pobierania danych",
      "Wystąpił problem podczas pobierania szczegółów rezerwacji.",
      [{ text: "OK" }]
    );
    return null;
  }
};
