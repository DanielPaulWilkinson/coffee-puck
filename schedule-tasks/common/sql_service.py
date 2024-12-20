import datetime
from objects.coffee import coffee

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
    c.product_price = c.product_price.strip().replace("from ","").replace('£',"").replace('Regular price',"").replace('From ',"").replace('...',"").replace(" ", "").replace("—", "")
    c.product_notes = c.product_notes.strip().removeprefix("Tastes Like: ").replace(" / ",", ").replace(" | ",", ").replace(" AND ", ", ")
    c.product_detail_notes = c.product_detail_notes.strip().removeprefix("Tastes Like: ").replace(" / ",", ").replace(" | ",", ").replace(" AND ", ", ")
    return c

def insert_coffee(c: coffee, db):
    mycursor = db.cursor()

    if c.product_notes != "unknown":
        x = c.product_notes
    else:
        x = c.product_detail_notes

    sql = "INSERT INTO roasters_coffee_scrape_results (name, url, image, price, notes, altitude, origin, roaster, first_scrape_date, producers, varieties, process) VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)"
    mycursor.execute(sql,(c.product_name, c.product_url, c.product_image, c.product_price, x, c.product_detail_altitude, c.product_detail_origin, c.roaster_name, c.product_info_scrape_date, c.product_detail_producers, c.product_detail_varieties, c.product_detail_process))

def is_duplicate(c: coffee, db):
    mycursor = db.cursor()
    mycursor.execute("SELECT * FROM roasters_coffee_scrape_results where name = %s",(c.product_name,))
    return mycursor.fetchall()

def should_remove(c: coffee, allCoffee):
    notFound = True
    for a in allCoffee:
        if a[1] == c.product_name:
            notFound = False
    return notFound

def getAll(db):
    mycursor = db.cursor()
    mycursor.execute("select * from coffee")
    return mycursor.fetchall()

def remove_product(db, c: coffee):
    mycursor = db.cursor()
    mycursor.execute("DELETE FROM roasters_coffee_scrape_results where name = %s",(c.product_name,))
    return mycursor.fetchall()