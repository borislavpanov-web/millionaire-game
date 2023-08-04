import { createStore } from "redux";

const initialState = {
  gameResults: [],
};

const reducer = (state = initialState, action: any) => {
  switch (action.type) {
    case "SET_GAME_RESULTS":
      return {
        ...state,
        gameResults: action.payload,
      };
    default:
      return state;
  }
};

const store = createStore(reducer);

export default store;
