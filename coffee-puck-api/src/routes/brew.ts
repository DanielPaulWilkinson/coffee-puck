import express from 'express';
import { GetBrew, GetBrewPage, CreateBrew, UpdateBrew } from '../controllers/brew';
const router = express.Router();

router.get('/get/:id', GetBrew);
router.get('/get', GetBrewPage);
router.post('/create', CreateBrew);
router.post('/update/:id', UpdateBrew);

export = router;