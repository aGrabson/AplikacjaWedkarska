import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import { auth, db } from '../firebase.js';

export const InspectUserPage = ({ navigation, route }) => {
  const { ReservationId } = route.params;
  const [user, setUser] = useState({});
  const [water, setWater] = useState({});
  const [comments, setComments] = useState('');
  const uid = auth.currentUser?.uid;
  const [userInfo, setUserInfo] = useState();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const reservationRef = db.collection('reservations').doc(ReservationId)
        reservationRef.get()
          .then((doc) => {
            if (doc.exists) {
              const reservationData = doc.data();
              db.collection('fishingSpots').where('Title', '==', reservationData.Title)
              .get()
              .then((querySnapshot) => {
                querySnapshot.forEach((doc2) => {
                  if (doc2.exists) {
                    setWater(doc2.data());
                    
                  }
                })
              })

              const userRef = db.collection('users').doc(reservationData.User)
              userRef.get().then((gb) => {
                if (gb.exists) {
                  const userData = gb.data();
                  setUser(userData);
                  setUserInfo(reservationData.User)
                }
              })
            }
          })

      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchData();
  }, []);

  const handlePrzeslij = () => {
    const dateTime = new Date().toISOString(); 

    const controlData = {
      DateOfInspection: dateTime,
      ControlledBy: uid,
      ControlledUser: userInfo,
      WaterType: water.Type,
      Comments: comments,
    };

    db.collection('inspections')
      .add(controlData)
      .then(() => {
        setComments('');
        navigation.navigate('MainPage');
      })
      .catch((error) => {
        console.error('Error creating Control document:', error);
      });
  };

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.containerView}>
        <ScrollView style={styles.containerScroll}>
          <View style={styles.middleContainer}>
            <Text style={styles.containerText}>Imię: {user.firstname}</Text>
            <Text style={styles.containerText}>Nazwisko: {user.surname}</Text>
            <Text style={styles.containerText}>Numer karty: {user.cardNumber}</Text>
            <Text style={styles.containerText}>Typ wody: {water.Type}</Text>
            <Text style={{ marginTop: 50, fontSize: 24, color: '#17C629' }}>Opłacona</Text>
            <Text style={{ fontSize: 22, marginTop: 140 }}>Uwagi</Text>
            <View style={styles.textInputContainer}>
              <TextInput
                multiline={true}
                numberOfLines={4}
                placeholder='Tu wpisz uwagi dot. użytkownika'
                style={styles.bottomContainer}
                value={comments}
                onChangeText={(text) => setComments(text)}
              />
              <TouchableOpacity style={styles.button} onPress={handlePrzeslij}>
                <Text style={styles.buttonText}>Prześlij</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  middleContainer: {
    width: '100%',
    height: '100%',
    backgroundColor: '#D9D9D9',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    alignItems: 'center',
  },
  bottomContainer: {
    width: '100%',
    height: '30%',
    minHeight: 210,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 10,
    fontSize: 16,
    marginBottom: 5,
  },
  containerText: {
    fontSize: 20,
    margin: 13,
  },
  button: {
    width: '100%',
    height: 42,
    backgroundColor: '#0000FF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
  },
  textInputContainer: {
    width: '100%',
    alignItems: 'center',
  }
});
