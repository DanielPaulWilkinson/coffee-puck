import express from 'express';
import { Schemas, ValidateSchema } from '../middleware/validateSchema';
import { GetVariety, GetVarietyPage } from '../controllers/varieties';
const router = express.Router();

router.get('/get/:id', ValidateSchema(Schemas.varieties.get), GetVariety);
router.get('/get', ValidateSchema(Schemas.varieties.getPage), GetVarietyPage);

export = router;