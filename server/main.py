

from pickletools import pylist
from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from webdriver_manager.chrome import ChromeDriverManager
from selenium.webdriver.chrome.options import Options
from bs4 import BeautifulSoup
import csv
import mysql.connector as msql
from mysql.connector import Error
import pandas as pd
from search_spotify import search_sp

from spotipy.oauth2 import SpotifyClientCredentials
import spotipy
import sys
import pprint
import json


class Song:
    def __init__(self, all_info):
        self.all_info = all_info
        self.title = all_info[0]
        self.artist = all_info[1]
        self.id = all_info[2]
        self.ac = all_info[3]
        self.dance = all_info[4]
        self.energy = all_info[5]
        self.liveness = all_info[6]
        self.loudness = all_info[7]
        self.tempo = all_info[8]
        self.time_signature = all_info[9]
        self.url = all_info[10]

    def display_info(self):
        print(self.title, self.artist, self.id, self.ac, self.dance, self.energy, self.liveness, self.loudness, self.tempo, self.time_signature, self.url)

    def toJson(self):
        return json.dumps(self.all_info)


browser_options = Options()
browser_options.headless = True
DRIVER_PATH = "../chromedriver"

######## SCRAPING #######

driver = webdriver.Chrome(service=Service(ChromeDriverManager().install()), options = browser_options)

driver.get('http://webcache.googleusercontent.com/search?q=cache:https://tokboard.com/')

soup = BeautifulSoup(driver.page_source, "html.parser")
py_list = []
songs_list = soup.select('.title')

artist_list = soup.select('.artist')

# get ID of each song
sp = spotipy.Spotify(client_credentials_manager=SpotifyClientCredentials())


i = 1
j = 0

all_songs_obj = []
list_allsongs_json = []

while i < len(songs_list):
    new_song_parameters = [songs_list[i].get_text(), artist_list[j].get_text()]
    for element in search_sp(songs_list[i].get_text(), artist_list[j].get_text()):
        new_song_parameters.append(element)

    song_obj_new = Song(new_song_parameters)
    list_allsongs_json.append(song_obj_new.toJson())

    # debug tool: display each song object
    # song_obj_new.display_info()

    # add new object to array of all song objects
    all_songs_obj.append(song_obj_new)
    py_list.append(new_song_parameters)
    i += 1
    j += 1

# print(py_list)
# print(all_songs_obj)
# opening the csv file in 'w' mode
file = open('../db.csv', 'w', newline ='')

with file:
    # identifying header
    header = ['Title', 'Artist', 'ID', 'Acousticness', 'Danceability', 'Energy', 'Liveness', 'Loudness', 'Tempo', 'Time_signature', 'url']
    writer = csv.DictWriter(file, fieldnames = header)
    for title, artist, id, ac, dance, energy, liveness, loudness, tempo, time_signature, url in py_list:
        # id, acousticness, danceability,energy, liveness, loudness, tempo, time_signature, url
        writer.writerow({'Title': title, 'Artist': artist, "ID": id, "Acousticness": ac, "Danceability": dance, "Energy": energy, "Liveness": liveness, "Loudness": loudness, "Tempo": tempo, "Time_signature": time_signature, "url": url})

############## SCRAPING

try:
    conn = msql.connect(host='localhost', user='root',
                        password='mysql123')
    if conn.is_connected():
        cursor = conn.cursor()
        cursor.execute("CREATE DATABASE inflooencedb")
        print("inflooence database is created")
except Error as e:
    print("Error while connecting to MySQL", e)

# write JSON files to JSON text db

with open("json_db.json", "w") as outfile:
    outfile.write(json.dumps(list_allsongs_json))

############## SCRAPING

try:
    conn = msql.connect(host='localhost', user='root',
                        password='mysql123')
    if conn.is_connected():
        cursor = conn.cursor()
        cursor.execute("CREATE DATABASE inflooencedb")
        print("inflooence database is created")
except Error as e:
    print("Error while connecting to MySQL", e)


irisData = pd.read_csv("../db.csv")
irisData.head()
cursor = None

try:
    conn = msql.connect(host='localhost',
                           database='inflooencedb', user='root',
                           password='mysql123')
    if conn.is_connected():
        cursor = conn.cursor()
        cursor.execute("select database();")
        record = cursor.fetchone()
        print("You're connected to database: ", record)
        cursor.execute('DROP TABLE IF EXISTS songs;')
        print('Creating table....')
        # id, acousticness, danceability,energy, liveness, loudness, tempo, time_signature
        cursor.execute("CREATE TABLE songs (Title varchar(255) NOT NULL, Artist varchar(255) NOT NULL, ID varchar(255), Acousticness DECIMAL(10, 3), Danceability DECIMAL(10, 3), Energy DECIMAL(10, 6), Liveness DECIMAL(10, 6), Loudness DECIMAL(10, 6), Tempo DECIMAL(10, 6), Time_Signature DECIMAL(10, 6) NOT NULL, Album_Art varchar(255) NOT NULL)")

        print("songs table is created....")

        for i,row in irisData.iterrows():
            sql = "INSERT INTO songs VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)"
            cursor.execute(sql, tuple(row))
            print("Record inserted")
            # the connection is not autocommitted by default, so we
            # must commit to save our changes
            conn.commit()
except Error as e:
    print("Error while connecting to MySQL", e)

# # Execute query
# sql = "SELECT * FROM inflooencedb.songs"
# cursor.execute(sql)
# # Fetch all the records
# result = cursor.fetchall()
# show SQL table
# for i in result:
#     print(i)


# driver.quit()


