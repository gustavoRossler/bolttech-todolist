import { SET_USER, SET_TOKEN, SET_LOADING, SET_ERROR, } from "./actions"

export const initialState = {
  user: localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : null,
  token: localStorage.getItem("token") ?? null,
  loading: false,
  error: null,
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case SET_USER:
      console.log(SET_USER, action);
      state.user = action.payload;
      if (!action.payload)
        localStorage.removeItem("user");
      else
        localStorage.setItem("user", JSON.stringify(action.payload));
      console.log("state", state);
      return state;
    case SET_TOKEN:
      console.log(SET_TOKEN, action);
      state.token = action.payload;
      if (!action.payload)
        localStorage.removeItem("token");
      else
        localStorage.setItem("token", action.payload);
      return state;
    case SET_LOADING:
      state.loading = action.payload;
      return state;
    case SET_ERROR:
      state.error = action.payload;
      return state;
    default:
      return state;
  }
}

export default reducer;