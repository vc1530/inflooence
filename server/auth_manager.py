import spotipy
from spotipy.oauth2 import SpotifyClientCredentials
from spotipy.oauth2 import SpotifyOAuth

# SPOTIPY_CLIENT_SECRET = "ba457fdecdc3453c87b7e5aaba0123fc"
# SPOTIPY_CLIENT_ID = "0048909068294db1b98e49ed9c7d5dc8"
# SPOTIPY_REDIRECT_URI = "http://localhost:8888/callback"
#
#
# scope = 'user-library-read'
# sp = spotipy.Spotify(auth_manager=SpotifyOAuth(scope=scope))
# results = sp.current_user_saved_tracks()
# for idx, item in enumerate(results['items']):
#     track = item['track']
#     print(idx, track['artists'][0]['name'], " - ", track['name'])