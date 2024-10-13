import json
import os
from objects.coffee import coffee

def get_application_config():
    with open("data/config.json", "r") as read_file:
        return json.load(read_file)["config"]

def get_roasters_config():
    with open("data/roasters.json", "r") as read_file:
        return json.load(read_file)["roasters"]


def add_coffee_to_json(c: coffee):
    path = "data/coffee.json"
    create_base_json = {"coffee": []}
    if os.stat(path).st_size == 0:
        with open(path, "w",  encoding="utf8") as wf:
            json.dump(create_base_json, wf, indent=4, separators=(",", ": "))
            wf.close()
    try:
        data = []
        with open(path, "r") as rf:
            data = json.load(rf)
            rf.close()
        with open(path, "w", encoding="utf8") as wf:
            data["coffee"].append(c.__dict__)
            json.dump(data, wf, indent=4, separators=(",", ": "))
            wf.close()
    except Exception as inst:
        print(inst)
