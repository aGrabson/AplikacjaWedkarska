import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';



export const InspectUserPage = (navigation) => {
    return (
        <View style={styles.container}>
            <SafeAreaView style={styles.containerView}>
            <ScrollView style={styles.containerScroll}>
            <View style={styles.middleContainer}>
                <Text style={styles.containerText}>Imię: Jan</Text>
                <Text style={styles.containerText}>Nazwisko: Nowak</Text>
                <Text style={styles.containerText}>Numer karty: 987321</Text>
                <Text style={styles.containerText}>Typ wody: Nizinna</Text>
                <Text style={{marginTop:50, fontSize:24, color:'#17C629'}}>Opłacona</Text>
                <Text style={{fontSize:22,marginTop:150}}>Uwagi</Text>
                <TextInput placeholder='Tu wpisz uwagi dot. użytkownika' style={[styles.bottomContainer, {textAlignVertical: 'top'}]}></TextInput>
            </View>
            </ScrollView>
            </SafeAreaView>
        </View>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,

  },
  middleContainer: {
    width:'100%',
    height:'100%',
    backgroundColor:'#D9D9D9',
    borderTopLeftRadius:30,
    borderTopRightRadius:30,
    alignItems:'center',
  },
  bottomContainer: {
    width:'100%',
    height:'30%',
    minHeight:230,
    borderTopLeftRadius:25,
    borderTopRightRadius:25,
    backgroundColor:'#FFFFFF',
    paddingHorizontal:10,
    fontSize:16
  },
  containerText: {
    fontSize:20,
    margin:15,
  },
  containerScroll: {
    width:'100%',
    height:'100%',
    
  },
  containerView: {
    width:'100%',
    height:'100%',
    
  }
});
