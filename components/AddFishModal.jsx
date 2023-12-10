import React from "react";
import { StyleSheet, View, Text, Modal, TextInput } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { Button } from "./Button";

export const AddFishModal = ({
  isVisible,
  onClose,
  fishData,
  setFishData,
  AddToReservation,
  fishList,
}) => {
  return (
    <Modal visible={isVisible} onRequestClose={onClose} transparent={true}>
      <View style={styles.container}>
        <View
          style={{
            padding: 15,
            width: 275,
            height: 275,
            flexDirection: "column",
            backgroundColor: "#DADADA",
            shadowColor: "#DADADA",
            gap: 12,
            elevation: 4,
            borderTopLeftRadius: 4,
            borderTopRightRadius: 4,
            padding: 10,
          }}
        >
          <Text style={styles.headerText}>Wybierz rybę:</Text>
          <Picker
            selectedValue={fishData.selectedFish}
            prompt={"Dostępne ryby"}
            onValueChange={(itemValue) =>
              setFishData((prev) => ({ ...prev, selectedFish: itemValue }))
            }
            style={styles.inputText}
            
          >
            {fishList.map((fish, index) => (
              <Picker.Item key={index} label={fish.species} value={fish.id} />
            ))}
          </Picker>

          <Text style={styles.headerText}>Rozmiar [cm]:</Text>
          <TextInput
            placeholder="Wprowadź rozmiar"
            value={fishData.size}
            keyboardType="numeric"
            onChangeText={(value) =>
              setFishData((prev) => ({ ...prev, size: value }))
            }
            style={styles.inputText}
          />

          <Text style={styles.headerText}>Waga [kg]:</Text>
          <TextInput
            placeholder="Wprowadź wagę"
            value={fishData.weight}
            keyboardType="numeric"
            onChangeText={(value) =>
              setFishData((prev) => ({ ...prev, weight: value }))
            }
            style={styles.inputText}
          />
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "flex-end",
            width: 275,
            backgroundColor: "#DADADA",
            elevation: 4,
            borderBottomLeftRadius: 4,
            borderBottomRightRadius: 4,
            padding: 10,
          }}
        >
          <Button onPress={onClose}>Zamknij</Button>
          <Button onPress={async () => await AddToReservation()}>Zapisz</Button>
        </View>
      </View>
    </Modal>
  );
};
const styles = StyleSheet.create({
  headerText: {
    fontSize: 16,
    color: "#0F4C8A",
    fontWeight: "bold",
  },
  inputText: {
    borderWidth: 0.3,
    borderColor: "#0F4C8A",
    backgroundColor: "white",
    paddingLeft: 5,
    color: "#0F4C8A",
  },
  container: {
    flex: 1,
    alignSelf: "center",
    justifyContent: "center",
  },
});
