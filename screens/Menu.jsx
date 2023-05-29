import * as React from "react";
import { useEffect, useState } from "react";
import {
  Text,
  StyleSheet,
  Pressable,
  Image,
  View,
  SafeAreaView,
  TouchableOpacity
} from "react-native";
import { auth, db } from "../firebase.js";

export const Menu = ({ navigation }) => {
  const [isController, setIsController] = useState(false);

  useEffect(() => {
    const checkIsController = async () => {
      try {
        const user = auth.currentUser;
        if (user) {
          const uid = user.uid;
          const userRef = db.collection("users").doc(uid);
          const userDoc = await userRef.get();
          const userData = userDoc.data();
          setIsController(userData.isController || false);
        }
      } catch (error) {
        console.error(error);
      }
    };

    checkIsController();
  }, []);

  const handleLogout = () => {
    navigation.reset({
      index: 0,
      routes: [{ name: 'LoginPage' }],
    });
  };

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
        {isController && (
          <TouchableOpacity style={[styles.settings1]} onPress={() => navigation.navigate("InspectPage")}>
            <View style={{ flexDirection: 'row' }}>
              <Text style={[styles.settings]}>Kontrola</Text>
            </View>
          </TouchableOpacity>
        )}
        <View style={styles.logoutContainer}>
          <TouchableOpacity style={styles.rectanglePressable} onPress={handleLogout}>
            <Text style={styles.logout}>Wyloguj</Text>
          </TouchableOpacity>
        </View>
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
  },
  logoutContainer: {
    position: "absolute",
    bottom: 30,
    alignSelf: "center",
  },
  rectanglePressable: {
    borderRadius: 40,
    backgroundColor: "#0000FF",
    width: 150,
    height: 55,
    justifyContent: 'center',
    alignItems: "center",
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
