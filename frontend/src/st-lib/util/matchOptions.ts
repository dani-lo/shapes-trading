import { IMatchSettings } from "@alltypes/types";

export const matchOptions : IMatchSettings = {
  donchian_period: 33,
  ma_period: 100,
  ma_direction_lookback: 10,
  lookback_correction_bars: 3,
  donchian_channel_target : 'low',
  analyse_segments_len: 5,
  from_ticker: '',
  to_ticker: [],
  target_range_from: '2020-01-01',
  target_range_to: '2020-06-27',
  price_series_ticker_file: '',
  match_steep_diff_max: 0.3,
  match_duration_ratio_max: [0.8, 1.2],
  match_positions_sequence: true,
  match_rel_width_max: 1,
  final_quadrant_tolerance: 0.2,
  start_quadrant_tolerance: 0.2,
  fpad: 100,
  bpad: 100,
  fpad_from: 100,
  bpad_from: 100,
  fpad_to: 100,
  bpad_to: 100
}


