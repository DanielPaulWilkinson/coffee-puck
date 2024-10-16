from logging import Logger
import logging
from common.json_service import *
from common.driver_service import *
from common.coffee_scrape import coffee_scrape
from objects.coffee import coffee
import mysql.connector


logger = getMyLogger("__main__")

def main():
    coffees = []
    driver = Create()
    config = get_application_config()
    mydb = mysql.connector.connect(
        host="localhost",
        user="root",
        password="root",
        database="coffee"
    )

    mycursor = mydb.cursor()
    mycursor.execute("SELECT * FROM roasters where activeScrape = 1")
    roasters = mycursor.fetchall()
    mycursor.close()
    for roaster in roasters:
        logger.log(logging.INFO,"Processing %s", roaster[1])
        c = mydb.cursor()
        sql = "SELECT * FROM roasters_coffee_scrape WHERE roaster_id = %s"
        c.execute(sql, (roaster[0],))
        roasterSelectors = c.fetchall()
        coffees.extend(coffee_scrape(driver, roaster, roasterSelectors))
        logger.log(logging.INFO,"Processed %s", roaster[1])

    for c in coffees:
        insert_coffee(c, mydb)
        #add_coffee_to_json(c)

    mydb.commit()

def insert_coffee(c: coffee, db):
    mycursor = db.cursor()

    if c.product_notes:
        x = c.product_notes
    else:
        x = c.product_detail_notes

    sql = "INSERT INTO roasters_coffee_scrape_results (name, url, image, price, notes, altitude, roaster, first_scrape_date) VALUES (%s, %s, %s, %s, %s, %s, %s, %s)"
    mycursor.execute(sql,(c.product_name, c.product_url, c.product_image, c.price, x, c.product_detail_altitude, c.roaster_name, c.product_info_scrape_date))

if __name__ == "__main__":
    main()


