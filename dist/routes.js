"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _express = require('express');

var _ongscontroller = require('./app/controller/ongscontroller'); var _ongscontroller2 = _interopRequireDefault(_ongscontroller);
var _usercontroller = require('./app/controller/usercontroller'); var _usercontroller2 = _interopRequireDefault(_usercontroller);
var _emailcontroller = require('./app/controller/emailcontroller'); var _emailcontroller2 = _interopRequireDefault(_emailcontroller);
var _causecontroller = require('./app/controller/causecontroller'); var _causecontroller2 = _interopRequireDefault(_causecontroller);
var _sessioncontroller = require('./app/controller/sessioncontroller'); var _sessioncontroller2 = _interopRequireDefault(_sessioncontroller);


var _auth = require('./app/middlewares/auth'); var _auth2 = _interopRequireDefault(_auth);

const routes = new (0, _express.Router)();

routes.get('/', function(req, res) {
    res.send('Gordo viado xD xD');
  });
routes.get('/users', _usercontroller2.default.get);
routes.get('/users/:id', _usercontroller2.default.getId);
routes.post('/users/post', _usercontroller2.default.post);
routes.post('/users/session', _sessioncontroller2.default.Session);
routes.get('/loadSession', _auth2.default, _sessioncontroller2.default.LoadSession);
routes.post('/userCheck', _sessioncontroller2.default.userCheck);
routes.put('/users/recovery/:email', _usercontroller2.default.putRecovery)
routes.put('/users/:_id', _usercontroller2.default.put)
routes.delete('/users/delete/:id', _usercontroller2.default.delete)

////////////////////////////////////////////////////////
// cause routes

routes.get('/causes', _causecontroller2.default.get);
routes.get('/causes/:id', _causecontroller2.default.getId);
routes.post('/causes/post', _causecontroller2.default.post);

///////////////////////////////////////////////////////
// Ongs routes

routes.get('/ongs', _ongscontroller2.default.get);
routes.get('/ongs/:id', _ongscontroller2.default.getId);
routes.post('/ongs/post', _ongscontroller2.default.post);
routes.put('/ongs/att/:id', _ongscontroller2.default.put);
routes.get('/ongs/causeName/:causeName', _ongscontroller2.default.getCause);

/////////////////////////////////////////////////////////////////////
// Email Routes

routes.get('/send/:email/:codigo', _emailcontroller2.default.emailDeConfirmacao)

exports. default = routes;