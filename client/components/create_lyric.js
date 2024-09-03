import React from "react";
import { graphql } from "react-apollo";
import gql from "graphql-tag";

class LyricCreate extends React.Component {
  constructor(props) {
    super(props);

    this.state = { content: "" };
  }

  onSubmit(e) {
    e.preventDefault();

    this.props
      .mutate({
        variables: {
          content: this.state.content,
          songId: this.props.songId,
        },
      })
      .then(() => this.setState({ content: "" }))
      .catch((e) => console.log(e));
  }
  render() {
    return (
      <form onSubmit={this.onSubmit.bind(this)}>
        <label>Add Lyric</label>
        <input
          type='text'
          value={this.state.content}
          onChange={(event) => this.setState({ content: event.target.value })}
        />
      </form>
    );
  }
}

const mutation = gql`
  mutation AddLyric($content: String, $songId: ID) {
    addLyricToSong(content: $content, songId: $songId) {
      id
      title
      lyrics {
        id
        likes
        content
      }
    }
  }
`;

export default graphql(mutation)(LyricCreate);
