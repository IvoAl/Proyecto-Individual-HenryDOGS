import axios from 'axios'


export const getDogs = () => dispatch => {
    fetch ('http://localhost:3001/dogs')
    .then(response => response.json())
    .then(response => {dispatch({type:'GET_DOGS', payload: response})})
}

export const getTemperaments = () => dispatch => {
    fetch ('http://localhost:3001/temperaments')
    .then(response => response.json())
    .then(response => {dispatch({type:'GET_TEMPERAMENTS', payload: response})})
}

export function filterByTemperaments (payload) {
    return ({
        type: 'FILTER_TEMPERAMENTS',
        payload
    })
}      

export const filterByRaza = (value) => dispatch => {
    fetch (`http://localhost:3001/${value}`)
    .then(response => response.json())
    .then(response => {dispatch({
        type: 'FILTER_RAZA',
        payload: response,
        value: value,
    })})
}

export function search (value) { //a
    return async function (dispatch) {
        try {
            const dogsSearch = await axios(`http://localhost:3001/dogs?name=${value}`)
            if (dogsSearch.data.length === 0) {
                throw Error
            }else {
                return dispatch({
                    type: 'SEARCH',
                    payload: dogsSearch.data
                })
            }
        } catch (error) {
            return alert("No Matches!")
        }
    }
}

export function orderByName (payload) {
    return ({
        type: 'ORDER_BY_NAME',
        payload: payload
    })
}

export function orderByWeight (payload) {
    return ({
        type: 'ORDER_BY_WEIGHT',
        payload: payload
    })
}

export const dogDetails = (id) => dispatch => {
    fetch (`http://localhost:3001/dogs/${id}`)
    .then(response => response.json())
    .then(response => {dispatch({
        type: 'DOG_DETAILS',
        payload: response
    })})
}

export function cleanDetail () {
    return ({
        type: 'CLEAN_DETAIL'
    })
}

export function cleanHome () {
    return ({
        type: 'CLEAN_HOME'
    })
}

export function postDog (input) {
        return async function() {
            await axios.post('http://localhost:3001/dogs', input)
        }
}

export function savePage (payload) {
    return function (dispatch) {
        return dispatch ({
            type: "SAVE_PAGE",
            payload
        })
    }
}


















// export const search = (value) => dispatch => {
//     try {
//          fetch (`http://localhost:3001/dogs?name=${value}`)
//         .then(response => response.json())
//         .then(response => {dispatch({
//             type:'SEARCH',
//             payload: response,
//         })})
//     } catch (error) {
//         return alert("perro no encontrado")
//     }
// }

// export const getDogs = () => async dispatch => {
//     await axios('http://localhost:3001/dogs')
//     .then(resp => {dispatch({type: GET_DOGS, payload: resp.data})})
//     .catch(e => console.log(e))
// // }

