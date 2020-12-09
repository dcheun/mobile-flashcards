import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

const DeckScreen = ({ navigation }) => {
  return (
    <>
      <Text style={{ fontSize: 48 }}>DeckScreen</Text>
      <TouchableOpacity onPress={() => navigation.navigate("Quiz")}>
        <Text>Quiz</Text>
      </TouchableOpacity>
    </>
  );
};

const styles = StyleSheet.create({});

export default DeckScreen;
