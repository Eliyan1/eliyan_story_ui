import connectMongoDB from "@/libs/mongodb";
import Story from "@/models/story";

/**
 * @param {import("next").NextApiRequest} req 
 * @param {import("next").NextApiResponse} res 
 */

export default async function PUT(req,res) {
    const { 
        title: title,
        content: content   
    } = req.body;
    await connectMongoDB();
    console.log(req.query.id)
    console.log(req.body)
    await Story.findByIdAndUpdate(req.query.id, {title, content});
    res.status(200).json({message:"Story Updated"});
}