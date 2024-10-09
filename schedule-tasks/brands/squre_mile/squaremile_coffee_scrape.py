from glob import escape
from turtle import update
from common.json_service import *
from common.driver_service import *
from selenium.webdriver.common.by import By
from common.logger import getMyLogger
from objects.coffee import coffee
logger = getMyLogger(__name__)

def squaremile_coffee_scraper(driver, roaster):
    driver = goto(driver, roaster["url"])
    cards = get_elements(driver, By.CLASS_NAME, roaster['coffee']['cards'], "Cannot find grid-items")
    coffeeArray = []
    for card in cards:
        try:

            productUrl = get_element_attribute(
                    card,
                    By.CSS_SELECTOR,
                    roaster['coffee']['url'],
                    "unknown",
                    "href"
            )

            price = get_text(
                driver=card,
                by=By.CLASS_NAME,
                path=roaster['coffee']['price'],
                default_value="unknown",
                log_term="Could not find PRICE info"
            )

            image = get_element_attribute(
                driver=card,
                by=By.CLASS_NAME,
                path=roaster['coffee']['image'],
                log_term="unknown",
                attribute="src"
            )
     
            name = get_text(
                driver=card,
                by=By.CSS_SELECTOR,
                path=roaster['coffee']['name'],
                default_value="UNKNOWN",
                log_term="Could not find PRICE info"
            )

            '''
            if productUrl != "unknown":
                productPage = goto(driver, productUrl)
                page_load(productPage)

                process = get_text(
                    driver=productPage,
                    by=By.CSS_SELECTOR,
                    path=".sqmile-single-product-details > div:nth-child(2) > p:nth-child(2) > b",
                    default_value="UNKNOWN",
                    log_term="Could not find PROCESS info"
                )

                producers = get_text(
                    driver=productPage,
                    by=By.CSS_SELECTOR,
                    path=".sqmile-single-product-details > div:nth-child(1) > p:nth-child(3) > b",
                    default_value="UNKNOWN",
                    log_term="Could not find PROCESS info"
                )
                
                grown = get_text(
                    driver=productPage,
                    by=By.CSS_SELECTOR,
                    path=".sqmile-single-product-details > div:nth-child(1) > p:nth-child(1) > b",
                    default_value="UNKNOWN",
                    log_term="Could not find PROCESS info"
                )

                altitude = get_text(
                    driver=productPage,
                    by=By.CSS_SELECTOR,
                    path=".sqmile-single-product-details > div:nth-child(2) > p:nth-child(3) > b",
                    default_value="UNKNOWN",
                    log_term="Could not find PROCESS info"
                )

                varieties = get_text(
                    driver=productPage,
                    by=By.CSS_SELECTOR,
                    path=".sqmile-single-product-details > div:nth-child(2) > p:nth-child(1) > b",
                    default_value="UNKNOWN",
                    log_term="Could not find PROCESS info"
                )

                notes = get_text(
                    driver=productPage,
                    by=By.CSS_SELECTOR,
                    path=".sqm-product-tasting-notes-pp",
                    default_value="UNKNOWN",
                    log_term="Could not find NOTES info"
                )

                desc = get_text(
                    driver=productPage,
                    by=By.CSS_SELECTOR,
                    path="#sqmile-slide-01 > div > article > section:nth-child(4) > div.sqmile-single-product-column.sqmile-single-product-description > div > p:nth-child(2)",
                    default_value="UNKNOWN",
                    log_term="Could not find PROCESS info"
                )
            '''
            coffeeArray.append(coffee(
                name=name,
                productUrl=productUrl,
                image=image,
                price=price,
                notes="",
                roaster_name="Squaremile Coffee"
            ))
        except:
            logger.log("cannot do this product", "ivalid product")
    return coffeeArray

