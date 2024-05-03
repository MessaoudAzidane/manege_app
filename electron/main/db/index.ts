import { Sequelize } from 'sequelize';
import { initModels } from "./models/init-models"
import { DB_HOST, DB_NAME, DB_PASS, DB_USER } from '../constants';

export const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASS, {
  host: DB_HOST,
  dialect: "mysql",
  sync: {
    force: true,
  },
});

export const initDb = async () => {
  console.log("connecting to the DB...")
  try{
    initModels(sequelize);
    console.log("Connected to the DB.")

  }catch (err) {
    console.log("unable to connect to the db ", err);
  }
  
}