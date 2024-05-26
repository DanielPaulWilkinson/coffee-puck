import express, { NextFunction, Request, Response } from 'express';
import { Schemas, ValidateSchema } from '../middleware/validateSchema';
import { GetCoffee, GetCoffeePage, CreateCoffee } from '../controllers/coffee';
const router = express.Router();

router.get('/get/:coffee', ValidateSchema(Schemas.coffee.get), GetCoffee);
router.get('/get', ValidateSchema(Schemas.coffee.getPage), GetCoffeePage);
router.post('/create', ValidateSchema(Schemas.coffee.post), CreateCoffee);

export = router;