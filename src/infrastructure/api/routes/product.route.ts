import ProductAdmFacadeFactory from "../../../modules/product-adm/factory/facade.factory";
import express, {Request, Response} from 'express';

export const productRoute = express.Router();

productRoute.post("/", async (req: Request, res: Response) => {
    const productFacade = ProductAdmFacadeFactory.create();
    try {
        const input = {
            id: req.body.id,
            name: req.body.name,
            description: req.body.description,
            purchasePrice: req.body.purchasePrice,
            salesPrice: req.body.salesPrice,
            stock: req.body.stock
          };        

        console.log("productRoute.post ID: " + input.id);
        await productFacade.addProduct(input);
        res.status(200).send(input);
    } catch (err) {
        console.log("######################");
        console.log(err);
        res.status(500).send(err);
    }
});
