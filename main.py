from selenium import webdriver
import time
from selenium.webdriver.chrome.service import Service
from webdriver_manager.chrome import ChromeDriverManager
from selenium.webdriver.common.by import By

# Main Function
if __name__ == '__main__':
    options = webdriver.ChromeOptions()
    options.add_argument("--start-maximized")
    options.add_argument('--log-level=3')

    driver = webdriver.Chrome(service=Service(ChromeDriverManager().install()))
    driver.maximize_window()
    driver.get("https://www.google.com")

    driver.set_window_size(1920, 1080)

    # Send a get request to the url
    # driver.get('https://tokboard.com/')
    driver.get('https://www.indeed.com/q-data-scientist-jobs.html?vjk=f65f08b247368ab8&advn=7494582439330530')
    # test = driver.find_elements(By.ID, "__next")
    test = driver.find_elements(By.CLASS_NAME, "jobsearch-LeftPane")

    # for e in


    ret = []
    time.sleep(2)
    driver.quit()

    print(test)
    print("Done")