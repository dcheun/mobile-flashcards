import React, { useEffect } from "react";
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Alert,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { handleInitialData, removeDeckAction } from "../actions";
import Deck from "../components/Deck";

const DeckListScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const decks = useSelector((state) => state);

  useEffect(() => {
    dispatch(handleInitialData());
  }, []);

  const createDeleteAlert = (title) =>
    Alert.alert(
      "Confirm Delete",
      `Are you sure you want to delete "${title}" deck?`,
      [
        {
          text: "Delete",
          onPress: () => dispatch(removeDeckAction(title)),
        },
        {
          text: "Cancel",
          style: "cancel",
        },
      ]
    );

  const renderItem = ({ item }) => {
    return (
      <TouchableOpacity
        onPress={() =>
          navigation.navigate("Deck", {
            deckId: item.title,
          })
        }
        onLongPress={() => createDeleteAlert(item.title)}
      >
        <Deck deck={item} />
      </TouchableOpacity>
    );
  };

  if (Object.values(decks).length === 0) {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>Please add some decks.</Text>
      </View>
    );
  }

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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 25,
  },
});

export default DeckListScreen;
