import { Link } from "react-router-dom";
import './landing.css'


export default function Landing () {
    return (
        <div className="divLanding">
            <h1 className="h1Landing">Welcome to the dog project!</h1>
            <Link to='/home'>
            <button className="buttonLanding">Go to Home</button>
            </Link>
        </div>
    )
        
}