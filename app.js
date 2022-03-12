import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import sessions from 'express-session';
import msIdExpress from 'microsoft-identity-express'

import indexRouter from './routes/index.js';
import usersRouter from './routes/users.js';

import { fileURLToPath } from 'url';
import { dirname } from 'path';
import db from './db.js';

const appSettings = {
  appCredentials: {
    clientId: "5107f523-c932-4735-8c36-be9d23f87f3f",
    tenantId: "f6b6dd5b-f02f-441a-99a0-162ac5060bd2",
    clientSecret: "V5-7Q~tW~4_trwW6kmH9HSPx0lkIxi~4JSQc9"
  },
  authRoutes: {
    redirect: " https://faayfinal441.azurewebsites.net/landing.html/redirect",
    error: "/error",
    unauthorized: "/unauthorized"
  }
};

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

const oneDay = 1000 * 60 * 60 * 24;
app.use(sessions({
    secret: "vewkhivw44einvwvripouew",
    saveUninitialized: true,
    cookie: { maxAge: oneDay },
    resave: false
}))



const msid = new msIdExpress.WebAppAuthClientBuilder(appSettings).build();
app.use(msid.initialize());

app.use(express.static(path.join(__dirname, 'public')));


app.use(function(req, res, next){
    req.db = db;
    next();
})

app.use('/', indexRouter);
app.use('/users', usersRouter);

app.get('/signin',
msid.signIn({postLoginRedirect: '/landing.html'})
)

app.get('/signout',
msid.signOut({postLogoutRedirect: '/landing.html'})
)

app.get('/error', (req, res) => res.status(500).send('Server Error'))

app.get('/unauthorized', (req, res) => res.status(401).send('Permission Denied'))

export default app;
