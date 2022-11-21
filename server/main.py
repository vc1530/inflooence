

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
import pymongo
from pymongo import MongoClient, InsertOne
from fastapi import FastAPI
from dotenv import dotenv_values
from routes import router as book_router

import time
# from dotenv import load_dotenv
# load_dotenv()
# import os


#install pymongo, spotipy, fastapi, pythonshell, bs4, webdriver-manager, seleniumin terminal

class Song:
    def __init__(self, all_info):
        self.title = all_info[0]
        self.artist = all_info[1]
        self.sid = all_info[2]
        self.ac = all_info[3]
        self.dance = all_info[4]
        self.energy = all_info[5]
        self.liveness = all_info[6]
        self.loudness = all_info[7]
        self.tempo = all_info[8]
        self.time_signature = all_info[9]
        self.url = all_info[10]

    def display_info(self):
        print(self.title, self.artist, self.sid, self.ac, self.dance, self.energy, self.liveness, self.loudness, self.tempo, self.time_signature, self.url)

    def toJson(self):
        return json.dumps(self.all_info)


browser_options = Options()
browser_options.headless = True
DRIVER_PATH = "../chromedriver"

#### MONGODB
config = dotenv_values(".env")

app = FastAPI()

@app.on_event("startup")
def startup_db_client():
    app.mongodb_client = MongoClient(config["ATLAS_URI"])
    app.database = app.mongodb_client[config["DB_NAME"]]

@app.on_event("shutdown")
def shutdown_db_client():
    app.mongodb_client.close()

# app.include_router(book_router, tags=["songs"], prefix="/song")

# SPOTIPY_CLIENT_SECRET = "ba457fdecdc3453c87b7e5aaba0123fc"
# SPOTIPY_CLIENT_ID = "0048909068294db1b98e49ed9c7d5dc8"
# SPOTIPY_REDIRECT_URI = "http://localhost:8888/callback"


# # ------------ SCRAPING --------------------###

# driver = webdriver.Chrome(service=Service(ChromeDriverManager().install()), options = browser_options)

# driver.get('http://webcache.googleusercontent.com/search?q=cache:https://tokboard.com/')

# soup = BeautifulSoup(driver.page_source, "html.parser")

# # initiate variables
# list_songs_arr = []
# songs_list = soup.select('.title')
# artist_list = soup.select('.artist')
# list_songs_obj = []

# limitless scroll, test timeout
# time.sleep(2)  # Allow 2 seconds for the web page to open
# scroll_pause_time = 1 # 
# screen_height = driver.execute_script("return window.screen.height;")   # get the screen height of the web
# i = 1

# while True:
#     # scroll one screen height each time
#     driver.execute_script("window.scrollTo(0, {screen_height}*{i});".format(screen_height=screen_height, i=i))  
#     i += 1
#     time.sleep(scroll_pause_time)
#     # update scroll height each time after scrolled, as the scroll height can change after we scrolled the page
#     scroll_height = driver.execute_script("return document.body.scrollHeight;")  
#     # Break the loop when the height we need to scroll to is larger than the total scroll height
#     if (screen_height) * i > scroll_height:
#         break
# end limitless scroll

# # get spotify wrapper
# sp = spotipy.Spotify(client_credentials_manager=SpotifyClientCredentials())


# i = 1
# j = 0



# while i < len(songs_list):
#     params = [songs_list[i].get_text(), artist_list[j].get_text()]
#     for element in search_sp(songs_list[i].get_text(), artist_list[j].get_text()):
#         params.append(element)

#     new_song_obj = Song(params)

#     #### debug tool: display each song object
#     # song_obj_new.display_info()

#     ### DEBUG

#     # add new object to array of all song objects
#     list_songs_obj.append(new_song_obj)
#     list_songs_arr.append(params)
#     i += 1
#     j += 1

# # write JSON files to JSON text db
# outfile = open('json_db.json', 'w')
# outfile.write(json.dumps([ob.__dict__ for ob in list_songs_obj]))
# outfile.close()


# # ------------ SCRAPING --------------- END

# # ----------------------------- MONGODB ----------------------###
# myclient = pymongo.MongoClient("mongodb+srv://INFLOOENCE:INFLOOENCE@inflooence.wode3u7.mongodb.net/?retryWrites=true&w=majority")
# db = myclient["inflooence"]
# collection = db["songs"]
# # open file
# with open('json_db.json') as file:
#     file_data = json.load(file)

# # Inserting the loaded data in the Collection
# # if JSON contains data more than one entry
# # insert_many is used else insert_one is used
# myclient.drop_database('inflooence')

# if isinstance(file_data, list):
#     collection.insert_many(file_data)
# else:
#     collection.insert_one(file_data)

# # --------- MONGODB ----------------- END


# ---------------- MYSQL ----------------------###
#
# # opening the csv file in 'w' mode
# file = open('../db.csv', 'w', newline ='')
#
# with file:
#     # identifying header
#     header = ['Title', 'Artist', 'ID', 'Acousticness', 'Danceability', 'Energy', 'Liveness', 'Loudness', 'Tempo', 'Time_signature', 'url']
#     writer = csv.DictWriter(file, fieldnames = header)
#     for title, artist, id, ac, dance, energy, liveness, loudness, tempo, time_signature, url in list_songs_arr:
#         # id, acousticness, danceability,energy, liveness, loudness, tempo, time_signature, url
#         writer.writerow({'Title': title, 'Artist': artist, "ID": id, "Acousticness": ac, "Danceability": dance, "Energy": energy, "Liveness": liveness, "Loudness": loudness, "Tempo": tempo, "Time_signature": time_signature, "url": url})
#
#
# try:
#     conn = msql.connect(host='localhost', user='root',
#                         password='mysql123')
#     if conn.is_connected():
#         cursor = conn.cursor()
#         cursor.execute("CREATE DATABASE inflooencedb")
#         print("inflooence database is created")
# except Error as e:
#     print("Error while connecting to MySQL", e)

# try:
#     conn = msql.connect(host='localhost', user='root',
#                         password='mysql123')
#     if conn.is_connected():
#         cursor = conn.cursor()
#         cursor.execute("CREATE DATABASE inflooencedb")
#         print("inflooence database is created")
# except Error as e:
#     print("Error while connecting to MySQL", e)
#
#
# irisData = pd.read_csv("../db.csv")
# irisData.head()
# cursor = None
#
# try:
#     conn = msql.connect(host='localhost',
#                            database='inflooencedb', user='root',
#                            password='mysql123')
#     if conn.is_connected():
#         cursor = conn.cursor()
#         cursor.execute("select database();")
#         record = cursor.fetchone()
#         print("You're connected to database: ", record)
#         cursor.execute('DROP TABLE IF EXISTS songs;')
#         print('Creating table....')
#         # id, acousticness, danceability,energy, liveness, loudness, tempo, time_signature
#         cursor.execute("CREATE TABLE songs (Title varchar(255) NOT NULL, Artist varchar(255) NOT NULL, ID varchar(255), Acousticness DECIMAL(10, 3), Danceability DECIMAL(10, 3), Energy DECIMAL(10, 6), Liveness DECIMAL(10, 6), Loudness DECIMAL(10, 6), Tempo DECIMAL(10, 6), Time_Signature DECIMAL(10, 6) NOT NULL, Album_Art varchar(255) NOT NULL)")
#
#         print("songs table is created....")
#
#         for i,row in irisData.iterrows():
#             sql = "INSERT INTO songs VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)"
#             cursor.execute(sql, tuple(row))
#             print("Record inserted")
#             # the connection is not autocommitted by default, so we
#             # must commit to save our changes
#             conn.commit()
# except Error as e:
#     print("Error while connecting to MySQL", e)
# # Execute query
# sql = "SELECT * FROM inflooencedb.songs"
# cursor.execute(sql)
# # Fetch all the records
# result = cursor.fetchall()
# show SQL table
# for i in result:
#     print(i)

# -------- MYSQL ------ END


print("python script finished")
# driver.quit()


