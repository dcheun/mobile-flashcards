import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { gray } from "../utils/colors";

const Deck = ({ deck }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>{deck.title}</Text>
      <Text style={styles.subheading}>{`${
        deck.questions?.length ?? 0
      } cards`}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 30,
    paddingBottom: 30,
    borderBottomWidth: 1,
    borderBottomColor: gray,
    width: "100%",
    alignItems: "center",
  },
  heading: {
    fontSize: 36,
  },
  subheading: {
    fontSize: 26,
    color: gray,
  },
});

export default Deck;
