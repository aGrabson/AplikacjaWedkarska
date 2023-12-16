import React, { useState, useEffect } from "react";
import { View, Text } from "react-native";
import StarRating from "react-native-star-rating";

export const RatingComponent = ({ spotId, initialRating, onRatingChange }) => {
  const [rating, setRating] = useState(5);

  return (
    <View style={{ flexDirection: "row", alignItems:'center', justifyContent:'center'}}>
      <Text>Ocena łowiska: {rating}</Text>
      <StarRating
        maxStars={5}
        rating={rating}
        starSize={20}
        selectedStar={(newRating) => {
          setRating(newRating);
          onRatingChange(spotId, newRating);
        }}
        fullStarColor={"orange"}
      />
    </View>
  );
};
