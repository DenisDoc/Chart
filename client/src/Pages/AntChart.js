import { useState, useEffect, useCallback} from 'react'
import classes from './Chart.module.css'
import { Stock } from '@ant-design/plots'
import Card from '../Utilities/Card'

   import io from 'socket.io-client'
   const socket = io.connect("http://localhost:3001", {transports : ['websocket']})
   
   const DemoStock = () => {
   const [chartData, setChartData] = useState([])

   socket.on('newCandle', (newData) => {
      setChartData(preavState => [  
         ...preavState,   
         newData         
      ]) 
   })      
   
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
   