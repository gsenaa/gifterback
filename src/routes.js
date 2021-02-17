import { Router } from 'express';

import ongscontroller from './app/controller/ongscontroller';
import UserController from './app/controller/usercontroller';
import EmailController from './app/controller/emailcontroller';
import causecontroller from './app/controller/causecontroller';
import SessionController from './app/controller/sessioncontroller';


import authMiddleware from './app/middlewares/auth';

const routes = new Router();

routes.get('/users', UserController.get);
routes.get('/users/:id', UserController.getId);
routes.post('/users/post', UserController.post);
routes.post('/users/session', SessionController.Session);
routes.get('/loadSession', authMiddleware, SessionController.LoadSession);
routes.post('/userCheck', SessionController.userCheck);
routes.put('/users/recovery/:email', UserController.putRecovery)
routes.put('/users/:_id', UserController.put)
routes.delete('/users/delete/:id', UserController.delete)

////////////////////////////////////////////////////////
// cause routes

routes.get('/causes', causecontroller.get);
routes.get('/causes/:id', causecontroller.getId);
routes.post('/causes/post', causecontroller.post);

///////////////////////////////////////////////////////
// Ongs routes

routes.get('/ongs', ongscontroller.get);
routes.get('/ongs/:id', ongscontroller.getId);
routes.post('/ongs/post', ongscontroller.post);
routes.put('/ongs/att/:id', ongscontroller.put);
routes.get('/ongs/causeName/:causeName', ongscontroller.getCause);

/////////////////////////////////////////////////////////////////////
// Email Routes

routes.get('/send/:email/:codigo', EmailController.emailDeConfirmacao)

export default routes;