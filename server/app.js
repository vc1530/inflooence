//var client_id = '0048909068294db1b98e49ed9c7d5dc8'; // Your client id
//var client_secret = 'ba457fdecdc3453c87b7e5aaba0123fc'; // Your secret
//var redirect_uri = 'http://localhost:8888/callback'; // Your redirect uri
//var scopes = \'user-read-private user-read-email\'
import spotipy
from spotipy.oauth2 import SpotifyClientCredentials

birdy_uri = 'spotify:artist:2WX2uTcsvV5OnS0inACecP'
spotify = spotipy.Spotify(client_credentials_manager=SpotifyClientCredentials())

results = spotify.artist_albums(birdy_uri, album_type='album')
albums = results['items']
while results['next']:
    results = spotify.next(results)
    albums.extend(results['items'])

for album in albums:
    print(album['name'])



