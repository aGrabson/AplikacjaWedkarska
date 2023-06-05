import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, ImageBackground, View, TextInput, SafeAreaView, TouchableOpacity, Alert } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { auth, db } from '../firebase.js';

export const ProfilePage = ({ navigation }) => {
  const [editMode, setEditMode] = useState(false); // State variable for edit mode

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstname, setFirstname] = useState('');
  const [surname, setSurname] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState(new Date());

  const uid = auth.currentUser?.uid;
  const [data, setData] = useState({});
  const fetchUser = async () => {
    try {
      const docRef = db.collection('users').doc(uid);
      const doc = await docRef.get();

      const userData = doc.data();
      setData(userData);
      setEmail(userData.email);
      setFirstname(userData.firstname);
      setSurname(userData.surname);
      setCardNumber(userData.cardNumber);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  const handleEditButton = async () => {
    if (editMode) {
      // Save changes to Firebase
      try {
        const docRef = db.collection('users').doc(uid);
        await docRef.update({
          firstname,
          surname,
          email,
          cardNumber,
        });
        Alert.alert('Sukces', 'Zauktualizowano dane!');
      } catch (error) {
        console.error('Error updating data:', error);
      }
    }

    setEditMode(!editMode); // Toggle edit mode
  };

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.area}>
        <ScrollView style={styles.scrollView}>
          <View style={styles.middleContainers}>
            <Text style={styles.texts}>Imię:</Text>
            <TextInput
              editable={editMode}
              placeholder="Wpisz Imię"
              style={styles.Inputs}
              value={firstname}
              onChangeText={(text) => setFirstname(text)}
            />
          </View>
          <View style={styles.middleContainers}>
            <Text style={styles.texts}>Nazwisko:</Text>
            <TextInput
              editable={editMode}
              placeholder="Wpisz Nazwisko"
              style={styles.Inputs}
              value={surname}
              onChangeText={(text) => setSurname(text)}
            />
          </View>
          <View style={styles.middleContainers}>
            <Text style={styles.texts}>Email:</Text>
            <TextInput
              editable={editMode}
              placeholder="Wpisz Email"
              style={styles.Inputs}
              value={email}
              onChangeText={(text) => setEmail(text)}
            />
          </View>
          <View style={styles.middleContainers}>
            <Text style={styles.texts}>Numer karty:</Text>
            <TextInput
              editable={false}
              style={styles.Inputs}
              value={cardNumber}
            />
          </View>
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.button} onPress={handleEditButton}>
              <Text style={styles.buttonText}>{editMode ? 'Save' : 'Edit'}</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    width: '100%',
    height: '100%',
  },
  background: {
    width: '100%',
    height: '100%',
  },
  bottomContainer: {
    position: 'relative',
    marginTop: '100%',
    width: '100%',
    height: '50%',
  },
  buttonText: {
    color: 'white',
    fontSize: 17,
  },
  Inputs: {
    width: '100%',
    height: 50,
    borderRadius: 38,
    fontSize: 20,
    padding: 10,
    backgroundColor: '#EBEBEB',
    alignSelf: 'center',
    display: 'flex',
  },
  area: {
    marginTop: 32,
  },
  texts: {
    fontSize: 20,
    marginStart: 16,
  },
  scrollView: {
    width: '100%',
    height: '100%',
  },
  middleContainers: {
    alignSelf: 'center',
    width: '80%',
    height: 80,
  },
  buttonContainer: {
    alignItems: 'center',
    marginTop: 20,
  },
  button: {
    backgroundColor: '#0000FF',
    padding: 10,
    borderRadius: 5,
  },
});