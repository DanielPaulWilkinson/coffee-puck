from datetime import time
from seleniumwire import webdriver
from selenium.common.exceptions import TimeoutException
from selenium.common.exceptions import NoSuchElementException
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import Select
from contextlib import contextmanager
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support.expected_conditions import \
    staleness_of

from common.logger import getMyLogger

logger = getMyLogger(__name__)


def create():
    options = webdriver.EdgeOptions()
    options.add_argument("--window-size=1920,1080")
    options.add_argument("--no-sandbox")
    options.add_argument("--headless")
    options.add_argument("--disable-gpu")
    options.add_argument("--disable-crash-reporter")
    options.add_argument("--disable-extensions")
    options.add_argument("--disable-in-process-stack-traces")
    options.add_argument("--disable-logging")
    options.add_argument("--disable-dev-shm-usage")
    options.add_argument("--log-level=3")
    options.add_argument("--output=/dev/null")
    driver = webdriver.Chrome(options=options)
    return driver


def goto(driver: webdriver, url: str):
    driver.get(url)
    return driver


def get_text(
    driver: webdriver, by: By, path: str, default_value: any, log_term: str
):
    try:
        return driver.find_element(by, path).text
    except:
        logger.log(0, log_term)
        return default_value

def get_elements(driver: webdriver, by: By, path: str, log_term: str):
    try:
        return driver.find_elements(by, path)
    except:
        logger.log(0, log_term)

def get_element(driver: webdriver, by: By, path: str, log_term: str):
    try:
        return driver.find_element(by, path)
    except:
        logger.log(0, log_term)
        return log_term

def get_element_attribute(driver: webdriver, by: By, path: str, log_term: str, attribute: str):
    element = get_element(
        driver,
        By.CSS_SELECTOR,
        path,
        log_term,
    )
    
    if element != log_term:
        return element.get_attribute(attribute) 
    else:
        return log_term
    
@contextmanager
def wait_for_page_load(driver, timeout=10):
    i = 1
    while i <= 10:
        footer = driver.find_element(By.CSS_SELECTOR, "footer")
        driver.execute_script("arguments[0].scrollIntoView();", footer)
        print('It has scrolled ' + str(i) + ' times')
        print('Now waiting 3 seconds before repeating')
        time.sleep(3)
        i += 1
    else:
        print('The script has finished scrolling to the bottom of the page.')

    old_page = driver.find_element_by_tag_name('html')
    yield
    WebDriverWait(driver, timeout).until(staleness_of(old_page))

def create_select(driver, by, path, log_term):
    try:
        return Select(get_element(driver=driver, by=by, path=path, log_term=log_term))
    except:
        logger.log(0, log_term)