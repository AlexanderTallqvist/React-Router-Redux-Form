import React, { Component } from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchPosts } from '../actions';

class PostIndex extends Component {

  componentDidMount() {
    this.props.fetchPosts();
  }

  renderPosts() {
    // Use lodash to loop through the post objects
    return _.map(this.props.posts, post => {
      return (
        <li className="list-group-item" key={post.id}>
          <Link to={`/posts/${post.id}`}>
            {post.title}
          </Link>
        </li>
      );
    });
  }

  render() {
    return(
      <div>
        <div className="text-xs-right">
          <Link className="btn btn-primary" to="/posts/new">
            Add a new Post
          </Link>
        </div>
        <h3>Posts</h3>
        <ul className="list-group">
          {this.renderPosts()}
        </ul>
      </div>
    );
  }
}

// We want to get seomthing from the application level state
function mapStateToProps(state) {
  return { posts: state.posts };
}


// Wire up our action-creator with our component,
// and accees the application level state with mapStateToProps
export default connect(mapStateToProps, { fetchPosts })(PostIndex);
