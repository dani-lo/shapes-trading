import subprocess
import datetime
import time
import csv
import json
import urllib.request
import codecs
import os
from pathlib import Path

from pprint import pprint as pp

base_dir = Path(__file__).resolve().parents[1]
data_folder = 'historical_prices'

def curl_data (ticker, date_from, date_to) :
  full_ticker = ticker.upper()

  curl_ts_from = str_to_timestamp(date_from) # period 1
  curl_ts_to = str_to_timestamp(date_to) # period 2
  
  dest_file = f'{base_dir}/{data_folder}/{full_ticker}_{date_from}_{date_to}.json'
  
  data_url = f'https://query1.finance.yahoo.com/v7/finance/download/{full_ticker}.L?period1={curl_ts_from}&period2={curl_ts_to}&interval=1d&events=history'

  try: 
    ftpstream = urllib.request.urlopen(data_url)

    csv_data = csv.reader(codecs.iterdecode(ftpstream, 'utf-8'))

    json_data = []

    for line in csv_data:

      json_row = {
        "Date" : line[0],
        "Open" : line[1],
        "High" : line[2],
        "Low" : line[3],
        "Close" : line[4],
        "Adj_Close" : line[5],
        "Volume" : line[6]
      }

      json_data.append(json_row)

    with open(dest_file, 'w') as json_file_tgt:
      json_file_tgt.write(json.dumps(json_data))

    return dest_file

  except urllib.error.URLError as e:
    return e.reason
  
  

def str_to_timestamp (str_date_yyyy_mm_dd) : 

  date = datetime.datetime.strptime(str_date_yyyy_mm_dd, "%Y-%m-%d")
  time_tuple = date.timetuple()
  timestamp = time.mktime(time_tuple)

  return int(timestamp)
