import express from 'express';
import { GetRoaster, GetRoasterPage, createRoaster, updateRoaster } from '../controllers/roaster';
const router = express.Router();

router.get('/get/:id', GetRoaster);
router.get('/get', GetRoasterPage);
router.post('/create', createRoaster);
router.post('/update/:id', updateRoaster);
export = router;