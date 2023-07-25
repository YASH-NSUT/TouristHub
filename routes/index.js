const express = require("express");
const router = express.Router();
const passport = require("passport");
const User = require("../models/user.js");
const { sendWelcomeEmail } = require('../email/account')

/*================
	Root ROUTE
=================*/

router.get("/", function (req, res) {
	res.render("landing");
});

/*==============================
	Authentication ROUTES
==============================*/

/*Show Register Form Route*/
router.get("/register", function (req, res) {
	res.render("register");
});

/*Handle SignUp Logic*/
router.post("/register", function (req, res) {
	const newUser = new User({ username: req.body.username, email: req.body.email });
	User.register(newUser, req.body.password, function (err, user) {
		if (err) {
			console.log(err);
			req.flash("error", err.message);
			return res.redirect("back");
		}
		passport.authenticate("local")(req, res, async function () {
         await sendWelcomeEmail(user.email, user.username);
			req.flash("success", "Welcome to TouristHub " + user.username);
			res.redirect("/touristHubs");
		});
	});
});

/*====================
	Login ROUTES
====================*/

router.get("/login", function (req, res) {
	res.render("login");
});

router.post(
	"/login",
	passport.authenticate("local", {
		successRedirect: "/touristHubs",
		failureRedirect: "/login",
	}),
	function (req, res) {}
);

/*====================
	Logout ROUTE
====================*/

router.get("/logout", function (req, res) {
	req.logout();
	req.flash("success", "Logged out!!");
	res.redirect("/touristHubs");
});

module.exports = router;
