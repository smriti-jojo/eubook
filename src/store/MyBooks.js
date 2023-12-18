import { createSlice } from "@reduxjs/toolkit";

export const bookSlice = createSlice({
  name: "library",
  initialState: {
    books: [],
  },
  reducers: {
    setBookList: (state, action) => {
      // let bookList = state.books.filter(
      //   (book) => book.id !== action.payload.id
      // );
      // console.log("BOOKSTATE", action.payload);
      state.books = action.payload;
      // console.log("BOOKSTATE", action.payload);
    },
  },
});

export const { setBookList } = bookSlice.actions;

// this is for configureStore
export default bookSlice.reducer;
