//app.ts
//express and middlewares
import express from 'express';
import morgan from 'morgan';
import user_router from './routes/user_service';

const app = express();

// middlewares
app.use(express.json());
app.use(morgan('dev'));

// set environmental variables (app.get('name of the variable'))
app.set('PORT', process.env.PORT || 8080); // then perform app.get('PORT')
// if(process.env.PORT exists) --> PORT = process.env.PORT; IF NOT: PORT = 8080.

// routes. EntryPoint @ip/api/{whatever}
app.use('/api', user_router);

export default app; // EXPORT APP 