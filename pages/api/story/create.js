import connectMongoDB from "@/libs/mongodb";
import Story from "@/models/story";

/**
 * @param {import("next").NextApiRequest} req 
 * @param {import("next").NextApiResponse} res 
 */

export default async function POST(req,res) {
    await connectMongoDB();
    console.log(req.body)
    await Story.create(req.body);
    res.status(201).json({message:"Story Created"});
}