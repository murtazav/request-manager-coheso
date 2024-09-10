import { Response } from "express";
import { AuthMiddleware } from "../middlewares";
import { DataRequestService } from "../services";
import { INTERNAL_SERVER_ERROR_MESSAGE } from "../utils/constants";

export const getDataRequests = async (req: AuthMiddleware.CustomRequest, res: Response) => {
    try {
        const dataRequests = await DataRequestService.getDataRequest(req?.user?.id as number);
        res.send({ dataRequests });
    } catch (error) {
        console.error(error);
        res.status(500).send(INTERNAL_SERVER_ERROR_MESSAGE);
    }
}

export const createDataRequest = async (req: AuthMiddleware.CustomRequest, res: Response) => {
    const dataRequest = req.body;
    dataRequest.userId = req?.user?.id;
    try {
        await DataRequestService.createDataRequest(dataRequest);
        res.send({ dataRequest });
    } catch (error) {
        console.error(error);
        res.status(500).send(INTERNAL_SERVER_ERROR_MESSAGE);
    }
}

export const updateDataRequest = async (req: AuthMiddleware.CustomRequest, res: Response) => {
    const dataRequest = req.body;
    dataRequest.userId = req?.user?.id;
    try {
        await DataRequestService.updateDataRequest(dataRequest);
        res.send({ dataRequest });
    } catch (error) {
        console.error(error);
        res.status(500).send(INTERNAL_SERVER_ERROR_MESSAGE);
    }
}