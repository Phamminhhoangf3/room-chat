/* eslint-disable no-console */
import express from 'express';
import exitHook from 'async-exit-hook';
import 'module-alias/register.js';
import { errorHandlingMiddleware } from './middlewares/errorHandlingMiddleware.js';
import { createServer } from 'node:http';
import { connection, sio } from './sockets/chatSocket.js';
import { CLOSE_DB, CONNECT_DB } from './config/mongodb.js';

const PORT = process.env.APP_PORT || 3000;

const START_SERVER = () => {
  const app = express();
  const server = createServer(app);
  const io = sio(server);
  connection(io);

  app.use(express.json());
  app.use(errorHandlingMiddleware);

  server.listen(PORT, () => {
    console.log(`server running at http://localhost:${PORT}`);
  });

  exitHook(() => {
    CLOSE_DB();
    console.log('exit done!');
  });
};

(async () => {
  try {
    await CONNECT_DB();
    START_SERVER();
  } catch (error) {
    console.error(error);
    process.exit(0);
  }
})();
