import { StyleSheet, Text, ImageBackground, View, TextInput, SafeAreaView } from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
export const ProfilePage = ({navigation}) => {
    return (
        <View style={styles.container}>
          <SafeAreaView style={styles.area}>
            <ScrollView style={styles.scrollView}>
              <Text style={styles.texts}>Imię:</Text>
              <TextInput placeholder='Wpisz Imię' style={styles.Inputs}>Jan</TextInput>
              <Text style={styles.texts}>Nazwisko:</Text>
              <TextInput placeholder='Wpisz Imię' style={styles.Inputs}>Nowak</TextInput>
              <Text style={styles.texts}>Email:</Text>
              <TextInput placeholder='Wpisz Imię' style={styles.Inputs}>j.nowak@gmail.com</TextInput>
              <Text style={styles.texts}>Hasło</Text>
              <TextInput placeholder='Wpisz Imię' secureTextEntry style={styles.Inputs}>123456789</TextInput>
              <Text style={styles.texts}>Numer karty:</Text>
              <TextInput editable={false} style={styles.Inputs}>987321</TextInput>
            </ScrollView>
          </SafeAreaView>
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
    Inputs: {
      width:'70%',
      height:50,
      borderRadius:38,
      fontSize:20,
      padding:10,
      backgroundColor:'#EBEBEB',
      alignSelf:'center',
      display:'flex'
    },
    area: {
      marginTop:16,
      alignItems:'center',
    },
    texts: {
      alignSelf:'center',
      fontSize:20,
    },
    scrollView: {
      width:'100%',
      height:'100%',
      
    }
  });
  