const { Router } = require('express');
const ClienteController = require('../controllers/ClienteController');

const routes = Router();

routes.post('/cliente', ClienteController.criar);

module.exports = routes;