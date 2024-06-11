import { createStore, combineReducers, AnyAction } from "redux";

const DARK_MODE = "DARK_MODE";
const LIGHT_MODE = "LIGHT_MODE";

export const darkMode = (): AnyAction => ({ type: DARK_MODE });
export const lightMode = (): AnyAction => ({ type: LIGHT_MODE });

interface ThemeState {
  isDarkMode: boolean;
}

const initialState: ThemeState = {
  isDarkMode: false,
};

const themeReducer = (state = initialState, action: AnyAction): ThemeState => {
  switch (action.type) {
    case DARK_MODE:
      return { ...state, isDarkMode: true };
    case LIGHT_MODE:
      return { ...state, isDarkMode: false };
    default:
      return state;
  }
};

const rootReducer = combineReducers({
  theme: themeReducer,
});

const store = createStore(rootReducer);

export default store;
