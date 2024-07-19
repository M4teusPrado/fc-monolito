
import express, {Request, Response} from 'express';
import PlaceOrderFacadeFactory from '../../../modules/checkout/factory/place-order.facade.factory';

export const checkoutRoute = express.Router();

checkoutRoute.post("/", async (req: Request, res: Response) => {
    const orderFacade = PlaceOrderFacadeFactory.create();

    try {
        const products = [];
        let productsBody = req.body.products;
        /*console.log("productsBody.length: " + productsBody.length);
        for (let index = 0; index < productsBody.length; index++) {
            console.log("productsBody[index].productId: " + productsBody[index].productId);
            const product = {
                productId: productsBody[index].productId
            }; 
            products.push(product);
        }

        console.log("productsBody: " + productsBody);
        console.log("products: " + products);
        products.forEach(function (item) {
            console.log("products:" + item);
        });*/

        const input = {
            clientId: req.body.clientId,
            products: productsBody,
        };          

        console.log("checkoutRoute.post clientId: " + input.clientId);
        const output = await orderFacade.process(input);

        res.status(200).send(output);
    } catch (err) {
        console.log("ERRO: " + err);
        let obj = `{ ${err} }`;
        res.status(500).send(obj);
    }
});
