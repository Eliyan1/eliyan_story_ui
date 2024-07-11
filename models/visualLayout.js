import mongoose, { Schema } from "mongoose";
import { json } from "react-router-dom";

const visualLayoutSchema = new Schema(
    {
        title: String,
        layout: JSON,
    }
);

const VisualLayout = mongoose.models.VisualLayout || mongoose.model("VisualLayout", visualLayoutSchema);

export default VisualLayout;