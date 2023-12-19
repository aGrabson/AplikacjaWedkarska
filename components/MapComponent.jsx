import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import MapView, { Marker, Callout } from "react-native-maps";
import { FishingSpotDetailsOnMap } from "./FishingSpotDetailsOnMap";
import {
  GetRatingsForFishingSpot,
  PostRatingForFishingSpot,
  UpdateRatingForFishingSpot,
} from "../Controllers/ReservationController";
export const MapComponent = React.forwardRef(
  ({ location, navigation, fishingSpots, fromInspectPage }, ref) => {
    const [selectedMarkerInfo, setSelectedMarkerInfo] = useState(null);
    const [markerCounters, setMarkerCounters] = useState({});
    const [infoVisable, setInfoVisable] = useState(false);
    const [selectedFishingSpot, setSelectedFishingSpot] = useState(null);
    const [ratingData, setRatingData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    const handlePress = (id) => {
      const currentCount = markerCounters[id] || 0;

      if (currentCount === 0) {
        setMarkerCounters({ [id]: 1 });

        const spotInfo = getMarkerInfo(id);
        setSelectedMarkerInfo(spotInfo);
        setSelectedFishingSpot(spotInfo);
      } else {
        if (fromInspectPage == true) {
          navigation.navigate("InspectionInfoPage", { Id: id });
        } else {
          navigation.navigate("ReservePage", { Id: id });
        }
        handleMapPress()
      }
    };

    const handleMapPress = () => {
      setSelectedMarkerInfo(null);
      setMarkerCounters({});
      setInfoVisable(false);
    };

    const getMarkerInfo = (id) => {
      return fishingSpots.find((spot) => spot.id === id);
    };

    const onCalloutPress = async (spot) => {
      setSelectedFishingSpot(spot);
      setInfoVisable(!infoVisable);
    };

    const FetchData = async () => {
      setIsLoading(true)
      const data = await GetRatingsForFishingSpot(selectedFishingSpot.id);
      setRatingData(data);
      setIsLoading(false)
    };
    useEffect(() => {
      if (selectedFishingSpot !== null) FetchData();
    }, [selectedFishingSpot?.id]);

    const handleRatingChange = async (newRating) => {
      const data = { newRating, spotId: selectedFishingSpot.id };
      if (ratingData.userRating !== null) {
        await UpdateRatingForFishingSpot(data);
      } else {
        await PostRatingForFishingSpot(data);
      }
      FetchData();
    };

    return (
      <>
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
              <Callout
                style={{ width: 300 }}
                onPress={() => onCalloutPress(spot)}
              >
                <View>
                  <Text style={{ fontWeight: "bold", fontSize: 20 }}>
                    {spot.title} [{spot.size} ha]
                  </Text>
                  <Text style={{ fontWeight: "bold", fontSize: 16 }}>
                    Typ wody: {spot.type}
                  </Text>
                  <Text
                    style={{
                      fontSize: 12,
                      color: "#DADADA",
                      fontWeight: "bold",
                    }}
                  >
                    (Kliknij ponownie w marker, aby przejść do rezerwacji)
                    (Kliknij tutaj, aby zobaczyć więcej informacji)
                  </Text>
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
        {infoVisable ? (
          <FishingSpotDetailsOnMap
            spot={selectedFishingSpot}
            ratingData={ratingData}
            handleRatingChange={handleRatingChange}
            isLoading={isLoading}
          ></FishingSpotDetailsOnMap>
        ) : null}
      </>
    );
  }
);

const styles = StyleSheet.create({
  map: {
    width: "100%",
    height: "100%",
  },
});
