import mongoose, { Schema } from "mongoose";

const charGroupSchema = new Schema(
    {
        name: String,
        group: JSON,
    }
);

const CharGroup = mongoose.models.CharGroup || mongoose.model("CharGroup", charGroupSchema);

export default CharGroup;