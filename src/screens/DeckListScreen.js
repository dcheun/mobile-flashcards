import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

const DeckListScreen = ({ navigation }) => {
  return (
    <>
      <Text style={{ fontSize: 48 }}>DeckListScreen</Text>
      <TouchableOpacity onPress={() => navigation.navigate("Deck")}>
        <Text>udacicard</Text>
      </TouchableOpacity>
    </>
  );
};

const styles = StyleSheet.create({});

export default DeckListScreen;
