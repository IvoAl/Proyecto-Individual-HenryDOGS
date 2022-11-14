import React from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Dog from "../dog/Dog";
import Paginado from "../paginado/paginado";
import { getDogs, getTemperaments, filterByTemperaments, filterByRaza, orderByName, orderByWeight, search, cleanDetail, cleanHome, ochenta  } from "../../actions/actions";
import { Link } from "react-router-dom";
import './home.css'
import imagenloading from '../../image/droopy.jpg'

export default function Home () {
     const dispatch = useDispatch();
     const page = useSelector(state => state.pages)
     const dogs = useSelector(state => state.dogs)
     const allTemperaments = useSelector(state => state.temperaments)
     const [orden, setOrden] = useState('')
     const [currentPage, setCurrentPage] = useState(page);
     const [dogsPerPage, setdogsPerPage] = useState(8);
     const indexLastDog = dogsPerPage * currentPage
     const indexOfFirstCountry = indexLastDog - dogsPerPage;  
     const currentDogs = dogs.slice(indexOfFirstCountry, indexLastDog)
 
     const paginado = (pageNumber) => { 
        setCurrentPage(pageNumber)
    }

     useEffect (() => {
         dispatch(getDogs())
         dispatch(getTemperaments())
         dispatch(cleanDetail())
     }, [dispatch])

     function handleFilterByTemperaments (e) {
        e.preventDefault()
        setCurrentPage(1)
        dispatch(filterByTemperaments(e.target.value))
     }
     function handleFilterByRazas (e) {
        e.preventDefault()
        setCurrentPage(1)
        dispatch(filterByRaza(e.target.value))

     }
     function handleOrderByName (e) {
        e.preventDefault()
        dispatch(orderByName(e.target.value))
        setOrden(`Ordenado ${e.target.value}`)
     }
     function handleOrderByWeight (e) {
        e.preventDefault()
        dispatch(orderByWeight(e.target.value))
        setOrden(`Ordenado ${e.target.value}`)

     }
     function handleBuscador (e) {
        dispatch(search(e.target.value))
        setCurrentPage(1)

     }
  
    return (
        <div>
            
                <div className="contenNavBar">
                    <div className="contenCreate">
                        <Link to='/home/createDog'>
                            <button className="buttonCreate">
                            Create
                            </button>
                        </Link>
                    </div>
                </div>

            <div className="contenOrderPrincipal">
                
                    <select className="selectOrder">
                        <option disabled selected defaultValue>Order by</option>
                        <option 
                        value="A-Z"
                        onClick={(e) => handleOrderByName(e)}
                        >A-Z</option>
                        <option 
                        value="Z-A"
                        onClick={(e) => handleOrderByName(e)}
                        >Z-A</option>
                        <option 
                        value="Min"
                        onClick={(e) => handleOrderByWeight(e)}
                        >Weight Min</option>
                        <option 
                        value="Max"
                        onClick={(e) => handleOrderByWeight(e)}
                        >Weight Max</option>
                    </select>   

                    <select 
                    onChange={(e) => handleFilterByTemperaments(e)}
                    className="selectsFilters">
                        <option disabled selected defaultValue>Temperaments</option>
                        <option value="dogs">All</option>
                        {
                        allTemperaments?.map((temp) => (
                        <option value={temp}  key={temp}>{temp}</option>
                        ))
                        }
                    </select >
                    <select 
                    onChange={(e) => handleFilterByRazas(e)}
                    className="selectsFilters">
                        <option disabled selected defaultValue>Razas</option>
                        <option value='dogs'>All</option>
                        <option value='dogs/api'>Existing</option>
                        <option value='dogs/db'>Created</option>  
                    </select>

            </div>

            <div className="divSearch">
                <input
                placeholder="Search breed"
                className="inputSearch"
                type="text"
                onChange={(e) => handleBuscador(e)}
                />
            </div>

            <div className="contenPaginate">
                <div className="contenPaginado">
                    <Paginado
                    dogsPerPage = {dogsPerPage}
                    dogs = {dogs.length}
                    paginado = {paginado} />
                </div>
                {/* <div>
                    <label className="labelPage">page </label>
                    <button className="buttonCurrent">{currentPage}</button>
                </div> */}
            </div>

            <div className="contenCards">
                { currentDogs.length === 0 ? (
                    <div>
                        <img src={imagenloading}
                        className='imageLoading'/>
                    </div> ) 
                    : currentDogs?.map((d) => {
                        return (
                            <div className="dog">
                                   <Dog page={currentPage}
                                        id={d.id}
                                        image={d.image}
                                        name={d.name}
                                        weightMin={d.weightMin}
                                        weightMax={d.weightMax}
                                        temperaments={d.temperaments} />
                            </div>
                        )
                    })
                }
            </div>    
        </div>
    )
}