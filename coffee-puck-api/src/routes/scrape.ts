import express from 'express';
import { GetAllCoffeeResults, GetAllCoffeeTargets, GetAllResultsPage, GetAllScrapeLogs, runCoffeeScrape } from "../controllers/scrape";
const router = express.Router();

router.get('/get/targets', GetAllCoffeeTargets);
router.get('/get/results', GetAllCoffeeResults);
router.get('/get/logs', GetAllScrapeLogs);


router.post('/get', GetAllResultsPage);
router.get('/run', runCoffeeScrape);

export = router;