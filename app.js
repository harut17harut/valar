import express from 'express';
const app = express();
import path from  'path';
import  {routes} from  './routes/index.js';
import expressLayouts from 'express-ejs-layouts';

const port = 3000;
const __dirname = path.resolve(path.dirname(''));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(expressLayouts);
app.use(express.urlencoded({ extended: true }));

app.set('layout', 'layouts/blank');

app.use(express.static('public'));

app.use('/', routes);

app.listen(port, () => {
    console.log(`started: localhost:${port}`)
})