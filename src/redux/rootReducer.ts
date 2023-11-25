import { combineReducers } from 'redux';
// Slices
import sampleSlice from './slices/sample';

const rootReducer = combineReducers({
  sample: sampleSlice,
});

export default rootReducer;
