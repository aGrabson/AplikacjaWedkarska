import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { auth, db } from "../firebase.js";

const MapComponent = ({ location, navigation }) => {
  const [markerPressCount, setMarkerPressCount] = useState(0);
  const [fishingSpots, setFishingSpots] = useState([]);
  const [selectedMarkerTitle, setSelectedMarkerTitle] = useState('');


  useEffect(() => {

    const fetchFishingSpots = async () => {
      try {
        const docRef = db.collection("fishingSpots");
        const doc = await docRef.get();
        const fishingSpots = doc.docs.map(doc => doc.data());
        setFishingSpots(fishingSpots)
      } catch (error) {
        console.error(error);
      }
    };

    fetchFishingSpots();
  }, []);

  useEffect(() => {
    if (markerPressCount % 2 === 0 && markerPressCount !== 0) {
      navigation.navigate('ReservePage', { markerTitle: selectedMarkerTitle });

    } 
  }, [markerPressCount, navigation]);

  const handlePress = (Title) => {
    setMarkerPressCount(count => count + 1);
    setSelectedMarkerTitle(Title);
  };

  const handleMapPress = () => {
    setMarkerPressCount(0);
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
    
      onPress={handleMapPress}>
      {fishingSpots.map(spot => {

        return (
          <Marker
            key={spot.Title}
            coordinate={{
              latitude: spot.Latitude,
              longitude: spot.Longitude,
            }}
            title={spot.Title}
            description={spot.Description}
            onPress={() => handlePress(spot.Title)}
          />
        );
      })}
    </MapView>
  );
};

export const ReservationPage = ({ navigation }) => {
  const [location, setLocation] = useState({
    latitude: 51.043444,
    longitude: 20.843153,
  });
  const [searchQuery, setSearchQuery] = useState('');

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
      
      <MapComponent location={location} navigation={navigation} style={{ flex: 1 }}/>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  map: {
    width: '100%',
    height: '100%',
  },
});
