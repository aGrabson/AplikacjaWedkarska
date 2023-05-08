import React, { useState } from 'react';
import { View, Button, StyleSheet, Text, TouchableOpacity } from 'react-native';
import DateTimePicker , {DateTimePickerAndroid} from '@react-native-community/datetimepicker';

export const ReservePage = (navigation) =>{
  const [date, setDate] = useState(new Date(1598051730000));

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate;
    setDate(currentDate);
  };

  const showMode = (currentMode) => {
    DateTimePickerAndroid.open({
      value: date,
      onChange,
      mode: currentMode,
      is24Hour: true,
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
        <Text style={{margin:10, alignSelf:'center', fontSize:22}}>
          Wybrana data: {date.toLocaleDateString()} 
        </Text>
        <Text style={{margin:10, alignSelf:'center', fontSize:22}}>
          Godzina: {date.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
        </Text>
        </View>
        <TouchableOpacity style={styles.submitButton} onPress={() => navigation.navigate('MainPage')}><Text style={styles.submit}>Prześlij</Text></TouchableOpacity>
                
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