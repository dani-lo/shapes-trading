from datetime import datetime, timedelta
from pathlib import Path

import sys 
import json
import re
import os

from st_util.grab import curl_data


tickers = sys.argv[1:]
 

end_day = datetime.today()
str_end_day = end_day.strftime("%Y-%m-%d")

start_day = datetime.today() - timedelta(days=20 * 365)
str_start_day = start_day.strftime("%Y-%m-%d")

base_dir = Path(__file__).resolve().parents[0]
data_folder = 'historical_prices'
price_data_dir = f'{base_dir}/{data_folder}'

def delete_existing_ticker_file (ticker) :
  reg_exp = re.compile(ticker)

  for dfile in os.listdir(price_data_dir):
    
    if reg_exp.search(dfile) is not None:
        os.remove(price_data_dir + '/' + dfile)

res  = {}
curled = 0
to_curl = len(tickers)

for ticker in tickers:

  delete_existing_ticker_file(ticker)

  dest_file = curl_data(ticker,str_start_day, str_end_day)

  res[ticker] = dest_file

  curled = curled + 1

  if curled == to_curl:

    json.dump(res, sys.stdout)
    sys.stdout.flush()





 