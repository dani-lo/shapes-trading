from pprint import pprint as pp

def stochastic (price_items) :

  last_close = price_items[len(price_items) - 1]['Close']

  if (last_close == 'null') :
    return None 

  lows = [float(x['Low']) for x in price_items if x['Low'] != 'null']
  highs = [float(x['High']) for x in price_items if x['High'] != 'null']

  if len(highs) == 0 or len(lows) == 0 :
    return None 

  lowest = min(lows)
  highest = max(highs)

  if (highest - lowest) == 0 :
    return None 

  stoch =  ((float(last_close) - lowest) / (highest - lowest)) * 100
  
  return stoch