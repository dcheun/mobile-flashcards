import React, { useState } from "react";
import {
  ScrollView,
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { useDispatch } from "react-redux";
import { addCardToDeckAction } from "../actions";

const NewQuestionScreen = ({ navigation, route }) => {
  const [qValue, setQValue] = useState("");
  const [aValue, setAValue] = useState("");
  const [qValueErr, setQValueErr] = useState(null);
  const [aValueErr, setAValueErr] = useState(null);

  const { title } = route.params;

  const dispatch = useDispatch();

  const submit = () => {
    let foundErr = false;
    if (qValue === "") {
      setQValueErr("This field is required");
      foundErr = true;
    }
    if (aValue === "") {
      setAValueErr("This field is required");
      foundErr = true;
    }
    if (foundErr) {
      return;
    }
    setQValueErr(null);
    setAValueErr(null);

    const card = {
      question: qValue,
      answer: aValue,
    };

    dispatch(addCardToDeckAction(title, card));

    navigation.goBack();
  };

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      keyboardShouldPersistTaps="always"
    >
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          label="Question"
          onChangeText={setQValue}
          value={qValue}
          underlineColorAndroid="gray"
          placeholder="Enter Question"
        />
        {qValueErr && <Text style={styles.error}>{qValueErr}</Text>}
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          label="Answer"
          onChangeText={setAValue}
          value={aValue}
          underlineColorAndroid="gray"
          placeholder="Enter Answer"
        />
        {aValueErr && <Text style={styles.error}>{aValueErr}</Text>}
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
    marginBottom: 150,
  },
  inputContainer: {
    width: "100%",
    marginBottom: 16,
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
    color: "red",
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
    color: "white",
    fontSize: 25,
  },
});

export default NewQuestionScreen;
