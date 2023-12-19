import * as React from "react";
import { useEffect, useState } from "react";
import {
  Text,
  StyleSheet,
  View,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import { getRoleFromToken } from "../credentials/Token.jsx";
import { getAuthData } from "../credentials/Store.jsx";
import Icon from "react-native-vector-icons/FontAwesome5";

export const Menu = ({ navigation }) => {
  const [isController, setIsController] = useState(false);

  const getRole = async () => {
    const authData = await getAuthData();
    const role = await getRoleFromToken(authData.accessToken);
    if (role == 2) {
      setIsController(true);
    }
  };

  useEffect(() => {
    getRole();
  }, []);

  const handleLogout = () => {
    navigation.reset({
      index: 0,
      routes: [{ name: "LoginPage" }],
    });
  };

  return (
    <SafeAreaView style={styles.menu}>
      <View style={styles.view}>
        <TouchableOpacity
          style={[styles.settings1]}
          onPress={() => navigation.navigate("MainPage")}
        >
          <View style={styles.iconText}>
            <Icon size={24} color="black" name="home"></Icon>
          </View>
          <Text style={[styles.settings]}>Strona Główna</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.settings1]}
          onPress={() => navigation.navigate("ProfilePage")}
        >
          <View style={styles.iconText}>
            <Icon size={24} color="black" name="user-alt"></Icon>
          </View>
          <Text style={[styles.settings]}>Mój Profil</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.settings1]}
          onPress={() => navigation.navigate("ReservationStackNavigator")}
        >
          <View style={styles.iconText}>
            <Icon size={24} color="black" name="book"></Icon>
          </View>
          <Text style={[styles.settings]}>Moje rezerwacje</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.settings1]}
          onPress={() => navigation.navigate("ReserveStackNavigator")}
        >
          <View style={styles.iconText}>
            <Icon size={24} color="black" name="map-marker-alt"></Icon>
          </View>
          <Text style={[styles.settings]}>Rezerwacja</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.settings1]}
          onPress={() => navigation.navigate("RulesPage")}
        >
          <View style={styles.iconText}>
            <Icon size={24} color="black" name="book-reader"></Icon>
          </View>
          <Text style={[styles.settings]}>Regulamin</Text>
        </TouchableOpacity>
        {isController && (
          <TouchableOpacity
            style={[styles.settings1]}
            onPress={() => navigation.navigate("InspectionStackNavigator")}
          >
            <View style={styles.iconText}>
              <Icon size={24} color="black" name="user-secret"></Icon>
            </View>
            <Text style={[styles.settings]}>Kontrola</Text>
          </TouchableOpacity>
        )}
        <TouchableOpacity style={[styles.settings1]} onPress={handleLogout}>
          <View style={styles.iconText}>
            <Icon size={24} color="black" name="sign-out-alt"></Icon>
          </View>
          <Text style={[styles.settings]}>Wyloguj</Text>
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
  settings1: {
    position: "relative",
    paddingVertical: 1,
    margin: 5,
    flexDirection: "row",
  },
  view: {
    position: "relative",
    top: 30,
    backgroundColor: "#DADADA",
    flex: 1,
    width: "100%",
    height: "100%",
    overflow: "hidden",
  },
  iconText: {
    flexDirection: "row",
    alignItems: "center",
    width: 30,
    justifyContent: "center",
  },
});
