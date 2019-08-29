const PORT = process.env.port || 5000 
const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const mongoose = require('mongoose');
const flash = require('connect-flash');
const session = require('express-session');
const passport = require('passport');
const MongoStore = require('connect-mongo')(session);

const app = express();

//Passport Config
require('./config/passport')(passport);

//config
const db = require('./config/keys').mongoURL;

//Database 
mongoose.connect(db, { useNewUrlParser: true })
    .then(() => console.log('Database Connected...'))
    .catch(err => console.log(err));

//EJS
app.use(expressLayouts);
app.set('view engine', 'ejs');

//Body Parser
app.use(express.urlencoded({ extended: false }));

//Express Session
app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true,
    store: new MongoStore({mongooseConnection: mongoose.connection})
  }));

//Passport Middleware
app.use(passport.initialize());
app.use(passport.session());

//Coneect Flash
app.use(flash());

//Global Vars
app.use((req, res, next) => {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    next();
});

//Routes
app.use('/', require('./Routes/index'));    
app.use('/user', require('./Routes/users'));



app.listen(PORT, () => console.log(`Server is running on ${PORT}`));