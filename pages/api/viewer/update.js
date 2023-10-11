import connectMongoDB from "@/libs/mongodb";
import Viewer from "@/models/viewer";

/**
 * @param {import("next").NextApiRequest} req 
 * @param {import("next").NextApiResponse} res 
 */

export default async function PUT(req,res) {
    const {url: url} = req.body;
    await connectMongoDB();
    const displayImage = await Viewer.findOne({title: 'DisplayImage'})
    await Viewer.findByIdAndUpdate(displayImage._id, {url});
    res.status(200).json({message:"Active View Updated"});
}