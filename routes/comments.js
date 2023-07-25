const express = require("express");
const router 	= express.Router({ mergeParams: true});
const TouristHub = require("../models/touristHub.js");
const Comment = require("../models/comments.js");
const middleware = require("../middleware");


/*===================================
	touristHub COMMENTS ROUTES
===================================*/

router.get("/new", middleware.isLoggedIn, function(req, res) {
	TouristHub.findById(req.params.id, function(err, touristHub) {
		if(err) {
			req.flash("error", "Something Went Wrong");
			res.redirect("back");
		} else {
			res.render("comments/new",{touristHub});
		}
	});
});

router.post("/", middleware.isLoggedIn, function(req,res) {
	TouristHub.findById(req.params.id, function(err, touristHub) {
		if(err) {
			console.log(err);
			req.flash("error", "Something Went Wrong");
			res.redirect("back");
		} else {
			Comment.create(req.body.comment, function(err, comment) {
				if(err) {
					console.log(err)
					req.flash("error", "Something Went Wrong");
					res.redirect("back");
				} else {
					comment.author.id = req.user._id;
					comment.author.username = req.user.username;
					comment.save();
					touristHub.comments.push(comment);
					touristHub.save();
					req.flash("success", "Comment Added");
					res.redirect("/touristHubs/"+ req.params.id );
				}
			});
		}
	});
});

/*===============================
	Comment  EDIT Page ROUTES
===============================*/

router.get("/:comment_id/edit", middleware.checkCommentOwnership ,function(req, res) {
	TouristHub.findById(req.params.id, function(err, foundtouristHub) {
		if(err) {
			console.log(err);
			req.flash("error", "Something Went Wrong");
			res.redirect("back");
		}else {
			Comment.findById(req.params.comment_id, function(err, foundComment) {
				if(err) {
					console.log(err);
					req.flash("error", "Something Went Wrong");
					res.redirect("back");
				}else {
					res.render("comments/edit.ejs", {touristHub:foundtouristHub, comment:foundComment});
				}
			});
		}
	});
});

/*==============================
	Comment  UPDATE  ROUTES
==============================*/

router.put("/:comment_id", middleware.checkCommentOwnership, function(req, res) {
	Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment ,function(err, updatedComment) {
		if(err) {
			console.log(err);
			req.flash("error", "Something Went Wrong");
			res.redirect("back");
		}else {
			req.flash("success", "Comment Updated");
			res.redirect("/touristHubs/"+ req.params.id);
		}
	});
});

/*==============================
	Comment  DESTROY  ROUTES
==============================*/

router.delete("/:comment_id", middleware.checkCommentOwnership ,function(req, res) {
	Comment.findByIdAndDelete(req.params.comment_id, function(err, deletedComment) {
		if(err) {
			console.log(err);
			req.flash("error", "Something Went Wrong");
			res.redirect("back");
		}else {
			req.flash("success", "Comment Deleted");
			res.redirect("/touristHubs/" + req.params.id)
		}
	});
});

module.exports = router;