import Swal from 'sweetalert2'
import Card from './Card'

const Tabla = ({datos, filtro}) => {

    //const nuevoValor = datos.filter((data) => data.symbol.toLowerCase().includes(valor.toLowerCase()))
    console.log(filtro)
    let nuevoValor = datos.filter((data) => data.symbol.toLowerCase().includes(filtro.simbol.toLowerCase()))
    .filter((data) => filtro.rankMin!=0?data.market_cap_rank >= filtro.rankMin:data)
    .filter((data) => filtro.rankMax!=0?data.market_cap_rank <= filtro.rankMax:data);
    /*if(nuevoValor == ''){
        Swal.fire({
            icon : 'error',
            text : `La crypto moneda ${valor} no existe`
        })
    }*/

  return (
    <div className='row'>
        <Card />
        <div className="col-lg-12 col-md-8 col-sm-4">
            <table className="table table-dark table-striped shadow">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Name</th>
                        <th>Rank</th>
                        <th>current_price</th>
                        <th>price_change_percentage_24</th>
                        <th>Total_volumen</th>
                    </tr>
                </thead>
                <tbody>
                        
                    {
                        nuevoValor.map((coin, index) => (
                            <tr key={coin.id}>
                                <td scope="row">
                                    {index}
                                </td>
                                <td>
                                    <img 
                                        src={coin.image} 
                                        alt={`esta es la imagen del ${coin.name}`}
                                        style={{width : '5%'}}
                                        className='mx-3 img-fluid'
                                    />
                                    {coin.name}
                                    <span className='ms-3 text-muted'>{coin.symbol}</span>
                                </td>
                                <td>
                                    {`Rank ${coin.market_cap_rank}`}
                                </td>
                                <td>{coin.current_price}</td>
                                <td className={coin.price_change_percentage_24h > 0 ? 'text-success' : 'text-danger'}>
                                    {coin.price_change_percentage_24h }
                                </td>
                                <td>{coin.total_volume}</td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
    </div>
  )
}

export default Tabla
