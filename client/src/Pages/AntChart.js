import { useState, useEffect, useCallback} from 'react'
import classes from './Chart.module.css'
import { Stock } from '@ant-design/plots'
import Card from '../Utilities/Card'
import Sockette from 'sockette'

   // import io from 'socket.io-client'
   // const socket = io.connect('http://localhost:3001', {transports : ['websocket']})

   const DemoStock = () => {
   const [chartData, setChartData] = useState([])

   const ws = new Sockette('wss://stream.binance.com:9443/ws/ethusdt@kline_30m', {
   timeout: 5e3,
   maxAttempts: 10,
   onopen: e => console.log('Connected!', e),
   onmessage: e => {
   console.log('Received:', e)
   let data = JSON.parse(e.data)
   console.log(data)

   setChartData(prev => 
      [...prev,
      {
         'ts_code': "000001.SH",
         'trade_date': new Date(data.E),
         'open': data.k.o,
         'close': data.k.c,
         'high': data.k.h,
         'low': data.k.l,
         'vol': data.k.v,
         'amount': data.k.v
      }
      ]
   )
  },
  onreconnect: e => console.log('Reconnecting...', e),
  onmaximum: e => console.log('Stop Attempting!', e),
  onclose: e => console.log('Closed!', e),
  onerror: e => console.log('Error:', e)
});

   // socket.on('newCandle', (newData) => {
   //    setChartData(preavState => [  
   //       ...preavState,   
   //       newData         
   //    ]) 
   // })      


   const config = { 
      data: chartData,
      xField: 'trade_date',
      yField: ['open', 'close', 'high', 'low'],
   } 
  
   return (
      <Card>
         <Stock className={classes.chart} {...config} />
      </Card> 
   )
};

export default DemoStock
   
// useEffect(() => {
   //    // fetchChartData() 
  
   // }, [setChartData, chartData])  

   // const fetchChartData = useCallback(async () => {
   //    try {
   //       const response = await fetch('https://react-send-data-to-database-default-rtdb.europe-west1.firebasedatabase.app/charData.json')
   //       const data = await response.json()

   //       setChartData(data)

   //    } catch (error) {
   //       console.log(error)
   //    }
   // }, [setChartData])