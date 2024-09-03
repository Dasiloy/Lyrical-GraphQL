import React from "react";
import gql from "graphql-tag";
import { graphql } from "react-apollo";

class LyricList extends React.Component {
  onLike({ id, likes }) {
    this.props.mutate({
      variables: { id },
      optimisticResponse: {
        __typename: "Mutation",
        likeLyric: {
          id,
          __typename: "LyricType",
          likes: likes + 1,
        },
      },
    });
  }

  render() {
    return (
      <ul className='collection'>
        {this.props.lyrics.map(({ id, content, likes }) => (
          <li key={id} className='collection-item'>
            {content}
            <i
              onClick={() => this.onLike({ id, likes })}
              className='material-icons'>
              thumb_up
            </i>
            {likes}
          </li>
        ))}
      </ul>
    );
  }
}

const mutation = gql`
  mutation LyricLike($id: ID) {
    likeLyric(id: $id) {
      id
      content
      likes
    }
  }
`;

export default graphql(mutation)(LyricList);
