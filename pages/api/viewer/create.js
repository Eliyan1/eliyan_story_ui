import connectMongoDB from "@/libs/mongodb";
import Viewer from "@/models/viewer";

/**
 * @param {import("next").NextApiRequest} req 
 * @param {import("next").NextApiResponse} res 
 */

export default async function POST(req,res) {
    await connectMongoDB();
    console.log(req.body)
    await Viewer.create(req.body);
    res.status(201).json({message:"Main Image Created"});
}