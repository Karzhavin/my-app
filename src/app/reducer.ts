import { combineReducers } from 'redux';

import settingsReducer from '../features/settings/settingsSlice';
import blacklistReducer from '../features/settings/blacklistSlice';
import resultsReducer from '../features/results/resultsSlice';

const rootReducer = combineReducers({
  settings: settingsReducer,
  blacklist: blacklistReducer,
  results: resultsReducer
});

export default rootReducer;