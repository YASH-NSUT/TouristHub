const express = require("express");
const router 	= express.Router();
const TouristHub = require("../models/touristHub.js");
const Comment = require("../models/comments.js");
const middleware = require("../middleware");
const date = require("date-and-time")
const {  addedTouristHubEmail,
         updatedTouristHubEmail,
         deletedTouristHubEmail } = require('../email/account')
const getWeatherInfo = require('../weatherInfo/app')

/*===========================
	TouristHub  ROUTES
===========================*/

router.get("/", function(req, res) {
	TouristHub.find({},function(err, allTouristHubs){
		if(err){
			req.flash("error", "Something Went Wrong");
			console.log(err);
		} else{
			res.render("touristHubs/index" , {touristHubs : allTouristHubs });
		}	
	});
});

router.post("/",middleware.isLoggedIn ,function(req,res){
	const name =req.body.name;
	const image= req.body.image;
	const price= req.body.price;
	const description = req.body.description;
	const location = req.body.location;

	const author = {
		id: req.user._id,
		username: req.user.username,
      email: req.user.email
	}
	
	const newTouristHub = { name, image, location, description, author, price };
	
	TouristHub.create(newTouristHub, async function(err, returnedTouristHub) {
		if(err){
			req.flash("error", "Something Went Wrong");
			console.log(err);
		} else{ 
         addedTouristHubEmail(newTouristHub);
			req.flash("success", "New TouristHub Added");
			res.redirect("/touristHubs");
		}	
	});
});

router.get("/new", middleware.isLoggedIn ,function(req, res) {
	res.render("touristHubs/new");
});

router.get("/:id",function(req, res) {
	
TouristHub.findById(req.params.id).populate("comments").exec( async function(err, foundTouristHub) {
		if(err) {
			req.flash("error", "Something Went Wrong");
			console.log(err);
			res.redirect("back");
		} else {
         getWeatherInfo(foundTouristHub.location, (weatherInfo) => {
			   res.render("touristHubs/show",{touristHub: foundTouristHub, weatherInfo, date});
         });
		}
	});
});

/*===================================
	TouristHub  EDIT Page ROUTES
===================================*/
router.get("/:id/edit", middleware.checkTouristHubOwnership ,function(req, res) {
	
	TouristHub.findById(req.params.id, function(err, foundTouristHub) {
		if(err) {
			console.log(err);
			req.flash("error", "Something Went Wrong");
			res.redirect("back");
		}else {
			res.render("touristHubs/edit",{touristHub: foundTouristHub});
		}
	})
});

/*==================================
	TouristHub  UPDATE ROUTES
==================================*/
router.put("/:id", middleware.checkTouristHubOwnership, function(req, res) {
	TouristHub.findByIdAndUpdate(req.params.id, req.body.touristHub, function(err, updatedTouristHub) {
		if(err) {
			req.flash("error", "Something Went Wrong");
			res.redirect("back");
		} else {
         updatedTouristHubEmail(updatedTouristHub);
			req.flash("success", "TouristHub Updated");
			res.redirect("/touristHubs/" + req.params.id );
		}
	});
});

/*==================================
	TouristHub  DELETE ROUTES
==================================*/
router.delete("/:id", middleware.checkTouristHubOwnership, function(req, res) {
	TouristHub.findByIdAndDelete(req.params.id, function(err, removedTouristHub) {
		if(err) {
			req.flash("error", "Something Went Wrong");
			res.redirect("back");
		}else {
			Comment.deleteMany({_id: {$in: removedTouristHub.comments}}, async function(err, deletedComments) {
				if(err) {
					console.log(err);
					req.flash("error", "Something Went Wrong");
					res.redirect("back");
				}else {
               await deletedTouristHubEmail(removedTouristHub);
					req.flash("success", "TouristHub Deleted");
					res.redirect("/touristHubs");
				}
			});
		}
	});
});

module.exports = router;