/* eslint-disable no-console */
import express from 'express';
import exitHook from 'async-exit-hook';
import 'module-alias/register.js';
import { errorHandlingMiddleware } from './middlewares/errorHandlingMiddleware.js';
import { createServer } from 'node:http';
// import { APIs_V1 } from './routes/v1/index.js';
import { connection, sio } from './sockets/chatSocket.js';
import { CLOSE_DB, CONNECT_DB } from './config/mongodb.js';

const START_SERVER = () => {
  const app = express();
  const server = createServer(app);
  const io = sio(server);
  connection(io);

  app.use(express.json());
  app.use(errorHandlingMiddleware);

  server.listen(3000, () => {
    console.log('server running at http://localhost:3000');
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
