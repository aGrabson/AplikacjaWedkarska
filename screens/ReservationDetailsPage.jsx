import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  ScrollView,
  SafeAreaView,
  View,
  ActivityIndicator,
} from "react-native";
import fishIcon from "../src/fish.png";
import { ReservationDetails } from "../components/ReservationDetails";
import { GetReservationDetails } from "../Controllers/ReservationController";

export const ReservationDetailsPage = ({ navigation, route }) => {
  const id = route.params.Id;

  const [reservation, setReservation] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const formatDate = (date) => {
    const utcDate = new Date(date);
    const localDate = new Intl.DateTimeFormat("pl-PL", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      timeZone: "Europe/Warsaw",
    }).format(utcDate);

    const [datePart, timePart] = localDate.split(", ");
    const [day, month, year] = datePart.split(".");
    const [hours, minutes] = timePart.split(":");

    return `${day}.${month}.${year} godz. ${hours}:${minutes}`;
  };

  useEffect(() => {
    FetchData();
  }, []);

  const FetchData = async () => {
    setIsLoading(true);
    const data = await GetReservationDetails(id);
    if (data !== null) setReservation(data);
    setIsLoading(false);
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "white",
      }}
    >
      {isLoading ? (
        <ActivityIndicator size={"large"} />
      ) : (
        <View style={styles.container}>
          <ScrollView>
            <ReservationDetails
              image={fishIcon}
              title="Rezerwacja"
              date={formatDate(reservation.reservationStart)}
              location={reservation.fishingSpot.title}
              desc={reservation.fishingSpot.type}
              description={reservation.fishingSpot.description}
            />
          </ScrollView>
        </View>
      )}
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
});
