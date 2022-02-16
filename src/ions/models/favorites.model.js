import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
	{
		userId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
			required: true,
			unique: true,
		},
		favorites: {
			type: Map,
			of: Boolean,
			default: { bitcoin: true, ethereum: true },
		},
	},
	{ timestamps: true },
	{ collection: "favorites" }
);

export default mongoose.models.Favorites || mongoose.model("Favorites", userSchema);
