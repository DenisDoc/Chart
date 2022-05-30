import React, { useState, useEffect } from "react"
import PropTypes from "prop-types"
import { scaleTime } from "d3-scale"
import { ChartCanvas, Chart } from 'react-stockcharts'
import { CandlestickSeries } from "react-stockcharts/lib/series"
import { XAxis, YAxis } from "react-stockcharts/lib/axes"
import { fitWidth } from "react-stockcharts/lib/helper"
import { timeIntervalBarWidth } from "react-stockcharts/lib/utils"
import { utcDay } from "d3-time"
import { ema } from "react-stockcharts/lib/indicator"; 
import { CurrentCoordinate } from "react-stockcharts/lib/coordinates";

import Data from "./Data"

let LENGTH = 5

const initialData = {
   data: Data,
   length: LENGTH
}

const dataReducer = (state, action) => {
   if(action.type === "SHOW_NEW_DATA"){
      // return {length: LENGTH + 1, data:  }
   }
} 

let ChartJS = (props) => {

   // const [data, dispatchData] = useReducer(dataReducer, initialData)

     const [data, setData] = useState(Data)
          const generateNewCandel = () => {
             return {
               date:new Date('2020-02-19'),
               open: Number((Math.random() * (32 - 28 + 1) + 32).toFixed(1)),
               high: Math.random * ((35 - 25 + 1) + 35),
               low: Math.random * ((35 -25 + 1) + 35),
               close: Number((Math.random() * (35 - 28 + 1) + 35).toFixed(1)),
               volume: Math.random * ((594858493 - 594858000 + 1) + 594858493),
            }
          }
          
          useEffect(() => {
              const interval = setInterval(() => {
                 const newCandel = generateNewCandel()
                 const updatedData = [...data, newCandel]
                 setData(updatedData)
                 console.log(data[data.length -1])
              }, 2000)
             
              return () => {
                 clearInterval(interval)
              }
          }, []);

         useEffect(() => {
            const interval = setInterval(() => {
               // dispatchData({type: "SHOW_NEW_DATA" })
            }, 2000)
            return () => {
               clearInterval(interval)
            }
         })

             const ema12 = ema()
             .id(1)
             .options({ windowSize: 12 })
			    .merge((d, c) => {d.ema12 = c;})
			    .accessor(d => d.ema12);


  const { type, width, ratio } = props
  const xAccessor = (d) => d.date
//   const xExtents = [
//     xAccessor(last(Data)),
//     xAccessor(Data[Data.length - 100])
//   ];

  return (
    <div className="ChartJS">
      <ChartCanvas
        height={500}
        ratio={ratio}
        width={width}
        margin={{ left: 50, right: 50, top: 100, bottom: 30 }}
        type={type}
        data={data}
        seriesName="MSFT"
        xAccessor={xAccessor}
      //   displayXAccesor={xAccessor}
        xScale={scaleTime()}
      //   xExtents={xExtents}
      >
        <Chart id={1}  yExtents={(d) => [d.high, d.low]}>
          <XAxis axisAt="bottom" orient="bottom" ticks={6} />
          <YAxis axisAt="left" orient="left" ticks={5} />
          <CandlestickSeries 
          wickStroke= "#f3f3f3"
          candleStrokeWidth= {1}
          widthRatio= {0.7}
          opacity= {1}
          fill={(d) => d.close > d.open ? "rgb(236, 65, 133)" : "rgb(83, 83, 240)"}
          width={timeIntervalBarWidth(utcDay)}
          />

           <CurrentCoordinate yAccessor={ema12.accessor()} fill={ema12.stroke()} /> 
        </Chart>
      </ChartCanvas>
    </div>
  );
};

ChartJS.prototype = {
  data: PropTypes.array.isRequired,
  width: PropTypes.number.isRequired,
  ratio: PropTypes.number.isRequired,
  type: PropTypes.oneOf(["svg", "hybrid"]).isRequired,
};

ChartJS.defaultProps = {
  type: "svg",
};

ChartJS = fitWidth(ChartJS);

export default ChartJS;