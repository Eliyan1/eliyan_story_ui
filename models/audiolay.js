import mongoose, { Schema } from "mongoose";

const audioLayoutSchema = new Schema(
    {
        title: String,
        layout: JSON,
    }
);

const AudioLayout = mongoose.models.AudioLayout || mongoose.model("AudioLayout", audioLayoutSchema);

export default AudioLayout;