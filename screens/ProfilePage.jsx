import { StyleSheet, Text, ImageBackground, View, Button } from 'react-native';
export const ProfilePage = ({navigation}) => {
    return (
        <View style={styles.container}>
          <Text>ProfilePage</Text>
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
  