export interface ISavedMatch {
  _id: string 
  visible: boolean
  matchData: [IMatch, IMatch]
}

export interface IPriceData {
  Open: number
  Close: number
  High: number
  Low: number
  Date: string
  DateObj ?: Date
  Donchian ?: {
    High: number 
    Low: number
  }
}

export interface IPriceItemAPi {
  Open: string
  Close: string
  High: string
  Low: string
  Date: string
  DateObj ?: Date
}

export interface ITicker {
  name: string
  value: string
}

export interface IMatch {
  begin: string
  end: string
  ticker: string
}

export interface IStoreAction<P> {
  type: string 
  payload: P
}

export interface IMatchSettings {
  donchian_period: number,
  ma_period: number,
  ma_direction_lookback: number,
  lookback_correction_bars: number,
  donchian_channel_target : 'high' | 'low',
  analyse_segments_len: number,
  from_ticker ?: string,
  to_ticker ?: string[],
  target_range_from: string,
  target_range_to: string,
  match_steep_diff_max: number | string,
  match_duration_ratio_max: [number  | string, number  | string],
  match_positions_sequence: boolean,
  match_rel_width_max: number | string,
  price_series_ticker_file: string,
  final_quadrant_tolerance: number  | string,
  start_quadrant_tolerance: number  | string,
  fpad ?: number,
  bpad ?: number,
  fpad_from ?: number,
  bpad_from ?: number,
  fpad_to ?: number,
  bpad_to ?: number
}

export interface ISavedMatchSettings {
  _id: string
  visible: boolean 
  deleted: boolean
  matchSettings : IMatchSettings
}

export interface IInputValue {
  target: {
    value: number | string
  }
} 
export type TSettingOption = Date | { label: string, value: string }[] | IInputValue

export enum ESettingType {
  'text',
  'options',
  'multioptions',
  'checkbox',
  'radio',
  'date'
}

export interface IAppState {
  loading: boolean
}