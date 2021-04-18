def perc_values_in_range (vals, perc, min, max) : 
  vals_in_range = [v for v in vals if v > min and v < max]

  return len(vals_in_range) > (len(vals) / 100 * 20) 