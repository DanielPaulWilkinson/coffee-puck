import datetime
from logging import Logger
import logging
from common.json_service import *
from common.driver_service import *
from common.coffee_scrape import coffee_scrape
from objects.coffee import coffee
import mysql.connector
import time

logger = getMyLogger("__main__")

def main():
    start = time.time()

    config = get_application_config()
    debug = config['debug']
    output_method = config['output_method']

    logger.log(logging.INFO,"Starting up scrape...",)
    logger.log(logging.INFO,"Debug mode is set: %s", debug)
    logger.log(logging.INFO,"Output method is set to: %s", output_method)

    coffees = []

    if debug == 'true':
        coffees.append(coffee("test_coffee","test_url","from £19.00","test_image","Tastes like: Raspberry, Maple Syrup, Sticky","test_roaster","2000 MASL","washed","mr and mrs producer", "1, 2, 3, 4", "england", "unknown", datetime.datetime.now()))
        for c in coffees:
            print(sanitise_coffee(c).__dict__)
    else:
        db = mysql.connector.connect(
            host=config['db']['host'],
            user=config['db']['user'],
            password=config['db']['password'],
            database=config['db']['database']
        )

        driver = create()

        roasters = select_roasters(db)

        for roaster in roasters:
            logger.log(logging.INFO,"Processing %s", roaster[1])
            coffees.extend(coffee_scrape(driver, roaster, select_roaster_targets(db, roaster[0])))
            logger.log(logging.INFO,"Processed %s", roaster[1])
        
        total_removed = 0
        total_new = 0
        total_scraped = len(coffees)

        for c in coffees:
            if c.product_name == 'unknown' or 'subscription' in c.product_name.lower() or 'selection' in c.product_name.lower() or 'bundle' in c.product_name.lower() or is_duplicate(c, db):
                total_removed += 1
                continue
            c = sanitise_coffee(c)
            total_new += 1
            insert_coffee(c, db)
        
        end = time.time()
        time_elapsed = end - start
        insert_task_complete(db, total_new, total_removed, total_scraped, time_elapsed)
        db.commit()  

def insert_task_complete(db, total_new, total_removed, total_scraped, time_elapsed):
    c = db.cursor()
    sql = "INSERT INTO roasters_coffee_scrape_log (date_of_scrape, total_scraped, total_new, total_removed, time_elapsed) VALUES (%s, %s, %s, %s, %s)"
    c.execute(sql, (datetime.datetime.now(), total_scraped, total_new, total_removed, time_elapsed))

def select_roaster_targets(db, roaster_id):
    c = db.cursor()
    sql = "SELECT * FROM roasters_coffee_scrape WHERE roaster_id = %s"
    c.execute(sql, (roaster_id,))
    return c.fetchall()

def select_roasters(db):
    mycursor = db.cursor()
    mycursor.execute("SELECT * FROM roasters where activeScrape = 1")
    return mycursor.fetchall()

def sanitise_coffee(c: coffee):
    c.product_price = c.product_price.strip().removeprefix("from ").removeprefix('£').removeprefix('Regular price').removeprefix('From ').removeprefix('...')
    c.product_notes = c.product_notes.strip().removeprefix("Tastes Like: ").replace(" / ",", ").replace(" | ",", ").replace(" AND ", ", ")
    c.product_detail_notes = c.product_detail_notes.strip().removeprefix("Tastes Like: ").replace(" / ",", ").replace(" | ",", ").replace(" AND ", ", ")
    return c

def insert_coffee(c: coffee, db):
    mycursor = db.cursor()

    if c.product_notes != "unknown":
        x = c.product_notes
    else:
        x = c.product_detail_notes

    sql = "INSERT INTO roasters_coffee_scrape_results (name, url, image, price, notes, altitude, roaster, first_scrape_date) VALUES (%s, %s, %s, %s, %s, %s, %s, %s)"
    mycursor.execute(sql,(c.product_name, c.product_url, c.product_image, c.product_price, x, c.product_detail_altitude, c.roaster_name, c.product_info_scrape_date))

def is_duplicate(c: coffee, db):
    mycursor = db.cursor()
    mycursor.execute("SELECT * FROM roasters_coffee_scrape_results where name = %s",(c.product_name,))
    return mycursor.fetchall()

if __name__ == "__main__":
    main()


