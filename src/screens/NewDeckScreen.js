import React, { useState } from "react";
import {
  ScrollView,
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { saveDeckTitleAction } from "../actions";
import { red, white } from "../utils/colors";

const NewDeckScreen = ({ navigation }) => {
  const [value, setValue] = useState("");
  const [inputError, setInputError] = useState(null);

  const dispatch = useDispatch();
  const decks = useSelector((state) => state);

  const submit = () => {
    if (value === "") {
      setInputError("Deck Title is required");
    } else if (value in decks) {
      setInputError("Deck with that name already exists");
    } else {
      setInputError(null);
      setValue("");
      dispatch(saveDeckTitleAction(value));
      navigation.navigate("Decks");
    }
  };

  // Using a ScrollView to make landscape mode a little more useful
  // in case the contents goes off screen.
  // keyboardShouldPersistTaps is needed to fire submit button when
  // keyboard is still in focus.
  return (
    <ScrollView
      contentContainerStyle={styles.container}
      keyboardShouldPersistTaps="always"
    >
      <Text style={styles.heading}>What is the title of your new deck?</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          label="Title"
          onChangeText={setValue}
          value={value}
          underlineColorAndroid="gray"
          placeholder="Deck Title"
        />
        {inputError && <Text style={styles.error}>{inputError}</Text>}
      </View>
      <TouchableOpacity onPress={submit} style={styles.submit}>
        <Text style={styles.submitText}>Submit</Text>
      </TouchableOpacity>
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
  inputContainer: {
    width: "100%",
  },
  heading: {
    fontSize: 48,
    textAlign: "center",
  },
  input: {
    height: 60,
    width: "100%",
    fontSize: 20,
    borderColor: "gray",
    borderWidth: 1,
    paddingLeft: 10,
    paddingRight: 10,
    borderRadius: 10,
  },
  error: {
    alignSelf: "flex-start",
    fontSize: 20,
    color: red,
  },
  submit: {
    borderRadius: 10,
    paddingLeft: 40,
    paddingRight: 40,
    paddingTop: 16,
    paddingBottom: 16,
    backgroundColor: "black",
  },
  submitText: {
    color: white,
    fontSize: 25,
  },
});

export default NewDeckScreen;
