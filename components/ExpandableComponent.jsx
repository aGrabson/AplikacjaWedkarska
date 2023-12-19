import { useState, useEffect } from "react";
import { Text, StyleSheet, TouchableOpacity, View } from "react-native";
import ArrowIcon from "react-native-vector-icons/AntDesign";
import Minuscircleo from "react-native-vector-icons/AntDesign";

export const ExpandableComponent = ({
  item,
  onClick,
  onPress,
  isFishListEditable,
}) => {
  const [layoutHeight, setLayoutHeight] = useState(0);

  useEffect(() => {
    if (item.isExpanded) {
      setLayoutHeight(null);
    } else {
      setLayoutHeight(0);
    }
  }, [item.isExpanded]);

  const formatDate = (date) => {
    const utcDate = new Date(date);
    const localDate = new Intl.DateTimeFormat("pl-PL", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      timeZone: "Europe/Warsaw",
    }).format(utcDate);

    const [datePart, timePart] = localDate.split(", ");
    const [day, month, year] = datePart.split(".");
    const [hours, minutes] = timePart.split(":");

    return `${day}.${month}`;
  };
  const formatTime = (date) => {
    const utcDate = new Date(date);
    const localDate = new Intl.DateTimeFormat("pl-PL", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      timeZone: "Europe/Warsaw",
    }).format(utcDate);

    const [datePart, timePart] = localDate.split(", ");
    const [day, month, year] = datePart.split(".");
    const [hours, minutes] = timePart.split(":");

    return `${hours}:${minutes}`;
  };

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "space-between",
        borderBottomWidth: 1,
        borderColor: "#0F4C8A",
        display: "flex",
      }}
    >
      <TouchableOpacity
        key={item.species}
        onPress={onClick}
        style={{
          flexDirection: "row",
          flex: 1,
          justifyContent: "space-between",
          display: "flex",
          alignItems: "center",
          width: "100%",
          borderBottomWidth: 0.25,
          borderColor: "#0F4C8A",
        }}
      >
        <Text
          style={[
            styles.fish,
            {
              fontSize: 20,
              marginVertical: 8,
            },
          ]}
        >
          {item.species}
        </Text>
        {item.isExpanded ? (
          <ArrowIcon size={15} name="down" />
        ) : (
          <ArrowIcon size={15} name="right" />
        )}
      </TouchableOpacity>
      <View style={{ height: layoutHeight, overflow: "hidden" }}>
        <View style={styles.expandableItems}>
          <Text style={styles.expandableText}>Data</Text>
          <Text style={styles.expandableText}>Godzina</Text>
          <Text style={styles.expandableText}>Rozmiar</Text>
          <Text style={styles.expandableText}>Waga</Text>
          {isFishListEditable ? (
            <Minuscircleo
              size={24}
              name="minuscircleo"
              color="white"
            ></Minuscircleo>
          ) : null}
        </View>

        {item.fishList.map((fish) => (
          <View key={fish.id} style={styles.expandableItems}>
            <Text style={styles.expandableText}>
              {formatDate(fish.catchDateTime)}
            </Text>
            <Text style={styles.expandableText}>
              {formatTime(fish.catchDateTime)}
            </Text>
            <Text style={styles.expandableText}>{fish.size}cm</Text>
            <Text style={styles.expandableText}>{fish.weight}kg</Text>
            {isFishListEditable ? (
              <TouchableOpacity onPress={() => onPress(fish.id)}>
                <Minuscircleo
                  size={24}
                  name="minuscircleo"
                  color="#0F4C8A"
                ></Minuscircleo>
              </TouchableOpacity>
            ) : null}
          </View>
        ))}
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  fish: {
    color: "#0000FF",
    fontWeight: "bold",
  },
  expandableItems: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    borderBottomWidth: 0.5,
    borderColor: "#0F4C8A",
    minHeight: 40,
    alignItems: "center",
  },
  expandableText: {
    flex: 1,
  },
});
