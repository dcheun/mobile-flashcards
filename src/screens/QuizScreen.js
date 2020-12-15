import React, { useState } from "react";
import {
  ScrollView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { useSelector } from "react-redux";
import { green, red, white } from "../utils/colors";
import Score from "../components/Score";
import { clearLocalNotification, setLocalNotification } from "../utils/helpers";

const QuizScreen = ({ route }) => {
  const [side, setSide] = useState("question");
  const [idx, setIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [complete, setComplete] = useState(false);

  const { deckId } = route.params;
  const deck = useSelector((state) => state[deckId]);
  const questions = deck.questions;

  const handleFlipCard = () => {
    setSide(side === "question" ? "answer" : "question");
  };

  const handleOnAnswer = (correct) => {
    if (correct) {
      setScore((prev) => prev + 1);
    }
    setSide("question");
    setNextCard();
  };

  const setNextCard = () => {
    if (idx + 1 >= questions.length) {
      setComplete(true);
      // Clear local notification and set up a new one for tomorrow.
      clearLocalNotification().then(setLocalNotification);
      return;
    }
    setIdx(idx + 1);
  };

  const reset = () => {
    setSide("question");
    setIdx(0);
    setScore(0);
    setComplete(false);
  };

  if (complete) {
    return (
      <Score
        numCorrect={score}
        numTotal={questions.length}
        resetHandler={reset}
      />
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.cardNum}>{`${idx + 1} / ${questions.length}`}</Text>
      <View style={styles.innerContainer}>
        <View style={styles.qaContainer}>
          <Text style={styles.heading}>{questions[idx][side]}</Text>
          <TouchableOpacity onPress={handleFlipCard}>
            <Text style={styles.qa}>
              {side === "question" ? "Answer" : "Question"}
            </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.btnContainer}>
          <TouchableOpacity
            style={[styles.btn, styles.correctBtn]}
            onPress={() => handleOnAnswer(true)}
          >
            <Text style={styles.btnText}>Correct</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.btn, styles.incorrectBtn]}
            onPress={() => handleOnAnswer(false)}
          >
            <Text style={styles.btnText}>Incorrect</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 16,
    paddingBottom: 48,
  },
  cardNum: {
    fontSize: 20,
  },
  innerContainer: {
    flex: 1,
    justifyContent: "space-evenly",
    alignItems: "center",
  },
  qaContainer: {
    alignItems: "center",
    marginBottom: 36,
  },
  btnContainer: {
    width: "100%",
    alignItems: "center",
  },
  heading: {
    fontSize: 48,
    marginBottom: 16,
    textAlign: "center",
  },
  qa: {
    color: red,
    fontSize: 22,
    fontWeight: "bold",
  },
  btn: {
    width: "75%",
    borderRadius: 10,
    paddingLeft: 40,
    paddingRight: 40,
    paddingTop: 16,
    paddingBottom: 16,
    alignItems: "center",
    marginBottom: 16,
  },
  correctBtn: {
    backgroundColor: green,
  },
  incorrectBtn: {
    backgroundColor: red,
  },
  btnText: {
    fontSize: 25,
    color: white,
  },
});

export default QuizScreen;
