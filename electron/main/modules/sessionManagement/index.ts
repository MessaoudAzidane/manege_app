/* eslint-disable @typescript-eslint/no-unused-vars */
import { IpcMain, IpcMainInvokeEvent } from 'electron';
import { IpcChannels } from '../utils';
import { Account, Session } from '../../db/models/init-models';
import { QueryTypes, Sequelize } from 'sequelize';
import { sequelize } from '../../db';

export class SessionManagement {
  constructor(private ipcMain: IpcMain){
    console.log("");
    this.registerEvents();
  }

  private registerEvents() {
    console.log("Registering Session events...");
    
    this.ipcMain.handle(IpcChannels.session.login, this.handleLogin.bind(this))
    this.ipcMain.handle(IpcChannels.session.logout, this.handleLogout.bind(this))
    this.ipcMain.handle(IpcChannels.session.closeSession, this.handleCloseSession.bind(this))
    this.ipcMain.handle(IpcChannels.session.preview, this.handlePreviewSession.bind(this))
    

    console.log("\t Registered TicketsManagement events.");
  }

  private async handleLogin(
    event: IpcMainInvokeEvent,
    pwd: string
  ){
    const account = await Account.findOne({
      where: {
        password: pwd
      }
    });
    if (account) {
      let session = await Session.create({opened_at: new Date()});
      const session_res = await session.save();
      return {
        success: true,
        data: {
          id: session_res.id
        }
      }
    } else {
      return {
        success: false
      }
    }
  }

  private async handleLogout(
    event: IpcMainInvokeEvent,
    data: any
  ) {
    const session = await Session.findOne({ where: {id: data.id}});
    if (session) {
      
      await session.update({
        closed_at : new Date(),
        bilan_comptable : data.bilanComptable,
        bilan_reel : data.bilanReel,
        ecart : data.ecart,
      });

      return {
        success: true
      }
    } else {
      return {
        success: false
      }
    }
  }

  private async handleCloseSession(
    event: IpcMainInvokeEvent, 
  ) {
    await Session.update(
      { closed_at: Sequelize.literal('NOW()') },
      {
      where: Sequelize.literal('closed_at IS NULL')
    });

  }

  private async handlePreviewSession(
    event: IpcMainInvokeEvent,
    sessionId: number
  ){
    const session = await Session.findByPk(sessionId);
    if (!session) {
      return {
        success:false
      };
    }

    const query = `select p.price, sale.refunded, p.id, p.nb_ticket
          from sale
          join product p on p.id = sale.product_id
          join session s on s.id = sale.session_id
          where session_id = :session_id
    `;

    const results = await sequelize.query(query, {
      replacements: { session_id: sessionId },
      type: QueryTypes.SELECT
    });

    const response: any = {
      openAt: session.dataValues.opened_at
    };

    results.forEach(res => {

    });

    return results;

  }
}