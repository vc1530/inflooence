import spotipy
from spotipy.oauth2 import SpotifyClientCredentials
import sys
auth_manager = SpotifyClientCredentials()
sp = spotipy.Spotify(auth_manager=auth_manager)

if len(sys.argv) > 1:
    song = sys.argv[1]
    artist = sys.argv[2]
else:
    song = 'feelings'
    artist = "lauv"
results = sp.search(q='track:' + song + ' artist:'+artist, type='track', limit= 1, market= "US")

# get id of song, artist name, song name
search_artist = results['tracks']['items'][0]['artists'][0]["name"]
spotifyID = results['tracks']['items'][0]["id"]
search_title = results['tracks']['items'][0]["name"]

# print(search_artist,spotifyID,search_title)
