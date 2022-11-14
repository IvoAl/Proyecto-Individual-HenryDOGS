import React from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import './dog.css'
import { savePage } from "../../actions/actions";


export default function Dog ({id, image, name, weightMin, weightMax, temperaments, page}) {
   const dispatch = useDispatch();
    function handlePage (e) {
        dispatch(savePage(page))
    }
    
    
    
    return (
        <div className="contenPrincipal">
                <img src={image} className="imageDog" alt="perro"/>
                <Link to= {`/home/${id}`}>
                <button className="botonCardDetail" onClick={(e) => handlePage(e)} >{name}</button>
                </Link>
                <h4 className="h4Card">Weight: Between {weightMin} y {weightMax} Kg. about </h4>
                <h5 className="h5Card">Temperaments: {temperaments}</h5>
        </div>
    )
}