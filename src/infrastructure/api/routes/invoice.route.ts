import express, {Request, Response} from 'express';
import InvoiceFacadeFactory from '../../../modules/invoice/factory/facade.factory';

export const invoiceRoute = express.Router();

invoiceRoute.get("/", async (req: Request, res: Response) => {
    const invoiceFacade = InvoiceFacadeFactory.create();

    try {
        let pId = req.query.invoiceId + "";
        console.log("invoiceRoute.get ID: " + pId);
        const invoiceResult = await invoiceFacade.findInvoice({ id: pId });

        res.status(200).send(invoiceResult);
    } catch (err) {
        console.log("######################");
        console.log(err);
        let obj = `{ ${err} }`;
        res.status(500).send(obj);
    }
});
