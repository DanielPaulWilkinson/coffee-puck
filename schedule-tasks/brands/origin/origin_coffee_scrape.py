from glob import escape
from turtle import update
from common.json_service import *
from common.driver_service import *
from selenium.webdriver.common.by import By
from common.logger import getMyLogger
from objects.coffee import coffee
logger = getMyLogger(__name__)

def origin_coffee_scraper(driver, roaster):
    coffeeArray = []
    driver = goto(driver, roaster["url"])
    page_load(driver)
    cards = get_elements(driver, By.CLASS_NAME, roaster['coffee']['cards'], "Cannot find grid-items")    
    for card in cards:
        try:
            productUrl = get_element_attribute(
                card,
                By.CSS_SELECTOR,
                roaster['coffee']['url'],
                "unknown",
                "href"
            )

            notes = get_text(
                driver=card,
                by=By.CLASS_NAME,
                path=roaster['coffee']['notes'],
                default_value="unknown",
                log_term="Could not find NOTES info"
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
                by=By.CSS_SELECTOR,
                path=roaster['coffee']['image'],
                log_term="unknown",
                attribute="src"
            )
       

            name = get_text(
                driver=card,
                by=By.CLASS_NAME,
                path=roaster['coffee']['name'],
                default_value="unknown",
                log_term="Could not find NAME info"
            )

            '''
            if productUrl != "unknown":
                productPage = goto(driver, productUrl)
                page_load(productPage)

                process = get_text(
                    driver=productPage,
                    by=By.CSS_SELECTOR,
                    path="section.product-origin.relative.flex.space-between.gap-medium > div.origin-table > div.origin-table-data > div:nth-child(1) > div > p",
                    default_value="unknown",
                    log_term="Could not find PROCESS info"
                )

                producers = get_text(
                    driver=productPage,
                    by=By.CSS_SELECTOR,
                    path="section.product-origin.relative.flex.space-between.gap-medium > div.origin-table > div.origin-table-data > div:nth-child(2) > div > p",
                    default_value="unknown",
                    log_term="Could not find PROCESS info"
                )
                
                grown = get_text(
                    driver=productPage,
                    by=By.CSS_SELECTOR,
                    path="section.product-origin.relative.flex.space-between.gap-medium > div.origin-table > div.origin-table-data > div:nth-child(3) > div > p",
                    default_value="unknown",
                    log_term="Could not find PROCESS info"
                )

                altitude = get_text(
                    driver=productPage,
                    by=By.CSS_SELECTOR,
                    path="section.product-origin.relative.flex.space-between.gap-medium > div.origin-table > div.origin-table-data > div:nth-child(4) > div > p",
                    default_value="unknown",
                    log_term="Could not find PROCESS info"
                )

                varieties = get_text(
                    driver=productPage,
                    by=By.CSS_SELECTOR,
                    path="section.product-origin.relative.flex.space-between.gap-medium > div.origin-table > div.origin-table-data > div:nth-child(5) > div > p",
                    default_value="unknown",
                    log_term="Could not find PROCESS info"
                )

                desc = get_text(
                    driver=productPage,
                    by=By.CSS_SELECTOR,
                    path="section.product-origin.relative.flex.space-between.gap-medium > div.origin-table > div.table-main-content",
                    default_value="unknown",
                    log_term="Could not find PROCESS info"
                )
            '''

            '''
            process=process,
            producers=producers,
            grown=grown,
            altitude=altitude,
            varieties=varieties,
            desc=desc,
                            notes=notes,
            '''
            coffeeArray.append(coffee(
                name=name,
                productUrl=productUrl,
                image=image,
                price=price,
                notes=notes,
                roaster_name="Origin Coffee"
            ))
        except:
            logger.log("cannot do this product", "ivalid product")
    return coffeeArray

