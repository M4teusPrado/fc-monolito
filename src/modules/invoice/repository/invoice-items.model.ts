import { Column, ForeignKey, Model, PrimaryKey, Table } from "sequelize-typescript";
import { InvoiceModel } from "./invoice.model";

@Table({
    tableName: "products",
    timestamps: false,
})
export class InvoiceItemsModel extends Model {
    @PrimaryKey
    @Column({ allowNull: false })
    id: string;
  
    @ForeignKey(() => InvoiceModel)
    @Column({ allowNull: false })
    invoiceId: string;
  
    @Column({ allowNull: false })
    name: string;
  
    @Column({ allowNull: false })
    price: number;
  }
  