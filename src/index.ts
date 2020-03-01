/* eslint-disable no-console,global-require */
import * as http from 'http';
import express from 'express';

require('dotenv').config();

let app = require('@server').default();

const port = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;

const expressApp = express().use((req, res) => app.server.handle(req, res));

const server = http.createServer(expressApp);

server.listen(port, () => {
  console.log(`> Started on port ${port}`);
});

let status = app.database;

if (module.hot) {
  module.hot.accept(['./server/src'], () => {
    console.log('🔁  HMR Reloading `./server`...');
    try {
      status = status.then((connection: any) => {
        console.log('Closing Database Connection');

        return connection.close().then(() => {
          console.log('Closed Database Connection');
          app = require('@server').default();

          return app.database;
        });
      });
    } catch (error) {
      console.error(error);
    }
  });

  console.info('✅  Server-side HMR Enabled!');
}
