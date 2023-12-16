import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import MapView, { Marker, Callout } from "react-native-maps";
import { RatingComponent } from "./RatingComponent";

export const MapComponent = React.forwardRef(
  ({ location, navigation, fishingSpots, fromInspectPage }, ref) => {
    const [selectedMarkerInfo, setSelectedMarkerInfo] = useState(null);
    const [markerCounters, setMarkerCounters] = useState({});

    const handlePress = (id) => {
      const currentCount = markerCounters[id] || 0;

      if (currentCount === 0) {
        setMarkerCounters({ [id]: 1 });

        const spotInfo = getMarkerInfo(id);
        setSelectedMarkerInfo(spotInfo);
      } else {
        if (fromInspectPage == true) {
          navigation.navigate("InspectionInfoPage", { Id: id });
        } else {
          navigation.navigate("ReservePage", { Id: id });
        }
        setMarkerCounters({ [id]: 0 });
        setSelectedMarkerInfo(null);
      }
    };

    const handleMapPress = () => {
      setSelectedMarkerInfo(null);
      setMarkerCounters({});
    };

    const getMarkerInfo = (id) => {
      return fishingSpots.find((spot) => spot.id === id);
    };
    const onRatingChange = async (spotId, newRating) => {
      try {
        // Wywołaj funkcję z backendu do aktualizacji oceny
        console.log("JEST OK");
        //await updateRatingForFishingSpot(spotId, newRating);
      } catch (error) {
        console.error("Błąd podczas aktualizacji oceny:", error);
        // Obsłuż błąd, np. wyświetlając komunikat użytkownikowi
      }
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
          ref={ref}
          onPress={handleMapPress}
        >
          {fishingSpots.map((spot) => (
            <Marker
              key={spot.id}
              coordinate={{
                latitude: spot.latitude,
                longitude: spot.longitude,
              }}
              onPress={() => handlePress(spot.id)}
            >
              <Callout style={{ width: 300 }}>
                <View>
                  <Text style={{ fontWeight: "bold", fontSize: 20 }}>
                    {spot.title} [{spot.size} ha]
                  </Text>
                  <Text
                    style={{
                      fontSize: 12,
                      color: "#DADADA",
                      fontWeight: "bold",
                    }}
                  >
                    (Kliknij ponownie w marker, aby przejść do rezerwacji)
                  </Text>
                  <RatingComponent
                    spotId={spot.id}
                    initialRating={1}
                    onRatingChange={onRatingChange}
                  />
                  <View>
                    <Text style={{ textAlign: "justify", fontSize: 12 }}>
                      {spot.description}
                    </Text>
                  </View>
                </View>
              </Callout>
            </Marker>
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
  }
);

const styles = StyleSheet.create({
  map: {
    width: "100%",
    height: "100%",
  },
});
