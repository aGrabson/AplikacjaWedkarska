import React, { useEffect, useState, useRef } from "react";
import {
  StyleSheet,
  Text,
  View,
  PermissionsAndroid,
  TouchableOpacity,
} from "react-native";
import BarsIcon from "react-native-vector-icons/FontAwesome";
import { MapComponent } from "../components/MapComponent";
import * as Location from "expo-location";

export const MainPage = ({ navigation }) => {
  const [hasLocationPermission, setHasLocationPermission] = useState(false);
  const [location, setLocation] = useState({
    latitude: 51.00147660896586,
    longitude: 20.775563090091644,
  });
  const [fishingSpots, setFishingSpots] = useState([]);
  const mapRef = useRef(null);

  async function checkLocationPermission() {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status === "granted") {
        setHasLocationPermission(true);
        const currentLocation = await Location.getCurrentPositionAsync({});
        setLocation(currentLocation.coords);
        
        mapRef.current.animateToRegion({
          latitude: currentLocation.coords.latitude,
          longitude: currentLocation.coords.longitude,
          latitudeDelta: 0.1,
          longitudeDelta: 0.1,
        });
      } else {
        setHasLocationPermission(false);
      }
    } catch (err) {
      console.warn(err);
    }
  }

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
          <TouchableOpacity
            onPress={() => navigation.navigate("ReserveStackNavigator")}
            style={{
              backgroundColor: "#0000FF",
              borderRadius: 8,
              flex: 1,
              marginRight: "40%",
              alignItems: "center",
              marginBottom: 4,
            }}
          >
            <Text style={{ fontSize: 22, color: "#FFFFFF" }}>Rezerwacja</Text>
          </TouchableOpacity>
        </View>
      ),
    });
  }, []);

  useEffect(() => {
    checkLocationPermission();
  }, []);

  useEffect(() => {
    checkLocationPermission();
  }, [hasLocationPermission]);

  return (
    <View style={styles.container}>
      {hasLocationPermission ? (
        <MapComponent
          location={location}
          navigation={navigation}
          fromInspectPage={false}
          fishingSpots={fishingSpots}
          ref={mapRef}
        />
      ) : (
        <Text>Proszę nadać uprawnienia aplikacji do lokalizacji!</Text>
      )}
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
  background: {
    width: "100%",
    height: "100%",
  },
  bottomContainer: {
    position: "relative",
    marginTop: "100%",
    width: "100%",
    height: "50%",
  },
  button: {
    position: "relative",
    width: "80%",
    height: "20%",
    borderRadius: 38,
    backgroundColor: "#0000FF",
    borderColor: "#0000FF",
    borderWidth: 3,
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 25,
    top: "40%",
  },
  buttonText: {
    color: "white",
    fontSize: 17,
  },
  search: {
    height: 70,
  },
});
