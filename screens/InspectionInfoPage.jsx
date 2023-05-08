import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, FlatList } from 'react-native';


const data = [
    { id: 1, name: 'John', surname: 'Doe', code: '123456' },
    { id: 2, name: 'Jane', surname: 'Doe', code: '234567' },
    { id: 3, name: 'Bob', surname: 'Smith', code: '345678' },
  ];
  
  const Table = () => {
    const renderItem = ({ item }) => (
      <View style={{ flexDirection: 'row', paddingVertical: 10}}>
        <Text style={{ flex: 1 }}>{item.name}</Text>
        <Text style={{ flex: 1 }}>{item.surname}</Text>
        <Text style={{ flex: 1 }}>{item.code}</Text>
      </View>
    );
    return (
        <View style={styles.table}>
          <View style={styles.tableRow}>
            <Text style={styles.tableHeader}>Imię</Text>
            <Text style={styles.tableHeader}>Nazwisko</Text>
            <Text style={styles.tableHeader}>Numer</Text>
          </View>
          <FlatList
            data={data}
            renderItem={renderItem}
            keyExtractor={(item) => item.id.toString()}
          />
        </View>
      );
    };

export const InspectionInfoPage = (navigation) => {
  return (
    <View style={styles.container}>
        <Text style={styles.middleText}>Lista wędkarzy na łowisku</Text>
        <View>
            <Table />
        </View>
    </View>
  );
};

const styles = StyleSheet.create({
    table: {
      backgroundColor: '#D9D9D9',
      width: '100%',
      height: '100%',
      borderTopLeftRadius: 30,
      borderTopRightRadius: 30,
      overflow: 'hidden',
      alignSelf:'center',
      paddingHorizontal: 20
    },
    tableRow: {
      flexDirection: 'row',
      paddingVertical: 10,
      borderBottomWidth: 1,
      borderBottomColor: '#A9A9A9',
    },
    tableHeader: {
      flex: 1,
      fontWeight: 'bold',
    },
    middleText: {
        color: '#0F4C8A',
        fontSize: 24,
        margin: 40
    }
  });