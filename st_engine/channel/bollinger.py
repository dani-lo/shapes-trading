import math

def bollinger_band (prices, st_multi) :
  close_prices        = [p['Close'] for p in prices]
  period              = len(close_prices)
  ma                  = sum(close_prices) / period
  variance            = sum([math.pow(x - ma, 2) for x in close_prices]) 
  standard_deviation  = math.sqrt(variance / period)

  return {
    'upper': ma + (st_multi * standard_deviation),
    'lower': ma - (st_multi * standard_deviation)
  }