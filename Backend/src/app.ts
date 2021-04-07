//app.ts
//express and middlewares
import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import user_router from './routes/user_service';

const app = express();

// middlewares
app.use(express.json());    // To patch JSON body.
app.use(morgan('dev'));     // As a logger, like log4j.
app.use(cors());            // To connect Front and Back servers.

// set environmental variables (app.get('name of the variable'))
app.set('PORT', process.env.PORT || 8080); // then perform app.get('PORT')
// if(process.env.PORT exists) --> PORT = process.env.PORT; IF NOT: PORT = 8080.

// routes. EntryPoint @ip/api/{whatever}
app.use('/api', user_router);

export default app; // EXPORT APP 