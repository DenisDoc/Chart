import { useState, useEffect, useCallback} from 'react'
import classes from './Chart.module.css'
import { Stock } from '@ant-design/plots'
import Card from '../Utilities/Card'
import Sockette from 'sockette'

   const dataHolder = []

   // import io from 'socket.io-client'
   // const socket = io.connect('http://localhost:3001', {transports : ['websocket']})

   const DemoStock = () => {
   const [chartData, setChartData] = useState([])

   const ws = new Sockette('wss://stream.binance.com:9443/ws/ethusdt@kline_1m', {
   timeout: 5e3,
   maxAttempts: 10,
   onopen: e => console.log('Connected!', e),
   onmessage: e => {
      console.log('Received:', e)

      let data = JSON.parse(e.data)

      let recivedData = {
         'ts_code': "000001.SH",
         'trade_date': new Date(data.E),
         'open': parseInt(data.k.o),
         'close': parseInt(data.k.c),
         'high': data.k.h,
         'low': data.k.l,
         'vol': data.k.v,
         'amount': data.k.v,
         'id': data.k.f 
      }

      if(data.k.x){
         dataHolder.push(recivedData)
      }
      
   setChartData([...dataHolder, recivedData])

   //    setTimeout(()=> {
   //       setChartData(prev => 
   //    [...prev,
   //    {
   //       'ts_code': "000001.SH",
   //       'trade_date': new Date(data.E),
   //       'open': parseInt(data.k.o),
   //       'close': parseInt(data.k.c),
   //       'high': data.k.h,
   //       'low': data.k.l,
   //       'vol': data.k.v,
   //       'amount': data.k.v
   //    }
   //    ]
   // // )
   //    }, 1000)
   
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