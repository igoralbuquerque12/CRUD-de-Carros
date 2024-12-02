const express = require('express')
const router = express.Router()
const carroController = require('./carrosController')

router
    .route('/')
    .get(carroController.getAllCarros)
    .post(carroController.createCarro)

router
    .route('/:id')
    .get(carroController.getOneCarro)
    .patch(carroController.updateCarro)
    .delete(carroController.deleteCarro)

module.exports = router