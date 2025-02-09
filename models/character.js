import mongoose, { Schema } from "mongoose";

const characterSchema = new Schema(
    {
        name: String,
        title: String,
        hp: Number,
        maxhp: Number,
        temphp: Number,
        ac: Number,
        str: Number,
        dex: Number,
        con: Number,
        intel: Number,
        wis: Number,
        cha: Number,
        player: Boolean,
        notes: JSON,
        url: String,
        comment: String,
        active: Number
    }
);

const Character = mongoose.models.Character || mongoose.model("Character", characterSchema);

export default Character;