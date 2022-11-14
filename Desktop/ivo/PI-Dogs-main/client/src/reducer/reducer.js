
const initialState = {
    dogs: [],
    allDogs: [],
    dogsFilter: [],
    temperaments: [],
    valueFilterRaza: 'dogs',
    valueFilterTemps: 'dogs',
    dogsDetails: [],
    pages: 1,
};

function rootReducer (state = initialState, action) {
    switch (action.type) {
        case 'GET_DOGS':
            return {
                ...state,
                dogs: action.payload,
                allDogs: action.payload,
                dogsFilter: action.payload,
            };
        case 'GET_TEMPERAMENTS':
            return {
                ...state,
                temperaments: action.payload,   
            };
        case 'FILTER_TEMPERAMENTS':
            let filterDogs = [] 
            if (state.valueFilterRaza === 'dogs/db' || state.valueFilterRaza === 'dogs/api') {
                if (action.payload === 'dogs') {
                    return {
                        ...state,
                        dogs: state.dogsFilter,
                        valueFilterTemps: action.payload
                    }
                } else {
                    state.dogsFilter.map((dog) => {
                        if (dog.temperaments){
                            if (dog.temperaments.includes(action.payload)){
                                filterDogs.push(dog)
                            }
                        }
                    })
                return {
                    ...state,
                    dogs: filterDogs,
                    valueFilterTemps: action.payload
                    }
                }
            }
            if (state.valueFilterRaza === 'dogs' && action.payload !== 'dogs') {
                state.allDogs.map((dog) => {
                    if (dog.temperaments) {
                        if (dog.temperaments.includes(action.payload)) {
                            filterDogs.push(dog)
                        }
                    }
                })
                return {
                    ...state,
                    dogs: filterDogs,
                    valueFilterTemps: action.payload
                }
            }
            if (state.valueFilterRaza === 'dogs' && action.payload === 'dogs'){
                return {
                    ...state,
                    dogs: state.allDogs,
                    valueFilterTemps: action.payload
                } 
            };                          
        case 'FILTER_RAZA':
            let dogsFilter = []
            console.log(state.valueFilterTemps)
            console.log(action.payload)
            if (state.valueFilterTemps === 'dogs'){
                dogsFilter = action.payload
            }
            if (state.valueFilterTemps !== 'dogs'){
                action.payload.map((dog) => {
                    if (dog.temperaments) {
                        if (dog.temperaments.includes(state.valueFilterTemps)){
                            dogsFilter.push(dog)
                        }
                    }
                })
            }
            return {
                ...state,
                dogs: dogsFilter,
                dogsFilter: action.payload,
                valueFilterRaza: action.value
            };
        case 'ORDER_BY_NAME':
            let order = state.dogs
          if (action.payload === "Z-A"){
            order.sort((a, b) => {
                if (a.name > b.name) {
                    return -1;
                }
                if (b.name > a.name) {
                    return 1;
                }
                    return 0;
              })
           }
           if (action.payload === "A-Z"){
            order.sort((a, b) => {
                if (a.name > b.name) {
                    return 1;
                }
                if (b.name > a.name) {
                    return -1;
                }
                    return 0;
              })
           } 
            return {
                ...state,
                dogs: order
            };
        case 'ORDER_BY_WEIGHT':
            let orderByWeight = state.dogs
            if (action.payload === "Max"){
                orderByWeight.sort((a, b) => {
                    if (a.weightMax > b.weightMax) {
                        return -1;
                    }
                    if (b.weightMax > a.weightMax) {
                        return 1;
                    }
                        return 0;
                  })
            }
            if (action.payload === "Min"){
                orderByWeight.sort((a, b) => {
                    if (a.weightMin > b.weightMin) {
                        return 1;
                    }
                    if (b.weightMin > a.weightMin) {
                        return -1;
                    }
                        return 0;
                  })
            }
            return {
                ...state,
                dogs: orderByWeight
            };
        case 'SEARCH':
            return {
                ...state,
                dogs: action.payload,    
            };
        case 'DOG_DETAILS':
            return {
                ...state,
                dogsDetails: action.payload
            };
        case 'CLEAN_DETAIL':
            return {
                ...state,
                dogsDetails: []
            };
        case 'CLEAN_HOME':
            return {
                ...state,
                dogs: state.allDogs
            };
        case "SAVE_PAGE":
            return {
                 ...state,
                 pages: action.payload
            };
        default:
            return {...state}
    };
};

export default rootReducer