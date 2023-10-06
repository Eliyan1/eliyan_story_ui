import mongoose, { Schema } from "mongoose";

const audioSchema = new Schema(
    {
        tag: String,
        title: String,
        artist: String,
        url: String
    }
);

const Audio = mongoose.models.Audio || mongoose.model("Audio", audioSchema);

export default Audio;