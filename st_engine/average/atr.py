def simple_atr (price_items) :
  ranges = [item['High'] - item['Low'] for item in price_items]
  tot_ranges = sum(ranges)
  
  return tot_ranges / len(price_items)