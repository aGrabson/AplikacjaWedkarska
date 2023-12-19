import { Text, View, StyleSheet, TouchableOpacity } from "react-native";

export const Button = ({ onPress, children }) => {
  return (
    <View style={styles.buttonContainer}>
      <TouchableOpacity style={styles.button} onPress={onPress}>
        <Text style={styles.buttonText}>{children}</Text>
      </TouchableOpacity>
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
});
