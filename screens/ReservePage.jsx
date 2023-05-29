import React, { useState, useEffect } from 'react';
import { View, Button, StyleSheet, Text, TouchableOpacity, Alert } from 'react-native';
import DateTimePicker, { DateTimePickerAndroid } from '@react-native-community/datetimepicker';
import { auth,db } from '../firebase.js';

export const ReservePage = ({ navigation, route }) => {
  const [date, setDate] = useState(new Date());
  const markerTitle = route.params.markerTitle;
  const uid = auth.currentUser?.uid;

  useEffect(() => {
    navigation.setOptions({
      headerTitle: () => (
        <View>
          <Text style={{ fontSize: 24, color: '#0F4C8A', textAlign:'center', marginLeft:20 }}>
            Rezerwacja{"\n"} {markerTitle}
          </Text>
        </View>
      ),
    });
  }, [navigation, markerTitle]);

  const handleReservation = () => {
    const reservation = {
      Title: markerTitle,
      Date: date.toLocaleDateString(),
      Hour: date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      User: uid,
      Status: 'Active'
    };

    
    db.collection('reservations')
      .add(reservation)
      .then(() => {
        Alert.alert('Sukces', 'Rezerwacja została dodana pomyślnie!', [
          { text: 'OK', onPress: () => navigation.navigate('MainPage') }
        ]);
      })
      .catch((error) => {
        Alert.alert('Error', 'Wystąpił błąd podczas dodawania rezerwacji.');
      });
  };

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setDate(currentDate);
  };

  const showMode = (currentMode) => {
    DateTimePickerAndroid.open({
      value: date,
      mode: currentMode,
      is24Hour: true,
      minimumDate: new Date(),
      onChange,
    });
  };

  const showDatepicker = () => {
    showMode('date');
  };

  const showTimepicker = () => {
    showMode('time');
  };

  return (
    <View style={styles.container}>
      <View style={styles.middleContainer}>
        <Button onPress={showDatepicker} style={styles.picker} title="Wybierz datę" />
      </View>
      <View style={styles.bottomContainer}>
        <Button onPress={showTimepicker} style={styles.picker} title="Wybierz godzinę" />
        <Text style={{ margin: 10, alignSelf: 'center', fontSize: 22 }}>
          Wybrana data: {date.toLocaleDateString()}
        </Text>
        <Text style={{ margin: 10, alignSelf: 'center', fontSize: 22 }}>
          Godzina: {date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </Text>
      </View>
      <TouchableOpacity style={styles.submitButton} onPress={handleReservation}>
        <Text style={styles.submit}>Prześlij</Text>
      </TouchableOpacity>
    </View>
  );
};



const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  middleContainer: {
    width:'100%',
    height:'25%',
  },
  bottomContainer: {
    width:'100%',
    height:'15%',
  },
  picker: {
    width:'100%',
    height:60
  },
  submit: {
    fontSize:20,
    alignSelf:'center',
    color:'white',
  },
  submitButton: {
    backgroundColor:'#0F4C8A',
    borderRadius:20,
    width:150,
    height:100,
    justifyContent:'center',
    alignContent:'center',
    alignSelf:'flex-end',
    marginTop:250,
    marginRight:20,
  },
});