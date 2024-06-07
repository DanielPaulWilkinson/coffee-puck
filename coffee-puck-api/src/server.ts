import express from 'express';
import http from 'http';
import Logging from './logging/logging';
import { config } from './config/config';
import brewRoutes from './routes/brew'
import coffeeRoutes from './routes/coffee';
import typeRoutes from './routes/types';
import varietyRoutes from './routes/varieties';
import beanRoutes from './routes/bean';

const router = express();

router.set('port', process.env.PORT || 3000);

const StartServer = () => {
    router.use((req, res, next) => {
        Logging.info(`Incoming -> Method: [${req.method}] - URL: [${req.url}] - IP: [${req.socket.remoteAddress}]`);

        res.on('finish', () => {
            Logging.info(`Incoming -> Method: [${req.method}] - URL: [${req.url}] - IP: [${req.socket.remoteAddress}] - Status [${res.statusCode}]`);
        });

        next();
    });

    router.use(express.urlencoded({ extended: true }));
    router.use(express.json());
    router.use((req, res, next) => {
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');

        if (req.method == 'OPTIONS') {
            res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
            return res.status(200).json({});
        }

        next();
    });

    router.use('/brew', brewRoutes);
    router.use('/coffee', coffeeRoutes);
    router.use('/types', typeRoutes);
    router.use('/varieties', varietyRoutes)
    router.use('/bean', beanRoutes)

     /** Health check */
     router.get('/ping', (req, res, next) => {
        Logging.info('Called me');
        return res.status(200).json({ message: 'world' });
    });

    /** Error Handling */
    router.use((req, res, next) => {
        const error = new Error('Not found');

        Logging.error(error);

        return res.status(404).json({
            message: error.message
        });
    });

    /** Create Server */
    http.createServer(router).listen(config.server.port, () => Logging.info(`Server is running on port ${config.server.port}`));
}

StartServer();
