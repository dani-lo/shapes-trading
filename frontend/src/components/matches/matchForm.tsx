import React, { useEffect, useState } from 'react'
import { debounce } from 'lodash'

import { useSTContext } from '@component/provider'
import { WidgetMatchSetting } from '@component/widget/setting'

import { saveMatchOptions } from '@api/match'
import { fetchTickers, matchTickers } from '@api/tickers'

import { formatDate } from '@stlib/util/formatDate'

import * as STElement from '@styled/index'

import { ESettingType, IInputValue, IMatch, ITicker } from '@alltypes/types';

export const MatchForm = (): JSX.Element => {

  const { matchOptions, 
          setMatchOptions, 
          setLoading, 
          addSavedMatchOptions,
          stStore } = useSTContext()
  
  
  const tickersData = stStore.tickers.data as ITicker[]
  const matchData = stStore.matches.data as [IMatch, IMatch][]

  useEffect(() => {
    fetchTickers().then((t) => {
      
      stStore.tickers.init( t.map(ticker => {

        return {
          name: ticker.split('_')[0], 
          value: ticker  
        }
      }))
      
      const tickersPure =  t.map(t => t.split('_')[0])
      
      if (matchOptions.to_ticker.length === 0) {
        setCompindexes([0, t.length])
        setMatchOptions({
          to_ticker: tickersPure
        })
      } else {

        const tickerFromIdx = tickersPure.indexOf(matchOptions.to_ticker[0])
        const tickerToIdx = tickersPure.indexOf(matchOptions.to_ticker[matchOptions.to_ticker.length - 1])
        
        setCompindexes([tickerFromIdx, tickerToIdx])
        setMatchOptions({
          to_ticker: tickersPure.slice(tickerFromIdx, tickerToIdx)
        })
      }
      
    })
  }, [])
  const tickerOptions = tickersData .map(t => ({label: t.name, value: t.value }))

  const getMatch = () => {
    setLoading(true)
    matchTickers(matchOptions).then(res => {
      setLoading(false)
      
      stStore.matches.init(res)
    }).catch((e) => {
      setLoading(false)

      stStore.matches.init([])
    })
  }

  let minDate, maxDate 

  if (matchOptions.from_ticker) {

    const tickerOpt = tickersData.find(t => t.name === matchOptions.from_ticker)
    const tickerFile = tickerOpt.value
    const minMaxRange = tickerFile.replace('.json', '').split('_').slice(1)

    minDate = minMaxRange[0]
    maxDate = minMaxRange[1]
  }

  const [compindexes, setCompindexes] = useState([0, tickersData.length])

  return <STElement.STBox bg={ true } border={'0 0 1px 0'}>
    <STElement.STFlexBox>
      <STElement.STBox className="padding">
        <WidgetMatchSetting
          label="Main Ticker"
          type={ ESettingType.options }
          values={ tickerOptions.filter(t => t.label === matchOptions.from_ticker) }
          options={ tickerOptions }
            onOptionChange={ (opt) => setMatchOptions({
              from_ticker: opt[0].label          
            })} 
        />
      </STElement.STBox>

        <STElement.STBox className="padding">
          <WidgetMatchSetting
              label="vs (index from)"
              type={ ESettingType.text }
              val={ String(compindexes[0]) }
              onTxtChange={(e : IInputValue) => {

                const idx = e.target.value

                setCompindexes([Number(idx), compindexes[1]])

                debounce(() => {  
                  setMatchOptions({
                    to_ticker: tickersData.slice(Number(idx), Number(compindexes[1])).map(t => t.name)
                  })
                }, 400)()
                
              }} 
          />
        </STElement.STBox>
        <STElement.STBox className="padding">
          <WidgetMatchSetting
              label="vs (index to)"
              type={ ESettingType.text }
              val={ String(compindexes[1]) }
              onTxtChange={(e : IInputValue) => {
                
                const idx = e.target.value
                setCompindexes([compindexes[0], Number(e.target.value)])

                debounce(() => {
                  setMatchOptions({
                    to_ticker:tickersData.slice(Number(compindexes[0]), Number(idx)).map(t => t.name)
                  })
                }, 400)()
              }} 
          />
        </STElement.STBox>
      </STElement.STFlexBox>
   
    <STElement.STFlexBox valign="bottom">
      <STElement.STBox className="padding">
        <WidgetMatchSetting
          label="Range Target From"
          type={ ESettingType.date }
          val={ new Date(matchOptions.target_range_from) }
          minDate={ minDate }
          maxDate={ maxDate}
          disabled={ !matchOptions.from_ticker }
          onDateChange={date => {
            setMatchOptions({ target_range_from : formatDate(date as Date)})
          }}
        />
      </STElement.STBox>
      <STElement.STBox className="padding">
        <WidgetMatchSetting
          label="Range Target To"
          type={ ESettingType.date }
          val={ new Date(matchOptions.target_range_to) }
          minDate={ minDate }
          maxDate={ maxDate}
          disabled={ !matchOptions.from_ticker }
          onDateChange={date => {
            setMatchOptions({ target_range_to : formatDate(date as Date)})
          }}
        />
      </STElement.STBox>
      <STElement.STBox className="padding">
        <WidgetMatchSetting
          label="Donchian Period"
          type={ ESettingType.text }
          val={ String(matchOptions.donchian_period) }
          onTxtChange={(e : IInputValue) => {
            setMatchOptions({ donchian_period : Number(e.target.value) })
          }}
        />
      </STElement.STBox>
      </STElement.STFlexBox>
      <STElement.STFlexBox valign="bottom">
      <STElement.STBox className="padding">
        <WidgetMatchSetting
          label="MA Lookback"
          type={ ESettingType.text }
          val={ String(matchOptions.ma_direction_lookback) }
          onTxtChange={ (opt) => {
            setMatchOptions({
              ma_direction_lookback: Number(opt.target.value)
            })
        }}/>
      </STElement.STBox>
      <STElement.STBox className="padding">
        <WidgetMatchSetting
          label="First close tolerance"
          type={ ESettingType.text }
          val={ String(matchOptions.start_quadrant_tolerance) }
          onTxtChange={ (opt) => {
            setMatchOptions({
              start_quadrant_tolerance: opt.target.value
            })
        }}/>
      </STElement.STBox>
      <STElement.STBox className="padding">
        <WidgetMatchSetting
          label="Last close tolerance"
          type={ ESettingType.text }
          val={ String(matchOptions.final_quadrant_tolerance) }
          onTxtChange={ (opt) => {
            setMatchOptions({
              final_quadrant_tolerance: opt.target.value
            })
        }}/>
      </STElement.STBox>
      
    </STElement.STFlexBox>
    <STElement.STFlexBox>
      <STElement.STBox className="padding">
        <WidgetMatchSetting
          label="Channel target"
          type={ ESettingType.options }
          values={ [ {label: matchOptions.donchian_channel_target, value: matchOptions.donchian_channel_target } ]}
          options={ [{label: 'high', value: 'high'}, {label: 'low', value: 'low'}] }
          onOptionChange={ (opt) => setMatchOptions({
            donchian_channel_target: opt[0].value 
          })} 
        />
      </STElement.STBox>
      <STElement.STBox className="padding">
        <WidgetMatchSetting
          label="Steep tolerance"
          type={ ESettingType.text }
          val={ String(matchOptions.match_steep_diff_max) }
          onTxtChange={ (opt) => {
            setMatchOptions({
              match_steep_diff_max: opt.target.value 
            })
        }}/>
      </STElement.STBox>
      <STElement.STBox className="padding">
        <WidgetMatchSetting
          label="Width tolerance"
          type={ ESettingType.text }
          val={ String(matchOptions.match_rel_width_max) }
          onTxtChange={ (opt) => {
            setMatchOptions({
              match_rel_width_max: opt.target.value
            })
        }}/>
      </STElement.STBox>
    </STElement.STFlexBox>

    <STElement.STFlexBox>
      <STElement.STBox className="padding">
      <WidgetMatchSetting
          label="Segments Chain Length"
          type={ ESettingType.text }
          val={ String(matchOptions.anal_segments_len) }
          onTxtChange={ (opt) => {
            setMatchOptions({
              anal_segments_len: Number(opt.target.value)
            })
        }}/>
      </STElement.STBox>
      <STElement.STBox className="padding">
        <WidgetMatchSetting
          label="MA Period"
          type={ ESettingType.text }
          val={ String(matchOptions.ma_period) }
          onTxtChange={ (opt) => {
            setMatchOptions({
              ma_period: Number(opt.target.value)
            })
        }}/>
      </STElement.STBox>
      <STElement.STBox className="padding">
        <WidgetMatchSetting
          label="Channel Lookback"
          type={ ESettingType.text }
          val={ String(matchOptions.lookback_correction_bars) }
          onTxtChange={ (opt) => {
            setMatchOptions({
              lookback_correction_bars: Number(opt.target.value)
            })
        }}/>
      </STElement.STBox>
    </STElement.STFlexBox>
    <STElement.STFlexBox>
      <STElement.STBox className="padding">
        <WidgetMatchSetting
          label="Fprward Pad From"
          type={ ESettingType.text }
          val={ String(matchOptions.fpad_from) }
          onTxtChange={ (opt) => {
            setMatchOptions({
              fpad_from:Number(opt.target.value)
            })
        }}/>
      </STElement.STBox>
      <STElement.STBox className="padding">
        <WidgetMatchSetting
          label="Backward Pad From"
          type={ ESettingType.text }
          val={ String(matchOptions.bpad_from) }
          onTxtChange={ (opt) => {
            setMatchOptions({
              bpad_from: Number(opt.target.value)
            })
          }}/>
      </STElement.STBox>
      </STElement.STFlexBox>
      <STElement.STFlexBox>
      <STElement.STBox className="padding">
        <WidgetMatchSetting
          label="Fprward Pad To"
          type={ ESettingType.text }
          val={ String(matchOptions.fpad_to) }
          onTxtChange={ (opt) => {
            setMatchOptions({
              fpad_to:Number(opt.target.value)
            })
        }}/>
      </STElement.STBox>
      <STElement.STBox className="padding">
        <WidgetMatchSetting
          label="Backward Pad To"
          type={ ESettingType.text }
          val={ String(matchOptions.bpad_to) }
          onTxtChange={ (opt) => {
            setMatchOptions({
              bpad_to: Number(opt.target.value)
            })
          }}/>
      </STElement.STBox>
    </STElement.STFlexBox>
    <STElement.STBox className="padding">
      <STElement.STButton
        disabled={!matchOptions.from_ticker || !matchOptions.to_ticker} 
        onClick={ () => getMatch()}>
        <i className="fa fa-arrow-right" aria-hidden="true"></i>
      </STElement.STButton>
      <STElement.STButton 
        disabled={!matchData || matchData.length === 0} 
        onClick={ () => {
          saveMatchOptions(matchOptions).then(() => {
            addSavedMatchOptions({
              _id: 'notset',
              visible: true,
              deleted: false,
              matchSettings: matchOptions
            })
          })
        }}>
        <i className="fa fa-floppy-o" aria-hidden="true"></i>
      </STElement.STButton>
    </STElement.STBox>
  </STElement.STBox>
}