import connectMongoDB from "@/libs/mongodb";
import Character from "@/models/character";

/**
 * @param {import("next").NextApiRequest} req 
 * @param {import("next").NextApiResponse} res 
 */

export default async function PUT(req,res) {
    await connectMongoDB();
    const character = await Character.findOne({_id: req.query.id});
    res.status(200).json({character });
}