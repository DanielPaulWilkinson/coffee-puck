import datetime
from logging import Logger
import logging
from common.json_service import *
from common.driver_service import *
from common.coffee_scrape import coffee_scrape
from objects.coffee import coffee
from common.sql_service import *
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
        allCoffee = getAll(db)

        for c in coffees:
            if c.product_name == 'unknown' or 'subscription' in c.product_name.lower() or 'selection' in c.product_name.lower() or 'bundle' in c.product_name.lower() or is_duplicate(c, db):
                total_removed += 1
                continue
            if should_remove(c, allCoffee):
                remove_product(db, c)
                total_removed += 1
            c = sanitise_coffee(c)
            total_new += 1

            insert_coffee(c, db)
        
        end = time.time()
        time_elapsed = end - start
        insert_task_complete(db, total_new, total_removed, total_scraped, time_elapsed)
        db.commit()  

if __name__ == "__main__":
    main()


