import connectMongoDB from "@/libs/mongodb";
import AudioLayout from "@/models/audiolayout";

/**
 * @param {import("next").NextApiRequest} req 
 * @param {import("next").NextApiResponse} res 
 */

export default async function POST(req,res) {
    await connectMongoDB();
    console.log(req.body)
    await AudioLayout.create(req.body);
    res.status(201).json({message:"Visual Created"});
}