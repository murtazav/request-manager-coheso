import { Router, Request, Response } from 'express';
import { DataRequestController } from '../controllers';
import { AuthMiddleware } from '../middlewares';

const router = Router();
router.get('/', AuthMiddleware.verifyToken, DataRequestController.getDataRequests);
router.get('/:id', AuthMiddleware.verifyToken, DataRequestController.getDataRequest);
router.post('/', AuthMiddleware.verifyToken, DataRequestController.createDataRequest);
router.put('/', AuthMiddleware.verifyToken, DataRequestController.updateDataRequest);
router.delete('/:id', AuthMiddleware.verifyToken, DataRequestController.deleteDataRequest);

export default router;