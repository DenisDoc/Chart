import { useState, useEffect, useCallback, Fragment} from 'react'

import classes from './Chart.module.css'
import './DropDown.css'

import Card from '../Utilities/Card'
import Button from '../Utilities/Button'

import Sockette from 'sockette'

import { Stock } from '@ant-design/plots'
import { Menu, Dropdown } from 'antd';

const prevBitcoinData = [{closeTime: 1}]
const prevEthereumData = [{closeTime: 1}]
const prevCardanoData = [{closeTime: 1}]

   const DemoStock = () => {
      const [bitcoinData, setBitcoinData] = useState([])
      const [ethereumData, setEthereumData] = useState([])
      const [cardanoData, setCardanoData] = useState([])

      const [currentCurrency, setCurrentCurrency] = useState('')
      const [tracking, setTracking] = useState(<h2>Please choose a currency that you would like to track.</h2>)

      const ws = new Sockette('wss://stream.binance.com:9443/ws/btcusdt@kline_1m/ethusdt@kline_1m/adausdt@kline_1m', {
         timeout: 5e3,
         maxAttempts: 10,
         // onopen: e => console.log('Connected!', e),   
         onmessage: e => {
            // console.log('Received:', e)   
            let data = JSON.parse(e.data)
            let recivedData = {
               'currency': data.s,
               'ts_code': '000001.SH',
               'trade_date': new Date(data.E),
               'open': parseInt(data.k.o),
               'close': parseInt(data.k.c),
               'high': data.k.h,
               'low': data.k.l,
               'vol': data.k.v,
               'amount': data.k.v,
               'id': data.k.x,
               'closeTime': data.k.T,
               'eventTime': data.E,
               'closeTime': data.k.T
            }
            if(data.s === 'BTCUSDT') {
               if(data.k.x && prevBitcoinData[prevBitcoinData.length -1].closeTime !== recivedData.closeTime){
                  prevBitcoinData.push(recivedData)
               }          
               setBitcoinData([...prevBitcoinData, recivedData])
            }
            if(data.s === 'ETHUSDT') {
               if(data.k.x  && prevEthereumData[prevEthereumData.length -1].closeTime !== recivedData.closeTime){
                  prevEthereumData.push(recivedData)
               }
               setEthereumData([...prevEthereumData, recivedData])
            }
            if(data.s === 'ADAUSDT') {
               if(data.k.x  && prevCardanoData[prevCardanoData.length -1].closeTime !== recivedData.closeTime){
                  prevCardanoData.push(recivedData)
               }
               setCardanoData([...prevCardanoData, recivedData])
            }    
         },
         // onreconnect: e => console.log('Reconnecting...', e),
         // onmaximum: e => console.log('Stop Attempting!', e),
         // onclose: e => {console.log('Closed!', e)},
         // onerror: e => console.log('Error:', e)
      });

      const changeChartUrlBitcoin = (event) => {
         setCurrentCurrency('bitcoinData')
         setTracking(<h2>Tracking Bitcoin.</h2>)  
      }
      const changeChartUrlEthereum = (event) => {
         setCurrentCurrency('ethereumData')
         setTracking(<h2>Tracking Ethereum.</h2>)
      }
      const changeChartUrlCardano = (event) => {
         setCurrentCurrency('cardanoData')
         setTracking(<h2>Tracking Cardano's.</h2>)
      }

      let config = { 
         data: [],
         xField: 'trade_date',
         yField: ['open', 'close', 'high', 'low'],
      } 
      if(currentCurrency === 'bitcoinData'){
          config = { 
            data: bitcoinData,
            xField: 'trade_date',
            yField: ['open', 'close', 'high', 'low'],
         }  
      }
      if(currentCurrency === 'ethereumData'){
         config = { 
            data: ethereumData,
            xField: 'trade_date',
            yField: ['open', 'close', 'high', 'low'],
         }  
      }
      if(currentCurrency === 'cardanoData'){
         config = { 
            data: cardanoData,
            xField: 'trade_date',
            yField: ['open', 'close', 'high', 'low'],
         }  
      }

   return (
      <Card>
         <Fragment>
            <Dropdown
               className={module.DropDown}
               overlay={(
                  <Menu>
                     <Menu.Item onClick={changeChartUrlBitcoin} key='0'> Bitcoin</Menu.Item>
                     <Menu.Item onClick={changeChartUrlEthereum} key='1'>Ethereum</Menu.Item>
                     <Menu.Item onClick={changeChartUrlCardano} key='2'>Cardano's</Menu.Item>
                  </Menu>
               )}
               trigger={['click']}>
               <Button className='ant-dropdown-link' onClick={e => e.preventDefault()}>Choose currency</Button>
            </Dropdown>
            {tracking}
         </Fragment> 
         <Stock className={classes.chart} {...config} /> 
      </Card> 
   )
}

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



      // socket.on('newCandle', (newData) => {
   //    setChartData(preavState => [  
   //       ...preavState,   
   //       newData         
   //    ]) 
   // })   
     // import io from 'socket.io-client'
   // const socket = io.connect('http://localhost:3001', {transports : ['websocket']})
  
   // const options = [
   //    'one', 'two', 'three'
   // ]
   // const defaultOption = options[0];
