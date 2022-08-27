import express, {Application, Request, Response} from 'express';
import config from './configration';
import morgan from 'morgan';
import helmet from 'helmet';
import errMiddleware from './middlewares/Error.middleware';
import db from "./databases";
import routes from './routes';



const app: Application = express();

const port = config.Ports;
app.listen(port, () => console.log(`Server run at port ${port}...`));
app.use(morgan('dev'));
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({extended:true}))
db.connect().then(cl => {
    return cl.query("SELECT NOW()").then(res => {
        cl.release()
        console.log(res.rows[0]);
    }).catch((err:Error) => {
        cl.release()
        console.log(err.stack);
    })
})
app.get('/', (req: Request, res: Response) => {
    res.send('Welcome !!')
});
app.use('/',routes)
app.use(errMiddleware);