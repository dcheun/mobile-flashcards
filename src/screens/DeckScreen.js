import React, { useEffect } from "react";
import {
  ScrollView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { useSelector } from "react-redux";

const DeckScreen = ({ navigation, route }) => {
  const { deckId } = route.params;
  const deck = useSelector((state) => state[deckId]);

  useEffect(() => {
    // Set title of navigator bar to the Deck title.
    navigation.setOptions({ title: deck.title });
  }, []);

  const handleOnPress = () => {
    if (deck.questions.length === 0) {
      return alert("Please add some cards.");
    }
    navigation.navigate("Quiz", { deckId });
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View>
        <Text style={styles.heading}>{deck.title}</Text>
        <Text style={styles.subheading}>{`${
          deck.questions?.length ?? 0
        } cards`}</Text>
      </View>
      <View style={styles.viewContainer}>
        <TouchableOpacity
          style={[styles.btn, styles.addBtn]}
          onPress={() =>
            navigation.navigate("New Question", {
              title: deck.title,
            })
          }
        >
          <Text style={styles.btnText}>Add Card</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.btn, styles.quizBtn]}
          onPress={handleOnPress}
        >
          <Text style={[styles.btnText, { color: "white" }]}>Start Quiz</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: "space-evenly",
    alignItems: "center",
    paddingLeft: 20,
    paddingRight: 20,
    paddingBottom: 48,
  },
  viewContainer: {
    width: "100%",
    alignItems: "center",
  },
  heading: {
    fontSize: 48,
    marginBottom: 16,
    textAlign: "center",
  },
  subheading: {
    fontSize: 30,
    color: "gray",
    textAlign: "center",
  },
  btn: {
    width: "75%",
    borderRadius: 10,
    paddingLeft: 40,
    paddingRight: 40,
    paddingTop: 16,
    paddingBottom: 16,
    borderWidth: 1,
    borderColor: "black",
    alignItems: "center",
  },
  addBtn: {
    borderWidth: 2,
    borderColor: "black",
    marginBottom: 16,
  },
  quizBtn: {
    backgroundColor: "black",
  },
  btnText: {
    fontSize: 25,
  },
});

export default DeckScreen;
