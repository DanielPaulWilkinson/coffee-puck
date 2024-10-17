import json

class coffee:
    def __init__(self,
                 product_name,
                 product_url,
                 product_price,
                 product_image,
                 product_notes,
                 roaster_name,
                 product_detail_altitude,
                 product_detail_process,
                 product_detail_producers,
                 product_detail_varieties,
                 product_detail_origin,
                 product_detail_notes,
                 product_info_scrape_date):
        self.product_name = product_name
        self.product_url = product_url
        self.product_price = product_price
        self.product_image = product_image
        self.roaster_name = roaster_name
        self.product_notes = product_notes
        self.product_detail_altitude = product_detail_altitude
        self.product_info_scrape_date = product_info_scrape_date 
        self.product_detail_process = product_detail_process
        self.product_detail_producers = product_detail_producers
        self.product_detail_varieties = product_detail_varieties
        self.product_detail_origin = product_detail_origin
        self.product_detail_notes = product_detail_notes
 