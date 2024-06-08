import express from 'express';
import { Schemas, ValidateSchema } from '../middleware/validateSchema';
import { getStatistics } from '../controllers/stats';
const router = express.Router();

router.get('/get', ValidateSchema(Schemas.stats.get), getStatistics);

export = router;