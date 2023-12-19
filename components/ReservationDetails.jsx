import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  Image,
  Text,
  ScrollView,
  TouchableOpacity,
  LayoutAnimation,
} from "react-native";
import { ExpandableComponent } from "./ExpandableComponent";
import Pluscircleo from "react-native-vector-icons/AntDesign";

export const ReservationDetails = ({
  image,
  title,
  date,
  location,
  desc,
  fishList,
  isFishListEditable,
  handlePressImage,
  nokill,
  setFishList,
  onPressMinus,
}) => {
  const updateLayout = (index) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    const array = [...fishList];
    array[index].isExpanded = !array[index].isExpanded;
    setFishList(array);
  };
  return (
    <ScrollView>
      <View style={styles.container}>
        <Image style={styles.leftPanelImage} source={image} />
        <View style={styles.rightPanel}>
          <Text style={styles.up}>{title}</Text>
          <Text style={styles.up}>{date}</Text>
          <Text style={styles.down}>{location}</Text>
          <Text style={styles.down}>{desc}</Text>
        </View>
      </View>
      <View style={styles.bottomPanel}>
        <View style={styles.upPanelBottom}>
          {nokill ? (
            <View>
              <Text style={[styles.up, { fontSize: 16, alignSelf: "center" }]}>
                Łowisko No Kill - Brak listy ryb
              </Text>
            </View>
          ) : (
            <>
              {isFishListEditable ? (
                <View
                  style={{
                    flex: 1,
                    flexDirection: "row",
                    justifyContent: "space-between",
                    borderBottomWidth: 1.25,
                    borderColor: "#0F4C8A",
                    display: "flex",
                  }}
                >
                  <Text
                    style={[styles.up, { fontSize: 28, textAlign: "justify" }]}
                  >
                    Dodaj do listy
                  </Text>
                  <TouchableOpacity
                    onPress={() => handlePressImage("fromPlus")}
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Pluscircleo
                      size={32}
                      name="pluscircleo"
                      color="#0F4C8A"
                    ></Pluscircleo>
                  </TouchableOpacity>
                </View>
              ) : (
                <View
                  style={{
                    flex: 1,
                    flexDirection: "row",
                    justifyContent: "space-between",
                    borderBottomWidth: 1.25,
                    borderColor: "#0F4C8A",
                    display: "flex",
                  }}
                >
                  <Text
                    style={[styles.up, { fontSize: 28, textAlign: "justify" }]}
                  >
                    Lista zabranych ryb
                  </Text>
                </View>
              )}

              {fishList.map((groupOfFishes, key) => (
                <ExpandableComponent
                  item={groupOfFishes}
                  key={groupOfFishes.species}
                  onClick={() => updateLayout(key)}
                  onPress={onPressMinus}
                  isFishListEditable={isFishListEditable}
                />
              ))}
            </>
          )}
        </View>
      </View>
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    width: "100%",
    minHeight: 120,
    borderBottomWidth: 1,
    borderBottomColor: "#0F4C8A",
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
  fish: {
    color: "#0000FF",
    fontWeight: "bold",
  },
  bottomPanel: {
    flex: 1,
    marginTop: 10,
    flexDirection: "column",
    width: "100%",
  },
  upPanelBottom: {
    justifyContent: "center",
    width: "80%",
    alignSelf: "center",
    marginVertical: 10,
    elevation: 4,
    borderRadius: 4,
    shadowColor: "#999",
    backgroundColor: "#FFF",
    padding: 10,
  },
  minusplus: {
    height: 16,
    width: 16,
  },
  specialUserStyle: {
    backgroundColor: "#E3EEEE",
  },
});
