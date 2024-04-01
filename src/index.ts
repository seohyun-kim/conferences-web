import "reflect-metadata";
import { createConnection } from 'typeorm';
import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as cors from 'cors';
import conferenceRoutes from './routes/conferenceRoutes';

createConnection().then(async connection => {
  const app = express();
  app.use(cors());
  app.use(bodyParser.json());

  app.use('/api/conferences', conferenceRoutes);

  app.listen(3000, () => {
    console.log('Server running on port 3000');
  });
}).catch(error => console.log(error));
