import "reflect-metadata";
import { createConnection } from 'typeorm';
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import conferenceRoutes from './routes/conferenceRoutes';
import path from 'path'; // path 모듈을 import합니다.

createConnection().then(async connection => {
  const app = express();
  app.use(cors());
  app.use(bodyParser.json());

  app.use('/api/conferences', conferenceRoutes);
  app.use(express.static('public'));


  app.listen(3000, '0.0.0.0', () => {
    console.log('Server running on port 3000');
  });
}).catch(error => console.log(error));
