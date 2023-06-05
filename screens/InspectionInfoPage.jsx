import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity } from 'react-native';
import { auth, db } from '../firebase.js';

const Table = ({ userData, navigation }) => {
  const handleUserPress = (reservationId) => {
    navigation.navigate('InspectUserPage', { ReservationId: reservationId });
  };

  const renderItem = ({ item }) => (
    <View style={{ flexDirection: 'row', paddingVertical: 10 }}>
      <TouchableOpacity style={{ flex: 1 }} onPress={() => handleUserPress(item.ReservationID)}>
        <Text>{item.Firstname}</Text>
      </TouchableOpacity>
      <TouchableOpacity style={{ flex: 1 }} onPress={() => handleUserPress(item.ReservationID)}>
        <Text>{item.Surname}</Text>
      </TouchableOpacity>
      <TouchableOpacity style={{ flex: 1 }} onPress={() => handleUserPress(item.ReservationID)}>
        <Text>{item.CardNumber}</Text>
      </TouchableOpacity>
    </View>
  );

  const keyExtractor = (item, index) => {
    return item.id ? item.id.toString() : index.toString();
  };

  return (
    <View style={styles.table}>
      <View style={styles.tableRow}>
        <Text style={styles.tableHeader}>Imię</Text>
        <Text style={styles.tableHeader}>Nazwisko</Text>
        <Text style={styles.tableHeader}>Numer</Text>
      </View>
      <FlatList
        data={userData}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
      />
    </View>
  );
};

export const InspectionInfoPage = ({ navigation, route }) => {
  const { markerTitle } = route.params;
  const [userData, setUserData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const querySnapshot = await db
          .collection('reservations')
          .where('Status', '==', 'Active')
          .get();
          const reservations = querySnapshot.docs.map((doc) => doc.data());
          const reservationsIds = querySnapshot.docs.map((doc) => doc.id);

          const usersPromises = reservations.map((reservation) =>
            db.collection("users").doc(reservation.User).get()
          );
          const usersSnapshots = await Promise.all(usersPromises);
          const usersData = usersSnapshots.map((userSnapshot) =>
            userSnapshot.data()
          );


          const updatedReservations = reservations.map((reservation, index) => ({
            ...reservation,
            Firstname: usersData[index].firstname,
            Surname: usersData[index].surname,
            ReservationID: reservationsIds[index],
            CardNumber: usersData[index].cardNumber,
          }));

          setUserData(updatedReservations);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.middleText}>Lista wędkarzy na łowisku <Text>{markerTitle}</Text></Text>
      <View>
      <Table userData={userData} navigation={navigation} />
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  table: {
    backgroundColor: '#D9D9D9',
    width: '100%',
    height: '100%',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    overflow: 'hidden',
    alignSelf: 'center',
    paddingHorizontal: 20,
  },
  tableRow: {
    flexDirection: 'row',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#A9A9A9',
  },
  tableHeader: {
    flex: 1,
    fontWeight: 'bold',
  },
  middleText: {
    color: '#0F4C8A',
    fontSize: 24,
    margin: 40,
    textAlign: 'center',
  },
});
