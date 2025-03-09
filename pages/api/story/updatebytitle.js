import connectMongoDB from "@/libs/mongodb";
import Story from "@/models/story";

/**
 * @param {import("next").NextApiRequest} req 
 * @param {import("next").NextApiResponse} res 
 */

export default async function PUT(req,res) {
    const { 
        title: title,
        content: content,
        work: work   
    } = req.body;
    await connectMongoDB();
    console.log(req.query.title)
    console.log(req.body)
    await Story.updateOne({title:req.query.title}, {title,content,work});
    res.status(200).json({message:"Story Updated"});
}