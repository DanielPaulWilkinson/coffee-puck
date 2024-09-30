import json
import os

def get_application_config():
    with open("config.json", "r") as read_file:
        return json.load(read_file)["config"]

def get_roasters_config():
    with open("roasters.json", "r") as read_file:
        return json.load(read_file)["roasters"]

def get_config_data():
    config = get_application_config()
    if os.stat(config).st_size == 0:
        return ""
    else:
        with open(config, "r") as data:
            fileData = json.load(data)
            data.close()
            return fileData