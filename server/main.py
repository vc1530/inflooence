

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
import search_spotify

browser_options = Options()
browser_options.headless = True
DRIVER_PATH = "../chromedriver"

driver = webdriver.Chrome(service=Service(ChromeDriverManager().install()), options = browser_options)

driver.get('https://tokboard.com/')

soup = BeautifulSoup(driver.page_source, "html.parser")
py_list = []
songs_list = soup.select('.title')

artist_list = soup.select('.artist')

i = 1
j = 0

while i < len(songs_list):
    add = [songs_list[i].get_text(), artist_list[j].get_text()]
    py_list.append(add)
    i += 1
    j += 1
# print(py_list)

# opening the csv file in 'w' mode
file = open('../db.csv', 'w', newline ='')

with file:
    # identifying header
    header = ['Title', 'Artist']
    writer = csv.DictWriter(file, fieldnames = header)
    for title, artist in py_list:
        writer.writerow({'Title': title, 'Artist': artist})

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
        cursor.execute('DROP TABLE IF EXISTS iris;')
        print('Creating table....')
        cursor.execute("CREATE TABLE songs (Title varchar(255) NOT NULL, Artist varchar(255) NOT NULL)")

        print("iris table is created....")

        for i,row in irisData.iterrows():
            sql = "INSERT INTO songs VALUES (%s, %s)"
            cursor.execute(sql, tuple(row))
            print("Record inserted")
            # the connection is not autocommitted by default, so we
            # must commit to save our changes
            conn.commit()
except Error as e:
    print("Error while connecting to MySQL", e)

# Execute query
sql = "SELECT * FROM inflooencedb.songs"
cursor.execute(sql)
# Fetch all the records
result = cursor.fetchall()
for i in result:
    print(i)

driver.quit()


