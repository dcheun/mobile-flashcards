import React, { useEffect } from "react";
import {
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { getDecks, removeDecks } from "../apis";
import { handleInitialData } from "../actions";
import Deck from "../components/Deck";

const DeckListScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const decks = useSelector((state) => state);

  useEffect(() => {
    // removeDecks()
    //   .then(getDecks())
    //   .then((decks) => setDecks(decks ?? {}));
    // getDecks().then((decks) => setDecks(decks ?? {}));
    // removeDecks().then(() => {
    //   dispatch(handleInitialData());
    // });
    dispatch(handleInitialData());
  }, []);

  const renderItem = ({ item }) => {
    return (
      <TouchableOpacity
        onPress={() =>
          navigation.navigate("Deck", {
            deckId: item.title,
          })
        }
      >
        <Deck deck={item} />
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView>
      <FlatList
        data={Object.values(decks)}
        renderItem={renderItem}
        keyExtractor={(item) => item.title}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({});

export default DeckListScreen;
