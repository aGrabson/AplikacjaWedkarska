import { StyleSheet, Text, View, SafeAreaView } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import {auth, db} from '../firebase.js';
import {useEffect, useState} from 'react';
import {
  collection,
  getDocs,
} from "firebase/firestore";


export const RulesPage = ({navigation}) => {

  const uid = auth.currentUser?.uid;
  const [data,setData] = useState({});
  const fetchRule = async () => {
    try {
      const docRef = db.collection("rules").doc(uid);
      const doc = await docRef.get();
  
      const ruleData = doc.data();
      setData(ruleData);
    } catch (error) {
      console.error(error);
    }
  };
  
  useEffect(() => {
    fetchRule();
  }, []);



  const [infoList,setInfoList]=useState([
   
  ]);
  const InformationsCollectionRef = collection(db, "rules");

  useEffect(() => {
    const getInformations = async () => {
      const data = await getDocs(InformationsCollectionRef);
      setInfoList(data.docs.map((doc) => ({ ...doc.data(), id: doc.id})));
    };

    getInformations();
  }, []);


    return (
        <View style={styles.container}>
          <Text style={{color:'#0F4C8A',fontSize:20,alignSelf:'center'}}>Regulamin amatorskiego połowu ryb</Text>
          <SafeAreaView><ScrollView>{infoList.map((item) => (<Text style={{fontSize:12,alignSelf:'center', textAlign:'justify', margin:5,}}>{item.rule}</Text>))}</ScrollView></SafeAreaView>
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
  });
  