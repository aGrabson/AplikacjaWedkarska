import { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  SafeAreaView,
  ScrollView,
  ActivityIndicator,
  Text,
} from "react-native";
import { LogBox } from "react-native";
import { ReservationListElement } from "../components/ReservationListElement";
import { GetUserReservations } from "../Controllers/ReservationController";
import icon from "../src/fish.png";
LogBox.ignoreAllLogs();

export const ListOfReservationsPage = ({ navigation, route }) => {
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize, setPageSize] = useState(7);
  const [allDataFetched, setAllDataFetched] = useState(false);
  const [isFetching, setIsFetching] = useState(false);
  const fakeDelay = (ms) => new Promise((res) => setTimeout(res, ms));
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
    if (allDataFetched) {
      return;
    }
    if (isFetching === true) return;
    setIsFetching(true);
    setLoading(true);
    const response = await GetUserReservations(pageNumber, pageSize);

    if (response && response.reservations && response.reservations.length > 0) {
      setReservations((prevReservations) => [
        ...prevReservations,
        ...response.reservations,
      ]);
      setPageNumber(pageNumber + 1);
    } else {
      setAllDataFetched(true);
    }
    setLoading(false);
    setIsFetching(false);
  };

  const handlePress = (id) => {
    navigation.navigate("ReservationDetailsPage", { Id: id });
  };

  useEffect(() => {
    if(reservations.length==0) FetchData();
  }, [reservations]);
  

  const handleScroll = (event) => {
    const offsetY = event.nativeEvent.contentOffset.y;
    const contentHeight = event.nativeEvent.contentSize.height;
    const height = event.nativeEvent.layoutMeasurement.height;

    if (offsetY + height >= contentHeight - 20) {
      FetchData();
    }
  };
  const clearReservations = async () => {
    setReservations([]);
  }
  const handleRefresh = async () => {
    setIsFetching(false)
    setAllDataFetched(false);
    setPageNumber(1);
    await clearReservations();
    fakeDelay(2000)
  }

  useEffect(() => {
    if (route.params?.toBeRefreshed) {
      handleRefresh();
    }
    const unsubscribe = navigation.addListener("focus", () => {
      if (route.params?.toBeRefreshed) {
        handleRefresh();
      }
    });
    return unsubscribe;
  }, [route.params?.toBeRefreshed]);

  return (
    <View style={styles.container}>
      <SafeAreaView>
        <ScrollView onScroll={handleScroll} scrollEventThrottle={16}>
          {reservations.map((item, key) => (
            <ReservationListElement
              key={key}
              onPress={() => handlePress(item.id)}
              image={icon}
              title="Rezerwacja"
              date={formatDate(item.reservationStart)}
              location={item.fishingSpot.title}
              desc={item.fishingSpot.type}
              isActive={item.isActive}
            />
          ))}
          {allDataFetched && (
            <Text style={styles.endText}>Wszystkie dane zostały pobrane</Text>
          )}
        </ScrollView>
        {loading && (
          <View style={styles.loadingContainer}>
            <View style={styles.loadingTextContainer}>
              <Text style={styles.loadingText}>Ładowanie danych</Text>
            </View>
            <ActivityIndicator size="large" color="#3498db" />
          </View>
        )}
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
  endText: {
    textAlign: "center",
    marginTop: 10,
    color: "gray",
  },
  loadingContainer: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.7)",
    zIndex: 1,
  },
  loadingIndicator: {
    marginTop: 20,
  },
  loadingTextContainer: {
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 8,
  },
  loadingText: {
    fontSize: 16,
    color:'#0F4C8A',
    fontWeight:'bold'
  },
});
