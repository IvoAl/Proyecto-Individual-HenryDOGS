const axios = require ('axios');
const { Dog, Temperament } = require("./db");


    
getDogsApi = async () => {
    let dogsApi = await axios('https://api.thedogapi.com/v1/breeds')
    dogsApi = dogsApi.data.map(({id, image, name, life_span, weight, height, temperament}) => {
    
    if (name === 'Olde English Bulldogge') weight.metric = '10 - 30'
    if (name === 'Smooth Fox Terrier') weight.metric = '6 - 8'
    weight = weight.metric.split('-')
    height = height.metric.split('-')
    let weightMin = parseInt(weight[0])
    let weightMax = parseInt(weight[1])
    let heightMin = parseInt(height[0])
    let heightMax = parseInt(height[1])
        return {
            id: id,
            image: image.url,
            name: name,
            lifeSpan: life_span,
            weightMin: weightMin,
            weightMax: weightMax ? weightMax : weightMin + 2,
            heightMin: heightMin,
            heightMax: heightMax,
            temperaments: temperament,
            }});
    return dogsApi;
    }

getDogsDb = async () => {
    const allDogs = await Dog.findAll({
            include:{
            model: Temperament,
            attributes: ['name'],
            through: {
            attributes: [],
            }, 
            }})
    
    const allDogsFinal = allDogs.map((dog) => { 
        
        const temps = [];
        for (let i = 0; i < dog.dataValues.temperaments.length; i++) {
            temps.push(dog.dataValues.temperaments[i].dataValues.name)
            }
        return {
            id: dog.dataValues.id,
            image: dog.dataValues.image,
            name: dog.dataValues.name,
            lifeSpan: dog.dataValues.lifeSpan,
            weightMin: dog.dataValues.weightMin,
            weightMax: dog.dataValues.weightMax,
            heightMin: dog.dataValues.heightMin,
            heightMax: dog.dataValues.heightMax,
            temperaments: temps.join(', '), // 'active, happy,' ['avtive', "happy"]
            }
            })
        return allDogsFinal;
    }

getAllDogs = async () => {
        const dogsApi = await getDogsApi()
        const dogsDb = await getDogsDb()
        const allDogs = dogsApi.concat(dogsDb)
        return allDogs;
    }
  
    

    
getTemperaments = async () => {
            let dogs = await getDogsApi();
            let allTemperaments = [];
            for (let i = 0; i < dogs.length; i++) {
                if (dogs[i].temperaments) {
                let temp = dogs[i].temperaments.split(', ')
              for (let j = 0; j < temp.length; j++) {
                allTemperaments.push(temp[j])
                }
                }
            };    
            for (var i = allTemperaments.length -1 ; i > 0 ; i--){
                if (allTemperaments.indexOf(allTemperaments[i]) !== i) allTemperaments.splice(i, 1)
            };    
            allTemperaments.map((temp) => {
                Temperament.findOrCreate({
                 where:{
                 name: temp
                }})
                });   
            const tempsDb = [];
            const temps = await Temperament.findAll();
                temps.map((temp) => {
                tempsDb.push(temp.dataValues.name)
                });
            return tempsDb.sort();
    }
    
module.exports = {
    getDogsApi,
    getDogsDb,
    getAllDogs,
    getTemperaments
    }