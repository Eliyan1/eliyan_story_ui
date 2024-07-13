import connectMongoDB from "@/libs/mongodb";
import CharGroup from "@/models/chargroup";

/**
 * @param {import("next").NextApiRequest} req 
 * @param {import("next").NextApiResponse} res 
 */

export default async function POST(req,res) {
    await connectMongoDB();
    console.log(req.body)
    await CharGroup.create(req.body);
    res.status(201).json({message:"Group Created"});
}