import { BelongsTo, Column, ForeignKey, HasMany, Model, PrimaryKey, Table } from "sequelize-typescript";
import ClientModel from "./client.model";
import OrderItemModel from "./order.item.model";

@Table({
    tableName: "order",
    timestamps: false,
})
export default class OrderModel extends Model {

    @PrimaryKey
    @Column
    declare id: string;

    @ForeignKey(() => ClientModel)
    @Column({ allowNull: false })
    declare client_id: string;

    @BelongsTo(() => ClientModel)
    declare client: ClientModel;

    @HasMany(() => OrderItemModel)
    declare items: OrderItemModel[];

    @Column({ allowNull: false })
    status: string;

    @Column({ allowNull: false })
    createdAt: Date;

    @Column({ allowNull: false })
    updatedAt: Date;
}
