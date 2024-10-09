from common.json_service import *
from common.driver_service import *
from brands.rave_coffee.rave_coffee_scrape import rave_coffee_scraper
from brands.squre_mile.squaremile_coffee_scrape import squaremile_coffee_scraper
from brands.assembly_coffee.assembly_coffee_scrape import assembly_coffee_scraper
from brands.origin.origin_coffee_scrape import origin_coffee_scraper
from brands.crankhouse.crankhouse_coffee_scrape import crankhouse_coffee_scraper
from brands import *
from objects.coffee import coffee

def main():
    config = get_application_config()
    coffees = []

    if config['debug'] == 'true':
        x = coffee(name='hello', productUrl='url', price='100', image='unknown')
        coffees.append(x)       
    else:
        roasters = get_roasters_config()
        driver = Create()
        for roaster in roasters:
            if roaster['name'] == "rave":
                coffees.extend(rave_coffee_scraper(driver, roaster))
            if roaster['name'] == "squaremile":
                coffees.extend(squaremile_coffee_scraper(driver, roaster))
            if roaster['name'] == "assembly":
                coffees.extend(assembly_coffee_scraper(driver, roaster))
            if roaster['name'] == "origin":
                coffees.extend(origin_coffee_scraper(driver, roaster))
            if roaster['name'] == "crankhouse":
                coffees.extend(crankhouse_coffee_scraper(driver, roaster)) 
    for c in coffees:
        add_coffee_to_json(c)

if __name__ == "__main__":
    main()