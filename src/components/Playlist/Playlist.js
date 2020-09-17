import React from 'react';
import './Playlist.css';
import TrackList from '../TrackList/TrackList';

class Playlist extends React.Component {
  constructor(props) {
    super(props);

    //bindings
    this.handleNameChange = this.handleNameChange.bind(this);
  }

  handleNameChange(event) {
    const newPlaylistName = event.target.value;
    this.props.onNameChange(newPlaylistName);
  }

  render() {
    return (
      <div className="Playlist">
        <input onChange={this.handleNameChange} defaultValue="Type Playlist Name"/>
        <TrackList onRemove={this.props.onRemove} isRemoval={true} tracks={this.props.playlistTracks} />
        <a onClick={this.props.onSave} className="Playlist-save">SAVE TO SPOTIFY</a>
      </div>
    );
  }
}

export default Playlist;
