import { Text, View, Image, StyleSheet, TouchableOpacity } from "react-native";

export const ReservationListElement = ({
  image,
  title,
  date,
  location,
  desc,
  style,
  onPress,
  isActive,
}) => {
  const dynamicStyle = isActive == true ? styles.specialUserStyle : {};
  return (
    <TouchableOpacity
      style={[styles.container, dynamicStyle]}
      onPress={onPress}
    >
      <Image style={styles.leftPanelImage} source={image} />
      <View style={[styles.rightPanel, style]}>
        <Text style={styles.up}>{title}</Text>
        <Text style={styles.up}>{date}</Text>
        <Text style={styles.down}>{location}</Text>
        <Text style={styles.down}>{desc}</Text>
      </View>
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    width: "100%",
    minHeight: 120,
    borderBottomWidth: 1,
    borderBottomColor: "#989898",
  },
  leftPanelImage: {
    width: 85,
    height: 85,
    marginLeft: 10,
    alignSelf: "center",
  },
  rightPanel: {
    marginLeft: 10,
    width: "70%",
    alignSelf: "center",
  },
  up: {
    color: "#0F4C8A",
    fontWeight: "bold",
  },
  down: {
    color: "#0000FF",
    fontWeight: "bold",
  },
  specialUserStyle: {
    backgroundColor: "#E3EEEE",
  },
});
