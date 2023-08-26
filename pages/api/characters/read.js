import connectMongoDB from "@/libs/mongodb";
import Character from "@/models/character";

/**
 * @param {import("next").NextApiRequest} req 
 * @param {import("next").NextApiResponse} res 
 */

export default async function GET(req,res) {
    await connectMongoDB();
    const characters = await Character.find();
    res.status(200).json({characters})
}