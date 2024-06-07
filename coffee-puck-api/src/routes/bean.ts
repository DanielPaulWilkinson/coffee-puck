import express from 'express';
import { Schemas, ValidateSchema } from '../middleware/validateSchema';
import { getBean, getBeanPage } from '../controllers/bean';
const router = express.Router();

router.get('/get/:id', ValidateSchema(Schemas.bean.get), getBean);
router.get('/get', ValidateSchema(Schemas.bean.getPage), getBeanPage);

export = router;