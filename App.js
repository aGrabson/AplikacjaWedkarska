import 'react-native-gesture-handler';
import React, {useState} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StartingPage } from './screens/StartingPage';
import { RegisterPage } from './screens/RegisterPage';
import { LoginPage } from './screens/LoginPage';
import { MainPage } from './screens/MainPage';
import { ProfilePage } from './screens/ProfilePage';
import { Menu } from './screens/Menu';
import { ReservationPage } from './screens/ReservationPage';
import { RulesPage } from './screens/RulesPage';
import { ReservePage } from './screens/ReservePage';
import { InspectPage } from './screens/InspectPage';
import { InspectionInfoPage } from './screens/InspectionInfoPage';
import { InspectUserPage } from './screens/InspectUserPage';

import { IconRegistry, ApplicationProvider } from '@ui-kitten/components';
import MIcon from "react-native-vector-icons/MaterialCommunityIcons";
import * as eva from "@eva-design/eva";
import { StyleSheet} from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import {Text, TouchableOpacity, View, Image, TextInput, Icon} from 'react-native';
const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

function DrawerRoot({navigation}) {
  const [searchText, setSearchText] = useState('');
  return (
      <Drawer.Navigator screenOptions={{ headerStyle: {backgroundColor:'#DADADA',height:100,borderBottomLeftRadius:25,borderBottomRightRadius:25}}} initialRouteName="MainPage" drawerContent={(props)=><Menu {...props}></Menu>}>
        <Drawer.Screen name="MainPage" component={MainPage} options={{headerTitle: () => (<View><TouchableOpacity onPress={() => navigation.navigate("ReservationPage", {searchText})} style={{backgroundColor:'#0000FF', borderRadius:25, height:60, width:125, alignItems:'center', justifyContent:'center'}}><Text style={{fontSize:20,color:'#FFFFFF'}}>Rezerwacja</Text></TouchableOpacity></View>)}}/>
        <Drawer.Screen name="ProfilePage" component={ProfilePage} options={{headerTitle: () => (<View><Text style={{fontSize:28, color:'#0F4C8A'}}>Mój Profil</Text></View>),headerRight: () => (
              <Image 
                style={{ right:'10%',width: 70, height: 70, borderRadius:50}}
                source={require("./src/image.jpg")}>
              </Image>
            ),}}/>
        <Drawer.Screen name="ReservationPage" component={ReservationPage} options={{headerTitle: () => (<View><TextInput placeholder='Wyszukaj łowisko' style={{fontSize:20, borderColor:'#EBEBEB'}}></TextInput><TouchableOpacity onPress={() => navigation.navigate("ReservePage")}><Text style={{fontSize:20}}>Przejdź do</Text></TouchableOpacity></View>)}}/>
        <Drawer.Screen name="RulesPage" component={RulesPage} options={{headerTitle: () => (<View><Text style={{fontSize:28, color:'#0F4C8A'}}>Regulamin</Text></View>)}}/>
        <Drawer.Screen name="ReservePage" component={ReservePage} options={{headerTitle: () => (<View><Text style={{fontSize:24, color:'#0F4C8A', }}>       Rezerwacja{"\n"} Łowisko "Suchedniów"</Text></View>)}}/>
        <Drawer.Screen name="InspectPage" component={InspectPage} options={{headerTitle: () => (<View><TextInput placeholder='Wyszukaj łowisko' style={{fontSize:20, borderColor:'#EBEBEB'}}></TextInput><TouchableOpacity onPress={() => navigation.navigate("InspectionInfoPage")}><Text style={{fontSize:20}}>Przejdź do</Text></TouchableOpacity></View>)}}/>
        <Drawer.Screen name="InspectionInfoPage" component={InspectionInfoPage} options={{headerTitle: () => (<View><TextInput placeholder='Wyszukaj wędkarza' style={{fontSize:20, borderColor:'#EBEBEB'}}></TextInput><TouchableOpacity onPress={() => navigation.navigate("InspectUserPage")}><Text style={{fontSize:20}}>Przejdź do</Text></TouchableOpacity></View>)}}/>
        <Drawer.Screen name="InspectUserPage" component={InspectUserPage} options={{headerTitle:'Działania dot. wędkarza'}}/>
      </Drawer.Navigator>
  );
}

export default function App() {

  function MaterialIcon({ name, style }) {
    const { height, tintColor, ...iconStyle } = StyleSheet.flatten(style);
    return (
      <MIcon name={name} size={height} color={tintColor} style={iconStyle} />
    );
  }
  const IconProvider = (name) => ({
    toReactElement: (props) => MaterialIcon({ name, ...props }),
  });

  function createIconsMap() {
    return new Proxy(
      {},
      {
        get(target, name) {
          return IconProvider(name);
        },
      }
    );
  }
  const MaterialIconsPack = {
    name: "material",
    icons: createIconsMap(),
  };
  return (
    <>
    <IconRegistry icons={[MaterialIconsPack]}/>
    <ApplicationProvider {...eva} theme={eva.light}>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{headerShown: false}} initialRouteName="StartingPage">
          <Stack.Screen name="StartingPage" component={StartingPage}/>
          <Stack.Screen name="RegisterPage" component={RegisterPage}/>
          <Stack.Screen name="LoginPage" component={LoginPage}/>
          <Stack.Screen name="DrawerRoot" component={DrawerRoot}/>
        </Stack.Navigator>
      </NavigationContainer>
    </ApplicationProvider>
    </>
  );
};