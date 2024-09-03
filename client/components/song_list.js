import React from "react";
import gql from "graphql-tag";
import { graphql } from "react-apollo";
import { Link } from "react-router";
import query from "../queries/fetch_songs";

const mutation = gql`
  mutation DeleteSong($id: ID) {
    deleteSong(id: $id) {
      id
    }
  }
`;

class SongList extends React.Component {
  renderList() {
    return this.props.data.songs.map((s) => (
      <li className='collection-item' key={s.id}>
        <Link to={`/songs/${s.id}`}>{s.title}</Link>
        <i
          className='material-icons'
          onClick={() =>
            this.props
              .mutate({
                variables: { id: s.id },
              })
              .then(() => this.props.data.refetch())
          }>
          delete
        </i>
      </li>
    ));
  }

  render() {
    if (this.props.data.loading) {
      return <div>loading...</div>;
    }

    return (
      <div>
        <h3>Song List</h3>
        <ul className='collection'>{this.renderList()}</ul>
        <Link to='/songs/new' className='btn-floating btn-large red right'>
          <i className='material-icons'>add</i>
        </Link>
      </div>
    );
  }
}

// bind components with query
export default graphql(mutation)(graphql(query)(SongList));
