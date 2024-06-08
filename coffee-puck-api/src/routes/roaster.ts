import express from 'express';
import { Schemas, ValidateSchema } from '../middleware/validateSchema';
import { GetRoaster, GetRoasterPage } from '../controllers/roaster';
const router = express.Router();

router.get('/get/:id', ValidateSchema(Schemas.roaster.get), GetRoaster);
router.get('/get', ValidateSchema(Schemas.roaster.getPage), GetRoasterPage);

export = router;