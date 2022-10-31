import {combineReducers} from '@reduxjs/toolkit';
import {driversSlice} from '../slices/driversSlice';

const rootReducer = combineReducers({
  driversData: driversSlice.reducer,
});

export default rootReducer;
