import os
from pprint import pprint as pp

import channel.donchian as donchian

RUN_DIR = os.path.dirname(os.path.realpath(__file__))

if (__name__ == '__main__') :
  
  ANALYZE_PARAMS = {
    'donchian_period': 50,
    'ma_period': 100,
    'ma_direction_lookback': 10,
    'lookback_correction_bars': 3,
    'donchian_channel_target' : 'high',
    'analyse_segments_len': 5,
    'from_ticker': RUN_DIR + '/historical_prices/3IN_2000-07-31_2020-07-26.json',
    'to_ticker': RUN_DIR +  '/historical_prices/RR_2000-07-21_2020-07-16.json',
    'target_range_from': '2004-08-05',
    'target_range_to': '2005-08-05',
    'match_steep_diff_max': 0.3,
    'match_duration_ratio_max': [0.8, 1.2],
    'match_positions_sequence': True,
    'match_rel_width_max': 1
  }

  ANALYZE_DONCHIAN = donchian.Donchian(ANALYZE_PARAMS)

  STATS_A = ANALYZE_DONCHIAN.load_instrument_stats(ANALYZE_PARAMS['from_ticker'])
  STATS_B = ANALYZE_DONCHIAN.load_instrument_stats(ANALYZE_PARAMS['to_ticker'])

  for stat_a in STATS_A:
    
    for stat_b in STATS_B:

      if stat_b['steep_tot'] == 0.0 :
        continue

      if stat_a['shape_concat'] != stat_b['shape_concat']:
        continue

      if stat_a['ma_segment_bias'] != stat_b['ma_segment_bias']:
        continue

      if abs(stat_a['steep_tot'] - stat_b['steep_tot']) > ANALYZE_PARAMS['match_steep_diff_max']:
        continue

      if abs(stat_a['width_rel'] - stat_b['width_rel']) > ANALYZE_PARAMS['match_rel_width_max']:
        continue
      
      duration_ratio = round(stat_a['duration_tot'] / stat_b['duration_tot'], 1)

      if duration_ratio  < ANALYZE_PARAMS['match_duration_ratio_max'][0] or duration_ratio > ANALYZE_PARAMS['match_duration_ratio_max'][1]:
        continue

      else:
        print('GOT MATCH >>>>>>')
        print('FROM ', ANALYZE_PARAMS['from_ticker'])
        print('TOOO ', ANALYZE_PARAMS['to_ticker'])
        pp(stat_a)
        pp(stat_b)