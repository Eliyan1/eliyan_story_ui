import mongoose, { Schema } from "mongoose";

const visualLayoutSchema = new Schema(
    {
        title: String,
        layout: JSON,
    }
);

const VisualLayout = mongoose.models.VisualLayout || mongoose.model("VisualLayout", visualLayoutSchema);

export default VisualLayout;