import mongoose, { Schema } from "mongoose";

const characterSchema = new Schema(
    {
        name: String,
        hp: Number,
        ac: Number,
        str: Number,
        dex: Number,
        con: Number,
        intel: Number,
        wis: Number,
        cha: Number 
    }
);

const Character = mongoose.models.Character || mongoose.model("Character", characterSchema);

export default Character;