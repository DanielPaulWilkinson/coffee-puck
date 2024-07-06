import express, { NextFunction, Request, Response } from 'express';
import { Schemas, ValidateSchema } from '../middleware/validateSchema';
import { getCoffee, getCoffeePage, createCoffee, updateCoffee } from '../controllers/coffee';
const router = express.Router();

router.get('/get/:id', getCoffee);
router.get('/get', getCoffeePage);
router.post('/create', createCoffee);
router.post('/update/:id', updateCoffee);

export = router;