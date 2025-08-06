import { createSlice } from "@reduxjs/toolkit";
import anecdoteService from "../services/anecdotes";

const anecdoteSlice = createSlice({
  name: "anecdote",
  initialState: [],
  reducers: {
    voteAnecdote(state, action) {
      const votedAnecdote = action.payload;
      const id = votedAnecdote.id;

      return state
        .map((anecdote) => (anecdote.id !== id ? anecdote : votedAnecdote))
        .sort((a, b) => b.votes - a.votes);
    },
    appendAnecdote(state, action) {
      state.push(action.payload);
    },
    setAnecdote(state, action) {
      return action.payload;
    },
  },
});

export const { voteAnecdote, appendAnecdote, setAnecdote } =
  anecdoteSlice.actions;

export const initializer = () => {
  return async (dispatch) => {
    const anecdotes = await anecdoteService.getAll();
    dispatch(setAnecdote(anecdotes));
  };
};

export const createAnecdote = (content) => {
  return async (dispatch) => {
    const newAnecdote = await anecdoteService.createNew(content);
    dispatch(appendAnecdote(newAnecdote));
  };
};

export const voting = (id) => {
  return async (dispatch) => {
    const votedAnecdote = await anecdoteService.vote(id);

    dispatch(voteAnecdote(votedAnecdote));
  };
};

export default anecdoteSlice.reducer;
