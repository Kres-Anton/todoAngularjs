let express  = require('express');
let app      = express();
let mongoose = require('./libs/mongoose');
let morgan = require('morgan');
let bodyParser = require('body-parser');
let methodOverride = require('method-override');
let config = require('./config/index');
let path  = require('path');




// configuration =================
app.set('port',config.get('port'));

app.use('/',express.static(path.resolve(__dirname + '/../public')));
app.use('/api/img',express.static(__dirname + '/img'));
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

app.use(methodOverride());

let allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', 'http://localhost:7000');
    res.header('Access-Control-Allow-Methods', 'HEAD, GET, POST, PUT, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With, Access-Control-Allow-Origin');
    res.header("Access-Control-Max-Age", "86400"); // 24 hours

    // intercept OPTIONS method
    if ('OPTIONS' == req.method) {
        res.sendStatus(200);
    }
    else {
        next();
    }
};

app.use(allowCrossDomain);



//let users = require('./middleware/users');
//let flats = require('./middleware/flats');
//let payments = require('./middleware/payments');
let login = require('./middleware/login');
let auth = require('./middleware/auth');
let user = require('./middleware/users');
let flat = require('./middleware/flats');


// application -------------------------------------------------------------
// Authorization check
app.post('/api/*',auth);
app.get('/api/*',auth);

//user api
app.post('/api/login',login.post);
app.get('/api/user',user.get);
app.get('/api/user/:id',user.get);
app.post('/api/user',user.post);
app.delete('/api/user',user.delete);
app.put('/api/user',user.put);

//flat api
app.get('/api/flat',flat.get);
app.get('/api/flat/:id',flat.get);
app.post('/api/flat',flat.post);
app.delete('/api/flat',flat.delete);
app.put('/api/flat',flat.put);
app.get('/api/flat/owner/:id',flat.getByOwner);




// listen (start app with node server.js) ======================================
app.listen(app.get('port'));
console.log("App listening on port "+app.get('port'));
