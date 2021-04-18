from pprint import pprint as pp

def awesome (price_items) :

  medians = [(float(x['High']) + float(x['Low'])) / 2 for x in price_items if x['Low'] != 'null' and x['High'] != 'null']

  if len(medians) < 5:
    return None 

  short_ma = sum(medians[len(medians) - 5 : len(medians)]) / 5
  long_ma = sum(medians) / len(medians)

  awesome_val = short_ma - long_ma

  return awesome_val
