import mongoose, { Schema } from "mongoose";

const visualSchema = new Schema(
    {
        tag: String,
        title: String,
        url: String
    }
);

const Visual = mongoose.models.Visual || mongoose.model("Visual", visualSchema);

export default Visual;