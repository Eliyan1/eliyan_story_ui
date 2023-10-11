import mongoose, { Schema } from "mongoose";

const viewerSchema = new Schema(
    {
        title: String,
        url: String
    }
);

const Viewer = mongoose.models.Viewer || mongoose.model("Viewer", viewerSchema);

export default Viewer;