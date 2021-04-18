import datetime
import sys 
import json
import os

from pprint import pprint as pp

import channel.donchian as donchian

def to_date(str_time):
  return datetime.datetime.strptime(str_time, '%Y-%m-%d')

if (__name__ == '__main__') :
  
  run_dir = os.path.dirname(os.path.realpath(__file__))

  ANALYZE_PARAMS = json.loads(sys.argv[1])

  ANALYZE_PARAMS['match_rel_width_max'] = float(ANALYZE_PARAMS['match_rel_width_max'])
  ANALYZE_PARAMS['match_steep_diff_max'] = float(ANALYZE_PARAMS['match_steep_diff_max'])
  ANALYZE_PARAMS['match_duration_ratio_max'][0] = float(ANALYZE_PARAMS['match_duration_ratio_max'][0])
  ANALYZE_PARAMS['match_duration_ratio_max'][1] = float(ANALYZE_PARAMS['match_duration_ratio_max'][1])
  ANALYZE_PARAMS['final_quadrant_tolerance'] = float(ANALYZE_PARAMS['final_quadrant_tolerance'])

  ANALYZE_PARAMS['from_ticker_file'] = run_dir + '/historical_prices/' + ANALYZE_PARAMS['from_ticker_file']  
  ANALYZE_PARAMS['to_ticker_file'] = run_dir + '/historical_prices/' + ANALYZE_PARAMS['to_ticker_file']

  analyse_donchian = donchian.Donchian(ANALYZE_PARAMS)

  stats_a = analyse_donchian.load_instrument_stats(ANALYZE_PARAMS['from_ticker_file'])
  stats_b = analyse_donchian.load_instrument_stats(ANALYZE_PARAMS['to_ticker_file'])

  all_matches = []

  analyse_from_range = [
    to_date(ANALYZE_PARAMS['target_range_from']),
    to_date(ANALYZE_PARAMS['target_range_to'])
  ]

  for stat_a in stats_a:
    
    stat_a_datetime = to_date(stat_a['begin'])

    if stat_a_datetime < analyse_from_range[0] or stat_a_datetime > analyse_from_range[1] :
      continue 
   
    for stat_b in stats_b:

      if ANALYZE_PARAMS['from_ticker'] == ANALYZE_PARAMS['to_ticker'] and stat_b['begin'] == stat_a['begin'] :
        continue

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
      
      if abs(float(stat_b['final_quadrant']) - float(stat_a['final_quadrant'])) > ANALYZE_PARAMS['final_quadrant_tolerance']:
        continue

      if abs(float(stat_b['start_quadrant']) - float(stat_a['start_quadrant'])) > ANALYZE_PARAMS['start_quadrant_tolerance']:
        continue

      duration_ratio = round(stat_a['duration_tot'] / stat_b['duration_tot'], 1)


      if duration_ratio  < ANALYZE_PARAMS['match_duration_ratio_max'][0] or duration_ratio > ANALYZE_PARAMS['match_duration_ratio_max'][1]:
        continue

      new_match = [
        stat_a,
        stat_b
      ]

      stat_a['ticker'] = ANALYZE_PARAMS['from_ticker']
      stat_b['ticker'] = ANALYZE_PARAMS['to_ticker']
      stat_a['fpad'] = ANALYZE_PARAMS['fpad_from']
      stat_a['bpad'] = ANALYZE_PARAMS['bpad_from']
      stat_b['fpad'] = ANALYZE_PARAMS['fpad_to']
      stat_b['bpad'] = ANALYZE_PARAMS['bpad_to']

      all_matches.append(new_match)

  json.dump(all_matches, sys.stdout)
  sys.stdout.flush()