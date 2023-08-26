import connectMongoDB from "@/libs/mongodb";
import Character from "@/models/character";

export default async function PUT(req, res, {params}){
    const { id } = params;
    const { newName: name, newHP: hp } = req.body;
    await connectMongoDBl
    await Character.findByIdAndUpdate(id, {name, hp});
    res.status(201).json({message:"Character Updated"});
}