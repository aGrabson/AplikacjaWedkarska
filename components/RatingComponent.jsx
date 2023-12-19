import React from "react";
import { View, Text } from "react-native";
import StarRating from "react-native-star-rating";

export const RatingComponent = ({
  ratingData,
  handleRatingChange,
  isLoading,
}) => {
  return (
    <View>
      <View style={{ flexDirection: "row" }}>
        <Text style={{ fontSize: 16, width: "35%" }}>
          Średnia ocen: {ratingData.ratings}
        </Text>
        <StarRating
          maxStars={5}
          rating={ratingData.ratings}
          starSize={20}
          fullStarColor={"orange"}
        />
        <Text
          style={{
            justifyContent: "flex-end",
            alignSelf: "flex-end",
            fontSize: 10,
          }}
        >
          ({ratingData.total})
        </Text>
      </View>
      <View style={{ flexDirection: "row" }}>
        <Text style={{ fontSize: 16, width: "35%" }}>
          Twoja ocena: {ratingData.userRating}
        </Text>
        <StarRating
          maxStars={5}
          rating={ratingData.userRating}
          starSize={20}
          selectedStar={(newRating) => handleRatingChange(newRating)}
          fullStarColor={"orange"}
        />
      </View>
    </View>
  );
};
