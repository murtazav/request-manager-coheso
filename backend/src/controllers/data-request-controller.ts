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

export const getDataRequest = async (req: AuthMiddleware.CustomRequest, res: Response) => {
    const id = parseInt(req.params.id);
    try {
        const dataRequest = await DataRequestService.getDataRequestById(req?.user?.id as number, id);
        res.send({ dataRequest });
    } catch (error) {
        console.error(error);
        res.status(500).send(INTERNAL_SERVER_ERROR_MESSAGE);
    }
}

export const createDataRequest = async (req: AuthMiddleware.CustomRequest, res: Response) => {
    const dataRequest = req.body;
    dataRequest.createdBy = req?.user?.id;
    try {
        await DataRequestService.createDataRequest(dataRequest);
        res.send("Data request created successfully");
    } catch (error) {
        console.error(error);
        res.status(500).send(INTERNAL_SERVER_ERROR_MESSAGE);
    }
}

export const updateDataRequest = async (req: AuthMiddleware.CustomRequest, res: Response) => {
    const dataRequest = req.body;
    const userId = req?.user?.id;
    try {
        await DataRequestService.updateDataRequest(dataRequest, userId as number);
        res.send({ dataRequest });
    } catch (error) {
        console.error(error);
        res.status(500).send(INTERNAL_SERVER_ERROR_MESSAGE);
    }
}

export const deleteDataRequest = async (req: AuthMiddleware.CustomRequest, res: Response) => {
    const id = parseInt(req.params.id);
    const userId = req?.user?.id;
    try {
        await DataRequestService.deleteDataRequest(id, userId as number);
        res.send({ id });
    } catch (error) {
        console.error(error);
        res.status(500).send(INTERNAL_SERVER_ERROR_MESSAGE);
    }
}