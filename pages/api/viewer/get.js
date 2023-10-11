import connectMongoDB from "@/libs/mongodb";
import Viewer from "@/models/viewer";

/**
 * @param {import("next").NextApiRequest} req 
 * @param {import("next").NextApiResponse} res 
 */

export default async function GET(req,res) {
    await connectMongoDB();
    const displayImage = await Viewer.findOne({title: 'DisplayImage'})
    res.status(201).json({displayImage});
}