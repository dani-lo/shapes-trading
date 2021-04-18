from pprint import pprint as pp

from st_util.st_json import get_json

from oscillator.formulas.stochastic import stochastic
from oscillator.formulas.awesome import awesome

import math 

class Oscillator :

  def __init__ (self, settings):
    self.settings = settings

  def get_oscillator (self, json_fname) :
    prices = []
    last_stoch_val = None 
    last_awe_val = None 

    iter_price = iter(get_json(json_fname))

    oscillator = []
    price_items = []

    i = 0

    oscillator_period = self.settings['oscillator_period']
    
    for price in iter_price :

      price_items.append(price)

      if i > oscillator_period + 1 :
        
        price_chunk = price_items[i - oscillator_period : i + 1]

        stoch_val = stochastic(price_chunk)
        awe_val = awesome(price_chunk)
        
        if stoch_val is  None :
          stoch_val = last_stoch_val 
        else :
          last_stoch_val = stoch_val
        
        if awe_val is None:
          awe_val = last_awe_val 
        else :
          last_awe_val = awe_val

        oscillator.append({
          'price': price,
          'stochastic' : stoch_val,
          'awesome': awe_val
        })

      i = i + 1
    
    return oscillator
    

      
       