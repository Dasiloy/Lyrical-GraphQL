import React from "react";
import query from "../queries/fetch-song";
import { graphql } from "react-apollo";
import { Link } from "react-router";
import LyricCreate from "./create_lyric";
import LyricList from "./lyric_list";

class SongDetail extends React.Component {
  render() {
    const { song, loading } = this.props.data;
    console.log(song);
    if (loading) {
      return <div>loading...</div>;
    }

    return (
      <div>
        <Link to='/'>Back</Link>
        <h3>{song.title}</h3>
        <LyricList lyrics={song.lyrics} />
        <LyricCreate songId={this.props.params.id} />
      </div>
    );
  }
}

export default graphql(query, {
  options: (props) => ({
    variables: { id: props.params.id },
  }),
})(SongDetail);
