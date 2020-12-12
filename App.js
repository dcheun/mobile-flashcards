import React from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import { createStore } from "redux";
import { Provider } from "react-redux";

import DeckListScreen from "./src/screens/DeckListScreen";
import DeckScreen from "./src/screens/DeckScreen";
import NewDeckScreen from "./src/screens/NewDeckScreen";
import NewQuestionScreen from "./src/screens/NewQuestionScreen";
import QuizScreen from "./src/screens/QuizScreen";
import reducer from "./src/reducers";
import middleware from "./src/middleware";

// Stack Navigators
const ListStack = createStackNavigator();
const ListStackNavigator = () => {
  return (
    <ListStack.Navigator>
      <ListStack.Screen name="Decks" component={DeckListScreen} />
      <ListStack.Screen name="Deck" component={DeckScreen} />
      <ListStack.Screen name="New Question" component={NewQuestionScreen} />
      <ListStack.Screen name="Quiz" component={QuizScreen} />
    </ListStack.Navigator>
  );
};

// Tab Navigator
const screenOptions = ({ route }) => ({
  // TODO: icons
});

const tabBarOptions = {
  activeTintColor: "#000",
  style: {
    height: 56,
    backgroundColor: "#fff",
  },
};
const Tab = createBottomTabNavigator();
const MainNavigator = () => {
  return (
    <Tab.Navigator screenOptions={screenOptions} tabBarOptions={tabBarOptions}>
      <Tab.Screen name="Decks" component={ListStackNavigator} />
      <Tab.Screen name="New Deck" component={NewDeckScreen} />
    </Tab.Navigator>
  );
};

const store = createStore(reducer, middleware);

const App = () => {
  return (
    <Provider store={store}>
      <View style={{ flex: 1 }}>
        <NavigationContainer>
          <MainNavigator />
        </NavigationContainer>
      </View>
    </Provider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default App;
