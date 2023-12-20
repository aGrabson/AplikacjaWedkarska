import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  ScrollView,
  View,
  TextInput,
  SafeAreaView,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import { GetUserInfo, UpdateUserInfo } from "../Controllers/AccountController";
import { LoadingModal } from "../components/LoadingModal.jsx";
import { Button } from "../components/Button.jsx";
import BarsIcon from "react-native-vector-icons/FontAwesome";

export const ProfilePage = ({ navigation }) => {
  const [editMode, setEditMode] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [loading, setLoading] = useState(false);
  const [profileData, setProfileData] = useState({
    name: "",
    surname: "",
    email: "",
    cardNumber: "",
  });
  const [errors, setErrors] = useState({
    name: "",
    surname: "",
    email: "",
  });

  useEffect(() => {
    FetchData();
  }, []);

  const FetchData = async () => {
    setIsLoading(true);
    const data = await GetUserInfo();
    if (data === null) {
      return;
    }
    if (data !== null) setProfileData(data);
    setIsLoading(false);
  };

  const handleEditButton = async () => {
    if (editMode) {
      if (!profileData.name || !profileData.surname || !profileData.email) {
        setErrors({
          name: !profileData.name ? "Pole wymagane" : "",
          surname: !profileData.surname ? "Pole wymagane" : "",
          email: !profileData.email ? "Pole wymagane" : "",
        });
        return;
      } else {
        setLoading(true);
        await UpdateUserInfo(profileData, setEditMode);
        setLoading(false);
      }
    } else setEditMode(true);
  };

  useEffect(() => {
    navigation.setOptions({
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
            style={{ marginLeft: 15, marginBottom: 8 }}
          >
            <BarsIcon
              size={20}
              name="bars"
              style={{
                marginRight: 35,
              }}
            />
          </TouchableOpacity>
          <View>
            <Text style={{ fontSize: 28, color: "#0F4C8A" }}>Mój Profil</Text>
          </View>
        </View>
      ),
    });
  }, []);

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.area}>
        <ScrollView style={styles.scrollView}>
          {isLoading ? (
            <ActivityIndicator
              size="large"
              style={{ justifyContent: "center", alignSelf: "center" }}
            />
          ) : (
            <>
              <View style={styles.middleContainers}>
                <Text style={styles.texts}>Imię:</Text>
                <TextInput
                  editable={editMode}
                  placeholder="Wpisz Imię"
                  style={[styles.Inputs, errors.name && styles.errorInput]}
                  value={profileData.name}
                  onChangeText={(text) => {
                    setProfileData({ ...profileData, name: text });
                    setErrors({ ...errors, name: "" });
                  }}
                />
                <Text style={styles.errorText}>{errors.name}</Text>
              </View>
              <View style={styles.middleContainers}>
                <Text style={styles.texts}>Nazwisko:</Text>
                <TextInput
                  editable={editMode}
                  placeholder="Wpisz Nazwisko"
                  style={[styles.Inputs, errors.surname && styles.errorInput]}
                  value={profileData.surname}
                  onChangeText={(text) => {
                    setProfileData({ ...profileData, surname: text });
                    setErrors({ ...errors, surname: "" });
                  }}
                />
                <Text style={styles.errorText}>{errors.surname}</Text>
              </View>
              <View style={styles.middleContainers}>
                <Text style={styles.texts}>Email:</Text>
                <TextInput
                  editable={editMode}
                  placeholder="Wpisz Email"
                  style={[styles.Inputs, errors.email && styles.errorInput]}
                  value={profileData.email}
                  onChangeText={(text) => {
                    setProfileData({ ...profileData, email: text });
                    setErrors({ ...errors, email: "" });
                  }}
                />
                <Text style={styles.errorText}>{errors.email}</Text>
              </View>
              <View style={styles.middleContainers}>
                <Text style={styles.texts}>Numer karty:</Text>
                <TextInput
                  editable={false}
                  style={styles.Inputs}
                  value={profileData.cardNumber}
                />
              </View>
              <Button onPress={handleEditButton}>
                {editMode ? "Zapisz" : "Edytuj"}
              </Button>
            </>
          )}
        </ScrollView>
        <LoadingModal visible={loading} text={"Aktualizuje dane..."} />
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    width: "100%",
    height: "100%",
  },
  errorText: {
    color: "red",
    fontSize: 12,
    marginVertical: 4,
    marginHorizontal: 4,
  },
  background: {
    width: "100%",
    height: "100%",
  },
  bottomContainer: {
    position: "relative",
    marginTop: "100%",
    width: "100%",
    height: "50%",
  },
  Inputs: {
    width: "100%",
    height: 50,
    borderRadius: 38,
    fontSize: 20,
    padding: 10,
    backgroundColor: "#EBEBEB",
    alignSelf: "center",
    display: "flex",
  },
  errorInput: {
    borderColor: "red",
    borderWidth: 1,
  },
  area: {
    marginTop: 32,
  },
  texts: {
    fontSize: 20,
    marginStart: 16,
  },
  scrollView: {
    width: "100%",
    height: "100%",
  },
  middleContainers: {
    alignSelf: "center",
    width: "80%",
    height: 80,
    marginVertical: 12,
  },
});
