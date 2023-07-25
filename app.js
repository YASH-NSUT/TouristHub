const mongoose       = require("mongoose"),
	   express        = require("express"),
	   app            = express(),
	   bodyParser     = require("body-parser"),
	   flash          = require("connect-flash"),
	   Campground     = require("./models/touristHub"),
	   Comment        = require("./models/comments"),
	   passport	      = require("passport"),
	   LocalStratergy = require("passport-local"),
	   MethodOverride = require("method-override"),
	   User 		      = require("./models/user"),
      Port           = process.env.PORT || 3000
	

mongoose.connect(process.env.CONNECTION_URL, {useNewUrlParser: true, useUnifiedTopology: true});
app.use(express.urlencoded({extended: true}));
app.set("view engine","ejs");
app.use(express.static( __dirname +"/public"));
app.use(MethodOverride("_method"));
app.use(flash());

/*================================
	Passport Configuration
================================*/
app.use(require("express-session")({
	secret: "1234567890qwertyuiopasdfghjklzxcvbnm",
	resave: false,
	saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStratergy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req,res,next){
	res.locals.currentUser=req.user;
	res.locals.error = req.flash("error");
	res.locals.success = req.flash("success");
	next();
});

/*=============
	  ROUTES
==============*/
const touristHubsRoutes = require("./routes/touristHubs.js");
const commentRoutes = require("./routes/comments.js");
const indexRoutes = require("./routes/index.js");

app.use("/touristHubs", touristHubsRoutes);
app.use("/touristHubs/:id/comments", commentRoutes);
app.use("/", indexRoutes);

app.listen(Port,()=>{
	console.log(`TouristHub SERVER has started on port ${Port}`);
});