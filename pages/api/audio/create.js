import connectMongoDB from "@/libs/mongodb";
import Audio from "@/models/audio";

/**
 * @param {import("next").NextApiRequest} req 
 * @param {import("next").NextApiResponse} res 
 */

export default async function POST(req,res) {
    await connectMongoDB();
    console.log(req.body)
    await Audio.create(req.body);
    res.status(201).json({message:"Audio Created"});
}