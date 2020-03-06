/* eslint-disable no-console,global-require,@typescript-eslint/no-var-requires,new-cap,prefer-destructuring */
import * as http from 'http';
import createSocketServer from 'socket.io';
import express from 'express';

require('dotenv').config();

const port = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;

const expressApp = express();

const server = http.createServer(expressApp);

const socketServer = createSocketServer(server);

let app = require('@server').default;

expressApp.use((req, res) => app.express.handle(req, res));

socketServer.on('connection', socket => app.socketHandler(socket));

server.listen(port, () => {
  console.log(`> Started on port ${port}`);
});

if (process.env.NODE_ENV === 'development') {
  let database = app.database;
  if (module.hot) {
    module.hot.accept(['./server/src'], files => {
      console.log(files);
      console.log('🔁  HMR Reloading `./server`...');
      try {
        database = database.then((connection: any) => {
          console.log('Closing Database Connection');

          return connection.close().then(() => {
            console.log('Closed Database Connection');
            app = require('@server').default;

            return app.database;
          });
        });
      } catch (error) {
        console.error(error);
      }
    });

    console.info('✅  Server-side HMR Enabled!');
  }
}
