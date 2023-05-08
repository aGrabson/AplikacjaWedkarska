import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

const MapComponent = ({ location }) => {
  return (
    <MapView
      style={styles.map}
      initialRegion={{
        latitude: location.latitude,
        longitude: location.longitude,
        latitudeDelta: 0.1,
        longitudeDelta: 0.1,
      }}
    >
      <Marker coordinate={location} 
        title="Suchedniów Zalew"
        description="Zalew o powierzchni lustra wody bliskiej 22 ha położony na rzece Kamionce. Zbiornik znajduje się w centrum miasta sąsiadując z parkiem miejskim. Charakterystyczną cechą tego zbiornika jest wyspa położona na środku zbiornika stanowiąca rezerwat ptactwa wodnego i chronionych gatunków zwierząt. Głębokość zbiornika jest niewielka, a dno jest w większości muliste. Przy zalewie działa Ośrodek Sportu i Rekreacji (OSiR), gdzie jest do dyspozycji baza noclegowa, kąpielisko z kilkunastometrową plażą, kort tenisowy, boisko do gry w siatkę plażową oraz wiele innych atrakcji. Zalew jest łowny z każdego miejsca, a wędkarze nie narzekają na efekty. Zbiornik słynie z dużych okazów karpi, amurów, sandaczy. Jest również dużo leszcza, lecz w większości skąpych rozmiarów, ale trafiają się i okazy w granicach 60 cm. Złowimy tu również obie odmiany karasia, płocie, wzdręgi, jazie, liny, okonie i sandacze. Więcej szczegółów na temat zbiornika można znaleźć w Kronice Koła, a efekty wędkujących w galerii zdjęć."
      />
    </MapView>
  );
};

export const InspectPage = (navigation) => {
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
      <TextInput
        style={styles.searchInput}
        onChangeText={setSearchQuery}
        value={searchQuery}
        placeholder="Enter location name"
        onSubmitEditing={handleSearch}
      />
      <MapComponent location={location} />
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
    height: '80%',
  },
});
