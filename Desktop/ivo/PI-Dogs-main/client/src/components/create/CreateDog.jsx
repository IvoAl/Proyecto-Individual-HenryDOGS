import React, { useState } from "react";
import { useEffect } from "react";
import {  useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { postDog, cleanHome } from "../../actions/actions";
import './create.css'

var errors2 = {
    name: '',
    lifeSpan: '',
    weight: '',
    height: '',
    temperaments: '',
    image: '',
}

export default function CreateDog () {
    const dispatch = useDispatch();
    const history = useHistory();
    const temperaments = useSelector(state => state.temperaments);
    let breeds = useSelector(state => state.dogs)
    breeds = breeds.map((dog) => {
        return dog.name.toLowerCase()
    });


    const [input, setInput] = useState({
        name: '',
        image: '',
        lifeSpan: '',
        weightMin: 0,
        weightMax: 0,
        heightMin: 0,
        heightMax: 0,
        temperamentsInput: [],
    });

    function handleSubmit (e) {
         e.preventDefault();
        dispatch(postDog(input))
        setInput({
            name: '',
            image: '',
            lifeSpan: '',
            weightMin: 0,
            weightMax: 0,
            heightMin: 0,
            heightMax: 0,
            temperamentsInput: [],
        })
        //dispatch(cleanHome())
        alert('Dog created') 
        history.push('/home')
    }

   
    function handleTemperaments (e) {
            if (input.temperamentsInput.includes(e.target.value.toLowerCase())){
                return;
            } else {
                errors2.temperaments = ''
                setInput({
                    ...input,
                    temperamentsInput: [...input.temperamentsInput, e.target.value.toLowerCase()]
                })
            }
    };
    function handleRemove (e) {
        setInput({
       ...input,
       temperamentsInput: input.temperamentsInput.filter((temp) => temp !== e.target.value)
   })
        if (input.temperamentsInput.length === 1) errors2.temperaments = 'temperaments requiere'
    };


    function handleName (e){
        setInput({
            ...input,
            name: e.target.value.charAt(0).toUpperCase() + e.target.value.slice(1)
        });
            errors2.name = '' 

        validateName({
                ...input,
                name: e.target.value
            })
         
    };
    function validateName(input) {
        let regexName = /^[A-Za-zÑñÁáÉéÍíÓóÚúÜü\s]+$/
        if (breeds.includes(input.name.toLowerCase())) errors2.name = 'The breed entered already exists'
        if (!regexName.test(input.name)) errors2.name = 'The name is require and has to be only letters'
    };  


    function handleLifeSpan(e) {
        setInput({
            ...input,
            [e.target.name]: parseInt(e.target.value)
        });
        errors2.lifeSpan = ''
        
        validateLifeSpan({
                ...input,
                lifeSpan: e.target.value
            })
    };
    function validateLifeSpan(input) {
        console.log(input.lifeSpan)
        let regexNumbers = /^[0-9]\d*(\.\d+)?$/
        
        if (input.lifeSpan === Number(input.lifeSpan)) return errors2.lifeSpan = 'solo numeros'

        if (input.lifeSpan < 1){
            errors2.lifeSpan = 'The number has to be greater than 0'
        }else if (!regexNumbers.test(input.lifeSpan.trim())) {
            errors2.lifeSpan = 'The Life Span is require and has to be only numbers'
        }
    };



    function handleWeight (e) {
        setInput({
            ...input,
            [e.target.name]: parseInt(e.target.value)
        })
        errors2.weight = ''
    
        validateWeight({
            ...input,
            [e.target.name]: e.target.value
        })
    };
    function validateWeight (input) {
        if (input.weightMin === 0 && input.weightMax === 0) {
            return errors2.weight = 'weight es requerido'
        }
        if (input.weightMin > 0 && input.weightMax === 0 ) {
            return errors2.weight = 'max es requerido'
        }
        if (input.weightMin > 0 && !input.weightMax) {
            return errors2.weight = 'weight max requiere'
        }
        if (input.weightMin > 0 && input.weightMin > input.weightMax ){
            return errors2.weight = 'minimo no puede ser mayor que max'
        }
        if (input.weightMin == 0 && input.weightMax > 0){
            return errors2.weight = 'minimo es requerido'
        }
        if (input.weightMin == input.weightMax) {
            return errors2.weight = 'el maximo no puede ser igual al minimo'
        }
        if (!input.weightMin && !input.weightMax) {
            return errors2.weight = 'weight es requerido'
        }
        
    };


    function handleHeight (e) {
        setInput({
            ...input,
            [e.target.name]: parseInt(e.target.value)
        })
        errors2.height = ''
    
        validateHeight({
            ...input,
            [e.target.name]: e.target.value
        })
    };
    function validateHeight (input) {
        if (input.heightMin === 0 && input.heightMax === 0) {
            return errors2.height = 'height es requerido'
        }
        if (input.heightMin > 0 && input.heightMax === 0 ) {
            return errors2.height = 'max es requerido'
        }
        if (input.heightMin > 0 && input.heightMin > input.heightMax ){
            return errors2.height = 'minimo no puede ser mayor que max'
        }
        if (input.heightMin == 0 && input.heightMax > 0){
            return errors2.height = 'minimo es requerido'
        }
        if (input.heightMin == input.heightMax) {
            return errors2.height = 'el maximo no puede ser igual al minimo'
        }
        if (!input.heightMin && !input.heightMax) {
            return errors2.height = 'height es requerido'
        }
        
    };


    function handleImage(e){
        setInput({
            ...input,
            image: e.target.value
        })
        errors2.image = ''
        
        validateImage({
            ...input,
            image: e.target.value
        })
    };
    function validateImage(input) {
        if (input.image === '') errors2.image = 'tienes que cargar una imagen'
    };



    return (
        <div className="contenPrincipal">
            <Link to='/home'>
                <button>Back to Home</button>
            </Link>
            <form onSubmit={(e) => handleSubmit(e)}
                  className='form' >
                <div className="name">
                    <input
                    className="input"
                    type='text'
                    placeholder="Breed name"
                    name="name"
                    onChange={(e) => handleName(e)}
                    ></input>
                    <p className='msgErrors'>{errors2.name}</p>
                </div>

                 <div className="name">
                    <input
                    className="input"
                    type='text'
                    name='lifeSpan'
                    placeholder="App. life expectancy"
                    onChange={(e) => handleLifeSpan(e)}
                    ></input>
                    <p className='msgErrors'>{errors2.lifeSpan}</p>
                </div>

                <div className="contenWH">
                        <h2 className="h2input">Weight</h2>
                        <input
                        className="inputWH"
                        name='weightMin'
                        placeholder="Min"
                        onChange={(e) => handleWeight(e)}
                        ></input>
                        <input
                        className="inputWH"
                        type='number'
                        name='weightMax'
                        placeholder="Max"
                        onChange={(e) => handleWeight(e)}
                        ></input>
                        <p className='msgErrors'>{errors2.weight}</p>
                </div>

                <div className="contenWH">
                    <h2 className="h2input">Height</h2>
                    <input
                    className="inputWH"
                    type='number'
                    name='heightMin'
                    placeholder="Min"
                    onChange={(e) => handleHeight(e)}
                    ></input>
                    <input
                    className="inputWH"
                    type='number'
                    name='heightMax'
                    placeholder="Max"
                    onChange={(e) => handleHeight(e)}
                    ></input>
                    <p className='msgErrors'>{errors2.height}</p>
                </div>


                <div>
                    <div className="contenSelectTemps">
                        <label>Select temperaments </label>
                        <select onChange={(e) => handleTemperaments(e)}
                        className='optionsTemps'>
                        <option disabled selected defaultValue>...</option>
                        {
                            temperaments?.map((temp) => (
                            <option value={temp} key={temp} 
                            >
                            {temp}
                            </option>
                        ))
                        }
                        </select>
                        <p className='msgErrors'>{errors2.temperaments}</p>
                    </div>
                    <div className="contenTempsSelects">
                        {
                        input.temperamentsInput?.map((temp) => {
                            return (
                                <input
                                  className="selecttemps"
                                  type="button"
                                  value={temp}
                                  onClick={(e) => handleRemove(e)}
                                />
                        )}) 
                        }
                    </div>
                </div>


                <div className="selectImage">
                    <label>Image </label>
                    <input
                    className="inputImage"
                    type='text'
                    placeholder='URL...'
                    onChange={(e) => handleImage(e)} >
                    </input>
                    <p className='msgErrors'>{errors2.image}</p>
                </div>


                {   input.name !== '' &&
                    input.image !== '' &&
                    input.lifeSpan !== '' &&
                    input.weightMin !== 0 &&
                    input.weightMax !== 0 &&
                    input.heightMin !== 0 &&
                    input.heightMax !== 0 &&
                    input.temperamentsInput.length !== 0 &&

                    <button
                    className="buttonSubmit"
                    type="submit">
                    Create Dog
                    </button>
                
                }

            </form>
        </div>
    )
};  

