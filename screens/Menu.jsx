import * as React from "react";
import {
  Text,
  StyleSheet,
  Pressable,
  Image,
  View,
  SafeAreaView,
  TouchableOpacity
} from "react-native";
export const Menu = ({ state, navigation }) => {
  return (
    <SafeAreaView style={styles.menu}>
      <View style={styles.view}>
        <TouchableOpacity style={[styles.settings1]} onPress={() => navigation.navigate("MainPage")}>
          <View style={{ flexDirection: 'row' }}>
            <Text style={[styles.settings]}>Strona Główna</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.settings1]} onPress={() => navigation.navigate("ProfilePage")}>
          <View style={{ flexDirection: 'row' }}>
            <Text style={[styles.settings]}>Mój Profil</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.settings1]} onPress={() => navigation.navigate("ReservationPage")}>
          <View style={{ flexDirection: 'row' }}>
            <Text style={[styles.settings]}>Rezerwacja</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.settings1]} onPress={() => navigation.navigate("RulesPage")}>
          <View style={{ flexDirection: 'row' }}>
            <Text style={[styles.settings]}>Regulamin</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.settings1]} onPress={() => navigation.navigate("InspectPage")}>
          <View style={{ flexDirection: 'row' }}>
            <Text style={[styles.settings]}>Kontrola</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.rectanglePressable]}
          onPress={() => {
            navigation.navigate("LoginPage")
          }
          }>
          <Text style={styles.logout}>Logout</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>

  );
};

const styles = StyleSheet.create({
  menu: {
    flex: 1,
    backgroundColor: "#DADADA",
  },
  settings: {
    fontSize: 20,
    color: "#000",
    textAlign: "left",
    margin: 5,
    left: "2%",
  },
  iconSettings: {
    maxWidth: "100%",
    overflow: "hidden",
    maxHeight: "100%",
  },
  settings1: {
    position: "relative",
    paddingVertical: 1,
    margin: 5,
  },
  rectanglePressable: {
    position: "relative",
    borderRadius: 52,
    backgroundColor: "#0000FF",
    width: 140,
    height: 50,
    justifyContent:'center',
    alignItems: "center",
    top: "40%"
  },
  iconPerson: {
    position: "relative",
    paddingTop: 10,
    maxWidth: "100%",
    overflow: "hidden",
    maxHeight: "100%",
  },
  helloUser: {
    position: "relative",
    fontSize: 24,
    color: "#000",
    textAlign: "left",
  },
  logout: {
    fontSize: 20,
    color: "#FFFFFF",
    textAlign: "center",
  },
  view: {
    position: "relative",
    top: "3%",
    backgroundColor: "#DADADA",
    flex: 1,
    width: "100%",
    height: "100%",
    overflow: "hidden",

  },
});
