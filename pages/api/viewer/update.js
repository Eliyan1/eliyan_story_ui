import connectMongoDB from "@/libs/mongodb";
import Viewer from "@/models/viewer";

/**
 * @param {import("next").NextApiRequest} req 
 * @param {import("next").NextApiResponse} res 
 */

export default async function PUT(req,res) {
    const {
        url: url,
        hpOverlay: hpOverlay,
        initiativeOverlay: initiativeOverlay,
        currentTurn: currentTurn,
        initiatedChar: initiatedChar,
        villainMaxHP: villainMaxHP,
        villainCurrentHP: villainCurrentHP,
        villainName: villainName,

    } = req.body;
    await connectMongoDB();
    const displayImage = await Viewer.findOne({title: 'DisplayImage'})
    await Viewer.findByIdAndUpdate(displayImage._id, {url, hpOverlay, initiativeOverlay, currentTurn, initiatedChar, villainCurrentHP, villainMaxHP, villainName});
    res.status(200).json({message:"Active View Updated"});
}