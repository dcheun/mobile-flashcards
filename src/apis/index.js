import AsyncStorage from "@react-native-async-storage/async-storage";

const DECKS_STORAGE_KEY = "UdaciCards:decks";

export const removeDecks = async () => {
  try {
    await AsyncStorage.removeItem(DECKS_STORAGE_KEY);
  } catch (err) {
    console.log(err);
  }
};

export const getDecks = async () => {
  try {
    const data = await AsyncStorage.getItem(DECKS_STORAGE_KEY);
    return JSON.parse(data);
  } catch (err) {
    const msg = `Failed to fetch decks from storage`;
    alert(msg);
    console.log(msg, err);
  }
};

export const getDeck = async (id) => {
  try {
    const data = await AsyncStorage.getItem(DECKS_STORAGE_KEY);

    return JSON.parse(data)?.[id];
  } catch (err) {
    const msg = `Failed to fetch deck ${id} from storage`;
    alert(msg);
    console.log(msg, err);
  }
};

export const saveDeckTitle = async (title) => {
  try {
    await AsyncStorage.mergeItem(
      DECKS_STORAGE_KEY,
      JSON.stringify({
        [title]: {
          title,
          questions: [],
        },
      })
    );
  } catch (err) {
    const msg = "Failed to save deck to storage";
    alert(msg);
    console.log(msg, err);
  }
};

export const addCardToDeck = async (title, card) => {
  try {
    const deck = await getDeck(title);

    await AsyncStorage.mergeItem(
      DECKS_STORAGE_KEY,
      JSON.stringify({
        [title]: {
          ...deck,
          questions: deck.questions.concat([card]),
        },
      })
    );
  } catch (err) {
    const msg = "Failed to add card to deck";
    alert(msg);
    console.log(msg, err);
  }
};
