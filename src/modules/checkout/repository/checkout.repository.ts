
import { v4 as uuid } from "uuid";
import Id from "../../@shared/domain/value-object/id.value-object";
import { ClientModel } from "../../client-adm/repository/client.model";
import Client from "../domain/client.entity";

import Product from "../domain/product.entity";
import CheckoutGateway from "../gateway/checkout.gateway";
import Order from "../domain/order.entity";
import OrderModel from "./order.model";
import OrderItemModel from "./order.item.model";
import Address from "../../@shared/domain/value-object/address";

export default class OrderRepository implements CheckoutGateway {

    
    async addOrder(input: Order): Promise<void> {
        const orderPersist = await OrderModel.create(
            {
                id: input.id.id,
                client_id: input.client.id.id,
                items: input.products.map((product) => ({
                    id: uuid(),
                    order_id: input.id.id,
                    product_id: product.id.id,
                    name: product.name,
                    description: product.description,
                    salesPrice: product.salesPrice,
                })),
                status: input.status,
                createdAt: input.createdAt,
                updatedAt: input.updatedAt,    
            },
            {
                include: [{ model: OrderItemModel }],
            },
        );
    }

    async findOrder(id: string): Promise<Order | null> {
        let orderModel;
        try {
            orderModel = await OrderModel.findOne({
                where: { id },
                include: ["items"],
                rejectOnEmpty: true,
            });
        } catch (error) {
            throw new Error("Order not found");
        }

        if (!orderModel) {
            throw new Error(`Order with id ${id} not found`);
        }
        if (!orderModel.items) {
            throw new Error(`Order Itens with id ${id} not found`);
        }

        const clientDb    = await ClientModel.findOne({ where: { id: orderModel.client_id } });
        if (!clientDb) {
            throw new Error("Client not found");
        }

        const client = new Client({
            id: new Id(clientDb.id),
            name: clientDb.name,
            email: clientDb.email,
            address: new Address(
                clientDb.street,
                clientDb.number,
                clientDb.complement,
                clientDb.city,
                clientDb.state,
                clientDb.zipcode
    
            )
            
        });


        const products = orderModel.items.map((item) => 
            {return new Product({
            id: new Id(item.product_id),
            name: item.name,
            description: item.description,
            salesPrice: item.salesPrice,
        })});

        return new Order({
            id: new Id(orderModel.id),
            client: client,
            products: products,
            status: orderModel.status
        });

    }

    
    
}