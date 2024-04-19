import { createStore } from "redux";

type Movie = {
  title: string;
  basket: boolean;
  liked: boolean;
};

type State = {
  Movies: Movie[];
  Basket: string[];
  LikedMovies: string[];
};

type Action =
  | {
      type: "ADD_MOVIE";
      payload: Movie;
    }
  | {
      type: "ADD_BASKET";
      payload: string;
    }
  | {
      type: "LIKED_MOVIES";
      payload: string;
    };

const InitialState = {
  Movies: [
    { title: "Dune 2", basket: false, liked: false },
    { title: "Avengers", basket: false, liked: false },
    { title: "Thuppaki", basket: false, liked: false },
  ],
  Basket: [],
  LikedMovies: [],
};

function reducer(state: State = InitialState, action: Action) {
  switch (action.type) {
    case "ADD_MOVIE":
      return {
        ...state,
        Movies: [...state.Movies, action.payload],
      };
    case "ADD_BASKET":
      return {
        ...state,
        Movies: state.Movies.map((movie) =>
          movie.title === action.payload
            ? { ...movie, basket: !movie.basket }
            : movie
        ),
        Basket: state.Basket.includes(action.payload)
          ? state.Basket.filter((movie) => movie !== action.payload)
          : [...state.Basket, action.payload],
      };
    case "LIKED_MOVIES":
      return {
        ...state,
        Movies: state.Movies.map((movie) =>
          movie.title === action.payload
            ? { ...movie, liked: !movie.liked }
            : movie
        ),
        LikedMovies: state.LikedMovies.includes(action.payload)
          ? state.LikedMovies.filter((movie) => movie !== action.payload)
          : [...state.LikedMovies, action.payload],
      };
    default:
      return state;
  }
}

const store = createStore(reducer);

export default store;
