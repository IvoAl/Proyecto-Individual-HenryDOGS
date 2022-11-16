import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { dogDetails, cleanDetail } from "../../actions/actions";
import { Link, useParams } from "react-router-dom";
import './dogdetail.css'


export default function DogDetails () {
    const dispatch = useDispatch();    
const { id } = useParams()

        useEffect (() => {
        dispatch(dogDetails(id))
    }, [dispatch])

    const details = useSelector((state) => state.dogsDetails)

    return (
        <div>
            <div className="contenButtons">
                <div>
                    <Link to='/home'>
                        <button className="buttonHomeDetail"> Home </button>
                    </Link>
                </div>
                <div>
                    <Link to='/home/createDog'>
                        <button className="buttonCreateDetail"> Create new breed </button>
                    </Link>
                </div>
             </div>
             {
                details?.map(({image, name, lifeSpan, weightMin, weightMax, heightMin, heightMax, temperaments}) => {
                    return (
                        <div>
                            <div className="divDetail">
                                <img src={image} className="imageDetail"/>
                                <h1 className="h1Card">{name}</h1>
                                <div className="h3Card">
                                    <h3>Life Span: {lifeSpan}</h3>
                                    <h3>Weight: Between {weightMin} & {weightMax} Kgs.</h3>
                                    <h3>Height: Between {heightMin} & {heightMax} Cm.</h3>
                                    <h3>Temperaments: {temperaments}</h3>
                                </div>
                            </div>
                        </div>
                    )
                })
             }
             
        </div>
    );
    
}
