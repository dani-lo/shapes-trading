order_directions = {
  'LONG': 'long',
  'SHORT': 'short'
}

order_types = {
  'LIMIT': 'limit',
  'STOP': 'stop',
  'MARKET': 'market'
}

trade_status = {
  'SLEEP': 'sleep',
  'RUN': 'run',
  'DONE': 'done',
  'DEAD': 'dead'
}

trade_result = {
  'WIN': 'win',
  'LOSE': 'lose'
}

def dolog (doif, logwhat) :
  if doif :
    print(logwhat)

def trade_size (capital, max_loss_perc, atr_val, atr_stop_multi, atr_limit_multi):

  if atr_val < 0.1 :
    return None, None, None

  max_loss_num = (capital / 100) * max_loss_perc
  max_points_stop = atr_val * atr_stop_multi
  max_points_limit = atr_val * atr_limit_multi


  trade_size = max_loss_num / max_points_stop
  trade_stop = max_points_stop
  tade_limit = max_points_limit

  return trade_size, trade_stop, tade_limit

class Order :

  def __init__(self, order_type, order_size, order_price, order_direct, created_at):
    self.order_type = order_type
    self.order_price = order_price
    self.order_direct = order_direct
    self.order_size = order_size
    self.created_at = created_at
  
  def result (self, ohlc_price, stop_loss, take_profit) :

    dbg_refresh_date = '2003-03-19'
    
    # dolog(self.created_at == '2011-03-17', 'CHECKIN RESUT REFRESH')
    # dolog(self.created_at == '2011-03-17', self.order_direct)
    
    # if self.created_at == dbg_refresh_date:
    #   print('get result - take prof and stop loss', take_profit, stop_loss)

    if self.order_direct == order_directions['LONG'] :

      # print('LONG case')
      
      # dolog(self.created_at == '2011-03-17', 'high :: ' + str(ohlc_price['High']))
      # dolog(self.created_at == '2011-03-17', 'take_profi :: ' + str(take_profit))
      # dolog(self.created_at == '2011-03-17',ohlc_price['Low'] < take_profit )

      if ohlc_price['High'] > take_profit:
        return trade_result['WIN']
      elif ohlc_price['Low'] < stop_loss:
        return trade_result['LOSE']

    elif self.order_direct == order_directions['SHORT'] :
      # print('SHORT case passed price low n high', ohlc_price['Low'], ohlc_price['High'])
      
      if ohlc_price['Low'] < take_profit:
        return trade_result['WIN']
      elif ohlc_price['High'] > stop_loss:
        return trade_result['LOSE']

    return None

  def trail(self, ohlc_price, take_profit, trail_size) :

    if self.order_direct == order_directions['LONG'] :
      if take_profit - ohlc_price['Close'] < trail_size :
        return {
          'stop' : ohlc_price['Close'] - trail_size,
          'limit': ohlc_price['Close'] + trail_size,
        }

    elif self.order_direct == order_directions['SHORT'] :
      if  ohlc_price['Close'] - take_profit < trail_size :
        return {
          'stop' : ohlc_price['Close'] + trail_size,
          'limit': ohlc_price['Close'] - trail_size,
        }

    return None

  def triggered (self, ohlc_price):

    if self.order_direct == order_directions['LONG'] :
      if self.order_type == order_types['LIMIT'] :
        if  ohlc_price['Low'] < self.order_price:
          return True
      elif self.order_type == order_types['STOP'] :
        if  ohlc_price['High'] > self.order_price:
          return True
      elif self.order_type == order_types['MARKET'] :
        return True

    elif self.order_direct == order_directions['SHORT'] :
      if self.order_type == order_types['STOP'] :
        if  ohlc_price['High'] > self.order_price:
          return True
      elif self.order_type == order_types['STOP'] :
        if  ohlc_price['Low'] < self.order_price:
          return True
      elif self.order_type == order_types['MARKET'] :
        return True

class Trade :
  
  def __init__(self, order_type, order_price, order_direct, order_size, stop_loss_points, take_profit_points, trail_points, created_at, on_win, on_lose) :
    self.order = Order(order_type, order_size, order_price, order_direct, created_at)
    self.result = 0
    self.status = trade_status['SLEEP']
    self.created_at = created_at
    self.on_win = on_win
    self.on_lose = on_lose
    self.trail_points = trail_points

    if order_direct == order_directions['LONG']:
      self.stop_loss = order_price - stop_loss_points
    else :
      self.stop_loss = order_price + stop_loss_points 

    if order_direct == order_directions['LONG']:
      self.take_profit = order_price + take_profit_points 
    else :
      self.take_profit = order_price - take_profit_points 

    # dolog(self.created_at == '2011-03-17', 'ENTER ' + str(order_price))
    # dolog(self.created_at == '2011-03-17', 'LIMIT ' + str(self.take_profit))
    # dolog(self.created_at == '2011-03-17', 'STOP ' + str(self.stop_loss))

    self.profit = 0
    self.checked_bars = 0
    self.die_after = 3

  def refresh (self, ohlc_price) :
    
    dbg_refresh_date = '2003-03-19'

    # if self.created_at == dbg_refresh_date :
    #   print('-- REFRESH', self.created_at, ohlc_price['Date'], ohlc_price['Low'], ohlc_price['High'])

    res = None 

    if self.status == trade_status['DEAD'] or self.status == trade_status['DONE'] : 
      # if self.created_at == dbg_refresh_date :
      #   print(1, self.status)
      return 

    if self.status == trade_status['SLEEP'] and self.order.triggered(ohlc_price):
      self.status = trade_status['RUN']

    if self.status == trade_status['RUN']:

      # if self.created_at == dbg_refresh_date :
      #   print('RUNNIN', self.created_at)
      
      res = self.order.result(ohlc_price, self.stop_loss, self.take_profit)
      
      # if self.created_at == dbg_refresh_date :
      #   print(res)

      if res == trade_result['WIN'] or res == trade_result['LOSE']:
        
        # dolog(True, '========= trade ==========')
        # dolog(True, ohlc_price)
        # dolog(True, res)

        self.status = trade_status['DONE']

        if res == trade_result['WIN']:
          print('====== WINWINWIN',  'opened', self.created_at, 'closed', ohlc_price['Date'])
          
          if self.order.order_direct == order_directions['LONG']:        
            self.profit = (self.take_profit - self.order.order_price) * self.order.order_size

          else :
            self.profit = (self.order.order_price - self.take_profit) * self.order.order_size

          self.on_win(self.profit)

        elif res == trade_result['LOSE']:
          print('====== LOSELOSELOSE', 'opened', self.created_at, 'closed', ohlc_price['Date'])
          
          if self.order.order_direct == order_directions['LONG']:        
            self.profit = -((self.order.order_price - self.stop_loss) * self.order.order_size)

          else :
            self.profit = -((self.stop_loss - self.order.order_price) * self.order.order_size)

          self.on_lose(self.profit)

      # else :
      #   new_stop_limit = self.order.trail(ohlc_price, self.take_profit, self.trail_points)
        # if new_stop_limit is not None :
        #   self.take_profit = new_stop_limit['limit']
        #   self.stop_loss = new_stop_limit['stop']
        # dolog(True, self.profit)

    if self.status == trade_status['SLEEP'] and self.checked_bars > self.die_after :
      self.status = trade_status['DEAD']

    self.checked_bars = self.checked_bars + 1

    return None