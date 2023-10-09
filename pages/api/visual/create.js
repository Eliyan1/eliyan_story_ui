import connectMongoDB from "@/libs/mongodb";
import Visual from "@/models/visual";

/**
 * @param {import("next").NextApiRequest} req 
 * @param {import("next").NextApiResponse} res 
 */

export default async function POST(req,res) {
    await connectMongoDB();
    console.log(req.body)
    await Visual.create(req.body);
    res.status(201).json({message:"Visual Created"});
}