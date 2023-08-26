import connectMongoDB from "@/libs/mongodb";
import Character from "@/models/character";

/**
 * @param {import("next").NextApiRequest} req 
 * @param {import("next").NextApiResponse} res 
 */

export default async function POST(req,res) {
    await connectMongoDB();
    await Character.create(req.body);
    res.status(201).json({message:"Character Created"});
}