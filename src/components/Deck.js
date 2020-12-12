import React from "react";
import { View, Text, StyleSheet } from "react-native";

const Deck = ({ deck }) => {
  return (
    <>
      <Text>{deck.title}</Text>
      <Text>{`${deck.questions?.length ?? 0} cards`}</Text>
    </>
  );
};

export default Deck;
