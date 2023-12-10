import React, { useState, useEffect } from "react";
import { StyleSheet, View, ActivityIndicator } from "react-native";
import { GetFishingSpots } from "../Controllers/ReservationController.jsx";
import { MapComponent } from "../components/MapComponent.jsx";

export const ReservationPage = ({ navigation }) => {
  const [location, setLocation] = useState({
    latitude: 51.043444,
    longitude: 20.843153,
  });
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [fishingSpots, setFishingSpots] = useState([]);

  useEffect(() => {
    FetchData();
  }, []);

  const FetchData = async () => {
    setIsLoading(true);
    const data = await GetFishingSpots();
    if (data === null) {
      return;
    }
    if (data.length > 0) {
      setLocation({
        latitude: data[0].latitude,
        longitude: data[0].longitude,
      });
    }
    setFishingSpots(data);
    setIsLoading(false);
  };

  const handleSearch = async () => {
    try {
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${searchQuery}&key=${YOUR_API_KEY}`
      );
      const data = await response.json();
      const coordinates = data.results[0].geometry.location;
      setLocation(coordinates);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      {isLoading ? (
        <ActivityIndicator
          size="large"
          style={{ justifyContent: "center", alignSelf: "center" }}
        />
      ) : (
        <MapComponent
          location={location}
          navigation={navigation}
          fishingSpots={fishingSpots}
          style={{ flex: 1 }}
          fromInspectPage = {false}
        />
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
});