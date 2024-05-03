/* eslint-disable @typescript-eslint/no-unused-vars */
import { BrowserWindow, IpcMain, IpcMainInvokeEvent, app } from 'electron';
import { IpcChannels } from '../utils';
import * as path from "path";
import { Product, Sale } from '../../db/models/init-models';
import * as fs from "fs";
import moment from "moment";

import * as bwipjs from 'bwip-js';

export class TicketsManagement {
  constructor(private ipcMain: IpcMain){
    this.registerEvents();
  }

  private registerEvents() {
    console.log("Registering TicketsManagement events...");
    
    this.ipcMain.handle(IpcChannels.ticket.print, this.handlePrintTicket.bind(this))
    this.ipcMain.handle(IpcChannels.ticket.cancel, this.handleCancelTicket.bind(this))

    console.log("\t Registered TicketsManagement events.");
  }

  private async handlePrintTicket(
    event: IpcMainInvokeEvent,
    data: any
  ) {
    const barcodeData = Date.now().toString();
    const product = (await Product.findByPk(data.product.id))?.dataValues;
    this.printTicket(barcodeData, product);
    
    const ticket = await Sale.create({product_id: data.product.id, session_id: data.session.id, bar_code: barcodeData});
    await ticket.save();
  }

  private async handleCancelTicket(
    event: IpcMainInvokeEvent,
    barCode: string
  ) {
    const sale = await Sale.findOne({where: {bar_code: barCode}});
    if (sale) {
      const product = await Product.findByPk(sale.dataValues.product_id);
      if (sale.dataValues.refunded && sale.dataValues.refunded >= product!.dataValues.nb_ticket!) {   
        return {
          success: false,
          message: "Vous avez déjà annulé tous les tickets"
        };
      }
      const refunded = sale.dataValues.refunded ? sale.dataValues.refunded + 1 : 1;
      await sale.update({
        refunded
      });

      return {
        success: true
      }
    }else {
      return {
        success: false,
        message: "Code barre incorrect."
      }
      
    }
  }

  private async printTicket(barcodeData: string, product: any) {
    let printWindow = new BrowserWindow({ show: false });

    try {
        const barcodeBuffer = bwipjs.code128({
            bcid: "code128",
            text: barcodeData,
            scale: 3,
            height: 10,
        });

        const barcodeUrl = `data:image/png;base64,${(await barcodeBuffer).toString('base64')}`;
        const receiptData = ""; // Replace this with your receipt data

        // Load the logo image
        const logoPath = path.join(app.getAppPath(), '/public/logo.png'); // Replace with the actual path to your logo file
        const logoBase64 = fs.readFileSync(logoPath, 'base64');
        const logoUrl = `data:image/png;base64,${logoBase64}`;

        // console.log("################ ", app.getAppPath());

        let receiptHTML = `
        <div style="box-sizing: border-box; border: 1px solid black; padding: 1px">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 5mm;text-align: center;">
                <div style="width: 50%;">
                    <img src="${logoUrl}" alt="Logo" style="max-width: 100%; height: auto;" />
                    <h1 style="font-size: 54px; margin: 0;text-align: center">${product.name}</h1>
                </div>
                <div style="width: 50%; text-align: right;text-align: center;">
                    <h1>FIFI PARK</h1>
                    <h2>ARDIS ALGER</h2>
                    <div style="box-sizing: border-box; border: 1px solid black; padding: 10px">
                      <img src="${barcodeUrl}" style="max-width: 100%; height: auto;" />
                    </div>
                    <h2>SOYEZ LES BIENVENUS</h2>
                    <p>${moment().format('YYYY/MM/DD HH:mm')}</p>
                </div>
            </div>
            <div style="">
              <ul>
                <li>01 TICKET ${product.price} DA </li>
                <li>TICKET NON REMBOURSABLE </li>
                <li>01 TICKET BON POUR 01 PERSONNE / 01 JEU</li>
                <li>TICKET VALABLE POUR LA JOURNEE EN COURS</li>
              </ul>
            </div>
        </div>
        `;

        let printData = "";
        for (let i = 0; i<product.nb_ticket;i++)
          printData += receiptHTML;

        const tempFilePath = path.join(app.getPath('temp'), 'receipt.html');
        fs.writeFileSync(tempFilePath, printData);

        printWindow.loadFile(tempFilePath);

        printWindow.webContents.on('did-finish-load', () => {
            // Once the content is loaded, call the print method
            printWindow.webContents.print({ silent: false, deviceName: '' });

            // Clean up the temporary file
            fs.unlinkSync(tempFilePath);
        });
    } catch (error) {
        console.error('Error generating barcode:', error);
    }

  }
}