import connectMongoDB from "@/libs/mongodb";
import VisualLayout from "@/models/visualLayout";

/**
 * @param {import("next").NextApiRequest} req 
 * @param {import("next").NextApiResponse} res 
 */

export default async function POST(req,res) {
    await connectMongoDB();
    console.log(req.body)
    await VisualLayout.create(req.body);
    res.status(201).json({message:"Layout Created"});
}