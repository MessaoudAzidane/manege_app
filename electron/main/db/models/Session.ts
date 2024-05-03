import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { Sale, SaleId } from './Sale';

export interface SessionAttributes {
  id: number;
  opened_at?: Date;
  closed_at?: Date;
  bilan_comptable?: number;
  bilan_reel?: number;
  ecart?: number;
  created_at?: Date;
  updated_at?: Date;
  deleted_at?: Date;
}

export type SessionPk = "id";
export type SessionId = Session[SessionPk];
export type SessionOptionalAttributes = "id" | "opened_at" | "closed_at" | "bilan_comptable" | "bilan_reel" | "ecart" | "created_at" | "updated_at" | "deleted_at";
export type SessionCreationAttributes = Optional<SessionAttributes, SessionOptionalAttributes>;

export class Session extends Model<SessionAttributes, SessionCreationAttributes> implements SessionAttributes {
  id!: number;
  opened_at?: Date;
  closed_at?: Date;
  bilan_comptable?: number;
  bilan_reel?: number;
  ecart?: number;
  created_at?: Date;
  updated_at?: Date;
  deleted_at?: Date;

  // Session hasMany Sale via session_id
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

  static initModel(sequelize: Sequelize.Sequelize): typeof Session {
    return Session.init({
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    opened_at: {
      type: DataTypes.DATE,
      allowNull: true
    },
    closed_at: {
      type: DataTypes.DATE,
      allowNull: true
    },
    bilan_comptable: {
      type: DataTypes.FLOAT,
      allowNull: true
    },
    bilan_reel: {
      type: DataTypes.FLOAT,
      allowNull: true
    },
    ecart: {
      type: DataTypes.FLOAT,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'session',
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
