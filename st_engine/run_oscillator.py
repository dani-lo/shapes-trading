import os
import sys 
import json

from pprint import pprint as pp

from oscillator.oscillator import Oscillator

from st_util.arrdiff import arrdiff
from st_util.range import perc_values_in_range
from st_util.approx import approx

if (__name__ == '__main__') :
  
  run_dir = os.path.dirname(os.path.realpath(__file__))

  # anal_params = json.loads(sys.argv[1])

  ANALYZE_PARAMS = {
    'oscillator_period': 33,
    'oscillator_approx': 10,
    'compare_segment_len': 40,
    'err_margin_items' : 2,
    'segment_step' : 5,
    'from_ticker': 'ITV',
    'to_ticker': 'GLEN',
    'from_ticker_file': 'ITV_2000-07-09_2020-07-04.json',
    'to_ticker_file': 'GLEN_2000-07-09_2020-07-04.json',
    'oscillator': 'awesome',
    'fpad_from': 100,
    'bpad_from': 100,
    'fpad_to': 100,
    'bpad_to': 100,
  }

  ANALYZE_PARAMS['from_ticker_file'] = run_dir + '/historical_prices/' + ANALYZE_PARAMS['from_ticker_file']  
  ANALYZE_PARAMS['to_ticker_file'] = run_dir + '/historical_prices/' + ANALYZE_PARAMS['to_ticker_file']

  stoch_osc = Oscillator(ANALYZE_PARAMS)

  anal_from = stoch_osc.get_oscillator(ANALYZE_PARAMS['from_ticker_file'])
  anal_to = stoch_osc.get_oscillator(ANALYZE_PARAMS['to_ticker_file'])

  # for x in anal_from:
  #   print(x['price']['Date'], x['awesome'])

  step = ANALYZE_PARAMS['segment_step']
  idx = 0
  idx_to = 0
  
  all_matches = []

  for item_from in anal_from[::step]:
    
    # print(item_from['awesome'], approx(item_from['awesome'], anal_params['oscillator_approx']))

    if idx >  ANALYZE_PARAMS['compare_segment_len'] + 1 and idx > ANALYZE_PARAMS['oscillator_period']:
      
      
      segment_from = anal_from[idx - ANALYZE_PARAMS['compare_segment_len'] : idx]
      segment_from_osc = [approx(x[ ANALYZE_PARAMS['oscillator']], ANALYZE_PARAMS['oscillator_approx']) for x in segment_from]

      # if not perc_values_in_range(segment_from_osc, 10, 20, 80):
      #   continue 

      idx_to = 0

      for item_to in anal_to[::step] :

        if idx_to >  ANALYZE_PARAMS['compare_segment_len'] + 1 and idx_to > ANALYZE_PARAMS['oscillator_period']:
          
          segment_to = anal_to[idx_to - ANALYZE_PARAMS['compare_segment_len'] : idx_to]
          segment_to_osc = [approx(x[ ANALYZE_PARAMS['oscillator']], ANALYZE_PARAMS['oscillator_approx']) for x in segment_to]
          
          seg_diff = arrdiff(segment_from_osc, segment_to_osc)
          
          if seg_diff < ANALYZE_PARAMS['err_margin_items']: 
            
            stat_a = {
              'begin': segment_from[0]['price']['Date'],
              'end': segment_from[len(segment_from) - 1]['price']['Date'],
              'ticker': ANALYZE_PARAMS['from_ticker']
            }
            stat_b = {
              'begin': segment_to[0]['price']['Date'],
              'end': segment_to[len(segment_from) - 1]['price']['Date'],
              'ticker': ANALYZE_PARAMS['to_ticker']
            }

            stat_a['ticker'] = ANALYZE_PARAMS['from_ticker']
            stat_b['ticker'] = ANALYZE_PARAMS['to_ticker']
            stat_a['fpad'] = ANALYZE_PARAMS['fpad_from']
            stat_a['bpad'] = ANALYZE_PARAMS['bpad_from']
            stat_b['fpad'] = ANALYZE_PARAMS['fpad_to']
            stat_b['bpad'] = ANALYZE_PARAMS['bpad_to']

            new_match = [
              stat_a,
              stat_b
            ]

            pp(stat_a)
            pp(stat_b)

            all_matches.append(new_match)
            
        idx_to = idx_to + step

    idx = idx + step

  print('TOT', len(all_matches))
  json.dump(all_matches, sys.stdout)
  sys.stdout.flush()
  
