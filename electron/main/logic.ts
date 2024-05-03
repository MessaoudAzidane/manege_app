import { ipcMain } from 'electron';
import { TicketsManagement } from './modules/ticketsManagement';
import { initDb } from './db';
import { SessionManagement } from './modules/sessionManagement';
import { ProdcutManagement } from './modules/productManagement';

(async () => {
  await initDb();
})();

new TicketsManagement(ipcMain);
new SessionManagement(ipcMain);
new ProdcutManagement(ipcMain);