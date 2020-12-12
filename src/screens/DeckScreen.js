import React from "react";
import { Text, StyleSheet, TouchableOpacity } from "react-native";
import { useSelector } from "react-redux";

const DeckScreen = ({ navigation, route }) => {
  const { deckId } = route.params;
  const deck = useSelector((state) => state[deckId]);

  return (
    <>
      {console.log("DeckScreen: deck: ", deck)}
      <Text style={{ fontSize: 48 }}>{deck.title}</Text>
      <Text style={{ fontSize: 48 }}>{`${
        deck.questions?.length ?? 0
      } cards`}</Text>
      <TouchableOpacity
        onPress={() =>
          navigation.navigate("New Question", {
            title: deck.title,
          })
        }
      >
        <Text>Add Card</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate("Quiz")}>
        <Text>Quiz</Text>
      </TouchableOpacity>
    </>
  );
};

const styles = StyleSheet.create({});

export default DeckScreen;
