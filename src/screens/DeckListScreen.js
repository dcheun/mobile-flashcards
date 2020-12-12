import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { getDecks, removeDecks } from "../apis";
import { handleInitialData } from "../actions";
import Deck from "../components/Deck";

const DeckListScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const decks = useSelector((state) => state);

  useEffect(() => {
    console.log("Getting deck data...");
    // removeDecks()
    //   .then(getDecks())
    //   .then((decks) => setDecks(decks ?? {}));
    // getDecks().then((decks) => setDecks(decks ?? {}));
    // removeDecks().then(() => {
    //   dispatch(handleInitialData());
    // });
    dispatch(handleInitialData());
  }, []);

  return (
    <View style={styles.container}>
      {console.log("render: decks: ", decks)}
      {console.log("render: decks.length: ", Object.values(decks).length)}
      {console.log("render: Object.values(decks): ", Object.values(decks))}
      <Text style={{ fontSize: 48 }}>DeckListScreen</Text>
      <TouchableOpacity onPress={() => navigation.navigate("Deck")}>
        <Text>udacicard</Text>
      </TouchableOpacity>
      {Object.values(decks).map((deck) => (
        <TouchableOpacity
          key={deck.title}
          onPress={() =>
            navigation.navigate("Deck", {
              deckId: deck.title,
            })
          }
        >
          <Deck deck={deck} />
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default DeckListScreen;
