from pprint import pprint as pp
import csv
import json

def get_json(json_fname) :
  with open(json_fname) as f:
    data = json.load(f)

    for price_item in data:
      yield price_item 

def get_csv(csv_fname):
  
  with open(csv_fname, "r", encoding="latin-1") as price_records:
    for price_record in csv.reader(price_records):

      ascii_record = (x.encode('ascii', errors='replace').decode() for x in price_record)
    
      yield ascii_record

def matrix_mov_avg(prices_arr, period_v):

  total = 0
  skipped = 0

  for row in prices_arr:
    p_open = row[1]
    p_close = row[4]
    p_high = row[2]
    p_low = row[3]

    if p_open is None or p_open == 'null':
      skipped = skipped + 1
      continue
    else:
      val = (float(p_low) + float(p_close) + float(p_open) + float(p_high)) / 4
 
      total += float(val)

  return total / (period_v - skipped)

def how_relative_wide (width_seq, start_price, end_price) :

  avg_w = sum(width_seq) / len(width_seq)
  avg_p = (start_price + end_price) / 2

  try:
    return avg_p / avg_w
  except ZeroDivisionError:
    return 0

def close_quadrant (item) :

  item_close = item['Close']
  item_donchian_high = item['Donchian']['High']
  item_donchian_low = item['Donchian']['Low']
  
  donchian_diff = (float(item_donchian_high) - float(item_donchian_low))
  pos = float(item_close) - float(item_donchian_low)

  try:
    return round(pos / donchian_diff, 1)
  except ZeroDivisionError:
    return 0


def position_sequence_match (seq_a, seq_b) : 
  seq_a_max = max(seq_a)
  seq_b_max = max(seq_b)

  seq_a_max_i = seq_a.index(seq_a_max)
  seq_b_max_i = seq_b.index(seq_b_max)

  seq_a_min = min(seq_a)
  seq_b_min = min(seq_b)

  seq_a_min_i = seq_a.index(seq_a_min)
  seq_b_min_i = seq_b.index(seq_b_min)

  return seq_a_max_i == seq_b_max_i and seq_a_min_i == seq_b_min_i

def how_steep (start, end, direction, steps) :
  if direction == 'FLAT': 
    return 0

  difference = 0

  if direction == 'UPPP':
    difference = (end - start)
  elif direction == 'DOWN':
    difference = (start - end)
  
  return ((difference / start) * 100) / steps

###
# class Donchian
# Donchian channels indicator
###
class Donchian:

  def __init__ (self, settings):
    self.settings = settings

  def get_donchian (self, json_fname) :
    
    prices = []

    # iter_price = iter(get_csv(csv_fname))
    iter_price = iter(get_json(json_fname))

    #row = next(iter_price)  # Skipping the column names

    # for row in iter_price:
    #   prices.append(list(row))

    donchian = []

    highs = []
    lows = []
    mid = []

    i = 0

    donchian_period = self.settings['donchian_period']
    ma_period = self.settings['ma_period']
    ma_direction_lookback = self.settings['ma_direction_lookback']
    lookback = self.settings['lookback_correction_bars']

    ma_val = 0
    ma_bias = ''
    
    for price in iter_price :

      try :
        highs.append(round(float(price['High']), 1))
        lows.append(round(float(price['Low']), 1))
        mid.append(round(float(price['High']), 1) - round(float(price['Low']), 1))
      except Exception:
        i += 1
        continue

      if i > ma_period :
        arr_prices = prices[i - ma_period: i]
        ma_val = matrix_mov_avg(arr_prices, ma_period)

      
      if i > ma_period + ma_direction_lookback and len(donchian) > ma_direction_lookback:

        diff = ma_val - donchian[-ma_direction_lookback][6]

        if diff < 0 and abs(diff) > ma_val / 80:
          ma_bias = 'MA_DOWN'
        elif  diff > 0 and diff > ma_val / 80:
          ma_bias = 'MA_UPPP'
        else:
          ma_bias = 'MA_FLAT'

      if i > donchian_period :
        donchian_low =  min(lows[-donchian_period:])
        donchian_high = max(highs[-donchian_period:])

        shape_low = ''
        shape_high = ''

        if len(donchian) > 0 :

          last_donchian = donchian[len(donchian) - 1]

          if donchian_low == last_donchian[1] :
            shape_low = 'FLAT'
          elif donchian_low > last_donchian[1] :
            shape_low = 'UPPP'
          elif donchian_low < last_donchian[1] :
            shape_low = 'DOWN'

          if donchian_high == last_donchian[2] :
            shape_high = 'FLAT'
          elif donchian_high > last_donchian[2] :
            shape_high = 'UPPP'
          elif donchian_high < last_donchian[2] :
            shape_high = 'DOWN'
        
        channel_w = donchian_high - donchian_low

        donchian.append([
          price['Date'],
          donchian_low, 
          donchian_high,
          shape_low,
          shape_high,
          channel_w,
          ma_val,
          ma_bias,
          {
            'Date': price['Date'],
            'High': price['High'],
            'Low': price['Low'],
            'Open': price['Open'],
            'Close': price['Close'],
            'Ma': ma_val,
            'Donchian' : {
              'High': donchian_high,
              'Low': donchian_low
            }
          }
          
        ])

      i += 1

    d = 0

    def correct_lookback_small_shapes(current_shape, high_or_low_shape_index, high_or_low_price_index, start_lookback_index):
      
      shape_len = 0

      idx =  start_lookback_index

      start_price = donchian[idx][high_or_low_price_index]
      end_price = 0

      while idx > 0 :
        item = donchian[idx]

        if item[high_or_low_shape_index] == current_shape:  
          shape_len += 1
        else :
          end_price = donchian[idx][high_or_low_price_index]
          break

        idx = idx - 1

      
      if shape_len <= lookback and abs(start_price - end_price) < start_price / 100:

        change_to_shape = donchian[start_lookback_index + 1][high_or_low_shape_index] 

        idx =  start_lookback_index

        while idx > 0 :
          item = donchian[idx]

          if item[high_or_low_shape_index] == current_shape:
            
            item[high_or_low_shape_index] = change_to_shape
          else:
            break

          idx = idx - 1

      return idx

    donchian_shape_index_high = 4
    donchian_shape_index_low = 3

    donchian_price_index_high = 2
    donchian_price_index_low = 1

    d = len(donchian) - 1

    while d > 0:

      if d > lookback and d < len(donchian) - 2:
        current_donchian = donchian[d]

        shape = current_donchian[donchian_shape_index_high]
          
        new_d = correct_lookback_small_shapes(shape, donchian_shape_index_high, donchian_price_index_high, d)

        if d == new_d:
          d = d -1
        else:
          d = new_d
      else:
        d = d - 1

    d = len(donchian) - 1

    while d > 0:
      if d > lookback and d < len(donchian) - 2:
        current_donchian = donchian[d]

        shape = current_donchian[donchian_shape_index_low]

        new_d = correct_lookback_small_shapes(shape, donchian_shape_index_low, donchian_price_index_low, d)

        if d == new_d:
          d = d -1
        else:
          d = new_d

      else:
        d = d - 1
    
    return donchian

  def donchian_anal_shape (self, csv_source, donchian_shape_tgt) :
  
    donchian_shape_index = 4
    donchian_price_index = 2

    if donchian_shape_tgt == 'low' :
      donchian_shape_index = 3
      donchian_price_index = 1

    adjusted_donchian = self.get_donchian(csv_source)

    anal_donchian = []

    last_item = False

    for item in adjusted_donchian:
      shape = item[donchian_shape_index]

      anal_len = len(anal_donchian)

      if anal_len == 0 and shape != 'FLAT':
        continue

      if anal_len == 0 or anal_donchian[anal_len - 1]['shape'] != shape :

        anal_donchian.append({
          'begin': item[0],
          'duration': 1,
          'price_from': item[donchian_price_index],
          'price_to': item[donchian_price_index],
          'shape': shape,
          'width_seq': [item[5]],
          'ma_seq': [item[6]],
          'end': '',
          'ma_anal_bias': item[7],
          'final_quadrant': '100',
          'start_quadrant': close_quadrant(item[8])
        })

      else :
        anal_donchian[anal_len - 1]['duration'] = anal_donchian[anal_len - 1].get('duration') + 1 
        anal_donchian[anal_len - 1]['price_to'] = item[donchian_price_index]
        anal_donchian[anal_len - 1]['width_seq'].append(round(item[5], 1))
        anal_donchian[anal_len - 1]['ma_seq'].append(item[6])

        if item[7] != anal_donchian[anal_len - 1]['ma_anal_bias']:
          anal_donchian[anal_len - 1]['ma_anal_bias'] = 'MA_FLAT'
    
    for item in anal_donchian:
      steepness = how_steep(
        item['price_from'], 
        item['price_to'], 
        item['shape'], 
        item['duration'])

      width_rel = how_relative_wide(item['width_seq'], item['price_from'], item['price_to'])

      item['steep'] = round(steepness, 1)
      item['width_rel'] = round(width_rel, 1)

      item_idx = anal_donchian.index(item)

      if item_idx + 1 < len(anal_donchian):
        item['end'] = anal_donchian[item_idx + 1]['begin']
        quadrant_item_el = filter(lambda price_point: price_point[0] == item['end'] , adjusted_donchian)
        quadrant_item_el = list(quadrant_item_el)[0]
        quadrant_item = quadrant_item_el[8]

        item['final_quadrant'] = close_quadrant(quadrant_item)

    return anal_donchian


  def segment_stats (self, segment):
    last_seg = segment[len(segment) - 1]
    first_seg = segment[0]
    stat = {
      'begin': segment[0]['begin'],
      'end': last_seg['end'],
      'final_quadrant': last_seg['final_quadrant'],
      'start_quadrant': first_seg['start_quadrant'],
      'shape_concat': '',
      'steep_seq': [],
      'steep_tot': 0,
      'duration_seq': [],
      'duration_tot': 0,
      'width_rel': [],
      'ma_segment_bias': segment[0]['ma_anal_bias']
    }
    
    for item in segment:
      stat['duration_seq'].append(item['duration'])
      stat['duration_tot'] = stat['duration_tot'] + item['duration']
      stat['shape_concat'] = stat['shape_concat'] + '-' +item['shape']
      stat['steep_seq'].append(item['steep'])
      if item['shape'] == 'UPPP':
        stat['steep_tot'] = round(stat['steep_tot'] + item['steep'], 1)
      elif item['shape'] == 'DOWN':
        stat['steep_tot'] = round(stat['steep_tot'] - item['steep'], 1)

      try:
        if item['ma_anal_bias'] != stat['ma_segment_bias']:
          stat['ma_segment_bias'] = 'MA_FLAT'
      except AttributeError:
        stat['ma_segment_bias'] = 'MA_FLAT'
      
      stat['width_rel'].append(item['width_rel'])
    
    stat['width_rel'] = sum(stat['width_rel']) / len(stat['width_rel'])

    return stat

  def anal_segment (self, donchian_anal, start_item, segment_len):
    start_index = donchian_anal.index(start_item)
    segment = donchian_anal[start_index : start_index + segment_len]

    return segment

  def load_instrument_stats (self, ticker) :
    file = ticker
    stat_pace = self.settings['analyse_segments_len']
    low_or_high = self.settings['donchian_channel_target']

    ss = self.donchian_anal_shape(file, low_or_high)
   
    instrument_stats = []

    idx_stat = 0
    
    while idx_stat < len(ss) - 1 :
      item = ss[idx_stat]
      segment = self.anal_segment(ss, item, stat_pace)
      stat = self.segment_stats(segment)
      idx_stat = idx_stat + stat_pace
  
      instrument_stats.append(stat)

    return instrument_stats

  def load_price_series (self, ticker) :
    ps = self.get_donchian(ticker)

    return ps

