// import client info from de-encrypted file
import { clientID } from './Secret';

// variables for link
let userAccessToken = '';
const redirectURI = 'https://letsjam.surge.sh/';
  //local: 'http://localhost:3000'


const Spotify = {

  getAccessToken() {
    // Return token if it exists
    if (userAccessToken) {
      return userAccessToken;
    }
    //otherwise get access token
    const url = window.location.href;
    const accessToken = url.match(/access_token=([^&]*)/);
    const expiresIn = url.match(/expires_in=([^&]*)/);

    if(accessToken && expiresIn) {
      userAccessToken = accessToken[1];
      const expirationTime = Number(expiresIn[1]);

      window.setTimeout(() => (userAccessToken = ''), expirationTime * 1000);
      //update & clear url token
      window.history.pushState('For Access Token', null, '/');
      return userAccessToken;

    } else {
      // does token exist in url?
      window.location = `https://accounts.spotify.com/authorize?client_id=${clientID}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectURI}`;
    }
  },

  search(term) {
    const accessToken = this.getAccessToken();
    const endpoint = `https://api.spotify.com/v1/search?type=track&q=${term}`;
    return fetch(endpoint, {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    })
    .then(response => response.json())
    .then(jsonResponse => {
      if(!jsonResponse.tracks) {
        return [];
      }

      return jsonResponse.tracks.items.map(track => {
        return {
          id: track.id,
          name: track.name,
          artist: track.artists[0].name,
          album: track.album.name,
          uri: track.uri
        };
      })
    });
  },

  savePlaylist(playlistName, trackURI) {
    //no tracks, return nothing
    if(!playlistName || !trackURI) {
      return;
    }

    const accessToken = this.getAccessToken();
    //get user ID
    return fetch('https://api.spotify.com/v1/me', {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    })
    .then(response => response.json())
    .then(jsonResponse => jsonResponse.id)
    .then(userID => {
      //create a playlist in spotify account with user ID
      fetch(`https://api.spotify.com/v1/users/${userID}/playlists`, {
        headers: {
          Authorization: `Bearer ${accessToken}`
        },
        body: JSON.stringify({ name: playlistName }),
        method: 'POST'
      })
        .then(response => response.json())
        .then(jsonResponse => {
          const playlistID = jsonResponse.id;
          // use user ID & playlist ID to add songs to account
          const addSongsUrl = `https://api.spotify.com/v1/users/${userID}/playlists/${playlistID}/tracks`;
          fetch(addSongsUrl, {
            headers: {
              Authorization: `Bearer ${accessToken}`
            },
            body: JSON.stringify({ uris: trackURI }),
            method: 'POST'
          });
        });
    });
  }
};


export default Spotify;
