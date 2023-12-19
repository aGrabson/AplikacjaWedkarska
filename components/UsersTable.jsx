import { Text, View, StyleSheet, TouchableOpacity } from "react-native";

export const UsersTable = ({ usersData, navigation, fishingSpotid }) => {
  const handleUserPress = (item) => {
    navigation.navigate("InspectUserPage", { userData: item, spotId:fishingSpotid, reservationId:item.reservationId });
  };

  return (
    <View style={styles.table}>
      <View style={styles.tableRow}>
        <Text style={styles.tableHeader}>Imię</Text>
        <Text style={styles.tableHeader}>Nazwisko</Text>
        <Text style={styles.tableHeader}>Numer</Text>
      </View>
      {usersData.map((item, key) => (
        <TouchableOpacity
          key={item.cardNumber}
          onPress={() => handleUserPress(item)}
          style={{ flexDirection: "row", paddingVertical: 10 }}
        >
          <Text style={styles.userText}>{item.name}</Text>
          <Text style={styles.userText}>{item.surname}</Text>
          <Text style={styles.userText}>{item.cardNumber}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};
const styles = StyleSheet.create({
  buttonContainer: {
    alignItems: "center",
    marginTop: 20,
  },
  buttonText: {
    color: "white",
    fontSize: 17,
  },
  button: {
    backgroundColor: "#0000FF",
    padding: 10,
    borderRadius: 5,
  },
  table: {
    backgroundColor: "#D9D9D9",
    width: "100%",
    height: "100%",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    overflow: "hidden",
    alignSelf: "center",
    paddingHorizontal: 20,
  },
  tableRow: {
    flexDirection: "row",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#A9A9A9",
  },
  tableHeader: {
    flex: 1,
    fontWeight: "bold",
    fontSize: 18,
  },
  middleText: {
    color: "#0F4C8A",
    fontSize: 24,
    margin: 40,
    textAlign: "center",
  },
  userText: {
    flex: 1,
    fontSize: 16,
  },
});
