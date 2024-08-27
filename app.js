// More securely stored URI to DB
if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

const session = require('express-session');
const passport = require('./config/passport'); // Import configured passport

var indexRouter = require('./routes/index');
const authRouter = require('./routes/auth'); // import all auth related routes
const messageBoardRouter = require('./routes/messageboard'); // import all routes for messageboard area

var app = express();

// attempt to populate database
const initializeDatabase = async () => {
    try {
        console.log('Starting database initialization...');
        // import database init scripts
        const populateDB = require('./db/populateDB');
        await populateDB();
        console.log('Database initialized successfully!');
    } catch (error) {
        console.error('Error during database initialization', error);
    }
};

initializeDatabase()
    .then(() => {
        console.log('Database initialized!');
    })
    .catch((err) => {
        console.error('Failed to initialize database... ', err);
    });

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Session and passport middleware setup
app.use(
    session({
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: true,
    })
);

app.use(passport.session());
app.use((req, res, next) => {
    res.locals.currentUser = req.user || null;
    next();
});
app.use(express.urlencoded({ extended: false }));

// routers set to app
app.use('/', indexRouter);
app.use('/auth', authRouter);
app.use('/messageboard', messageBoardRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;
