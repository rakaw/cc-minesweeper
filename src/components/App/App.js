import React, { Component } from 'react';
import './App.css';
import SearchBar from '../SearchBar/SearchBar';
import Playlist from '../Playlist/Playlist';
import SearchResults from '../SearchResults/SearchResults';
import Spotify from '../../util/Spotify';


class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      searchResults: [],
      playlistTracks: [],
      playlistName: 'Enter Plyalist Name'
    };

    //bindings
    //this.searchSpotify = this.searchSpotify.bind(this);
    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.updatePlaylistName = this.updatePlaylistName.bind(this);
    this.savePlaylist = this.savePlaylist.bind(this);
    this.search = this.search.bind(this);
  }

  addTrack(track) {
    const tracks = this.state.playlistTracks;
    const output = tracks.find(currrTrack => currrTrack.id === track.id);

    if (!output) {
      tracks.push(track);
      this.setState({ playlistTracks: tracks });
    }
  }

  removeTrack(track) {
    const tracks = this.state.playlistTracks;
    const filteredTracks = tracks.filter(currrTrack => currrTrack.id !== track.id);

    this.setState({ playlistTracks: filteredTracks });
  }

  updatePlaylistName(name) {
    this.setState({ playlistName: name });
  }

  // Make an array of uri to send request to Spotify
  savePlaylist() {
    const playlistTracks = this.state.playlistTracks;
    const trackURIs = playlistTracks.map(currTrack => currTrack.uri);
    Spotify.savePlaylist(this.state.playlistName, trackURIs).then(() => {
      this.setState({ playlistName: 'Enter Playlist Name', playlistTracks: [] });
    })
  }

  search(term) {
    Spotify.search(term).then(tracks => {
      this.setState({ searchResults: tracks });
    });
  }

  render() {
    return (
      <div>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
        <div className="App">
          <SearchBar onSearch={this.search} />
          <div className="App-playlist">
            <SearchResults
              searchResults={this.state.searchResults}
              addTrack={this.addTrack}
            />
            <Playlist
              playlistName={this.state.playlistName}
              playlistTracks={this.state.playlistTracks}
              onRemove={this.removeTrack}
              onNameChange={this.updatePlaylistName}
              onSave={this.savePlaylist} />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
