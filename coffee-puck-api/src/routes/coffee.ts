import express, { NextFunction, Request, Response } from 'express';
import { Schemas, ValidateSchema } from '../middleware/validateSchema';
import { GetCoffee, GetCoffeePage, CreateCoffee, UpdateCoffee } from '../controllers/coffee';
const router = express.Router();

router.get('/get/:coffee', ValidateSchema(Schemas.coffee.get), GetCoffee);
router.get('/get', ValidateSchema(Schemas.coffee.getPage), GetCoffeePage);
router.post('/create', ValidateSchema(Schemas.coffee.post), CreateCoffee);
router.post('/update/:id', ValidateSchema(Schemas.coffee.update), UpdateCoffee);

export = router;