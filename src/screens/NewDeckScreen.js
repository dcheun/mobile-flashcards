import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { useDispatch } from "react-redux";
import { saveDeckTitleAction } from "../actions";

const NewDeckScreen = ({ navigation }) => {
  const [value, setValue] = useState("");
  const [inputError, setInputError] = useState(null);

  const dispatch = useDispatch();

  const submit = () => {
    if (value === "") {
      setInputError("Deck Title is required");
    } else {
      setInputError(null);
      dispatch(saveDeckTitleAction(value));
      navigation.navigate("Decks");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>What is the title of your new deck?</Text>
      <TextInput
        style={styles.input}
        label="Title"
        onChangeText={setValue}
        value={value}
        underlineColorAndroid="gray"
        placeholder="Deck Title"
      />
      {inputError && <Text style={styles.error}>{inputError}</Text>}
      <TouchableOpacity onPress={submit} style={styles.submit}>
        <Text style={styles.submitText}>Submit</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingLeft: 20,
    paddingRight: 20,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 150,
  },
  title: {
    fontSize: 48,
    marginBottom: 48,
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
    marginBottom: 48,
  },
  error: {
    alignSelf: "flex-start",
    fontSize: 20,
    color: "red",
    marginTop: -40,
    marginBottom: 48,
  },
  submit: {
    borderRadius: 10,
    paddingLeft: 40,
    paddingRight: 40,
    paddingTop: 15,
    paddingBottom: 15,
    backgroundColor: "black",
  },
  submitText: {
    color: "white",
    fontSize: 25,
  },
});

export default NewDeckScreen;
