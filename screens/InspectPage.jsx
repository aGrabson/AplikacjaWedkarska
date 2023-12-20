import React, { useState, useEffect, useRef } from "react";
import {
  StyleSheet,
  View,
  ActivityIndicator,
  TextInput,
  Text,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import {
  GetFishingSpots,
  GetFishingSpotsByQuery,
} from "../Controllers/ReservationController.jsx";
import { MapComponent } from "../components/MapComponent.jsx";
import * as Location from "expo-location";
import BarsIcon from "react-native-vector-icons/FontAwesome";

export const InspectPage = ({ navigation }) => {
  const [location, setLocation] = useState({
    latitude: 51.00147660896586,
    longitude: 20.775563090091644,
  });
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [fishingSpots, setFishingSpots] = useState([]);
  const [fishingSpotsByQuery, setFishingSpotsByQuery] = useState(undefined);
  const mapRef = useRef(null);

  const getLocationAsync = async () => {
    var { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      console.error("Location permission not granted");
      return;
    }
    var location = await Location.getCurrentPositionAsync({});
    setLocation(location.coords);
  };

  const handlePressSpot = (item) => {
    setLocation({
      latitude: item.latitude,
      longitude: item.longitude,
    });

    mapRef.current.animateToRegion({
      latitude: item.latitude,
      longitude: item.longitude,
      latitudeDelta: 0.1,
      longitudeDelta: 0.1,
    });
  };
  const Fetch = async () => {
    const data = await GetFishingSpotsByQuery(searchQuery);
    setFishingSpotsByQuery(data);
  };

  useEffect(() => {
    const handleDebouncedInput = debounce(() => {
      if (searchQuery != "") {
        Fetch();
      }
    }, 1000);

    handleDebouncedInput();
    return () => {
      handleDebouncedInput.cancel();
    };
  }, [searchQuery]);

  const debounce = (func, delay) => {
    let timeoutId;
    const debouncedFunction = (...args) => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => func(...args), delay);
    };
    debouncedFunction.cancel = () => {
      clearTimeout(timeoutId);
    };

    return debouncedFunction;
  };

  useEffect(() => {
    navigation.setOptions({
      header: () => (
        <View
          style={{
            flexDirection: "row",
            backgroundColor: "#DADADA",
            height: 90,
            alignItems: "flex-end",
            width: "100%",
          }}
        >
          <TouchableOpacity
            onPress={() => navigation.openDrawer()}
            style={{ marginLeft: 15, marginBottom: 8 }}
          >
            <BarsIcon
              size={20}
              name="bars"
              style={{
                marginRight: 35,
              }}
            />
          </TouchableOpacity>
          <View style={{ width: "75%" }}>
            <TextInput
              placeholder="Wyszukaj łowisko do kontroli"
              style={{ fontSize: 20, borderColor: "#EBEBEB", marginBottom: 4 }}
              value={searchQuery}
              onChangeText={(text) => setSearchQuery(text)}
            ></TextInput>
          </View>
        </View>
      ),
    });
  }, [searchQuery]);

  const FetchData = async () => {
    setIsLoading(true);
    const data = await GetFishingSpots();
    if (data === null) {
      return;
    }
    setFishingSpots(data);
    setIsLoading(false);
  };

  useEffect(() => {
    getLocationAsync();
    FetchData();
  }, []);

  return (
    <View style={styles.container}>
      {isLoading ? (
        <ActivityIndicator
          size="large"
          style={{ justifyContent: "center", alignSelf: "center" }}
        />
      ) : (
        <>
          <ScrollView
            style={{
              position: "absolute",
              top: 0,
              zIndex: 1,
              width: "100%",
              backgroundColor: "rgba(255, 255, 255, 0.7)",
              maxHeight: 100,
            }}
          >
            <View style={{ width: "80%", alignSelf: "center" }}>
              {fishingSpotsByQuery === undefined ||
              null ? null : fishingSpotsByQuery.length === 0 ? (
                <Text style={styles.textTitles}>
                  Brak łowisk pasujących do wpisanej frazy
                </Text>
              ) : (
                fishingSpotsByQuery.map((item, index) => (
                  <TouchableOpacity
                    key={index}
                    style={{ borderBottomWidth: 1, borderColor: "blue" }}
                    onPress={() => handlePressSpot(item)}
                  >
                    <Text style={styles.textTitles}>{item.title}</Text>
                  </TouchableOpacity>
                ))
              )}
            </View>
          </ScrollView>
          <MapComponent
            location={location}
            navigation={navigation}
            fishingSpots={fishingSpots}
            style={{ flex: 1 }}
            fromInspectPage={true}
            onMapReady={() => setIsMapReady(true)}
            ref={mapRef}
          />
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  textTitles: {
    color: "#0F4C8A",
    fontSize: 24,
    fontWeight: "bold",
  },
});
