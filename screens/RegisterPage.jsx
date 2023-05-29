import React, { useState } from 'react';
import { StyleSheet, Text, ImageBackground, View, TouchableOpacity, ScrollView, TextInput, KeyboardAvoidingView, Alert } from 'react-native';
import { Datepicker as RNKDatepicker, Icon as RNKIcon } from "@ui-kitten/components";
import { auth, db } from "../firebase.js";

export const RegisterPage = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstname, setFirstname] = useState('');
  const [surname, setSurname] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState(new Date());

  const currentDate = dateOfBirth;
  const day = currentDate.getDate() < 10 ? "0" + currentDate.getDate() : currentDate.getDate();
  const month = currentDate.getMonth() < 9 ? "0" + (currentDate.getMonth() + 1) : currentDate.getMonth() + 1;
  const year = currentDate.getFullYear();
  const formattedDate = `${day}.${month}.${year}`;

  const handleRegister = async () => {
    const cardNumberExists = await checkCardNumberExists(cardNumber);
    if (cardNumberExists) {
      Alert.alert('Error', 'Wprowadzony numer karty już istnieje.');
      return;
    }

    auth.createUserWithEmailAndPassword(email, password)
      .then(userCredential => {
        const user = userCredential.user;
        db.collection('users').doc(user.uid).set({
          'firstname': firstname,
          'surname': surname,
          'email': email,
          'cardNumber': cardNumber,
          'dateOfBirth': formattedDate,
          'isController': false
        })
        navigation.navigate('DrawerRoot', { screen: 'MainPage' });
      })
      .catch(error => {
        Alert.alert('Error', 'Registration failed. Please try again later.');
        console.error(error);
      });
  };

  const checkCardNumberExists = async (cardNumber) => {
    const snapshot = await db.collection('users').where('cardNumber', '==', cardNumber).get();
    return !snapshot.empty;
  };

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const minDate = new Date(1900, 0, 1); 

  return (
    <View style={styles.container}>
      <ImageBackground style={styles.background} source={require('../src/tlobazowe.png')}>
        <View style={styles.bottomContainer}>
          <KeyboardAvoidingView>
            <ScrollView style={styles.scrollView}>
              <Text style={styles.text}>Dołącz do nas</Text>
              <TextInput
                style={styles.loginInput}
                placeholder={'Imię'}
                value={firstname}
                onChangeText={text => setFirstname(text)}
              />
              <TextInput
                style={styles.loginInput}
                placeholder={'Nazwisko'}
                value={surname}
                onChangeText={text => setSurname(text)}
              />
              <TextInput
                style={styles.loginInput}
                placeholder={'Email'}
                value={email}
                onChangeText={text => setEmail(text)}
              />
              <TextInput
                style={styles.loginInput}
                secureTextEntry={true}
                placeholder={'Hasło'}
                value={password}
                onChangeText={text => setPassword(text)}
              />
              <TextInput
                style={styles.loginInput}
                placeholder={'Numer karty'}
                value={cardNumber}
                onChangeText={text => setCardNumber(text)}
              />
              <View style={styles.datepickerContainer}>
                <View style={styles.labelContainer}>
                  <Text style={styles.datepickerLabel}>Data urodzenia</Text>
                </View>
                <RNKDatepicker
                  style={styles.datepicker}
                  accessoryRight={<RNKIcon name="calendar-outline" pack="material" />}
                  date={dateOfBirth}
                  onSelect={setDateOfBirth}
                  controlStyle={styles.datePickerValue}
                  max={today}
                  min={minDate}
                />
              </View>
              <TouchableOpacity onPress={() => navigation.navigate('LoginPage')}>
                <Text style={styles.alreadyUserText}>Masz już konto? Zaloguj się</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={handleRegister} style={styles.button}>
                <Text style={styles.buttonText}>Zarejestruj</Text>
              </TouchableOpacity>
            </ScrollView>
          </KeyboardAvoidingView>
        </View>
      </ImageBackground>
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
    position: 'absolute',
    top: 0,
    width:'100%',
    height:'100%',
  },
  bottomContainer: {
    position: 'relative',
    top: '15%',
    width:'100%',
    height:'85%',
    minHeight: 200,
    backgroundColor: '#DADADA',
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
  },
  button: {
  position: 'relative',
  width: '80%',
  height: '13%',
  borderRadius: 38,
  backgroundColor: '#0000FF',
  borderColor: '#0000FF',
  borderWidth: 3,
  alignSelf: 'center',
  alignItems: 'center',
  justifyContent: 'center',
  marginBottom: '50%',
  bottom: 0,
  },
  buttonText: {
    color: 'white',
    fontSize: 17,
  },
  text: {
    alignSelf: 'center',
    color: '#0F4C8A',
    padding: "5%",
    fontSize: 32,
    fontWeight: 'bold',
  },
  loginInput: {
    position: 'relative',
    width: '90%',
    height: '10%',
    borderRadius: 38,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#EBEBEB',
    borderWidth: 2,
    borderColor: '#DADADA',
    paddingLeft: 20,
    marginBottom: 8,
    fontSize: 20,
  },
  scrollView: {
    minHeight: 200,
    height: '100%',
    maxHeight: '100%',
    marginHorizontal: 10,  
  },
  alreadyUserText: {
    fontSize: 12,
    padding: '3%',
    fontWeight: 'bold',
  },
  datepickerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10,
    marginHorizontal: '8%',
  },
  labelContainer: {
    marginRight: 10,
  },
  datepickerLabel: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  datepicker: {
    flex: 1,
  },
  datePickerValue: {
    fontSize: 18,
  },
});
