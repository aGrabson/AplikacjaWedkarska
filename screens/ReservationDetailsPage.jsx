import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  ScrollView,
  SafeAreaView,
  View,
  ActivityIndicator,
  Alert,
  TouchableOpacity,
  Text,
} from "react-native";
import fishIcon from "../src/fish.png";
import { ReservationDetails } from "../components/ReservationDetails";
import {
  GetReservationDetails,
  GetUserFishes,
  ReleaseFish,
} from "../Controllers/ReservationController";
import { AddFishModal } from "../components/AddFishModal";
import { GetFishList } from "../Controllers/ReservationController";
import { AddToReservation } from "../Controllers/ReservationController";
import { Button } from "../components/Button";
import { CancelReservation } from "../Controllers/ReservationController";

export const ReservationDetailsPage = ({ navigation, route }) => {
  const id = route.params.Id;
  const [isFishListEditable, setIsFishListEditable] = useState(false);
  const [reservation, setReservation] = useState({});
  const [fishList, setFishList] = useState([]);
  const [fishesList, setFishesList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [nokill, setNoKill] = useState(null);
  const [isModalOpen, setModalOpen] = useState(false);
  const [fishData, setFishData] = useState({ reservationId: id });

  const formatDate = (date) => {
    const utcDate = new Date(date);
    const localDate = new Intl.DateTimeFormat("pl-PL", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      timeZone: "Europe/Warsaw",
    }).format(utcDate);

    const [datePart, timePart] = localDate.split(", ");
    const [day, month, year] = datePart.split(".");
    const [hours, minutes] = timePart.split(":");

    return `${day}.${month}.${year} godz. ${hours}:${minutes}`;
  };

  useEffect(() => {
    FetchData();
  }, []);

  const FetchData = async () => {
    setIsLoading(true);
    const data = await GetReservationDetails(id);
    const fishesData = await GetUserFishes(id);
    const fishesList = await GetFishList();
    if (fishesData !== null) {
      setFishList(fishesData);
    }
    if (fishesList !== null) {
      setFishesList(fishesList);
      setFishData((prev) => ({ ...prev, selectedFish: fishesList[0].id }));
    }
    if (data !== null) {
      setReservation(data);
      {
        data.fishingSpot.catchAndRelease ? setNoKill(true) : setNoKill(false);
      }
      {
        data.isActive
          ? setIsFishListEditable(true)
          : setIsFishListEditable(false);
      }
    }
    setIsLoading(false);
  };
  const AddToReservationList = async () => {
    await AddToReservation(fishData);
    closeModal();
    FetchData();
  };

  const onPressMinus = async (fishId) => {
    Alert.alert(
      "Potwierdzenie",
      "Czy na pewno chcesz usunąć rybę?",
      [
        {
          text: "Tak",
          onPress: async () => {
            await ReleaseFish(fishId, id);
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

  const handlePressImage = async (fromWhatButton) => {
    if (fromWhatButton == "fromMinus") {
    } else if (fromWhatButton == "fromPlus") {
      setModalOpen(true);
    }
  };

  const closeModal = () => {
    setFishData({ reservationId: id });
    setModalOpen(false);
  };
  const HandleCancelReservation = async () => {
    Alert.alert(
      "Potwierdzenie",
      "Czy na pewno chcesz anulować rezerwację?",
      [
        {
          text: "Tak",
          onPress: async () => {
            await CancelReservation(id);
            navigation.navigate("ListOfReservationsPage", {
              toBeRefreshed: true,
            });
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

  return (
    <SafeAreaView
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "white",
      }}
    >
      {isLoading ? (
        <ActivityIndicator size={"large"} />
      ) : (
        <View style={styles.container}>
          <ScrollView>
            <ReservationDetails
              image={fishIcon}
              title="Rezerwacja"
              date={formatDate(reservation.reservationStart)}
              location={reservation.fishingSpot.title}
              desc={reservation.fishingSpot.type}
              fishList={fishList}
              isFishListEditable={isFishListEditable}
              nokill={nokill}
              handlePressImage={handlePressImage}
              setFishList={setFishList}
              onPressMinus={onPressMinus}
            />
            {new Date(reservation.reservationStart).getTime() >
            new Date().getTime() + 1 * 60 * 60 * 1000 ? (
              <Button onPress={HandleCancelReservation}>
                Anuluj rezerwację
              </Button>
            ) : null}
          </ScrollView>
          {Object.keys(fishesList).length === 0 ? null : (
            <AddFishModal
              isVisible={isModalOpen}
              onClose={closeModal}
              fishData={fishData}
              setFishData={setFishData}
              AddToReservation={AddToReservationList}
              fishList={fishesList}
            />
          )}
        </View>
      )}
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    width: "100%",
    height: "100%",
  },
});
