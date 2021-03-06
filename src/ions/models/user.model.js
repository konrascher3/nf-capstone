import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
	{
		nonce: {
			required: true,
			type: Number,
			default: () => Math.floor(Math.random() * 1000000),
		},
		publicAddress: {
			required: true,
			unique: true,
			lowercase: true,
			type: String,
		},
	},
	{ timestamps: true },
	{ collection: "users" }
);

export default mongoose.models.User || mongoose.model("User", userSchema);
