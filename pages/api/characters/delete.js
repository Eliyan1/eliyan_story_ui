import connectMongoDB from "@/libs/mongodb";
import Character from "@/models/character";

/**
 * @param {import("next").NextApiRequest} req 
 * @param {import("next").NextApiResponse} res 
 */

export default async function DELETE(req,res) {
    await connectMongoDB();
    await Character.findByIdAndDelete(req.query.id);
    res.status(200).json({message:"Character Deleted"});
}