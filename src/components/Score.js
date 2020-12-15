import React from "react";
import {
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { white } from "../utils/colors";

const Score = ({ numCorrect, numTotal, resetHandler }) => {
  const calculateScore = () => {
    return ((numCorrect / numTotal) * 100).toFixed(0);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.scoreMainContainer}>
        <Text style={styles.scoreMain}>{calculateScore()}</Text>
        <View style={styles.scoreContainer}>
          <Text style={[styles.score, { fontSize: 60, height: 60 }]}>%</Text>
          <Text style={[styles.score, { fontSize: 43, height: 45 }]}>
            score
          </Text>
        </View>
      </View>
      <View style={styles.statMainContainer}>
        <View
          style={[
            styles.statContainer,
            {
              borderRightWidth: 1,
              borderRightColor: "gray",
            },
          ]}
        >
          <View
            style={{
              alignSelf: "flex-end",
              alignItems: "center",
              marginRight: 16,
            }}
          >
            <Text style={styles.statNum}>{numCorrect}</Text>
            <Text style={styles.statText}>Correct</Text>
          </View>
        </View>
        <View style={styles.statContainer}>
          <View
            style={{
              alignSelf: "flex-start",
              alignItems: "center",
              marginLeft: 16,
            }}
          >
            <Text style={styles.statNum}>{numTotal}</Text>
            <Text style={styles.statText}>Questions</Text>
          </View>
        </View>
      </View>
      <TouchableOpacity style={styles.btn} onPress={resetHandler}>
        <Text style={styles.btnText}>Start Over</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    paddingLeft: 20,
    paddingRight: 20,
    justifyContent: "space-evenly",
    alignItems: "center",
    paddingBottom: 150,
  },
  scoreMainContainer: {
    flexDirection: "row",
    alignItems: "center",
    includeFontPadding: false,
  },
  scoreContainer: {
    alignContent: "flex-start",
    justifyContent: "center",
  },
  scoreMain: {
    fontSize: 120,
  },
  score: {
    includeFontPadding: false,
    textAlignVertical: "center",
  },
  statMainContainer: {
    width: "100%",
    flexDirection: "row",
    marginBottom: 16,
  },
  statContainer: {
    flex: 1,
    alignItems: "center",
  },
  statNum: {
    fontSize: 36,
    color: "blue",
  },
  statText: {
    fontSize: 20,
    color: "gray",
  },
  btn: {
    width: "75%",
    borderRadius: 10,
    paddingLeft: 40,
    paddingRight: 40,
    paddingTop: 16,
    paddingBottom: 16,
    alignItems: "center",
    backgroundColor: "blue",
  },
  btnText: {
    fontSize: 25,
    color: white,
  },
});

export default Score;
