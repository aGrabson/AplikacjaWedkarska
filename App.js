import "react-native-gesture-handler";
import React, { useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StartingPage } from "./screens/StartingPage";
import { RegisterPage } from "./screens/RegisterPage";
import { LoginPage } from "./screens/LoginPage";
import { MainPage } from "./screens/MainPage";
import { ProfilePage } from "./screens/ProfilePage";
import { Menu } from "./screens/Menu";
import { ReservationPage } from "./screens/ReservationPage";
import { RulesPage } from "./screens/RulesPage";
import { ReservePage } from "./screens/ReservePage";
import { InspectPage } from "./screens/InspectPage";
import { ListOfReservationsPage } from "./screens/ListOfReservationsPage";
import { ReservationDetailsPage } from "./screens/ReservationDetailsPage";
import { InspectionInfoPage } from "./screens/InspectionInfoPage";
import { InspectUserPage } from "./screens/InspectUserPage";
import { IconRegistry, ApplicationProvider } from "@ui-kitten/components";
import MIcon from "react-native-vector-icons/MaterialCommunityIcons";
import BarsIcon from "react-native-vector-icons/FontAwesome";
import * as eva from "@eva-design/eva";
import { StyleSheet } from "react-native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { Text, TouchableOpacity, View, TextInput } from "react-native";
const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();
const ReservationStack = createNativeStackNavigator();
const ReserveStack = createNativeStackNavigator();
const InspectionStack = createNativeStackNavigator();
function DrawerRoot({ navigation }) {
  return (
    <Drawer.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: "#DADADA",
          height: 100,
        },
      }}
      initialRouteName="MainPage"
      drawerContent={(props) => <Menu {...props}></Menu>}
    >
      <Drawer.Screen
        name="MainPage"
        component={MainPage}
        options={{
          unmountOnBlur: true,
          headerTitle: () => (
            <View>
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate("ReserveStackNavigator")
                }
                style={{
                  backgroundColor: "#0000FF",
                  borderRadius: 25,
                  height: 40,
                  width: 125,
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Text style={{ fontSize: 20, color: "#FFFFFF" }}>
                  Rezerwacja
                </Text>
              </TouchableOpacity>
            </View>
          ),
        }}
      />
      <Drawer.Screen
        name="ProfilePage"
        component={ProfilePage}
        options={{
          unmountOnBlur: true,
        }}
      />
      
      <Drawer.Screen
        name="RulesPage"
        component={RulesPage}
        options={{
          unmountOnBlur: true,
          headerTitle: () => (
            <View>
              <Text style={{ fontSize: 28, color: "#0F4C8A" }}>Regulamin</Text>
            </View>
          ),
        }}
      />
      <Drawer.Screen
        name="ReservationStackNavigator"
        component={ReservationStackNavigator}
        options={{
          unmountOnBlur: true,
          headerShown: false,
          headerTitle: () => (
            <View style={{}}>
              <Text style={{ fontSize: 28, color: "#0F4C8A" }}>
                Lista rezerwacji
              </Text>
            </View>
          ),
        }}
      />
      <Drawer.Screen
        name="ReserveStackNavigator"
        component={ReserveStackNavigator}
        options={{
          unmountOnBlur: true,
          headerShown: false,
          headerTitle: () => (
            <View>
              <Text
                style={{ fontSize: 24, color: "#0F4C8A", textAlign: "center" }}
              >
                Rezerwacja
              </Text>
            </View>
          ),
        }}
      />
      <Drawer.Screen
        name="InspectionStackNavigator"
        component={InspectionStackNavigator}
        options={{
          unmountOnBlur: true,
          headerShown: false,
        }}
      />
      
    </Drawer.Navigator>
  );
}
export const ReservationStackNavigator = ({ navigation }) => {
  return (
    <ReservationStack.Navigator initialRouteName="ListOfReservationsPage">
      <ReservationStack.Screen
        name="ListOfReservationsPage"
        component={ListOfReservationsPage}
        options={{
          header: () => (
            <View
              style={{
                flexDirection: "row",
                backgroundColor: "#DADADA",
                height: 90,
                alignItems: "flex-end",
                width: "100%",
              }}
            >
              <TouchableOpacity
                onPress={() => navigation.openDrawer()}
                style={{ marginLeft: 15, marginBottom:8 }}
              >
                <BarsIcon
                  size={20}
                  name="bars"
                  style={{
                    marginRight: 35,
                  }}
                />
              </TouchableOpacity>
              <Text style={{ fontSize: 28, color: "#0F4C8A", }}>
                Lista rezerwacji
              </Text>
            </View>
          ),
          headerStyle: {},
          headerTintColor: "#0F4C8A",
          unmountOnBlur: true,
        }}
      />
      <ReservationStack.Screen
        name="ReservationDetailsPage"
        component={ReservationDetailsPage}
        options={{
          headerTitle: "Szczegóły rezerwacji",
          headerTintColor: "#0F4C8A",
          unmountOnBlur: true,
          headerStyle: {
            backgroundColor: "#DADADA",
          },
        }}
      />
    </ReservationStack.Navigator>
  );
};
export const ReserveStackNavigator = ({ navigation }) => {
  return (
    <ReserveStack.Navigator initialRouteName="ReservationPage">
      <ReserveStack.Screen
        name="ReservationPage"
        component={ReservationPage}
        headerShown={false}
        options={{
          
          headerStyle: {},
          headerTintColor: "#0F4C8A",
          unmountOnBlur: true,
        }}
      />
      <ReserveStack.Screen
        name="ReservePage"
        component={ReservePage}
        headerShown={false}
        options={{
          headerTitle: "Szczegóły rezerwacji",
          headerTintColor: "#0F4C8A",
          unmountOnBlur: true,
          headerStyle: {
            backgroundColor: "#DADADA",
          },
        }}
      />
    </ReserveStack.Navigator>
  );
};
export const InspectionStackNavigator = ({ navigation }) => {
  return (
    <InspectionStack.Navigator initialRouteName="InspectPage">
      <InspectionStack.Screen
        name="InspectPage"
        component={InspectPage}
        headerShown={false}
        options={{
          
          headerStyle: {},
          headerTintColor: "#0F4C8A",
          unmountOnBlur: true,
        }}
      />
      <InspectionStack.Screen
        name="InspectionInfoPage"
        component={InspectionInfoPage}
        options={{
          headerTitle: "Kontrola",
          headerTintColor: "#0F4C8A",
          unmountOnBlur: true,
          headerStyle: {
            backgroundColor: "#DADADA",
          },
        }}
      />
      <InspectionStack.Screen
        name="InspectUserPage"
        component={InspectUserPage}
        options={{
          headerTitle: "Informacje dot. wędkarza",
          headerTintColor: "#0F4C8A",
          unmountOnBlur: true,
          headerStyle: {
            backgroundColor: "#DADADA",
          },
        }}
      />
    </InspectionStack.Navigator>
  );
};

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
      <IconRegistry icons={[MaterialIconsPack]} />
      <ApplicationProvider {...eva} theme={eva.light}>
        <NavigationContainer>
          <Stack.Navigator
            screenOptions={{ headerShown: false }}
            initialRouteName="StartingPage"
          >
            <Stack.Screen name="StartingPage" component={StartingPage} />
            <Stack.Screen name="RegisterPage" component={RegisterPage} />
            <Stack.Screen name="LoginPage" component={LoginPage} />
            <Stack.Screen name="DrawerRoot" component={DrawerRoot} />
          </Stack.Navigator>
        </NavigationContainer>
      </ApplicationProvider>
    </>
  );
}
