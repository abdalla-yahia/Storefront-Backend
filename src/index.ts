/* eslint-disable @typescript-eslint/no-unused-vars */
import express, { Application, Request, Response, NextFunction } from 'express';
import morgan from 'morgan';
import helmet from 'helmet';
import ratelimt from 'express-rate-limit';
import errorMidlware from './middleware/error.middlware';
import config from './configration';
import db from './database/index'
import { Client } from 'pg';

const app: Application = express();
const port = config.Port || 4500;


app.listen(port, () => {
  console.log(`server running at port ${port}....!!`);
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));
app.use(helmet());
app.use(
  ratelimt({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
    standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers
    message: 'Sory comeback after One Houre',
  })
);
app.use(errorMidlware);

app.get('/', (req: Request, res: Response) => {
  console.log(req.url);
  res.send('this is root ..');
});

app.use((_req: Request, res: Response) => {
  res.status(404).send('Oops..!!  Page Not Found');
});

db.connect().then(Client => {
  return Client.query('SELECT NOW()').then(res => {
    Client.release()
    console.log(res.rows);
  }).catch(err => {
    Client.release();
    console.log(err);
  })
})