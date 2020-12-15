import {
  RECEIVE_DECKS,
  ADD_CARD_TO_DECK,
  SAVE_DECK_TITLE,
  REMOVE_DECK,
} from "../constants";
import { getDecks, addCardToDeck, saveDeckTitle, removeDeck } from "../apis";

const receiveDecks = (decks) => {
  return {
    type: RECEIVE_DECKS,
    payload: decks,
  };
};

export const handleInitialData = () => async (dispatch) => {
  try {
    const decks = await getDecks();
    dispatch(receiveDecks(decks));
  } catch (err) {
    console.log("Failed to handle initial data: ", err);
  }
};

export const addCardToDeckAction = (title, card) => async (dispatch) => {
  try {
    await addCardToDeck(title, card);
    dispatch({
      type: ADD_CARD_TO_DECK,
      title,
      card,
    });
  } catch (err) {
    console.log("Failed to dispatch addCardToDeckAction: ", err);
  }
};

export const saveDeckTitleAction = (title) => async (dispatch) => {
  try {
    await saveDeckTitle(title);
    dispatch({
      type: SAVE_DECK_TITLE,
      title,
    });
  } catch (err) {
    console.log("Failed to dispatch saveDeckTitleAction: ", err);
  }
};

export const removeDeckAction = (title) => async (dispatch) => {
  try {
    await removeDeck(title);
    dispatch({
      type: REMOVE_DECK,
      title,
    });
  } catch (err) {
    console.log("Failed to dispatch removeDeckAction: ", err);
  }
};
