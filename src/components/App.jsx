
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Tabla from './Tabla'

const App = () => {

    const [datos, setadatos] = useState([])
    const [valor, setValor] = useState('')

    const getData = async() => {
        const res = await axios('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false');
        console.log(res.data);
        setadatos(res.data)
    }
    useEffect(() => {
        getData()
    },[])
  return (
    <main className='container fst-italic mt-3'>
        <h1 className='text-center'>Crypto monedas</h1>
        <input 
            type="text"
            className='form-control bg-dark text-light mb-3 text-center fst-italic'
            placeholder='busca simbolo de coin'
            onChange={(e) => setValor(e.target.value)}
        />
        <Tabla datos={datos} valor={valor} />
    </main>
  )
}

export default App