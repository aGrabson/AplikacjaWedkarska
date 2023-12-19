import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";

export const CameraButton = ({ title, onPress, icon, color }) => {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Icon name={icon} size={30} color={color ? color : "#f1f1f1"} />
      <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  buttonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#f1f1f1",
    marginLeft: 10,
  },
  button: {
    height: 40,
    flexDirection: "row",
    justifyContent: "center",
  },
});
