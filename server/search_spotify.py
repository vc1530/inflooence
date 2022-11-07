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
        ac = features[0]["acousticness"]
        dc = features[0]["danceability"]
        en = features[0]["energy"]
        live = features[0]["liveness"]
        loud = features[0]["loudness"]
        tempo = features[0]["tempo"]
        time = features[0]["time_signature"]
    except:
        spotify_id = 0
        ac = 0
        dc = 0
        en = 0
        live = 0
        loud = 0
        tempo = 0
        time = 0

    return [spotify_id, ac, dc, en, live, loud, tempo, time]
    # print(search_artist,spotifyID,search_title)
    # id, acousticness, danceability,energy, liveness, loudness, tempo, time_signature

