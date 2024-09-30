from glob import escape
from turtle import update
import json_service as json_service
import common.driver_service as driver_service
from selenium.webdriver.common.by import By
from common.logger import getMyLogger
from coffee import coffee
logger = getMyLogger(__name__)

def main():
    roasters = json_service.get_roasters_config()
    driver = driver_service.Create()
    coffee = []

    for roaster in roasters:
        driver = driver_service.goto(driver, roaster["url"])
        if roaster['name'] == '':
           coffee = rave(driver, roaster)

        
    print(coffee)


def rave(driver, roaster):
    cards = driver_service.get_elements_from_path(driver, By.CSS_SELECTOR, roaster['gridItem']['cards'], "Cannot find grid-items")
    coffeeArray = []
    for card in cards:
        try:
            productUrl = ""
            image = ""

            try:
                productUrl = driver_service.get_element(
                    card,
                    By.CSS_SELECTOR,
                    roaster['gridItem']['url'],
                    "Could not find PROPERTY_LINK info",
                ).get_attribute("href")
            except:
                productUrl = "unknown"

            notes = driver_service.get_element_text_from_path(
                driver=card,
                by=By.CLASS_NAME,
                path=roaster['gridItem']['notes'],
                default_value="UNKNOWN",
                log_term="Could not find NOTES info"
            )

            price = driver_service.get_element_text_from_path(
                driver=card,
                by=By.CLASS_NAME,
                path=roaster['gridItem']['price'],
                default_value="UNKNOWN",
                log_term="Could not find PRICE info"
            )

            try:
                image = driver_service.get_element(
                    driver=card,
                    by=By.CLASS_NAME,
                    path=roaster['gridItem']['image'],
                    log_term="Could not find IMAGE info"
                ).get_attribute("src")
            except:
                image = "UNKNOWN"

            name = driver_service.get_element_text_from_path(
                driver=card,
                by=By.CSS_SELECTOR,
                path=roaster['gridItem']['name'],
                default_value="UNKNOWN",
                log_term="Could not find PRICE info"
            )

            if productUrl != "unknown":
                driver = driver_service.goto(driver, productUrl)

                process = driver_service.get_element_text_from_path(
                    driver=driver,
                    by=By.CSS_SELECTOR,
                    path="section.product-origin.relative.flex.space-between.gap-medium > div.origin-table > div.origin-table-data > div:nth-child(1) > div > p",
                    default_value="UNKNOWN",
                    log_term="Could not find PROCESS info"
                )

                producers = driver_service.get_element_text_from_path(
                    driver=driver,
                    by=By.CSS_SELECTOR,
                    path="section.product-origin.relative.flex.space-between.gap-medium > div.origin-table > div.origin-table-data > div:nth-child(2) > div > p",
                    default_value="UNKNOWN",
                    log_term="Could not find PROCESS info"
                )
                
                grown = driver_service.get_element_text_from_path(
                    driver=driver,
                    by=By.CSS_SELECTOR,
                    path="section.product-origin.relative.flex.space-between.gap-medium > div.origin-table > div.origin-table-data > div:nth-child(3) > div > p",
                    default_value="UNKNOWN",
                    log_term="Could not find PROCESS info"
                )

                altitude = driver_service.get_element_text_from_path(
                    driver=driver,
                    by=By.CSS_SELECTOR,
                    path="section.product-origin.relative.flex.space-between.gap-medium > div.origin-table > div.origin-table-data > div:nth-child(4) > div > p",
                    default_value="UNKNOWN",
                    log_term="Could not find PROCESS info"
                )

                varieties = driver_service.get_element_text_from_path(
                    driver=driver,
                    by=By.CSS_SELECTOR,
                    path="section.product-origin.relative.flex.space-between.gap-medium > div.origin-table > div.origin-table-data > div:nth-child(5) > div > p",
                    default_value="UNKNOWN",
                    log_term="Could not find PROCESS info"
                )

                desc = driver_service.get_element_text_from_path(
                    driver=driver,
                    by=By.CSS_SELECTOR,
                    path="section.product-origin.relative.flex.space-between.gap-medium > div.origin-table > div.table-main-content",
                    default_value="UNKNOWN",
                    log_term="Could not find PROCESS info"
                )

            coffeeArray.append(coffee(
                name=name,
                productUrl=productUrl,
                image=image,
                price=price,
                notes=notes,
                process=process,
                producers=producers,
                grown=grown,
                altitude=altitude,
                varieties=varieties,
                desc=desc,
            ))
        except:
            logger.log("cannot do this product", "ivalid product")
    return coffeeArray


if __name__ == "__main__":
    main()