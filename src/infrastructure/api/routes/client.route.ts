import express, {Request, Response} from 'express';
import ClientAdmFacadeFactory from '../../../modules/client-adm/factory/client-adm.facade.factory';
import Address from '../../../modules/@shared/domain/value-object/address';

export const clientRoute = express.Router();

clientRoute.post("/", async (req: Request, res: Response) => {
    const clientFacade = ClientAdmFacadeFactory.create();

    try {
        const input = {
            id: req.body.id,
            name: req.body.name,
            email: req.body.email,
            document: req.body.document,
            address: new Address(
                req.body.address.street,
                req.body.address.number,
                req.body.address.neighborhood,
                req.body.address.city,
                req.body.address.state,
                req.body.address.zipCode
            )
          };        

        console.log("clientRoute.post ID: " + input.id);
        await clientFacade.add(input);
        const clientResult = await clientFacade.find({ id: input.id });

        res.status(200).send(clientResult);
    } catch (err) {
        console.log("######################");
        console.log(err);
        res.status(500).send(err);
    }
});
