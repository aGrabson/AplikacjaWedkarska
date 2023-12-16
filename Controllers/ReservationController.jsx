import { Alert } from "react-native";
import ReservationService from "../services/ReservationService.jsx";

export const GetUserReservations = async (pageNumber, pageSize) => {
  const gateway = new ReservationService();
  const response = await gateway.GetUserReservations(pageNumber, pageSize);
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
export const GetFishingSpots = async () => {
  const gateway = new ReservationService();
  const response = await gateway.GetFishingSpots();
  if (response.status === 200) {
    return response.data;
  } else if (response.status === 404 || response.status === 400) {
    Alert.alert(
      "Błąd pobierania danych",
      "Wystąpił problem podczas pobierania łowisk.",
      [{ text: "OK" }]
    );
    return null;
  }
};
export const GetFishingSpotsByQuery = async (searchQuery) => {
  const gateway = new ReservationService();
  const response = await gateway.GetFishingSpotsByQuery(searchQuery);
  if (response.status === 200) {
    return response.data;
  } else if (response.status === 400) {
    Alert.alert(
      "Błąd pobierania danych",
      "Wystąpił problem podczas pobierania łowisk.",
      [{ text: "OK" }]
    );
    return null;
  }
};
export const GetFishingSpot = async (id) => {
  const gateway = new ReservationService();
  const response = await gateway.GetFishingSpot(id);
  if (response.status === 200) {
    return response.data;
  } else if (response.status === 404 || response.status === 400) {
    Alert.alert(
      "Błąd pobierania danych",
      "Wystąpił problem podczas pobierania danych o łowisku.",
      [{ text: "OK" }]
    );
    return null;
  }
};
export const Reserve = async (reservation, navigation) => {
  const gateway = new ReservationService();
  const response = await gateway.Reserve(reservation);
  if (response.status === 200) {
    Alert.alert("Sukces.", "Rezerwacja pomyślna.", [{ text: "OK" }]);
    navigation.popToTop();
    navigation.replace("DrawerRoot");
    return response.data;
  } else if (response.status === 404) {
    Alert.alert(
      "Błąd pobierania danych",
      "Wystąpił problem podczas pobierania danych o łowisku.",
      [{ text: "OK" }]
    );
  } else if (response.status === 400) {
    Alert.alert(response.data.error, response.data.errorText, [{ text: "OK" }]);
    return null;
  }
};
export const GetUserFishes = async (id) => {
  const gateway = new ReservationService();
  const response = await gateway.GetUserFishes(id);
  if (response.status === 200) {
    return response.data;
  } else if (response.status === 404 || response.status === 400) {
    Alert.alert(
      "Błąd pobierania danych",
      "Wystąpił problem podczas pobierania danych o rybach.",
      [{ text: "OK" }]
    );
    return null;
  }
};
export const AddToReservation = async (fishData) => {
  const gateway = new ReservationService();
  const response = await gateway.AddToReservation(fishData);
  if (response.status === 200) {
    Alert.alert(
      "Dodanie ryby powiodło się.",
      "Poprawnie dodano rybę do rejestru.",
      [{ text: "OK" }]
    );
    return response.data;
  } else if (response.status === 404 || response.status === 400) {
    Alert.alert(response.data.error, response.data.errorText, [{ text: "OK" }]);
    return null;
  }
};
export const GetFishList = async () => {
  const gateway = new ReservationService();
  const response = await gateway.GetFishList();
  if (response.status === 200) {
    return response.data;
  } else if (response.status === 404 || response.status === 400) {
    Alert.alert(
      "Błąd pobierania danych",
      "Wystąpił problem podczas pobierania danych o rybach.",
      [{ text: "OK" }]
    );
    return null;
  }
};
export const ReleaseFish = async (fishId, id) => {
  const gateway = new ReservationService();
  const response = await gateway.ReleaseFish(fishId, id);
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
};
export const GetUsersForFishingSpot = async (id) => {
  const gateway = new ReservationService();
  const response = await gateway.GetUsersForFishingSpot(id);
  if (response.status === 200) {
    return response.data;
  } else if (response.status === 404 || response.status === 400) {
    Alert.alert(
      "Błąd pobierania danych",
      "Wystąpił problem podczas pobierania danych użytkownikach.",
      [{ text: "OK" }]
    );
    return null;
  }
};
