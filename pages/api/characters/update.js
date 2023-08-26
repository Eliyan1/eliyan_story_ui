import connectMongoDB from "@/libs/mongodb";
import Character from "@/models/character";

/**
 * @param {import("next").NextApiRequest} req 
 * @param {import("next").NextApiResponse} res 
 */

export default async function PUT(req,res) {
    const { newName: name, newHP: hp } = req.body;
    await connectMongoDB();
    await Character.findByIdAndUpdate(req.query.id, {name, hp});
    res.status(200).json({message:"Character Updated"});
}