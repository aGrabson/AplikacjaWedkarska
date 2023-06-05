import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, Alert } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { auth, db } from "../firebase.js";
import { parse } from 'date-fns';

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
      navigation.navigate('InspectionInfoPage', { markerTitle: selectedMarkerTitle });

    } 
  }, [markerPressCount, navigation]);

  const handlePress = (Title) => {
    setMarkerPressCount(count => count + 1);
    setSelectedMarkerTitle(Title);
  };

  const handleMapPress = () => {
    setMarkerPressCount(0);
  };

  const updateReservationStatus = async (reservation, reservationId) => {
    const reservationDate = parse(reservation.Date + ' ' + reservation.Hour, 'dd.MM.yyyy HH:mm', new Date());
    const currentDate = new Date();

  // Dodaj 24 godziny do rezerwacji
  const reservationPlus24Hours = new Date(reservationDate.getTime()  + (24 * 60 * 60 * 1000));
  // Odejmij 24 godziny od rezerwacji
  const currentMinus24H = new Date(currentDate.getTime() - (24 * 60 * 60 * 1000));
  console.log(reservationDate)
  console.log(currentMinus24H)
  console.log(currentDate)
  if (reservationDate > currentMinus24H && reservationDate < currentDate ) {
      try {
        await db.collection('reservations').doc(reservationId).update({
          Status: 'Active',
          
        })
        
      } catch (error) {
        console.error('Error updating reservation status:', error);
      }
    }
    else{
      try {
        await db.collection('reservations').doc(reservationId).update({
          Status: 'Inactive',
          
        })
        
      } catch (error) {
        console.error('Error updating reservation status:', error);
      }
    }
  };
  

  useEffect(() => {
    const fetchReservations = async () => {
      try {
        const reservationsRef = db.collection('reservations');
        const querySnapshot = await reservationsRef.get();

        querySnapshot.forEach((doc) => {
          const reservation = doc.data();
          const reservationId = doc.id;
          updateReservationStatus(reservation,reservationId);

        });
      } catch (error) {
        console.error('Error fetching reservations:', error);
      }
    };

    fetchReservations();
  }, []);

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

export const InspectPage = ({ navigation }) => {
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
      <MapComponent location={location} navigation={navigation} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  searchInput: {
    height: 40,
    borderWidth: 1,
    padding: 10,
    width: '80%',
    marginBottom: 10,
  },
  map: {
    width: '100%',
    height: '100%',
  },
});
///TEST