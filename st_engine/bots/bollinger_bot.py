import math 
import os
from pathlib import Path
from pprint import pprint as pp

from candle.candle import st_candle, candle_shapes
from bots.bot import STBot
from channel.bollinger import bollinger_band
from average.atr import simple_atr
import bots.trade as st_trade

class STBollingerBot(STBot) :



  def bot_result (self) :
    
    profit = 0
    wins = 0
    losses = 0

    print('START REPORT >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>')

    for trade in self.trades :
      profit = profit + trade.profit

      if trade.profit > 0 :
        wins = wins + 1
      else :
        losses = losses + 1

      # if trade.profit != 0 :
        # print('---------------')
        # print(trade.order.order_price)
        # print(trade.order.order_direct)
        # print(trade.created_at)
        # print(trade.profit)


    print('---------------')
    print('NUM TRADES', len(self.trades))
    print('WINS',  wins)
    print('LOSSES', losses)
    print('PROFIT', profit)
    print('FINAL CAPITAL ===', self.capital)
    print('>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> END REPORT')

  def on_win (self, profit) :
    self.capital = self.capital + abs(profit)

  def on_lose (self, profit) :
    self.capital = self.capital - abs(profit)
    self.pause()

  def run_bot (self, period, standard_deviation_multi) :

    date_from = '2010-03-01'
    date_to = '2016-12-01'
    price_items = []

    i = 0

    bands = []
    
    prev_price_item = None

    candle = None 

    runnin_trade = False

    for price_item in self.iter_price :

      if i == 0 :
        i = i + 1 
        continue
      
      if price_item['Low'] == 'null' or price_item['High'] == 'null' or price_item['Close'] == 'null' or price_item['Open'] == 'null' :
        if prev_price_item != None :
          price_item = prev_price_item
        else :
          continue

      price = {
        'Date': price_item['Date'],
        'Low': float(price_item['Low']),
        'High': float(price_item['High']),
        'Open': float(price_item['Open']),
        'Close': float(price_item['Close']),
      }

      price_items.append(price)

      if prev_price_item is not None and len(price_items) > 1:
        candle = st_candle(price, prev_price_item) 
    
      if len(price_items) > period + 1:

        self.un_pause()
        
        prices_sample = price_items[i - period : i + 1]
 
        band = bollinger_band(prices_sample, standard_deviation_multi)
        
        bands.append(band)
        
        diff_band = None 

        if len(bands) > 4:
          diff_band = {
            'upper': abs(band['upper'] - bands[-4]['upper']),
            'lower': abs(band['upper'] - bands[-4]['lower']),
          }

        if price['Date'] < date_from or price['Date'] > date_to :
          continue

        at_val = simple_atr(prices_sample)

        short_condition = price['High'] > band['upper'] and price['Close'] < band['upper'] and candle is not None and candle['candle_shape'] != candle_shapes['BULLISH']
        long_condition = price['Low'] < band['lower'] and price['Close'] > band['lower'] and candle is not None and candle['candle_shape'] != candle_shapes['BEARISH']

        if short_condition and runnin_trade is False  and self.paused == 0: #and diff_band is not None and diff_band['upper'] < at_val:
          
          runnin_trade = True

          (trade_size, trade_stop, trade_limit) = st_trade.trade_size(
            self.capital, 
            self.max_single_loss_perc, 
            at_val, 
            self.stop_loss_atr_multi, 
            self.take_profit_atr_multi
          )

          if trade_size is not None:
            
            # enter_price = candle['mid_body']

            # if candle['direction'] == 'bull':
            #   enter_price = candle['mid_upper_wick']
            
            enter_price = candle['mid_upper_wick']

            print('NEW TRADE - SHORT >>>>>>>>>>>>')
            print('AT --', enter_price)
            print('SIZE', trade_size)
            print('STOP', trade_stop)
            print('LIMIT', trade_limit)
            print(candle)


            new_trade = st_trade.Trade(
              st_trade.order_types['MARKET'], 
              enter_price, 
              st_trade.order_directions['SHORT'], 
              trade_size, 
              trade_stop, 
              trade_limit,
              self.trail_atr_multi * at_val,
              price['Date'],
              self.on_win,
              self.on_lose
            )

            self.trades.append(new_trade)

        elif long_condition  and runnin_trade is False and self.paused == 0: # and diff_band is not None and diff_band['lower'] < at_val :
          
          runnin_trade = True 
          
          (trade_size, trade_stop, trade_limit) = st_trade.trade_size(
            self.capital, 
            self.max_single_loss_perc, 
            at_val, 
            self.stop_loss_atr_multi, 
            self.take_profit_atr_multi
          )


          if trade_size is not None :
            
            enter_price = candle['mid_lower_wick']

            # if candle['direction'] == 'bear':
            #   enter_price = candle['mid_body']
              
           

            print('NEW TRADE - LONG >>>>>>>>>>>>')
            print('AT --', enter_price)
            print('SIZE', trade_size)
            print('STOP', trade_stop)
            print('LIMIT', trade_limit)
            print(candle)

            new_trade = st_trade.Trade(
              st_trade.order_types['LIMIT'], 
              enter_price, 
              st_trade.order_directions['LONG'], 
              trade_size, 
              trade_stop, 
              trade_limit,
              self.trail_atr_multi * at_val,
              price['Date'],
              self.on_win,
              self.on_lose
            )

            self.trades.append(new_trade)

        else :

          for t in self.trades :
            t.refresh(price)

          statuses = [t.status for t in self.trades]

          if st_trade.trade_status['RUN'] not in statuses :
            runnin_trade = False
          
          if runnin_trade or (not runnin_trade and st_trade.trade_status['SLEEP'] in statuses) :
            self.pause()

      i = i + 1

      prev_price_item = price_item

if __name__ == '__main__' :
  
  # st_engine_dir = Path(__file__).resolve().parents[1]
  # base_file_path = str(st_engine_dir) + '/historical_prices/' 

  # for filename in os.listdir(base_file_path):

  bollinger_bot = STBollingerBot('RSA_2000-07-21_2020-07-16.json', 10000, 3, 0.8, 2.2, 1)

  bollinger_bot.run_bot(14, 2)
  bollinger_bot.bot_result()