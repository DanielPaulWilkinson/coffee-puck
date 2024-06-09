import express, { NextFunction, Request, Response } from 'express';
import { Schemas, ValidateSchema } from '../middleware/validateSchema';
import { getCoffee, getCoffeePage, createCoffee, updateCoffee } from '../controllers/coffee';
const router = express.Router();

router.get('/get/:id', ValidateSchema(Schemas.coffee.get), getCoffee);
router.get('/get', ValidateSchema(Schemas.coffee.getPage), getCoffeePage);
router.post('/create', ValidateSchema(Schemas.coffee.post), createCoffee);
router.post('/update/:id', ValidateSchema(Schemas.coffee.update), updateCoffee);

export = router;