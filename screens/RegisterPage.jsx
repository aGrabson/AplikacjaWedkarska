import React, { useState } from 'react';
import { StyleSheet, Text, ImageBackground, View, TouchableOpacity, ScrollView, TextInput, KeyboardAvoidingView } from 'react-native';
import { Datepicker as RNKDatepicker, Icon as RNKIcon } from "@ui-kitten/components";


export const RegisterPage = ({navigation}) => {
const [dateOfBirth, setDateOfBirth] = useState(new Date());

  return (
      <View style={styles.container}>
      <ImageBackground style={styles.background} source={require('../src/tlobazowe.png')}>
          <View style={styles.bottomContainer}>
            <KeyboardAvoidingView>
              <ScrollView style={styles.scrollView}>
                <Text style={styles.text}>Dołącz do nas</Text>
                <TextInput style={styles.loginInput} placeholder={'Imię'}></TextInput>
                <TextInput style={styles.loginInput} placeholder={'Nazwisko'}></TextInput>
                <TextInput style={styles.loginInput} placeholder={'Email'}></TextInput>
                <TextInput style={styles.loginInput} secureTextEntry={true} placeholder={'Hasło'}></TextInput>
                <TextInput style={styles.loginInput} placeholder={'Numer karty'}></TextInput>
                <View style={styles.datepickerContainer}>
                  <View style={styles.labelContainer}>
                    <Text style={styles.datepickerLabel}>Data urodzenia</Text>
                  </View>
                  <RNKDatepicker
                    style={styles.datepicker}
                    accessoryRight={<RNKIcon name="calendar-outline" pack="material"/>}
                    date={dateOfBirth}
                    onSelect={setDateOfBirth}
                    controlStyle={styles.datePickerValue}
                  />
                </View>
                <TouchableOpacity onPress={() => navigation.navigate('LoginPage')}><Text style={styles.alreadyUserText}>Masz już konto? Zaloguj się</Text></TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate('LoginPage')} style={styles.button}><Text style={styles.buttonText}>Zarejestruj</Text></TouchableOpacity>
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
