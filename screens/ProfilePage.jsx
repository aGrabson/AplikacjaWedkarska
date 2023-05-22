import { StyleSheet, Text, ImageBackground, View, TextInput, SafeAreaView } from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {auth, db} from '../firebase.js';
import {useEffect, useState} from 'react';



export const ProfilePage = ({navigation}) => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstname, setFirstname] = useState('');
  const [surname, setSurname] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState(new Date());

  const uid = auth.currentUser?.uid;
  const [data,setData] = useState({});
  const fetchUser = async () => {
    try {
      const docRef = db.collection("users").doc(uid);
      const doc = await docRef.get();
  
      const userData = doc.data();
      setData(userData);
    } catch (error) {
      console.error(error);
    }
  };
  
  useEffect(() => {
    fetchUser();
  }, []);




    return (
        <View style={styles.container}>
          <SafeAreaView style={styles.area}>
            <ScrollView style={styles.scrollView}>
              <View style={styles.middleContainers}>
                <Text style={styles.texts}>Imię:</Text>
                <TextInput editable={false} placeholder='Wpisz Imię' style={styles.Inputs}
                  value={data.firstname}>
                </TextInput>
              </View>
              <View style={styles.middleContainers}>
                <Text style={styles.texts}>Nazwisko:</Text>
                <TextInput editable={false} placeholder='Wpisz Nazwisko' style={styles.Inputs}
                  value={data.surname}>
                </TextInput>
              </View>
              <View style={styles.middleContainers}>
                <Text style={styles.texts}>Email:</Text>
                <TextInput editable={false} placeholder='Wpisz Email' style={styles.Inputs}
                  value={data.email}>
                </TextInput>
              </View>
              <View style={styles.middleContainers}>
                <Text style={styles.texts}>Hasło</Text>
                <TextInput editable={false} placeholder='Wpisz Hasło' secureTextEntry style={styles.Inputs}>*********</TextInput>
              </View>
              <View style={styles.middleContainers}>
                <Text style={styles.texts}>Numer karty:</Text>
                <TextInput editable={false} style={styles.Inputs}
                  value={data.cardNumber}>
                </TextInput>
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
    buttonText: {
      color: 'white',
      fontSize: 17,
    },
    Inputs: {
      width:'100%',
      height:50,
      borderRadius:38,
      fontSize:20,
      padding:10,
      backgroundColor:'#EBEBEB',
      alignSelf:'center',
      display:'flex'
    },
    area: {
      marginTop:32,
    },
    texts: {
      fontSize:20,
      marginStart:16,
    },
    scrollView: {
      width:'100%',
      height:'100%',
    },
    middleContainers: {
      alignSelf:'center',
      width:'80%',
      height:80,
    }
  });
  