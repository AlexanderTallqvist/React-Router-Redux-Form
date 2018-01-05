import { FETCH_POSTS, FETCH_POST, DELETE_POST } from '../actions';
import _ from 'lodash';

export default function(state = {}, action) {
  switch (action.type) {

    case FETCH_POST:
      const post = action.payload.data;
      return { ...state, [post.id]:post };

    case FETCH_POSTS:
      // We use lodas to turn the response array to an object
      // that uses the post ids as object keys
      return _.mapKeys(action.payload.data, 'id');

    case DELETE_POST:
      // Remove the post with the ID of action.payload
      return _.omit(state, action.payload);

    default:
      return state;

  }
}
