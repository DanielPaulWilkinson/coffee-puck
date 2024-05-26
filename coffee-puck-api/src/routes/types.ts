import express, { NextFunction, Request, Response } from 'express';
import { Schemas, ValidateSchema } from '../middleware/validateSchema';
import { GetType, GetTypePage } from '../controllers/coffeeTypes';
const router = express.Router();

router.get('/get/:type', ValidateSchema(Schemas.types.get), GetType);
router.get('/get', ValidateSchema(Schemas.types.get), GetTypePage);
export = router;