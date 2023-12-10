import { useState, useEffect } from "react";
import { StyleSheet, View, SafeAreaView, ScrollView, ActivityIndicator} from "react-native";
import { LogBox } from "react-native";
import { ReservationListElement } from "../components/ReservationListElement";
import { GetUserReservations } from "../Controllers/ReservationController";
import icon from "../src/fish.png";
import { StatusBar } from "expo-status-bar";
LogBox.ignoreAllLogs();

export const ListOfReservationsPage = ({ navigation }) => {
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);

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

  const FetchData = async () => {
    setLoading(true);
    const response = await GetUserReservations();
    setReservations(response);
    setLoading(false);
  };

  useEffect(() => {
    FetchData();
  }, []);

  const handlePress = (id) => {
      navigation.navigate("ReservationDetailsPage", { Id: id });
    }

  return (
    <View style={styles.container}>
      <SafeAreaView>
        <StatusBar></StatusBar>
        <ScrollView>
          {loading ? (
            <ActivityIndicator
              size="large"
              style={{ justifyContent: "center", alignSelf: "center" }}
            />
          ) : (
            <>
              {reservations.map((item) => (
                <ReservationListElement
                  key={item.id}
                  onPress={() => handlePress(item.id)}
                  image={icon}
                  title="Rezerwacja"
                  date={formatDate(item.reservationStart)}
                  location={item.fishingSpot.title}
                  desc={item.fishingSpot.type}
                  isActive={item.isActive}
                />
              ))}
            </>
          )}
        </ScrollView>
      </SafeAreaView>
    </View>
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
