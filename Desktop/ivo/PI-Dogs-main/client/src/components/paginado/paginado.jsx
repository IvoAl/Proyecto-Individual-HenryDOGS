import React from "react";
import './paginado.css'

export default function Paginado({dogsPerPage, dogs, paginado}){
    const pageNumber = [];
    for (let i=1; i <= Math.ceil(dogs/dogsPerPage) ; i++) {
        pageNumber.push(i)
    }
    return (
        <nav className="contenedorPaginado">
            <div>
                { pageNumber && 
                    pageNumber.map( number => {
                        return (
                            <input
                            className="numberPaginado"
                            type='button'
                            value={number}
                            onClick={() => paginado(number)}
                            />
                        )})
                }
            </div>
        </nav>
    )
}