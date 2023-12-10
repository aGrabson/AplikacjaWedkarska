import React, { useState } from "react";
import { StyleSheet } from "react-native";
import MapView, { Marker } from "react-native-maps";

export const MapComponent = ({ location, navigation, fishingSpots }) => {
  const [selectedMarkerInfo, setSelectedMarkerInfo] = useState(null);
  const [markerPressCounts, setMarkerPressCounts] = useState(1);
  const [lastSelectedMarkerId, setLastSelectedMarkerId] = useState(null);

  const handlePress = (id) => {
    const currentCount = markerPressCounts;
    if (currentCount % 2 === 0 && currentCount !== 0) {
        setMarkerPressCounts(1);
      navigation.navigate("ReservePage", { Id: id });
    } else {
      const spotInfo = getMarkerInfo(id);
      setSelectedMarkerInfo(spotInfo);
    }
    setMarkerPressCounts(currentCount + 1);
    setLastSelectedMarkerId(id);
  };

  const handleMapPress = () => {
    setSelectedMarkerInfo(null);
    setMarkerPressCounts(1);
    setLastSelectedMarkerId(null);
  };

  const getMarkerInfo = (id) => {
    return fishingSpots.find((spot) => spot.id === id);
  };

  return (
    <MapView
      style={styles.map}
      initialRegion={{
        latitude: location.latitude,
        longitude: location.longitude,
        latitudeDelta: 0.1,
        longitudeDelta: 0.1,
      }}
      onPress={handleMapPress}
    >
      {fishingSpots.map((spot) => (
        <Marker
          key={spot.id}
          coordinate={{
            latitude: spot.latitude,
            longitude: spot.longitude,
          }}
          title={spot.title}
          description={spot.description}
          onPress={() => handlePress(spot.id)}
        />
      ))}
      {selectedMarkerInfo && (
        <Marker
          coordinate={{
            latitude: selectedMarkerInfo.latitude,
            longitude: selectedMarkerInfo.longitude,
          }}
          title={selectedMarkerInfo.title}
          description={selectedMarkerInfo.description}
        />
      )}
    </MapView>
  );
};

const styles = StyleSheet.create({
  map: {
    width: "100%",
    height: "100%",
  },
});
