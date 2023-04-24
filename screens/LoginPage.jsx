import { StyleSheet, Text, ImageBackground, View, TouchableOpacity, ScrollView, TextInput, KeyboardAvoidingView } from 'react-native';
export const LoginPage = ({navigation}) => {
    return (
        <View style={styles.container}>
            <ImageBackground style={styles.background} source={require('../src/tlobazowe.png')}>
                <View style={styles.bottomContainer}>
                  <KeyboardAvoidingView>
                    <ScrollView style={styles.scrollView}>
                      <Text style={styles.text}>Witaj użytkowniku</Text>
                      <TextInput style={styles.loginInput} placeholder={'Email'}></TextInput>
                      <TextInput style={styles.loginInput} secureTextEntry={true} placeholder={'Hasło'}></TextInput>
                      <TouchableOpacity onPress={() => navigation.navigate('RegisterPage')}><Text style={styles.passRememberText}>Nie pamiętasz hasła?</Text></TouchableOpacity>
                      <TouchableOpacity onPress={() => navigation.navigate("DrawerRoot", { screen: "MainPage" })} style={styles.button}><Text style={styles.buttonText}>Zaloguj</Text></TouchableOpacity>
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
    height: '20%',
    borderRadius: 38,
    backgroundColor: '#0000FF',
    borderColor: '#0000FF',
    borderWidth: 3,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: '40%',
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
      width: '80%',
      height: '20%',
      borderRadius: 38,
      alignSelf: 'center',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#EBEBEB',
      borderWidth: 2,
      borderColor: '#DADADA',
      paddingLeft: 20,
      marginBottom: 16,
      fontSize: 20,
    },
    scrollView: {
      minHeight: 200,
      height: '100%',
      maxHeight: '100%',
      marginHorizontal: 10,  
    },
    passRememberText: {
      fontSize: 12,
      padding: '3%',
      fontWeight: 'bold',
    },
  });
  