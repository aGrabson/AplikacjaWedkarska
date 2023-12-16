import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Alert,
  ScrollView,
  SafeAreaView,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
export const InspectUserPage = ({ navigation, route }) => {
  const userData = route.params.userData;

  const handlePress = () => {};

  return (
    <SafeAreaView style={styles.containerScroll}>
      <ScrollView style={styles.containerScroll}>
        <View style={styles.middleContainer}>
          <Text style={styles.containerText}>Imię: {userData[0].name}</Text>
          <Text style={styles.containerText}>
            Nazwisko: {userData[0].surname}
          </Text>
          <Text style={styles.containerText}>
            Numer karty: {userData[0].cardID}
          </Text>
          <Text style={styles.containerText}>Typ wody: Nizinna</Text>
          <View style={{ flexDirection: "row" }}>
            <Text style={{ fontSize: 22 }}>Składka: </Text>
            <Text style={{ fontSize: 22, color: "#17C629" }}>Opłacona</Text>
          </View>
          <Text style={[styles.containerText, { fontSize: 22 }]}>
            Wyświetl rejestr {">"}
          </Text>
          <Text style={[styles.containerText, { fontSize: 24 }]}>
            Dokumentacja fotograficzna
          </Text>
          <TouchableOpacity style={{borderWidth: 2, borderRadius:35, width: 100, height:100,justifyContent:'center', alignItems:'center'}}>
            <Icon name="add-a-photo" size={64} color="black"></Icon>
          </TouchableOpacity>
          <Text style={{ fontSize: 22, marginTop: 10 }}>Uwagi</Text>
          <View style={styles.textInputContainer}>
            <TextInput
              multiline={true}
              numberOfLines={4}
              placeholder="Tu wpisz uwagi dot. użytkownika"
              style={styles.bottomContainer}
              value={1}
              onChangeText={1}
            />
            <TouchableOpacity style={styles.button} onPress={handlePress}>
              <Text style={styles.buttonText}>Prześlij</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  middleContainer: {
    width: "100%",
    height: "100%",
    backgroundColor: "#D9D9D9",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    alignItems: "center",
    flex: 1,
  },
  bottomContainer: {
    width: "100%",
    height: "30%",
    minHeight: 210,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 5,
    fontSize: 16,
  },
  containerText: {
    fontSize: 20,
    margin: 13,
  },
  button: {
    width: "100%",
    height: 42,
    backgroundColor: "#0000FF",
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 16,
  },
  textInputContainer: {
    width: "100%",
    alignItems: "center",
  },
  containerScroll: {
    flex: 1,
  },
});
