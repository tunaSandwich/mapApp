var express     = require("express"),
    app         = express(),
    bodyParser  = require("body-parser"),
    mongoose    = require("mongoose"),
    flash       = require("connect-flash"),
    passport    = require("passport"),
    LocalStrategy = require("passport-local"),
    methodOverride = require("method-override"),
    Destination = require("./models/destination"),
    User        = require("./models/user");

//requiring routes
var indexRoutes      = require("./routes/index"),
    userRoutes       = require("./routes/users");

var url = process.env.DATABASEURL || "mongodb://localhost/mappingMe";
//mongodb://tunaSandwich:aldebaran3910@ds061506.mlab.com:61506/mymapapp
// mongoose.connect(url);
mongoose.connect("mongodb://tunaSandwich:Aldebaran3910@ds061506.mlab.com:61506/mymapapp");

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));
app.use(flash());

// PASSPORT CONFIGURATION
app.use(require("express-session")({
    secret: "Grant access to session!",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next){
   res.locals.currentUser = req.user;
   res.locals.error = req.flash("error");
   res.locals.success = req.flash("success");
   next();
});

app.use("/", indexRoutes);
app.use("/", userRoutes);


app.listen(process.env.PORT, process.env.IP, function(){
   console.log("The MapApp Server Has Started on port: " + 3000);
});
