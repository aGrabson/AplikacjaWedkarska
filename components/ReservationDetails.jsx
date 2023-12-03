import React, { useEffect, useState } from "react";
import { View, StyleSheet, Image, Text, ScrollView } from "react-native";
import { textAlign } from "styled-system";

export const ReservationDetails = ({
  image,
  title,
  date,
  location,
  desc,
  description,
}) => {
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
        <View style={styles.leftPanelBottom}>
          <Text style={styles.down}>Opis</Text>
        </View>
        <View style={styles.rightPanelBottom}>
            <Text style={[styles.up, { textAlign: 'justify' }]}>{description}</Text>
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
  bottomPanel: {
    flex: 1,
    marginTop: 10,
    flexDirection:'row'
  },
  leftPanelBottom: {
    width: 85,
    alignItems: "center",
    marginLeft: 10,
  },
  rightPanelBottom: {
    justifyContent: "center",
    marginLeft: 10,
    width: "60%",
  },
  specialUserStyle: {
    backgroundColor: "#E3EEEE",
  },
});
