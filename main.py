

from pickletools import pylist
from selenium import webdriver
from bs4 import BeautifulSoup
import csv
import mysql.connector as msql
from mysql.connector import Error
import pandas as pd

DRIVER_PATH = 'C:/Users/chy32/webscrape/chromedriver'
driver = webdriver.Chrome(executable_path=DRIVER_PATH)
driver.get('https://tokboard.com/')

soup = BeautifulSoup(driver.page_source, "html.parser")
py_list = []
# song_list = soup.find(class_= "jsx-2291293095")
songs_list = soup.select('.title')
# print(type(songs_list))
# print(songs_list)
for song in songs_list:
    add = [song.get_text(), "temp artist"]
    # print(EachPart.get_text())
    # add.append(song)
    py_list.append(add)

# print(songs_list)
# opening the csv file in 'w' mode
file = open('db.csv', 'w', newline ='')
 
with file:
    # identifying header 
    header = ['Title', 'Artist']
    writer = csv.DictWriter(file, fieldnames = header)
    # print(songs_list)
    for title, artist in py_list:
        writer.writerow({'Title': title, 'Artist': 'artist'})


try:
    conn = msql.connect(host='localhost', user='root',  
                        password='mysql')
    if conn.is_connected():
        cursor = conn.cursor()
        cursor.execute("CREATE DATABASE irisDB")
        print("irisDB database is created")
except Error as e:
    print("Error while connecting to MySQL", e)

irisData = pd.read_csv("./db.csv")
# print(irisData.to_string())
irisData.head()
cursor = None

try:
    conn = msql.connect(host='localhost', 
                           database='irisData', user='root', 
                           password='mysql')
    if conn.is_connected():
        cursor = conn.cursor()
        cursor.execute("select database();")
        record = cursor.fetchone()
        print("You're connected to database: ", record)
        cursor.execute('DROP TABLE IF EXISTS iris;')
        print('Creating table....')
        cursor.execute("CREATE TABLE iris (Title varchar(255) NOT NULL, Artist varchar(255)")

        print("iris table is created....")

        for i,row in irisData.iterrows():
            sql = "INSERT INTO irisdb.iris VALUES (%s, %s)"
            cursor.execute(sql, tuple(row))
            print("Record inserted")
            # the connection is not autocommitted by default, so we 
            # must commit to save our changes
            conn.commit()
except Error as e:
    print("Error while connecting to MySQL", e)

sql = "SELECT * FROM iris"
# cursor.execute(sql)

# # Fetch all the records
# result = cursor.fetchall()
# for i in result:
#     print(i)


driver.quit()


