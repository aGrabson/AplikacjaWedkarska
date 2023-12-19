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
  ActivityIndicator,
  LayoutAnimation,
  Modal,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import {
  GetFishingSpot,
  GetUserFishes,
} from "../Controllers/ReservationController";
import {
  ValidateUserCard,
  ReleaseFishAsInspector,
  PostInspection,
} from "../Controllers/InspectionController";
import { ExpandableComponent } from "../components/ExpandableComponent";
import { CameraComponent } from "../components/CameraComponent";
import { PhotoList } from "../components/PhotoList";
import { LoadingModal } from "../components/LoadingModal";

export const InspectUserPage = ({ navigation, route }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [fishingSpot, setFishingSpot] = useState(null);
  const [userCard, setUserCard] = useState(null);
  const [registerVisable, setRegisterVisable] = useState(false);
  const [fishList, setFishList] = useState([]);
  const [text, setText] = useState("");
  const [isCameraVisible, setIsCameraVisible] = useState(false);
  const [photo, setPhoto] = useState(null);
  const [photoBase64, setPhotoBase64] = useState([]);
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(false);

  const userData = route.params.userData;
  const fishingSpotId = route.params.spotId;
  const reservationId = route.params.reservationId;

  const handlePress = async () => {
    setLoading(true)
    const listOfPhotos = photos.map((item) => (item.base64) )
    const data = {comment: text, reservationId: reservationId, ListOfPhotos: listOfPhotos}
    await PostInspection(data)
    setLoading(false)
    navigation.navigate("InspectionInfoPage", { Id: fishingSpotId });
  };

  useEffect(() => {
    FetchData();
  }, []);
  
  const FetchData = async () => {
    setIsLoading(true);
    const data = await GetFishingSpot(fishingSpotId);
    const cardData = await ValidateUserCard(userData.cardNumber, fishingSpotId);
    const fishFromReservation = await GetUserFishes(reservationId);
    setFishList(fishFromReservation);
    setFishingSpot(data);
    setUserCard(cardData);
    if (data === null) {
      return;
    }
    setIsLoading(false);
  };

  const OpenFishRegister = async () => {
    setRegisterVisable(!registerVisable);
  };

  const onPressMinus = async (fishId) => {
    Alert.alert(
      "Potwierdzenie",
      "Czy na pewno chcesz usunąć rybę?",
      [
        {
          text: "Tak",
          onPress: async () => {
            await ReleaseFishAsInspector(fishId, reservationId);
            FetchData();
          },
        },
        {
          text: "Nie",
          style: "cancel",
        },
      ],
      { cancelable: false }
    );
  };

  const updateLayout = (index) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    const array = [...fishList];
    array[index].isExpanded = !array[index].isExpanded;
    setFishList(array);
  };

  const handleAddPhoto = () => {
    setIsCameraVisible(true);
  };

  const handleCloseCamera = () => {
    setIsCameraVisible(false);
  };

  const handleBase64Taken = async (base64Image) => {
    const newPhotos = [...photos, { uri: `data:image/jpeg;base64,${base64Image}`, base64: base64Image }];
    setPhotos(newPhotos);
  };

  const handlePhotoTaken = (photoUri) => {
    setPhotoBase64(photoUri)
  };

  const handleDeletePhoto = (index) => {
    const updatedPhotos = [...photos];
    updatedPhotos.splice(index, 1);
    setPhotos(updatedPhotos);
  };
  return (
    <SafeAreaView style={styles.containerScroll}>
      {isLoading ? (
        <ActivityIndicator
          size="large"
          style={{ justifyContent: "center", alignSelf: "center" }}
        />
      ) : (
        <ScrollView style={styles.containerScroll}>
          <View style={styles.middleContainer}>
            <Text style={styles.containerText}>Imię: {userData.name}</Text>
            <Text style={styles.containerText}>
              Nazwisko: {userData.surname}
            </Text>
            <Text style={styles.containerText}>
              Numer karty: {userData.cardNumber}
            </Text>
            <Text style={styles.containerText}>
              Łowisko: {fishingSpot.title}
            </Text>
            <Text style={styles.containerText}>
              Typ wody: {fishingSpot.type}
            </Text>
            <View style={{ flexDirection: "row" }}>
              <Text style={{ fontSize: 22 }}>Składka: </Text>
              <Text style={{ fontSize: 22 }}>{userCard.result}</Text>
            </View>
            {fishingSpot.catchAndRelease ? (
              <Text style={styles.containerText}>
                Brak rejestru - łowisko NoKill
              </Text>
            ) : (
              <>
                <TouchableOpacity onPress={OpenFishRegister}>
                  {!registerVisable ? (
                    <Text style={styles.containerText}>Wyświetl rejestr</Text>
                  ) : (
                    <Text style={styles.containerText}>Schowaj rejestr</Text>
                  )}
                </TouchableOpacity>
                {registerVisable ? (
                  <>
                    {fishList.map((groupOfFishes, key) => (
                      <View
                        style={{
                          width: "90%",
                          flex: 1,
                          backgroundColor: "white",
                          borderWidth: 1,
                          padding: 4,
                        }}
                      >
                        <ExpandableComponent
                          item={groupOfFishes}
                          key={key}
                          onClick={() => updateLayout(key)}
                          onPress={onPressMinus}
                          isFishListEditable={true}
                        />
                      </View>
                    ))}
                  </>
                ) : null}
              </>
            )}
            <Text style={[styles.containerText, { fontSize: 24 }]}>
              Dokumentacja fotograficzna
            </Text>
            <TouchableOpacity
              style={{
                borderWidth: 2,
                borderRadius: 35,
                width: 100,
                height: 100,
                justifyContent: "center",
                alignItems: "center",
              }}
              onPress={handleAddPhoto}
            >
              <Icon name="add-a-photo" size={64} color="black"></Icon>
            </TouchableOpacity>
            <Modal
              visible={isCameraVisible}
              onRequestClose={handleCloseCamera}
              animationType="slide"
              style={{width:'100%', height:'100%'}}
            >
              <CameraComponent onPhotoTaken={handlePhotoTaken} onBase64Taken={handleBase64Taken}/>
            </Modal>
            <View style={{flex:1}}>
              <PhotoList photos={photos} onDeletePhoto={handleDeletePhoto} />
            </View>
            <Text style={{ fontSize: 22, marginTop: 10 }}>Uwagi</Text>
            <View style={styles.textInputContainer}>
              <TextInput
                multiline={true}
                numberOfLines={4}
                placeholder="Tu wpisz uwagi dot. użytkownika"
                style={styles.bottomContainer}
                value={text}
                onChangeText={(text) => setText(text)}
              />
              <TouchableOpacity style={styles.button} onPress={handlePress}>
                <Text style={styles.buttonText}>Prześlij</Text>
              </TouchableOpacity>
              <LoadingModal visible={loading} text={"Wysyłanie..."} />
            </View>
          </View>
        </ScrollView>
      )}
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
    fontSize: 22,
    margin: 5,
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
