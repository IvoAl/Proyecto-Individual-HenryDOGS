import React from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import './dog.css'
import { savePage } from "../../actions/actions";


export default function Dog ({id, image, name, weightMin, weightMax, temperaments, page}) {
    const dispatch = useDispatch();

    function handlePage () {
        dispatch(savePage(page))
    }
    
    
    return (
        <Link to= {`/home/${id}`} className="linkCard">
            <div className="contenPrincipal"
                 onClick={() => handlePage()}>
                <img src={image} className="imageDog" alt="dog"/>
                <h2 className="h2Card">{name}</h2>
                <h4 className="h4Card">Weight: Between {weightMin} and {weightMax} Kg. about </h4>
                <h5 className="h5Card">Temperaments: {temperaments}</h5>
            </div>
        </Link>
    )
}