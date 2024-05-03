// import { BrowserWindow } from 'electron';
// import {print} from 'electron-print';

export const printTickets = async (nbTickets: number) => {
  // const ticketWindow = new BrowserWindow({ show: false });

  // const ticketDocument = `
  //   <div style="text-align: center;">
  //     ${Array(nbTickets).fill('<p>Ticket</p>').join('')}
  //   </div>
  // `;

  // ticketWindow.loadURL(`data:text/html;charset=utf-8,${encodeURIComponent(ticketDocument)}`);

  // print(ticketWindow, { silent: true })
  //   .then(() => ticketWindow.close())
  //   .catch((error: unknown) => console.error('Failed to print tickets:', error));
  console.log(`${nbTickets} will be printed`);
  
};