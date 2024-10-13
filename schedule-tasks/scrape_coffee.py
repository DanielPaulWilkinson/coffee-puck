from common.json_service import *
from common.driver_service import *
from common.coffee_scrape import coffee_scrape
from objects.coffee import coffee
import mysql.connector

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
    mycursor.execute("SELECT * FROM roasters")
    roasters = mycursor.fetchall()
    mycursor.close()
    for roaster in roasters:
        c = mydb.cursor()
        sql = "SELECT * FROM roasters_coffee_scrape WHERE roaster_id = %s"
        c.execute(sql, (roaster[0],))
        roasterSelectors = c.fetchall()
        coffees.extend(coffee_scrape(driver, roaster, roasterSelectors))
    for c in coffees:
        add_coffee_to_json(c)

if __name__ == "__main__":
    main()