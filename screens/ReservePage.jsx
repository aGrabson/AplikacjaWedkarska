import React, { useState, useEffect } from "react";
import {
  View,
  Button,
  StyleSheet,
  Text,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import DateTimePicker, {
  DateTimePickerAndroid,
} from "@react-native-community/datetimepicker";
import { GetFishingSpot } from "../Controllers/ReservationController";
import { LoadingModal } from "../components/LoadingModal";
import { Reserve } from "../Controllers/ReservationController";


export const ReservePage = ({ navigation, route }) => {
  const [date, setDate] = useState(new Date());
  const [dateSend, setSendDate] = useState(new Date());
  const id = route.params.Id;
  const [fishingSpotData, setFishingSpotData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    navigation.setOptions({
      headerTitle: () => (
        <View style={{ justifyContent: "center", alignContent: "center" }}>
          <Text
            style={{
              fontSize: 24,
              color: "#0F4C8A",
              textAlign: "justify",
            }}
          >
            Rezerwacja{"\n"}
            {fishingSpotData.title}
          </Text>
        </View>
      ),
    });
  }, [navigation, fishingSpotData.title]);

  useEffect(() => {
    FetchData();
  }, []);

  const FetchData = async () => {
    setIsLoading(true);
    const data = await GetFishingSpot(id);
    if (data === null) {
      return;
    }
    if (data !== null) setFishingSpotData(data);
    setIsLoading(false);
  };

  const handleReservation = async () => {
    setLoading(true);
    await Reserve({reservationId: id, dateOfReservation: dateSend}, navigation);
    setLoading(false);
  };

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    const myDateSend = formatDate(currentDate)
    const myDate = currentDate
    setDate(myDate);
    setSendDate(myDateSend);
  };

  const formatDate = (date) => {
    const utcDate = new Date(date);
    const localDate = new Intl.DateTimeFormat('pl-PL', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      timeZone: 'Europe/Warsaw',
    }).format(utcDate);

    const [datePart, timePart] = localDate.split(', ');
    const [day, month, year] = datePart.split('.');
    const [hours, minutes] = timePart.split(':');
    const formattedDate = new Date(`${year}-${month}-${day}T${hours}:${minutes}:00.000Z`);
    return formattedDate;
  };

  const showMode = (currentMode) => {
    DateTimePickerAndroid.open({
      value: date,
      mode: currentMode,
      is24Hour: true,
      minimumDate: new Date(),
      onChange,
    });
  };

  const showDatepicker = () => {
    showMode("date");
  };

  const showTimepicker = () => {
    showMode("time");
  };

  return (
    <View style={styles.container}>
      {isLoading ? (
        <ActivityIndicator
          size="large"
          style={{ justifyContent: "center", alignSelf: "center" }}
        />
      ) : (
        <>
          <View style={styles.middleContainer}>
            <Button
              onPress={showDatepicker}
              style={styles.picker}
              title="Wybierz datę"
            />
            <Text style={{ margin: 10, alignSelf: "center", fontSize: 22 }}>
              Data: {new Date(date).toLocaleDateString()}
            </Text>
          </View>
          <View style={styles.bottomContainer}>
            <Button
              onPress={showTimepicker}
              style={styles.picker}
              title="Wybierz godzinę"
            />

            <Text style={{ margin: 10, alignSelf: "center", fontSize: 22 }}>
            Godzina: {new Date(date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}

            </Text>
          </View>
          <TouchableOpacity
            style={styles.submitButton}
            onPress={handleReservation}
          >
            <Text style={styles.submit}>Prześlij</Text>
          </TouchableOpacity>
        </>
      )}
      <LoadingModal visible={loading} text={"Proszę czekać..."} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  middleContainer: {
    width: "100%",
  },
  bottomContainer: {
    width: "100%",
  },
  picker: {
    width: "100%",
  },
  submit: {
    fontSize: 20,
    alignSelf: "center",
    color: "white",
  },
  submitButton: {
    backgroundColor: "#0F4C8A",
    borderRadius: 20,
    width: 150,
    height: 100,
    marginRight: 25,
    marginTop: 25,
    justifyContent: "center",
    alignSelf: "flex-end",
  },
});
