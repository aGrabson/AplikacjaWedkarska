import React, { useEffect, useState } from "react";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import { GetUsersForFishingSpot } from "../Controllers/ReservationController";
import { GetFishingSpot } from "../Controllers/ReservationController";
import { UsersTable } from "../components/UsersTable";

export const InspectionInfoPage = ({ navigation, route }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [fishingSpotData, setFishingSpotData] = useState();
  const [usersOnSpotData, setUsersOnSpotData] = useState();
  const id = route.params.Id;

  useEffect(() => {
    FetchData();
  }, []);

  const FetchData = async () => {
    setIsLoading(true);
    const data = await GetFishingSpot(id);
    const usersData = await GetUsersForFishingSpot(id);
    console.log(usersData)
    if (data === null || usersData === null) {
      return;
    }
    if (data !== null) setFishingSpotData(data);
    if (usersData !== null) setUsersOnSpotData(usersData);
    setIsLoading(false);
  };

  return (
    <View style={styles.container}>
      {isLoading ? (
        <ActivityIndicator
          size="large"
          style={{ justifyContent: "center", alignSelf: "center" }}
        />
      ) : (
        <>
          <Text style={styles.middleText}>
            Lista wędkarzy na łowisku <Text>{fishingSpotData.title}</Text>
          </Text>
          <View>
            <UsersTable usersData = {usersOnSpotData} fishingSpotid = {id} navigation={navigation}/>
          </View>
        </>
      )}
    </View>
  );
};
const styles = StyleSheet.create({
  table: {
    backgroundColor: "#D9D9D9",
    width: "100%",
    height: "100%",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    overflow: "hidden",
    alignSelf: "center",
    paddingHorizontal: 20,
  },
  tableRow: {
    flexDirection: "row",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#A9A9A9",
  },
  tableHeader: {
    flex: 1,
    fontWeight: "bold",
  },
  middleText: {
    color: "#0F4C8A",
    fontSize: 24,
    margin: 40,
    textAlign: "center",
  },
});
