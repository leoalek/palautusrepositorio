import { createSlice } from "@reduxjs/toolkit";

const initialState = "";

const notifSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    notifier(state, action) {
      //console.log(action.payload);
      return action.payload;
    },
    reset() {
      //console.log("init state");
      return initialState;
    },
  },
});

export const { notifier, reset } = notifSlice.actions;

export const setNotification = (content, time) => {
  //console.log(content, time);
  return async (dispatch) => {
    dispatch(notifier(content));
    setTimeout(() => {
      dispatch(reset());
    }, 1000 * time);
  };
};

export default notifSlice.reducer;
