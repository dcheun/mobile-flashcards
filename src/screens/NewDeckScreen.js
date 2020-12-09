import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

const NewDeckScreen = ({ navigation }) => {
  return (
    <>
      <Text style={{ fontSize: 48 }}>NewDeckScreen</Text>
      <TouchableOpacity onPress={() => navigation.navigate("New Question")}>
        <Text>New Question</Text>
      </TouchableOpacity>
    </>
  );
};

const styles = StyleSheet.create({});

export default NewDeckScreen;
