import mongoose, { Schema } from "mongoose";

const storySchema = new Schema(
    {
        title: String,
        content: JSON,
        work: Number,
    }
);

const Story = mongoose.models.Story || mongoose.model("Story", storySchema);

export default Story;