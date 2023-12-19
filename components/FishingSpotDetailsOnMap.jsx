import { Text, View, StyleSheet, ScrollView } from "react-native";
import { RatingComponent } from "./RatingComponent";
export const FishingSpotDetailsOnMap = ({
  spot,
  handleRatingChange,
  ratingData,
  isLoading,
}) => {
  return (
    <ScrollView style={styles.buttonContainer}>
      <View>
        <Text style={styles.headerText}>Ocena łowiska</Text>
        <RatingComponent
          spotId={spot.id}
          ratingData={ratingData}
          handleRatingChange={handleRatingChange}
          isLoading={isLoading}
        />
      </View>
      <View>
        <Text style={styles.headerText}>Informacje o łowisku</Text>
        <Text style={styles.buttonText}>{spot.description}</Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    backgroundColor: "white",
    height: "30%",
    paddingHorizontal: 8,
  },
  buttonText: {
    color: "#0F4C8A",
    fontSize: 17,
    textAlign: "justify",
  },
  button: {
    padding: 10,
    borderRadius: 5,
  },
  headerText: {
    color: "#0000FF",
    fontSize: 20,
    fontWeight: "bold",
  },
});
