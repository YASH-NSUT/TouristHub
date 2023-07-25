const mongoose = require ("mongoose");

const touristHubSchema = new mongoose.Schema({
	name: {
      type: String,
      required: true,
      trim: true
  },
	image: {
      type: String,
      required: true,
      trim: true
  },
	price: {
      type: Number,
      required: true,
      trim: true
  },
   location : {
      type: String,
      required: true,
      trim: true
   },
	description: {
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
         required: true,
         trim: true
     },
      email: {
         type: String,
         required: true,
         lowercase: true,
         trim: true
     }
	},
	comments:[
		{
		   type:mongoose.Schema.Types.ObjectId,
		   ref: "Comment"
		}
	]
});

const touristHub = mongoose.model("touristHub" , touristHubSchema);

module.exports = touristHub;