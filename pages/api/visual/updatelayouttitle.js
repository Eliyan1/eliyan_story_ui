import connectMongoDB from "@/libs/mongodb";
import VisualLayout from "@/models/visualLayout";

/**
 * @param {import("next").NextApiRequest} req 
 * @param {import("next").NextApiResponse} res 
 */

export default async function PUT(req,res) {
    const { 
        title: title,
        layout: layout   
    } = req.body;
    await connectMongoDB();
    await VisualLayout.updateOne({title:req.query.title}, {title,layout});
    res.status(200).json({message:"Layout Updated"});
}