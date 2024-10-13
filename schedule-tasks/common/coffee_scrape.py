from glob import escape
from turtle import update
from common.json_service import *
from common.driver_service import *
from selenium.webdriver.common.by import By
from common.logger import getMyLogger
from objects.coffee import coffee
logger = getMyLogger(__name__)


def determineBy(by: str):
    if by == "css_selector":
        return By.CSS_SELECTOR
    elif by == "css_name":
        return By.CLASS_NAME

def coffee_scrape(driver, roaster, selectors):
    coffeeArray = []
    driver = goto(driver, roaster[6])
    page_load(driver)

    cards = ""
    for i in selectors:
        if i[6] == "product_card":
            print(i)
            cards = get_elements(driver, determineBy(i[5]), i[3], "Cannot find grid-items")    

    product_name = ""


    for card in cards:
        for selector in selectors:
            match selector[6]:
                case "product_name":
                    product_name = get_text(
                        driver=card,
                        by=determineBy(selector[5]),
                        path=selector[3],
                        default_value=selector[4],
                        log_term="Could not find NAME info"
                    )
                    print(product_name)
                
    '''

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
            ).removeprefix('Regular price\n')

            image = get_element_attribute(
                driver=card,
                by=By.CSS_SELECTOR,
                path=roaster['coffee']['image'],
                log_term="unknown",
                attribute="src"
            )
       

            name = get_text(
                driver=card,
                by=By.CSS_SELECTOR,
                path=roaster['coffee']['name'],
                default_value="unknown",
                log_term="Could not find NAME info"
            )

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

            process=process,
            producers=producers,
            grown=grown,
            altitude=altitude,
            varieties=varieties,
            desc=desc,
            notes=notes,
            coffeeArray.append(coffee(
                name=name,
                productUrl=productUrl,
                image=image,
                price=price,
                notes=notes,
                roaster_name="Assembly Coffee"
            ))
        except:
            logger.log("cannot do this product", "ivalid product")
    '''
   
    return coffeeArray

