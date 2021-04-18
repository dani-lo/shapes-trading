import json

def get_json(json_fname) :
  with open(json_fname) as f:
    data = json.load(f)

    for price_item in data:
      yield price_item 