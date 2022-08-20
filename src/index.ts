import express, { Application, Request, Response, NextFunction } from 'express';
import morgan from 'morgan';
import dotenv from 'dotenv';

const app: Application = express();
const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`server running at port ${port}....!!`);
});
