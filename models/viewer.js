import mongoose, { Schema } from "mongoose";

const viewerSchema = new Schema(
    {
        title: String,
        url: String,
        currentTurn: Array,
        initiatedChar: Array,
        villainMaxHP: Number,
        villainCurrentHP: Number,
        hpOverlay: Boolean,
        initiativeOverlay: Boolean
    }
);

const Viewer = mongoose.models.Viewer || mongoose.model("Viewer", viewerSchema);

export default Viewer;