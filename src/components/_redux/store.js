import { configureStore } from '@reduxjs/toolkit';
import manageBooksSlice from './manageBooksSlice';
import manageDisplaySlice from './manageDisplaySlice';

export default configureStore({
  reducer: {
    manageBooks: manageBooksSlice,
    manageDisplay: manageDisplaySlice
  },
});