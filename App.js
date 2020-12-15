import React from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Platform } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import { createStore } from "redux";
import { Provider } from "react-redux";
import Constants from "expo-constants";
import { MaterialCommunityIcons, FontAwesome } from "@expo/vector-icons";

import DeckListScreen from "./src/screens/DeckListScreen";
import DeckScreen from "./src/screens/DeckScreen";
import NewDeckScreen from "./src/screens/NewDeckScreen";
import NewQuestionScreen from "./src/screens/NewQuestionScreen";
import QuizScreen from "./src/screens/QuizScreen";
import reducer from "./src/reducers";
import middleware from "./src/middleware";
import { purple, white } from "./src/utils/colors";

// Status Bar
function UdaciStatusBar({ backgroundColor, ...props }) {
  return (
    <View
      style={{
        backgroundColor,
        height: Constants.statusBarHeight,
      }}
    >
      <StatusBar {...props} />
    </View>
  );
}

// Stack Navigators
const Stack = createStackNavigator();
const StackNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Decks"
        component={DeckListScreen}
        options={{ title: "UdaciCards - Mobile Flashcards" }}
      />
      <Stack.Screen name="Deck" component={DeckScreen} />
      <Stack.Screen
        name="New Question"
        component={NewQuestionScreen}
        options={{ title: "Add Card" }}
      />
      <Stack.Screen name="Quiz" component={QuizScreen} />
    </Stack.Navigator>
  );
};

// Tab Navigator
const screenOptions = ({ route }) => ({
  tabBarIcon: ({ focused, color, size }) => {
    let iconName;

    if (route.name === "Decks") {
      iconName = focused ? "cards" : "cards-outline";
      return (
        <MaterialCommunityIcons name={iconName} size={size} color={color} />
      );
    } else if (route.name === "New Deck") {
      iconName = focused ? "plus-square" : "plus-square-o";
      return <FontAwesome name={iconName} size={size} color={color} />;
    }
  },
});

const tabBarOptions = {
  activeTintColor: Platform.OS === "ios" ? purple : white,
  style: {
    height: 56,
    backgroundColor: Platform.OS === "ios" ? white : purple,
    // shadowColor: "rgba(0,0,0,0.24)",
    // shadowOffset: {
    //   width: 0,
    //   height: 3,
    // },
    // shadowRadius: 6,
    // shadowOpacity: 1,
  },
  keyboardHidesTabBar: true,
};
const Tab = createBottomTabNavigator();
const MainNavigator = () => {
  return (
    <Tab.Navigator screenOptions={screenOptions} tabBarOptions={tabBarOptions}>
      <Tab.Screen name="Decks" component={StackNavigator} />
      <Tab.Screen name="New Deck" component={NewDeckScreen} />
    </Tab.Navigator>
  );
};

const store = createStore(reducer, middleware);

const App = () => {
  return (
    <Provider store={store}>
      <View style={styles.container}>
        <UdaciStatusBar backgroundColor={purple} style="light" />
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
    // backgroundColor: "#fff",
    // alignItems: "center",
    // justifyContent: "center",
  },
});

export default App;
