from candle.candle import st_candle

import numpy as np

ohlc = {
  'Close': "470.799988",
  'Date': "2016-07-08",
  'Donchian': {'High': 475, 'Low': 392.4},
  'High': "473.250000",
  'Low': "462.549988",
  'Ma': 0,
  'Open': "442.799988",
}

prev_ohlc = {
  'Close': "450.799988",
  'Date': "2016-07-08",
  'Donchian': {'High': 475, 'Low': 392.4},
  'High': "473.250000",
  'Low': "460.549988",
  'Ma': 0,
  'Open': "465.799988",
}

print(st_candle(ohlc, prev_ohlc))