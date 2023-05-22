import React, { useState } from 'react';
import { StyleSheet, Text, ImageBackground, View, TouchableOpacity, ScrollView, TextInput, KeyboardAvoidingView, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {auth} from "../firebase.js";

export const LoginPage = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    auth
      .signInWithEmailAndPassword(email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        navigation.navigate('DrawerRoot', { screen: 'MainPage' });
        setEmail('');
        setPassword('');
      })
      .catch((error) => {
        Alert.alert('Logowanie niepoprawne!', 'Sprawdź wprowadzone dane i spróbuj ponownie.');
      });
    };

  const [showPassword, setShowPassword] = useState(false);


  return (
    <View style={styles.container}>
      <ImageBackground style={styles.background} source={require('../src/tlobazowe.png')}>
        <View style={styles.bottomContainer}>
          <KeyboardAvoidingView>
            <ScrollView style={styles.scrollView}>
              <Text style={styles.text}>Witaj użytkowniku</Text>
              <View style={styles.loginContainer}>
                <TextInput
                  style={styles.loginInput}
                  placeholder={'Email'}
                  value={email}
                  onChangeText={setEmail}
                />
              </View>
              <View style={styles.passwordContainer}>
                <TextInput
                  style={styles.passwordInput}
                  secureTextEntry={!showPassword}
                  placeholder={'Hasło'}
                  value={password}
                  onChangeText={setPassword}
                />
                <TouchableOpacity onPress={() => setShowPassword(!showPassword)} style={styles.eyeIcon}>
                  <Icon name={showPassword ? 'eye-slash' : 'eye'} type='font-awesome' size={24} color='#0F4C8A' />
                </TouchableOpacity>
              </View>
              <TouchableOpacity>
              {/* </ScrollView>onPress={() => navigation.navigate('RegisterPage')}>  Do zrobienia */}
                <Text style={styles.passRememberText}>Nie pamiętasz hasła?</Text></TouchableOpacity>
              <TouchableOpacity onPress={handleLogin} style={styles.button}>
                <Text style={styles.buttonText}>Zaloguj</Text>
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
      top: '50%',
      width:'100%',
      height:'50%',
      minHeight: 200,
      backgroundColor: '#DADADA',
      borderTopLeftRadius: 25,
      borderTopRightRadius: 25,
    },
    button: {
    position: 'relative',
    width: '80%',
    height: '18%',
    borderRadius: 38,
    backgroundColor: '#0000FF',
    borderColor: '#0000FF',
    borderWidth: 3,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: '12%',
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
    scrollView: {
      minHeight:200,
      height: '100%',
      maxHeight: '100%',
      marginHorizontal: 10,  
    },
    passRememberText: {
      fontSize: 12,
      padding: '3%',
      fontWeight: 'bold',
    },
    passwordContainer: {
      width:'85%',
      height:85,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      backgroundColor: '#EBEBEB',
      borderWidth: 2,
      borderColor: '#DADADA',
      borderRadius: 38,
      marginBottom: 16,
      fontSize: 20,
      alignSelf:'center'
    },
    loginContainer: {
      width:'85%',
      height:85,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      backgroundColor: '#EBEBEB',
      borderWidth: 2,
      borderColor: '#DADADA',
      borderRadius: 38,
      marginBottom: 16,
      fontSize: 20,
      alignSelf:'center'
    },
    passwordInput: {
      position: 'relative',
      width: '80%',
      height: '100%',
      borderRadius: 38,
      alignSelf: 'center',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#EBEBEB',
      paddingLeft: 20,
      paddingRight:20,
      fontSize: 20,
    },
    loginInput: {
      position: 'relative',
      width: '100%',
      height: '100%',
      borderRadius: 38,
      alignSelf: 'center',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#EBEBEB',
      paddingLeft: 20,
      paddingRight:20,
      fontSize: 20,
    },
    eyeIcon: {
      position:'relative',
      right:'20%',
      
    },
  });