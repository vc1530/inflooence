import spotipy
from spotipy.oauth2 import SpotifyClientCredentials
import sys
auth_manager = SpotifyClientCredentials()
sp = spotipy.Spotify(auth_manager=auth_manager)


def search_sp(title, artist):
    results = sp.search(q='track:' + title + ' artist:'+artist, type='track', limit= 1, market= "US")

    # get id of song, artist name, song name
    # search_artist = results['tracks']['items'][0]['artists'][0]["name"]
    try:
        spotify_id = results['tracks']['items'][0]["id"]
        features = sp.audio_features(spotify_id)
        # print(features[0]["acousticness"])
    except:
        spotify_id = 0
        features = 0
    # search_title = results['tracks']['items'][0]["name"]

    # print(search_artist,spotifyID,search_title)
    # id, acousticness, danceability,energy, liveness, loudness, tempo, time_signature
    return [spotify_id, features[0]["acousticness"], features[0]["danceability"], features[0]["energy"], features[0]["liveness"], features[0]["loudness"], features[0]["tempo"], features[0]["time_signature"]]

