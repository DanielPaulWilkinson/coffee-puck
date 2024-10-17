import datetime
from glob import escape
from turtle import update
from common.json_service import *
from common.driver_service import *
from selenium.webdriver.common.by import By
from common.logger import getMyLogger
from objects.coffee import coffee
logger = getMyLogger(__name__)


def determine_by(by: str):
    if by == "css_selector":
        return By.CSS_SELECTOR
    elif by == "css_name":
        return By.CLASS_NAME

def get_product_cards(driver, selectors):
    for i in selectors:
        if i[6] == "product_card":
            return get_elements(driver, determine_by(i[5]), i[3], "Cannot find grid-items")    

def coffee_scrape(driver, roaster, selectors):
    coffeeArray = []
    class product: pass

    driver = goto(driver, roaster[6])
    page_load(driver)

    cards = get_product_cards(driver, selectors)

    for card in cards:
        for selector in selectors:
            match selector[6]:
                case "product_name" | "product_notes" | "product_price":
                    setattr(product, selector[6], get_text(
                        driver=card,
                        by=determine_by(selector[5]),
                        path=selector[3],
                        default_value=selector[4],
                        log_term="Could not find NAME info)")
                    )
                case "product_url":
                   setattr(product, selector[6], get_element_attribute(
                        driver=card,
                        by=determine_by(selector[5]),
                        log_term="",
                        path=selector[3],
                        attribute="href"))
                case "product_image":
                   setattr(product, selector[6], get_element_attribute(
                        driver=card,
                        by=determine_by(selector[5]),
                        log_term="",
                        path=selector[3],
                        attribute="src"))

        coffeeArray.append(coffee(
            product_name=product.product_name,
            product_url=product.product_url,
            product_image=product.product_image,
            product_price=product.product_price,
            product_notes=product.product_notes,
            product_detail_altitude="",
            roaster_name=roaster[1],
            product_detail_process="",
            product_detail_producers="",
            product_detail_varieties="",
            product_detail_origin = "",
            product_detail_notes="",
            product_info_scrape_date=datetime.datetime.now()
        ))

    if roaster[9] == 1:
        coffeeArray = get_product_page_information(driver, roaster, selectors, coffeeArray)

    return coffeeArray


def get_product_page_information(driver, roaster, selectors, coffeeArray):
    for coffee in coffeeArray:
        productPage = goto(driver, coffee.product_url)
        page_load(productPage)
        for selector in selectors:
            match selector[6]:
                case "product_detail_process" | "product_detail_producers" | "product_detail_varieties" | "product_detail_altitude" | "product_detail_origin" | "product_detail_notes":
                    setattr(coffee, selector[6], get_text(
                        driver=productPage,
                        by=determine_by(selector[5]),
                        path=selector[3],
                        default_value=selector[4],
                        log_term="Could not find")
                    )

    return coffeeArray

