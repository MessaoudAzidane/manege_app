/* eslint-disable @typescript-eslint/no-unused-vars */
import { IpcMain, IpcMainInvokeEvent } from 'electron';
import { IpcChannels } from '../utils';
import {  Product } from '../../db/models/init-models';

export class ProdcutManagement {
  constructor(private ipcMain: IpcMain){
    this.registerEvents();
  }

  private registerEvents() {
    console.log("Registering Product events...");
    
    this.ipcMain.handle(IpcChannels.products.getAll, this.handleGetAllProducts.bind(this))


    console.log("\t Registered TicketsManagement events.");
  }

  private async handleGetAllProducts(
    event: IpcMainInvokeEvent,
    pwd: string
  ){
    const products = await Product.findAll({
      attributes: ["id", "name", "price", "nb_ticket", "description"],
      order: [
        ["nb_ticket", "ASC"]
      ]
    });

    return {
      success: true, 
      data: products.map(prod => { return{id: prod.dataValues.id, name: prod.dataValues.name, price: prod.dataValues.price, nb_ticket: prod.dataValues.nb_ticket, description: prod.dataValues.description }})
    }
  }

}