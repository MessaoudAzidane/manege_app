import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { Sale, SaleId } from './Sale';

export interface ProductAttributes {
  id: number;
  name?: string;
  price?: number;
  nb_ticket?: number;
  description?: string;
  created_at?: Date;
  updated_at?: Date;
  deleted_at?: Date;
}

export type ProductPk = "id";
export type ProductId = Product[ProductPk];
export type ProductOptionalAttributes = "id" | "name" | "price" | "nb_ticket" | "description" | "created_at" | "updated_at" | "deleted_at";
export type ProductCreationAttributes = Optional<ProductAttributes, ProductOptionalAttributes>;

export class Product extends Model<ProductAttributes, ProductCreationAttributes> implements ProductAttributes {
  id!: number;
  name?: string;
  price?: number;
  nb_ticket?: number;
  description?: string;
  created_at?: Date;
  updated_at?: Date;
  deleted_at?: Date;

  // Product hasMany Sale via product_id
  sales!: Sale[];
  getSales!: Sequelize.HasManyGetAssociationsMixin<Sale>;
  setSales!: Sequelize.HasManySetAssociationsMixin<Sale, SaleId>;
  addSale!: Sequelize.HasManyAddAssociationMixin<Sale, SaleId>;
  addSales!: Sequelize.HasManyAddAssociationsMixin<Sale, SaleId>;
  createSale!: Sequelize.HasManyCreateAssociationMixin<Sale>;
  removeSale!: Sequelize.HasManyRemoveAssociationMixin<Sale, SaleId>;
  removeSales!: Sequelize.HasManyRemoveAssociationsMixin<Sale, SaleId>;
  hasSale!: Sequelize.HasManyHasAssociationMixin<Sale, SaleId>;
  hasSales!: Sequelize.HasManyHasAssociationsMixin<Sale, SaleId>;
  countSales!: Sequelize.HasManyCountAssociationsMixin;

  static initModel(sequelize: Sequelize.Sequelize): typeof Product {
    return Product.init({
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    price: {
      type: DataTypes.FLOAT,
      allowNull: true
    },
    nb_ticket: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'product',
    timestamps: true,
    paranoid: true,
    deletedAt: 'deleted_at',
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
  }
}
