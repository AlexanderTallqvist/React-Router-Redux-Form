import { combineReducers } from 'redux';
import PostReducer from './reducer_posts';
import { reducer as formReducer } from 'redux-form';

const rootReducer = combineReducers({
  posts: PostReducer,
  // Wire-up our redux-form with our reducers
  form: formReducer
});

export default rootReducer;
