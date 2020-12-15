import {
  RECEIVE_DECKS,
  ADD_CARD_TO_DECK,
  SAVE_DECK_TITLE,
  REMOVE_DECK,
} from "../constants";

const decks = (state = {}, action) => {
  switch (action.type) {
    case RECEIVE_DECKS:
      return {
        ...state,
        ...action.payload,
      };
    case ADD_CARD_TO_DECK:
      const { title, card } = action;
      return {
        ...state,
        [title]: {
          ...state[title],
          questions: state[title].questions.concat([card]),
        },
      };
    case SAVE_DECK_TITLE:
      return {
        ...state,
        [action.title]: {
          title: action.title,
          questions: [],
        },
      };
    case REMOVE_DECK:
      const { [action.title]: value, ...newState } = state;
      return newState;
    default:
      return state;
  }
};

export default decks;
