import express from 'express';
import { GetAllCoffeeResults, GetAllCoffeeTargets, GetAllResultsPage } from "../controllers/scrape";
const router = express.Router();

router.get('/get/targets', GetAllCoffeeTargets);
router.get('/get/results', GetAllCoffeeResults);

router.post('/get', GetAllResultsPage);

export = router;