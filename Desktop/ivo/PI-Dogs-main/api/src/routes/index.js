const { Router } = require('express');
const axios = require ('axios');
const { Dog, Temperament } = require("../db");
const {  getAllDogs, getTemperaments, getDogsApi, getDogsDb } = require('../controlers');
const router = Router();

router.get('/dogs/api', async(req, res) => {
    res.status(200).send(await getDogsApi())
})

router.get('/dogs/db', async(req, res) => {
    res.status(200).send(await getDogsDb())
})

router.get('/dogs', async (req, res) => {
    try {
        let dogs = await getAllDogs();
        const { name } = req.query;
        if  (name) {
        let dogsFilter = dogs.filter(dog => dog.name.toLowerCase().includes(name.toLowerCase()))
        if (dogsFilter.length > 0) {
            res.status(200).json(dogsFilter)
        } else {
            res.status(404).send({'msg': 'no se encontro'})
        }
        } else {
            res.status(200).json(dogs)
        }

    } catch (error) {
        res.status(404).json(error)
    }
})

router.get('/dogs/:id', async(req, res) => {
    try {
        const id = req.params.id;
        let detailDog = await getAllDogs()
        detailDog = detailDog.filter(dog => dog.id == id)
        res.status(200).json(detailDog)
    } catch (error) {
        res.status(404).send(error)
    }
    
})

router.get('/temperaments', async (req, res) => {
    res.status(200).send(await getTemperaments())
})

router.post('/dogs', async (req, res) => {
    const { image, name, heightMin, heightMax, weightMin, weightMax, lifeSpan, temperamentsInput } = req.body;
    let findDog = await getAllDogs()
    findDog = findDog.filter((dog) => dog.name.toLowerCase() === name.toLowerCase())
    if (!findDog.length) {
        const dogCreate = await Dog.create({
            image: image,
            name: name,
            weightMin: weightMin,
            weightMax: weightMax,
            heightMin: heightMin,
            heightMax: heightMax,
            lifeSpan: lifeSpan,
            })

    const tempsID = []
    const temps = await Temperament.findAll()
    for (let i = 0; i < temps.length; i++) {
        for (let j = 0; j < temperamentsInput.length; j++) {
            if (temperamentsInput[j] === temps[i].dataValues.name.toLowerCase()){ 
                tempsID.push(temps[i].dataValues.id)
            }            
        }
    }
    if (temperamentsInput.length === 1){
            await dogCreate.addTemperament(tempsID)
            } else {
            await dogCreate.addTemperaments(tempsID)
            }
    res.send(dogCreate)
            }                
})









// router.delete('/delete', async(req, res) => {
//     const { name } = req.query
//     await Dog.destroy({
//         where:{ name: name}
//     })
//     res.status(200).send(name)
// })



module.exports = router;
