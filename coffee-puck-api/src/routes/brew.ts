import express, { NextFunction, Request, Response } from 'express';
import { Schemas, ValidateSchema } from '../middleware/validateSchema';
import { GetBrew, GetBrewPage, CreateBrew } from '../controllers/brew';
const router = express.Router();

router.get('/get/:brew', ValidateSchema(Schemas.brew.get), GetBrew);
router.get('/get', ValidateSchema(Schemas.brew.getPage), GetBrewPage)
router.post('/create', ValidateSchema(Schemas.brew.post), CreateBrew)

export = router;