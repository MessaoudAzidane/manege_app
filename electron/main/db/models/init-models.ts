import type { Sequelize } from "sequelize";
import { Account as _Account } from "./Account";
import type { AccountAttributes, AccountCreationAttributes } from "./Account";
import { Product as _Product } from "./Product";
import type { ProductAttributes, ProductCreationAttributes } from "./Product";
import { Sale as _Sale } from "./Sale";
import type { SaleAttributes, SaleCreationAttributes } from "./Sale";
import { Session as _Session } from "./Session";
import type { SessionAttributes, SessionCreationAttributes } from "./Session";

export {
  _Account as Account,
  _Product as Product,
  _Sale as Sale,
  _Session as Session,
};

export type {
  AccountAttributes,
  AccountCreationAttributes,
  ProductAttributes,
  ProductCreationAttributes,
  SaleAttributes,
  SaleCreationAttributes,
  SessionAttributes,
  SessionCreationAttributes,
};

export function initModels(sequelize: Sequelize) {
  const Account = _Account.initModel(sequelize);
  const Product = _Product.initModel(sequelize);
  const Sale = _Sale.initModel(sequelize);
  const Session = _Session.initModel(sequelize);

  Sale.belongsTo(Product, { as: "product", foreignKey: "product_id"});
  Product.hasMany(Sale, { as: "sales", foreignKey: "product_id"});
  Sale.belongsTo(Session, { as: "session", foreignKey: "session_id"});
  Session.hasMany(Sale, { as: "sales", foreignKey: "session_id"});

  return {
    Account: Account,
    Product: Product,
    Sale: Sale,
    Session: Session,
  };
}
