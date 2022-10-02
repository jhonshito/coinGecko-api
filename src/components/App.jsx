
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Tabla from './Tabla'

const App = () => {

    const [datos, setadatos] = useState([])
    // const [valor, setValor] = useState('')
    const [filtro, setFiltro] = useState({
        simbol: '',
        rankMin:0,
        rankMax:0
    })

    let filtroUpdate = {}

    const getData = async() => {
        const res = await axios('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false');
        console.log(res.data);
        setadatos(res.data)
    }

    const aplicarFiltro = (valor, campo) => {
        switch(campo) {
            case "simbolo":
                
                filtroUpdate.simbol = valor;
                updateFiltro(filtroUpdate);
            break;
            case "rankMin":
                filtroUpdate.rankMin = valor!==""?parseInt(valor):0
                updateFiltro(filtroUpdate)
            break;
            case "rankMax":
                filtroUpdate.rankMax = valor!==""?parseInt(valor):0
                updateFiltro(filtroUpdate)
                break;
        }
    }

    const updateFiltro = (filtroUpdate) => {
        setFiltro({
            ...filtro,
            ...filtroUpdate
        })
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
            onChange={(e) => aplicarFiltro(e.target.value, "simbolo")}
        />

        <h2 className='text-center fst-italic'>Busca coin por rango</h2>

        <div className="d-flex mb-3">
            <input type="text"
                placeholder='rank min'
                className='form-control bg-dark fst-italic text-center text-light'
                onChange={(e) => aplicarFiltro(e.target.value,"rankMin")} />
            
            <input type="text"
                placeholder='rank max'
                className='form-control bg-dark fst-italic text-center text-light'
                onChange={(e) => aplicarFiltro(e.target.value, "rankMax")} />
        </div>
        <Tabla datos={datos} filtro={filtro} />
    </main>
  )
}

export default App