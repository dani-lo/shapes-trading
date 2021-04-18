from datetime import datetime, timedelta
import sys 
import json
import os
from pprint import pprint as pp

from candle.candle import st_candle

import channel.donchian as donchian

def extract_price_series_item (donchian_item) :
  return donchian_item[8]

def to_date(str_time):
  return datetime.strptime(str_time, '%Y-%m-%d')

def to_date_to(str_time, fpad):

  to_date = datetime.strptime(str_time, '%Y-%m-%d')
  padded_date_to = to_date + timedelta(fpad / 5 * 7)

  return padded_date_to #datetime.strftime(padded_date_to, '%Y-%m-%d')

def to_date_from(str_time, bpad):

  from_date = datetime.strptime(str_time, '%Y-%m-%d')
  padded_date_from = from_date - timedelta(bpad / 5 * 7)

  return padded_date_from # datetime.strftime(padded_date_from, '%Y-%m-%d')

run_dir = os.path.dirname(os.path.realpath(__file__))

anal_params = json.loads(sys.argv[1])

# anal_params = {
#   'bpad': 40,
#   'fpad': 40,
#   'donchian_period': 33,
#   'ma_period': 100,
#   'ma_direction_lookback': 10,
#   'lookback_correction_bars': 3,
#   'donchian_channel_target': 'high',
#   'anal_segments_len': 4,
#   'from_ticker': '888',
#   'to_ticker': [
#     'AGR',  'AVST', 'BAB',  'BDEV',
#     'BNKR', 'CAPC', 'CCR',  'CINE',
#     'DC',   'DOM',  'ECM',  'EQN',
#     'FXPO', 'GCP',  'GLEN', 'HMSO',
#     'HOC',  'HWDN', 'INF',  'INVP',
#     'JD',   'KAZ',  'OCDO'
#   ],
#   'target_range_from': '2020-04-21',
#   'target_range_to': '2020-06-09',
#   'price_series_ticker_file': '888_2000-07-09_2020-07-04.json',
#   'match_steep_diff_max': 0.5,
#   'match_duration_ratio_max': [ 0.8, 1.2 ],
#   'match_positions_sequence': True,
#   'match_rel_width_max': '1',
#   'final_quadrant_tolerance': 0.2
# }

anal_params['price_series_ticker_file'] = run_dir + '/historical_prices/' + anal_params['price_series_ticker_file']  

donchian = donchian.Donchian(anal_params)
donchian_series = donchian.get_donchian(anal_params['price_series_ticker_file'])

anal_from_range = [
    to_date(anal_params['target_range_from']),
    to_date(anal_params['target_range_to'])
]

str_date_from = to_date_from(anal_params['target_range_from'], anal_params['bpad'])
str_date_to = to_date_to(anal_params['target_range_to'], anal_params['fpad'])

price_series = []

prev_ohlc = None 

for item in donchian_series :
  
  ohlc = item[8]

  item_datetime_str = to_date(item[0])

  if item_datetime_str < str_date_from or item_datetime_str > str_date_to:
      continue 
  else :
    if prev_ohlc != None:
      price_series.append(st_candle(ohlc, prev_ohlc))
    else :
      price_series.append(ohlc)

  prev_ohlc = ohlc.copy()

json.dump(price_series, sys.stdout)
sys.stdout.flush()