import connectMongoDB from "@/libs/mongodb";
import Story from "@/models/story";

/**
 * @param {import("next").NextApiRequest} req 
 * @param {import("next").NextApiResponse} res 
 */

export default async function PUT(req,res) {
    await connectMongoDB();
    const story = await Story.findOne({_id: req.query.id});
    res.status(200).json({story});
}