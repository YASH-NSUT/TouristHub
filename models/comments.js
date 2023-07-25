const mongoose = require("mongoose");

const commentSchema = mongoose.Schema({
	text: {
      type: String,
      required: true,
      trim: true
  },
	author: {
		id: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User"
		},
		username: {
         type: String,
         trim: true
     }
	},
   date: {
      type: Date,
      default: Date.now,
      required: true
   }
});
const Comment = mongoose.model("Comment", commentSchema);

module.exports = Comment;