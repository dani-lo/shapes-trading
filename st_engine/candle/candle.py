candle_shapes = {
  'HAMMER': 'hammer', 
  'SHOOTINGSTAR': 'shootingstar', 
  'DOJI': 'doji', 
  'BULLISH': 'bullish', 
  'BEARISH': 'bearish',
  'NONE': 'none'
}

def st_candle (ohcl_data, prev_ohcl_data):
  
  c_open = float(ohcl_data['Open'])
  c_low = float(ohcl_data['Low'])
  c_high = float(ohcl_data['High'])
  c_close = float(ohcl_data['Close'])

  prev_c_open = float(prev_ohcl_data['Open'])
  prev_c_low = float(prev_ohcl_data['Low'])
  prev_c_high = float(prev_ohcl_data['High'])
  prev_c_close = float(prev_ohcl_data['Close'])

  new_ohlc_data = ohcl_data.copy()

  c_direct = 'bull' if c_close > c_open else 'bear'
  prev_c_direct = 'bull' if prev_c_close > prev_c_open else 'bear'

  new_ohlc_data['direction'] = c_direct

  if c_direct == 'bull':
    new_ohlc_data['mid_body'] = c_open + ((c_close - c_open) / 2)
    new_ohlc_data['mid_upper_wick'] = c_close + ((c_high - c_close) / 2)
    new_ohlc_data['mid_lower_wick'] = c_low + ((c_open - c_low) / 2)
  else :
    new_ohlc_data['mid_body'] = c_close + ((c_open - c_close) / 2)
    new_ohlc_data['mid_upper_wick'] = c_open + ((c_high - c_open) / 2)
    new_ohlc_data['mid_lower_wick'] = c_low + ((c_close - c_low) / 2)

  if 'Donchian' in ohcl_data :
    c_bear_engulf = False
    c_bull_engulf = False

    if c_direct == 'bear' and prev_c_direct == 'bull' and c_open > prev_c_close and c_close < prev_c_open :
      c_bear_engulf = True

    if c_direct == 'bull' and prev_c_direct == 'bear' and c_open < prev_c_close and c_close > prev_c_open :
      c_bull_engulf = True

    d_high = float(ohcl_data['Donchian']['High'])
    d_low = float(ohcl_data['Donchian']['Low'])

    is_shooting = ( (c_low == c_close) and (c_high - c_open) > ((c_open - c_close) * 4)) or ( (c_low == c_open) and (c_high - c_close) > (c_close - c_open * 8) )
    is_hammer = (c_high == c_open and c_close - c_low > (c_open - c_close) * 4) or  (c_high == c_close and c_open - c_low > (c_close - c_open) * 4)
    
    upper_fourth_donch = d_high - ((d_high - d_low) / 4)
    lower_fourth_donch = d_low + ((d_high - d_low) / 4)

    is_bear_engulf = c_low < prev_c_low and c_high > prev_c_high and c_open > prev_c_close and c_close < prev_c_open
    is_bull_engulf = c_low < prev_c_low and c_high > prev_c_high  and c_open < prev_c_close and c_close > prev_c_open  
    if c_direct == 'bear'  and c_close > upper_fourth_donch and (is_bear_engulf or is_shooting):
      c_bear_engulf = True

    if c_direct == 'bull'  and c_close < lower_fourth_donch and (is_hammer or is_bull_engulf):
      c_bull_engulf = True

    new_ohlc_data['bear_engulf'] = c_bear_engulf
    new_ohlc_data['bull_engulf'] = c_bull_engulf

  candle_body = c_close -c_open

  if c_close < c_open :
    candle_body = c_open - c_close

  candle_wick_up = c_high - c_close

  if c_close < c_open :
    candle_wick_up = c_high - c_open

  candle_wick_down =  c_open - c_low

  if c_close < c_open :
    candle_wick_down = c_close - c_low


  new_ohlc_data['candle_shape'] = candle_shapes['NONE']

  if candle_wick_up > candle_body * 2 and candle_wick_down * 2 < candle_wick_up:
    new_ohlc_data['candle_shape'] = candle_shapes['SHOOTINGSTAR']
  
  elif candle_wick_down > candle_body * 2 and candle_wick_up * 2 < candle_wick_down:
    new_ohlc_data['candle_shape'] = candle_shapes['HAMMER']
  
  elif candle_wick_down > candle_body * 3 and candle_wick_up > candle_body * 2.5:
    new_ohlc_data['candle_shape'] = candle_shapes['DOJI']
  
  elif candle_body > candle_wick_up * 4 and candle_body > candle_wick_down * 4:
  
    if c_close > c_open:
      new_ohlc_data['candle_shape'] = candle_shapes['BULLISH']
    else:
      new_ohlc_data['candle_shape'] = candle_shapes['BEARISH']

  new_ohlc_data['DBG'] = {
    'body': candle_body,
    'wick_down': candle_wick_down,
    'wick_up': candle_wick_up,
  }

  return new_ohlc_data