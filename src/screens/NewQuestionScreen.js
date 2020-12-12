import React, { useState } from "react";
import {
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
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        label="Question"
        onChangeText={setQValue}
        value={qValue}
        underlineColorAndroid="gray"
        placeholder="Enter Question"
      />
      {qValueErr && <Text style={styles.error}>{qValueErr}</Text>}
      <TextInput
        style={styles.input}
        label="Answer"
        onChangeText={setAValue}
        value={aValue}
        underlineColorAndroid="gray"
        placeholder="Enter Answer"
      />
      {aValueErr && <Text style={styles.error}>{aValueErr}</Text>}
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

export default NewQuestionScreen;
