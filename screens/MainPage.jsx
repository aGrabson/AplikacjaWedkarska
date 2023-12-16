import  React, {useEffect, useState} from "react";
import { StyleSheet, Text, View, PermissionsAndroid  } from 'react-native';
import MapView from 'react-native-maps';


const MapComponent = ({ initialLocation }) => {

  return (
    <MapView
      style={{ flex: 1 }}
      initialRegion={{
        latitude: 50.888168,
        longitude: 20.634342,
        latitudeDelta: 0.1,
        longitudeDelta: 0.1,
      }}
    />
  );
};

export const MainPage = ({ navigation }) => {
  const [hasLocationPermission, setHasLocationPermission] = useState(false);
  const [initialLocation, setInitialLocation] = useState({
    latitude: 50.888168,
    longitude: 20.634342,
  });

  async function checkLocationPermission() {
    try {
      // Sprawdź, czy masz już uprawnienia do lokalizacji
      const hasPermission = await PermissionsAndroid.check(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
      );
  
      if (hasPermission) {
        setHasLocationPermission(true);
      } else {
        // Jeśli nie masz uprawnień, poproś o nie
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
            title: 'Zezwolenie na dostęp do lokalizacji.',
            message: 'Proszę nadać uprawnienia do twojej lokalizacji.',
            buttonNeutral: 'Zapytaj później',
            buttonNegative: 'Anuluj',
            buttonPositive: 'Zezwól',
          },
        );
  
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          setHasLocationPermission(true);
        } else {
          setHasLocationPermission(false);
        }
      }
    } catch (err) {
      console.warn(err);
    }
  }

  useEffect(() => {
    checkLocationPermission();
  }, []);

  useEffect(() => {
    checkLocationPermission();
    console.log("GB")
  }, [hasLocationPermission]);
  
  return (
    <View style={styles.container}>
      {hasLocationPermission ? (
        <MapComponent initialLocation={initialLocation} />
      ) : (
        <Text>Proszę nadać uprawnienia aplikacji do lokalizacji!</Text>
      )}
    </View>
  );
};
const styles = StyleSheet.create({
    container: {
      flex: 1, 
      backgroundColor: '#fff',
      width:'100%',
      height: '100%',
    },
    background: {
      width:'100%',
      height:'100%',
    },
    bottomContainer: {
      position: 'relative',
      marginTop: "100%",
      width:'100%',
      height:'50%',
      
    },
    button: {
    position: 'relative',
    width: '80%',
    height: '20%',
    borderRadius: 38,
    backgroundColor: '#0000FF',
    borderColor: '#0000FF',
    borderWidth: 3,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 25,
    top: '40%',
    },
    buttonText: {
      color: 'white',
      fontSize: 17,
    },
    search: {
      height: 70,
    },
  });
  