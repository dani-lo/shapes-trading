from pathlib import Path
from pprint import pprint as pp

from st_util.st_json import get_json

class STBot :

  def __init__ (self, json_data_file, capital, max_single_loss_perc, stop_loss_atr_multi, take_profit_atr_multi, trail_atr_multi) :
    
    st_engine_dir = Path(__file__).resolve().parents[1]
    file_path = str(st_engine_dir) + '/historical_prices/' + json_data_file

    self.capital = capital
    self.iter_price = iter(get_json(file_path))
    self.trades = []

    self.max_single_loss_perc =  max_single_loss_perc
    self.stop_loss_atr_multi = stop_loss_atr_multi
    self.take_profit_atr_multi = take_profit_atr_multi
    self.trail_atr_multi = trail_atr_multi

    self.paused = 0
    self.pause_periods = 5

  def pause (self) :
    self.paused = self.pause_periods

  def un_pause (self) :
    if self.paused > 0 :
      self.paused = self.paused - 1