import React from "react";
import {
  View,
  ScrollView,
  Image,
  Text,
  TouchableOpacity,
  Alert,
} from "react-native";

export const PhotoList = ({ photos, onDeletePhoto }) => {
  const handleDelete = (index) => {
    if (onDeletePhoto) {
      Alert.alert(
        "Potwierdzenie",
        "Czy na pewno chcesz usunąć zdjęcie?",
        [
          {
            text: "Tak",
            onPress: async () => {
              onDeletePhoto(index);
            },
          },
          {
            text: "Nie",
            style: "cancel",
          },
        ],
        { cancelable: false }
      );
    }
  };

  return (
    <ScrollView horizontal>
      {photos.map((photo, index) => (
        <View key={index} style={{}}>
          <Image
            source={{ uri: photo.uri }}
            style={{ width: 200, height: 300, borderRadius: 10, margin: 20 }}
          />
          <TouchableOpacity
            onPress={() => handleDelete(index)}
            style={{
              borderWidth: 0.5,
              backgroundColor: "white",
              borderRadius: 18,
              marginHorizontal: 40,
            }}
          >
            <Text style={{ textAlign: "center", fontSize: 20 }}>Usuń</Text>
          </TouchableOpacity>
        </View>
      ))}
    </ScrollView>
  );
};
