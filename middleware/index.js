const TouristHub = require("../models/touristHub.js");
const Comment = require("../models/comments.js");

/*=================
	MIDDLEWARE
=================*/
const middleware = {};

middleware.isLoggedIn = function(req, res, next) {
	if(req.isAuthenticated()) {
		return next();
	}
	req.flash("error", "Please Login first!!");
	res.redirect("/login");
}

middleware.checkTouristHubOwnership = function(req, res, next) {
	if(req.isAuthenticated()){
		TouristHub.findById(req.params.id, function(err, foundtouristHub) {
			if(err){
				req.flash("error", "Something Went Wrong");
				res.redirect("back");
			}else if(!foundtouristHub) {
				req.flash("error", "TouristHub Not found");
				res.redirect("back");
			}else {
				if(foundtouristHub.author.id.equals(req.user._id)) {
					next();
				}else {
					req.flash("error", "You don't have permission to do that ");
					res.redirect("back");
				}
			}
		});
	}else {
		req.flash("error", "Please Login First");
		res.redirect("back");
	}
}

middleware.checkCommentOwnership = function(req, res, next) {
	if(req.isAuthenticated()) {
		Comment.findById(req.params.comment_id, function(err, foundComment) {
			if(err) {
				req.flash("error", "Something Went Wrong");
				res.redirect("back");
			}else {
				if(foundComment.author.id.equals(req.user._id)) {
					next();
				}else {
					req.flash("error", "You don't have permission to do that ");
					res.redirect("back");
				}
			}
		});
	}else {
		req.flash("error", "Please Login First");
		res.redirect("back");
	}
}

module.exports = middleware;