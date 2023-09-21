import time

from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
from bs4 import BeautifulSoup
from datetime import datetime
def findV(table):
    allsum = 0
    sum = 6
    for i in table:
        if sum == 0:
            b = i.text
            #print(b)
            allsum += float(b)
            sum = 11
        else:
            sum -= 1
    print(allsum)

def OpenAndSignUp(driver):
    USER_NAME = 'machines'
    PASSWORD =  'mach'
    driver.maximize_window()
    driver.get('http://185.7.85.13:8081/disp')
    name_input = driver.find_element(By.NAME, 'userName')
    password_input = driver.find_element(By.NAME, 'password')
    name_input.send_keys(USER_NAME)
    password_input.send_keys(PASSWORD)
    password_input.send_keys(Keys.ENTER)
def ClickAndTakeInfo(driver):
    html = driver.page_source
    soup = BeautifulSoup(html)
    cars = soup.find(class_='expanded').findAll('input')
    for i in cars:
        b = str(i)[11:19]
        button = driver.find_element(By.ID, b)
        button.click()
        time.sleep(0.02)
        html = driver.page_source
        newsoup = BeautifulSoup(html)
        table = newsoup.find(id='tExportObjects').findAll('p')
        findV(table)

def main():
    service = Service(executable_path=r'C:\\Users\\trove\Desktop\\intens3.0\\server\\controllers\\scripter\\chrome\\chromedriver.exe')
    driver = webdriver.Chrome(service=service)
    now_date = datetime.now()
    f_date = 30
    s_date = 30
    in_date = datetime(2023, 7, 1)
    OpenAndSignUp(driver)
    for i in range(1, 27):
        print(str(i) + 'ffsfs')
        driver.get('http://185.7.85.13:8081/disp?curDate=2023-7-' + str(i))
        ClickAndTakeInfo(driver)
    

if __name__ == "__main__":
    main()


