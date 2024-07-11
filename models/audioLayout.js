import mongoose, { Schema } from "mongoose";
import { json } from "react-router-dom";

const audioLayoutSchema = new Schema(
    {
        title: String,
        layout: JSON,
    }
);

const AudioLayout = mongoose.models.AudioLayout || mongoose.model("AudioLayout", audioLayoutSchema);

export default AudioLayout;