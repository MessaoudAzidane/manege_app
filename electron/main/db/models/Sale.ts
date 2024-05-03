import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { Product, ProductId } from './Product';
import type { Session, SessionId } from './Session';

export interface SaleAttributes {
  id: number;
  product_id?: number;
  session_id?: number;
  refunded?: number;
  bar_code?: string;
  created_at?: Date;
  updated_at?: Date;
  deleted_at?: Date;
}

export type SalePk = "id";
export type SaleId = Sale[SalePk];
export type SaleOptionalAttributes = "id" | "product_id" | "session_id" | "refunded" | "bar_code" | "created_at" | "updated_at" | "deleted_at";
export type SaleCreationAttributes = Optional<SaleAttributes, SaleOptionalAttributes>;

export class Sale extends Model<SaleAttributes, SaleCreationAttributes> implements SaleAttributes {
  id!: number;
  product_id?: number;
  session_id?: number;
  refunded?: number;
  bar_code?: string;
  created_at?: Date;
  updated_at?: Date;
  deleted_at?: Date;

  // Sale belongsTo Product via product_id
  product!: Product;
  getProduct!: Sequelize.BelongsToGetAssociationMixin<Product>;
  setProduct!: Sequelize.BelongsToSetAssociationMixin<Product, ProductId>;
  createProduct!: Sequelize.BelongsToCreateAssociationMixin<Product>;
  // Sale belongsTo Session via session_id
  session!: Session;
  getSession!: Sequelize.BelongsToGetAssociationMixin<Session>;
  setSession!: Sequelize.BelongsToSetAssociationMixin<Session, SessionId>;
  createSession!: Sequelize.BelongsToCreateAssociationMixin<Session>;

  static initModel(sequelize: Sequelize.Sequelize): typeof Sale {
    return Sale.init({
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    product_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'product',
        key: 'id'
      }
    },
    session_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'session',
        key: 'id'
      }
    },
    refunded: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0
    },
    bar_code: {
      type: DataTypes.STRING(100),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'sale',
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
      {
        name: "sale_product_id_fk",
        using: "BTREE",
        fields: [
          { name: "product_id" },
        ]
      },
      {
        name: "sale_session_id_fk",
        using: "BTREE",
        fields: [
          { name: "session_id" },
        ]
      },
    ]
  });
  }
}
